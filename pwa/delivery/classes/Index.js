/**
 * CLASSES - INDEX
 * 
 * Disponibiliza métodos que configuram, preparam e iniciam a PWA
 *
 * @pmonteiro (yyyy-mm-dd)
 */ 

 
// Classe Base
var INDEX; 
// Classe de Configuração
var CONFIG;
// Entidade Utilizador de PWA
var USER;
// Entidade Tarefa
var TASK;
// Helper da PWA
var HPWA;
// Helper de Notificações
var HNOT;
// Helper de Geolocalização + Google Maps
var HGPS;
// Helper de Layers (menus + formulários)
var HLAYER;
// Helper de Tarefas
var HTASK;
// Instancia de DB
var DBW;

// Quando DOM pronta ...
document.addEventListener("DOMContentLoaded", function() {
    INDEX = new Index();
    INDEX.run();
});


class Index {

    /**
     * Constructor
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    constructor() {}


    /**
     * Prepara a PWA
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    run() {

        let hostname = window.location.hostname.split('.');

        hostname.pop();
        hostname.pop();

        if (DEVELOPMENT || hostname.length ) {

            // Instancias de Classes 
            CONFIG = new Config();

            // Instancias de entidades
            TASK = new Task();
            USER = new User();

            // Instancias de helpers
            HPWA = new PwaHelper();
            HNOT = new NotificationHelper();
            HGPS = new GpsHelper();
            HLAYER = new LayerHelper();
            HTASK = new TaskHelper();

            // Instala Service Worker
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('sw.js', { scope: './' })
                    .then(registration => {
                        console.info('ServiceWorker successfully registered', registration);
                    })
                    .catch(error => console.error('Error registering ServiceWorker', error));
            }

            // Quando o Service Worker está pronto ...
            navigator.serviceWorker.ready.then(registration => {
                // Guarda o registo para futuras operações (ex: subscrição push)
                HPWA.service_worker_registration = registration;
                // Inicia a PWA
                this.startEngine();
            });

        } else {

            document.write("SEM SUBDOMAIN");

        }

    }


    /**
     * Inicia a PWA
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    async startEngine() {
        try {

            // Recursos Menu More
            this.setMenuMore(); 

            // Local DB
            DBW = new IndexedDBWrapper();
            await DBW.connect();

            // Lê dados de configuração da local DB
            await CONFIG.updateVarsFromLocalDB();

            // Lê dados do user da local DB
            await USER.updateVarsFromLocalDB();

            // Adiciona eventos a elementos
            this.addEventListeners();

            if (navigator.onLine) { // ONLINE 

                if (USER.logged_in) { // Login já efectuado
                    HPWA.shieldOn(false, true);
                    USER.validateAuthorization().then(result => {
   
                            // Sincronizar Configuração
                            CONFIG.syncFromServer();
                            // Sincronizar Tarefas
                            TASK.syncFromServer();
                            // Página
                            HPWA.showPage(HPWA.TODO);
                            // Iniciar Geolocalização
                            HGPS.activateGeoLocation();
                            HPWA.shieldOff();
            
                    }).catch(error => {
                        HPWA.shieldOff();
                        HPWA.showMessage(HPWA.ERROR, error).then(() => {
                            USER.logoff();
                            HPWA.showPage(HPWA.LOGIN);
                        });
                    });
                } else { // Login ainda não efectuado
                    // Página
                    HPWA.showPage(HPWA.LOGIN);
                }
            } else { // OFFLINE
                console.warn('Offline');
                if (USER.logged_in) { // Login já efectuado
                    HPWA.shieldOn(false, true);
                    // Carregar Configuração da local DB
                    TASK.updateContainerFromLocalDB();
                    // Página
                    HPWA.showPage(HPWA.TODO);
                    // Iniciar Geolocalização
                    HGPS.activateGeoLocation();
                    HPWA.shieldOff();
                    HPWA.showMessage(HPWA.ERROR, 'Dispositivo Offline. A utilizar dados locais ...');
                } else { // Login ainda não efectuado
                    HPWA.current_page_container.querySelector('.form').classList.add('hide');
                    HPWA.current_page_container.querySelector('.languages').classList.add('hide');
                    HPWA.showMessage(HPWA.INFORMATION, 'Para fazer login necessita estar online.', false);
                    HPWA.showPage(HPWA.LOGIN);
                }
            }

        } catch (message) {
            console.error(message);
            HPWA.showMessage(HPWA.ERROR, 'PWA indisponível. Tente mais tarde.');
            HPWA.shieldOff();
        }
    }


    /**
     * Configura botões (com depedências) do menu more de topo
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    setMenuMore() {

        HNOT.isActivePush().then(() => {
            // Mostra botão "Desactivar notificações externas" no menu "more" de topo
            document.getElementById('pwa-top-menu-deactivate-push-notifications').classList.remove('hide');
        }).catch(() => {
            // Mostra botão "Activar notificações externas" no menu "more" de topo
            document.getElementById('pwa-top-menu-activate-push-notifications').classList.remove('hide');
        });
    
    }


    /**
     * Adiciona eventos
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    addEventListeners() {

        // Login
        document.getElementById('btn-login').addEventListener('click', evt => {
            let obj_login = new Login();
            obj_login.run();
        });

        // -------------- Botões no menu "more" de topo

        // Direcções das 10 primeiras entregas (se online)
        document.getElementById('pwa-top-menu-directions').addEventListener("click", evt => {
            evt.stopPropagation();
            if (navigator.onLine) {
                // Prepara url
                let directions_url = HGPS.getGoogleMapsUrlMultipleDirectionTo(TASK.places);
                // Abre Browser ou Pwa Google Maps 
                if (directions_url) {
                    window.open(encodeURI(directions_url), 'map');
                }
            } else {
                HPWA.showMessage(HPWA.ERROR, 'Dispositivo Offline. Google Maps indisponível ...');
            }
        });

        // Modo de entrega
        document.getElementById('pwa-top-menu-delivery-mode').addEventListener("click", evt => {
            evt.stopPropagation();
            // Fechar layer activo
            HLAYER.close();
            // Alteração de modo
            HPWA.page_1.classList.remove('order-mode');
        });

        // Modo de ordenação
        document.getElementById('pwa-top-menu-order-mode').addEventListener("click", evt => {
            evt.stopPropagation();
            // Fechar layer activo
            HLAYER.close();
            // Forçar 1ª página TODO
            HPWA.showPage(HPWA.TODO);
            // Alteração de modo
            HPWA.page_1.classList.add('order-mode');
        });

        // Repôr ordem
        document.getElementById('pwa-top-menu-order-reset').addEventListener("click", evt => {
            evt.stopPropagation();
            // Fechar layer activo
            HLAYER.close().then(evt => {
                // Pergunta
                let question = 'Confirma o regresso à ordernação original?';
                HPWA.showQuestion(question, 'Não', 'SIM').then(answer => {
                    if (answer == 2) {
                    }
                });

            });
        });

        // LogOff da Pwa / Utilizador
        document.getElementById('pwa-top-menu-logoff').addEventListener("click", evt => {
            evt.stopPropagation();
            // Fechar layer activo
            HLAYER.close();
            // LogOff
            USER.logoff();
            HGPS.deactivateGeoLocation();
        });

        // Instala Pwa
        document.getElementById('pwa-top-menu-install').addEventListener("click", evt => {
            evt.stopPropagation();
            // Fechar layer activo
            HLAYER.close();
            // Install Pwa
            HPWA.addToDesktop();
        });

        // Activar Push notifications
        document.getElementById('pwa-top-menu-activate-push-notifications').addEventListener("click", evt => {
            evt.stopPropagation();
            HNOT.activatePush().then((message) => {
                // Esconde botão "Activar notificações externas" no menu "more" de topo
                document.getElementById('pwa-top-menu-activate-push-notifications').classList.add('hide');
                // Mostra botão "Desactivar notificações externas" no menu "more" de topo
                document.getElementById('pwa-top-menu-deactivate-push-notifications').classList.remove('hide');
                HLAYER.close();
                // Informação ao utilizador
                HPWA.showMessage(HPWA.SUCCESS, message);
            });
        });

        // Desactivar Push notifications
        document.getElementById('pwa-top-menu-deactivate-push-notifications').addEventListener("click", evt => {
            evt.stopPropagation();
            HNOT.deactivatePush().then((message) => {
                // Esconde botão "Desactivar notificações externas" no menu "more" de topo
                document.getElementById('pwa-top-menu-deactivate-push-notifications').classList.add('hide');
                // Mostra botão "Activar notificações externas" no menu "more" de topo
                document.getElementById('pwa-top-menu-activate-push-notifications').classList.remove('hide');
                HLAYER.close();
                // Informação ao utilizador
                HPWA.showMessage(HPWA.SUCCESS, message);
            });
        });

        // Sobre a App
        document.getElementById('pwa-top-menu-about').addEventListener("click", evt => {
            evt.stopPropagation();
            // Fechar layer activo
            HLAYER.close().then(evt => {
                // Abrir layer "about"
                HLAYER.open('about-content');
            });
        });


        // -------------- Botões do menu "more" de task

        // ENTREGA
        document.getElementById('pwa-task-deliver').innerText = HPWA.translate('ENTREGAR');
        document.getElementById('pwa-task-deliver').addEventListener("click", evt => {
            evt.stopPropagation();
            // Fechar layer activo
            HLAYER.close().then(evt => {
                // Abrir layer de entrega
                document.getElementById('delivery-notes').value = '';
                HLAYER.open('task-deliver-content');
            });
        });

        // Activa sinalizador de proximidade (gps)
        document.getElementById('pwa-task-activate-proximity').addEventListener("click", evt => {
            evt.stopPropagation();
            // Adiciona id da Task ao conjunto de sinalização por proximidade
            HGPS.activateProximity(TASK.id);
            // Mostra o sinalizador
            let task = document.getElementById(`task-${TASK.id}`);
            task.querySelector('.proximity').classList.remove('hide');
            // Fechar layer activo
            HLAYER.close();
        });

        // Cancela sinalizador de proximidade (gps)
        document.getElementById('pwa-task-deactivate-proximity').addEventListener("click", evt => {
            evt.stopPropagation();
            // Remove id da Task ao conjunto de sinalização por proximidade
            HGPS.deactivateProximity(TASK.id);
            // Esconde o sinalizador
            let task = document.getElementById(`task-${TASK.id}`);
            task.querySelector('.proximity').classList.add('hide');
            // Fechar layer activo
            HLAYER.close();
        });


        // -------------- Botões do formulário de entrega

        document.getElementById('btn-deliver-cancel').addEventListener("click", evt => {
            HLAYER.close();
        });

        document.getElementById('btn-deliver-confirm').addEventListener("click", evt => {
            HLAYER.close();
            HPWA.shieldOn(false, true);
        });

    }


    /**
     * Traduções estáticas
     * ATENÇÃO: Nome Inalterável
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    translateContent() {

        // Login
        document.getElementById('user_or_email').placeholder = HPWA.translate('Utilizador ou email');
        document.getElementById('password').placeholder = HPWA.translate('Password');
        document.getElementById('btn-login').innerText = HPWA.translate('ENTRAR');

        // Botões no menu "more" de topo
        document.getElementById('pwa-top-menu-directions').innerText = HPWA.translate('Mapa entregas (10 primeiras)');
        document.getElementById('pwa-top-menu-delivery-mode').innerText = HPWA.translate('Modo entrega');
        document.getElementById('pwa-top-menu-order-mode').innerText = HPWA.translate('Modo ordenação');
        document.getElementById('pwa-top-menu-order-reset').innerText = HPWA.translate('Ordem original');
        document.getElementById('pwa-top-menu-account').innerText = HPWA.translate('A minha conta');
        document.getElementById('pwa-top-menu-sync').innerText = HPWA.translate('Sincronizar serviço');
        document.getElementById('pwa-top-menu-logoff').innerText = HPWA.translate('Saír');
        document.getElementById('pwa-top-menu-install').innerText = HPWA.translate('Adicionar PWA ao dispositivo');
        document.getElementById('pwa-top-menu-activate-push-notifications').innerText = HPWA.translate('Activar notificações externas');
        document.getElementById('pwa-top-menu-deactivate-push-notifications').innerText = HPWA.translate('Desactivar notificações externas');
        document.getElementById('pwa-top-menu-about').innerText = HPWA.translate('Sobre a PWA');

        // Botões do menu "more" de task
        document.getElementById('pwa-task-deliver').innerText = HPWA.translate('ENTREGAR');
        document.getElementById('pwa-task-activate-proximity').innerText = HPWA.translate('Activar aviso de proximidade');
        document.getElementById('pwa-task-deactivate-proximity').innerText = HPWA.translate('Desactivar aviso de proximidade');

        // Entrega
        document.getElementById('btn-deliver-cancel').innerText = HPWA.translate('Cancelar').toUpperCase();
        document.getElementById('btn-deliver-confirm').innerText = HPWA.translate('CONFIRMAR').toUpperCase();

        // Sobre a PWA
        document.getElementById('about-description').innerText = HPWA.translate('A PWA Delivery foi desenvolvida pela xpto.');
        document.getElementById('about-pwa-version').innerText = `${HPWA.translate('Versão da PWA')}:`;
        document.getElementById('about-pwa-version-value').innerText = '1.0.0.1'; // depende de sw
        document.getElementById('about-db-version').innerText = `${HPWA.translate('Versão da DB')}:`;
        document.getElementById('about-db-version-value').innerText = DB_VERSION;

    }

}
//--- END