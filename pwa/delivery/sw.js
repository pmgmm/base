/**
 * SW - SERVICE WORKER
 * 
 * Recursos para cache prioritária e não prioritária
 *
 * @pmonteiro (yyyy-mm-dd)
 */ 

const PWA_VERSION = '1.0.0.1'; // Alterar também em index.js (setFixedContent)

self.importScripts('sw/config.js');
self.importScripts('sw/notification_actions.js');

// -------------- EVENTO DE INSTALAÇÃO DO SERVICE WORKER
self.addEventListener('install', (evt) => {
    evt.waitUntil (
        caches.open(PWA_VERSION).then(cache => {
            cache.addAll(FILES_ADDITIONAL);
            return cache.addAll(FILES_IMPORTANT);
        }) 
    )
})


// -------------- EVENTO DE ACTIVAÇÂO DO SERVICE WORKER
self.addEventListener('activate', evt => {
    evt.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all (
                cacheNames.filter(cacheName => {
                    return !(PWA_VERSION == cacheName);
                }).map(cacheName => caches.delete(cacheName))
            );
        })
        .then(() => {
            return self.clients.claim(); // Força a utilização imediata da nova cache
        }) 
    )
})


// -------------- EVENTO DE RECEPÇÃO DE NOTIFICAÇÕES PUSH
self.addEventListener('push', evt => {
    const notification = evt.data.json();
    console.log('Received a push message', notification.title);
    const options = {
        body: notification.body,
        icon: "custom/default/resources/logo_192.png",
        tag: 'delivery'/* ,
        data: { 
            task_id: 1
        },
        actions: [ 
            {action: 'task1', title: 'Ver Tarefa1'}  ,
            {action: 'task2', title: 'Ver Tarefa2'} 
        ], */
      };
    self.registration.showNotification(notification.title, options);

})



// -------------- EVENTO PEDIDOS "GET" AO SERVIDOR (ficheiros e outros recursos)
self.addEventListener('fetch', evt => {

    if (evt.request.method === 'GET') {

        evt.respondWith(async function () {
            const cache = await caches.open(PWA_VERSION);
            const cachedResponse = await cache.match(evt.request);
            if (cachedResponse) {return cachedResponse;}
            const serverResponse = await fetch(evt.request);
            if (evt.request.mode !== 'navigate') {
                evt.waitUntil(
                    cache.put(evt.request, serverResponse.clone())
                );
            }
            return serverResponse;
        }());

    }

});
// --- END