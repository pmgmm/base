/**
 * HELPERS - NOTIFICATIONS
 * 
 * Disponibiliza métodos que permitem gerir notificações
 *
 * @pmonteiro (yyyy-mm-dd)
 */ 

class NotificationHelper {

    /**
     * Constructor
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    constructor() {
        if ('Notification' in window) {
            this._supported = true;
            this._allow = true;
            console.info('Notifications supported');
        } else {
            this._supported = false;
            this._allow = false;
            console.error('Notifications not supported');
        }
    }
    

    // --- Getter's & Setter's

    // Suporta notificações
    set supported(value) {this._supported = value;}
    get supported() {return this._supported;}

     // Permite notificações
     set allow(value) {this._allow = value;}
     get allow() {return this._allow;}


    /**
     * Permissão para receber notificações
     * Se forem permitidas, activa também as notificações PUSH
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    async askPermission() {

        if (this.supported) {
            // Pedido de permissão
            Notification.requestPermission().then((request) => { 
                if (request === 'granted') {
                    // Se sim
                    this.allow = true;
                    console.info("Notifications allowed");
                    // Activar notificações push
                    this.activatePush().catch(message => HPWA.showMessage(HPWA.ERROR, message));   
                } else { // Se não
                    this.allow = false;
                    console.info("Notifications not allowed");
                }
            });
        }
    }
    

    /**
     * Activa notificações PUSH (promessa)
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    activatePush() {
        // Promessa
        return new Promise((resolve, reject) => {
            // Se está disponível a VALID public key
            if (CONFIG.vapid_public_key) {

                // Subscreve o serviço PUSH
                const options = {userVisibleOnly: true, applicationServerKey: new Uint8Array(this.encodeVapidPublicKey(CONFIG.vapid_public_key))};
                HPWA.service_worker_registration.pushManager.subscribe(options).then(subscription => {
                    
                    // Se a subscrição teve sucesso, envia as credênciais de identificação de endpoint para o servidor
                    console.info(subscription.toJSON());

                    // Preparação de dados do pedido
                    var obj_form_data = new FormData();	
        
                    // Dados obrigatórios do pedido
                    obj_form_data.append('fully_qualified_class_name', '\\CORE\\entities\\delivery_user\\processors\\Mobile'.replace(/\\\\/g, '\\'));
                    obj_form_data.append('module', PWA_MODULE);
                    obj_form_data.append('action', 'set_push_endpoint');
                    obj_form_data.append('action_data', JSON.stringify({}));
                    obj_form_data.append('endpoint', JSON.stringify(subscription.toJSON()));
                    obj_form_data.append('rid', Math.floor(Math.random() * 1000000000));
        
                    // Pedido ao servidor
                    fetch (PROXY_ADDRESS, {
                        method: 'POST',
                        headers: {
                            Name: PWA_NAME,
                            Key: PWA_KEY,
                            Authorization: USER.authorization
                        },
                        body: obj_form_data
                    })
                    .then(response => response.json())
                    .then(response => {
                        if (response.success) { // Sucesso
                            console.info('Push Notifications successfully activated');
                            resolve('Notificações externas activadas com sucesso.');  
                        } else { // Insucesso
                            console.error('Error activating Push Notifications');
                            reject('Funcionalidade indisponível de momento.'); 
                        }
                    })
                    .catch(() => { // Erro 
                        console.warn('Server not available to receive endpoint');
                        reject('Funcionalidade indisponível de momento.'); 
                    });

                }).catch(error => { // Erro
                    console.error('Error activating Push Notifications', error);
                    reject('Funcionalidade indisponível de momento.');  
                });

            } else {
                console.error('Missing required data to activate Push Notifications');
                reject('Funcionalidade indisponível de momento.'); 
            }
        });
    }
    

    /**
     * Encode de VAPID public key
     * 
     * @param string value = VAPID public key (formato base64)
     *
     * @return array = Encoded VAPID public key (Uint8Array)
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    encodeVapidPublicKey(value) {
        let padding = '='.repeat((4 - value.length % 4) % 4);
        let base64 = (value + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');
        let rawData = window.atob(base64);
        let result = new Uint8Array(rawData.length);
        for (var i = 0; i < rawData.length; ++i) {
            result[i] = rawData.charCodeAt(i);
        }
        return result;
    }


    /**
     * Desactiva notificações PUSH (promessa)
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    deactivatePush() {
        // Promessa
        return new Promise((resolve) => {
            // Obtém a subscrição PUSH
            HPWA.service_worker_registration.pushManager.getSubscription().then(subscription => {
                subscription.unsubscribe().then(() => {
                    console.info('Push Notifications successfully deactivated');
                    resolve('Notificações externas desactivadas com sucesso.');
                })
            })        
        });
    }


    /**
     * Notificações PUSH activas? (promessa)
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    isActivePush() {
        // Promessa
        return new Promise((resolve, reject) => {
            // Tenta obter uma subscrição PUSH
            HPWA.service_worker_registration.pushManager.getSubscription().then((subscription) => {
                if (subscription) {
                    resolve();
                } else {
                    reject(); 
                } 
            }).catch(() => {
                reject();
            });
        });
    }
    
        
// TODO:
    async send() {
        if (this.allow && Notification.permission === "granted") {
            HPWA.service_worker_registration.showNotification('Vibration Sample 2', {
                body: 'Buzz! Buzz!',
                icon: "custom/default/resources/logo_192.png",
                data: { 
                task_id: 1
                },
                actions: [  
                {action: 'task', title: 'Ver Tarefa'} 
                ],
                tag: 'vibration-sample2'
            });
        }
    }
    
}
// --- END
    