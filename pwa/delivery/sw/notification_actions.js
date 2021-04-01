//TODO: REFACTORAR E COMENTAR

self.addEventListener('notificationclick', function(evt) {  

    var data = evt.notification.data;

    evt.notification.close();  
  
    switch (evt.action) {

        case 'task1':
            evt.waitUntil(
                clients.matchAll({type: 'window'})
                  .then(clients => {
                    // clients is an array with all the clients
                    if (clients.length > 0) {
                      // if you have multiple clients, decide
                      // choose one of the clients here
                      const someClient = clients[0]
                      return someClient.navigate(`/pwa/delivery/task.html?id=${data.task_id}`)
                        .then(client => client.focus());
                    } else {
                      // if you don't have any clients
                      return clients.openWindow(`/pwa/delivery/task.html?id=${data.task_id}`);
                    }
                  })
              );
        break;
        case 'task2':
                  alert('asdasasd');
        break;
        default:
            break;

    }

  });