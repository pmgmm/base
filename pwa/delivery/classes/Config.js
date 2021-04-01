/**
 * CLASSES - CONFIG
 * 
 * Disponibiliza métodos que permitem gerir a configuração da PWA
 *
 * @pmonteiro (yyyy-mm-dd)
 */ 

// Modo de desenvolvimento
const DEVELOPMENT = true;
// Key da PWA
const PWA_KEY = '705.5f86bae08edf12.91994499';
// Nome da PWA
const PWA_NAME = 'DELIVERY'
// Módulo do backend
const PWA_MODULE = 'PWA Delivery ' // Tem de iniciar com 'PWA'
// Nome da DB
const BD_NAME = 'base_delivery'
// Versão da DB
const DB_VERSION = 1
// Endereço do proxy de fetch
const PROXY_ADDRESS = '/framework/proxies/MobileFetch.php';
// Número de páginas (excluindo login)
const PWA_PAGES = 4;
// Idiomas disponíveis
const LANGUAGES = ['pt_PT', 'es_ES', 'fr_FR', 'en_US'];
// Idioma "source" das traduções
const SOURCE_TRANSLATE_LANGUAGE = 'pt_PT';
// Idioma por defeito
const DEFAULT_LANGUAGE = 'pt_PT';


class Config {

    /**
     * Constructor
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    constructor() {

        // Idioma por defeito 
        this._language = DEFAULT_LANGUAGE;
        this._language_data = {};

    }


    // --- Getter's & Setter's

    // Idioma (ie. pt_PT, ...)
    set language(value) {
        this._language = value;
        this.language_data = value;
        DBW.beginTransaction(['config'], DBW.WRITE).then(transaction => {
            DBW.update(transaction, 'config', [{'key':'language','value': value}]);
        });
    }
    get language() {return this._language;}

    // Objecto de traduçao
    set language_data(value) {
        if (value == SOURCE_TRANSLATE_LANGUAGE) {
            this._language_data = {};
        } else {
            this._language_data = eval(`LANGUAGE_${value}`);
        }
    }
    get language_data() {return this._language_data;}

    // VAPID Public Key para mensagens push 
    set vapid_public_key(value) {this._vapid_public_key = value;}
    get vapid_public_key() {return this._vapid_public_key;}


    /**
     * Sincroniza SERVER -> DEVICE (promessa)
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    async syncFromServer() {
        // Promessa
        return new Promise((resolve, reject) => { 

            // Preparação de dados do pedido
            var obj_form_data = new FormData();	

            // Dados obrigatórios do pedido
            obj_form_data.append('fully_qualified_class_name', '\\CORE\\entities\\app\\processors\\Mobile'.replace(/\\\\/g, '\\'));
            obj_form_data.append('module', PWA_MODULE);
            obj_form_data.append('action', 'get_config');
            obj_form_data.append('action_data', JSON.stringify({}));
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
                if (response.success) {
                    this.updateDevice(response.content);
                    resolve();  
                } else {
                    console.error(response.content);
                    reject(response.content);  
                }
            })
            .catch(error => {
                console.warn('Server not available to synchronization', error)
                reject('Servidor indisponível para sincronização.'); 
            });
                
        });
    }


    /**
     * Actualiza configuração no dispositivo (promessa)
     * (local DB e variáveis)
     * 
     * @param array content = Conteúdo (array de objectos)
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    async updateDevice(content) {
         // Promessa
        return new Promise((resolve) => {
            DBW.beginTransaction(['config'], DBW.WRITE)
            .then(transaction => {
                DBW.update(transaction, 'config', content);
                // Carrega de variáveis
                content.forEach(item => {
                    this[`_${item.key}`] = item.value
                });
                console.info('Configuration updated on device')
                resolve();
            }).catch(error => {
                console.error('Error updating configuration on device', error);
            });
        });
    }


    /**
     * Actualiza vaiáveis no dispositivo pela local DB
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    async updateVarsFromLocalDB() {
        let transaction = await DBW.beginTransaction(['config'], DBW.READONLY);
        let content = await DBW.getList(transaction, 'config');
        // Carrega variáveis
        content.forEach(item => {
            this[`_${item.key}`] = item.value;
        });
        // Carrega o idioma
        HPWA.changeLanguage(this.language);
        console.info('Configuration updated on device')
    } 


    /**
     * Reset da tabela de configuração
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    async resetLocalDB() {
        let transaction = await DBW.beginTransaction(['config'], DBW.WRITE);
        DBW.deleteAll(transaction, 'config');
    }

}
// --- END