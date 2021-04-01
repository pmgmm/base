/**
 * CLASSES - USER
 * 
 * Disponibiliza métodos que permitem gerir a entidade USER
 *
 * @pmonteiro (yyyy-mm-dd)
 */ 

 
class User {

    constructor() {}


    // --- Getter's & Setter's

    // Nome
    set name(value) {this._name = value;}
    get name() {return this._name;}

    // Autorização
    set authorization(value) {this._authorization = value;}
    get authorization() {return this._authorization;}

    // Login efectuado
    set logged_in(value) {this._logged_in = value;}
    get logged_in() {return this._logged_in;}


    /**
     * Login
     * Sincroniza SERVER -> DEVICE (promessa)
     * 
     * @param string user_or_email = User ou Email (credencial de login)
     * @param string password = Password (credencial de login)
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    async login(user_or_email, password) {
        // Promessa
        return new Promise((resolve, reject) => { 

            // Preparação de dados do pedido
            var obj_form_data = new FormData();	

            // Dados obrigatórios do pedido
            obj_form_data.append('fully_qualified_class_name', '\\CORE\\entities\\delivery_user\\processors\\Mobile'.replace(/\\\\/g, '\\'));
            obj_form_data.append('module', PWA_MODULE);
            obj_form_data.append('action', 'login');
            obj_form_data.append('action_data', JSON.stringify({
                user_or_email: user_or_email,
                password: password
                })
            );
            obj_form_data.append('rid', Math.floor(Math.random() * 1000000000));

            // Pedido ao servidor
            fetch (PROXY_ADDRESS, {
                method: 'POST',
                headers: {
                    Name: PWA_NAME,
                    Key: PWA_KEY,
                    Authorization: this.authorization
                },
                body: obj_form_data
            })
            .then(response => response.json())
            .then(response => {
                if (response.success) {
                    this.updateDevice(response.content);
                    resolve();  
                } else {
                    console.log(response.content);
                    reject(response.content);  
                }
            })
            .catch(error => {
                console.warn('Server not available to login and synchronization', error)
                reject('Servidor indisponível para login.'); 
            });  

        });        

    }


    /**
     * Validar autorização (promessa)
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    async validateAuthorization() {
        // Promessa
        return new Promise((resolve, reject) => { 
            
            // Preparação de dados do pedido
            var obj_form_data = new FormData();	

            // Dados obrigatórios do pedido
            obj_form_data.append('fully_qualified_class_name', '\\CORE\\entities\\delivery_user\\processors\\Mobile'.replace(/\\\\/g, '\\'));
            obj_form_data.append('module', PWA_MODULE);
            obj_form_data.append('action', 'validate_authorization');
            obj_form_data.append('rid', Math.floor(Math.random() * 1000000000));

            // Pedido ao servidor
            fetch (PROXY_ADDRESS, {
                method: 'POST',
                headers: {
                    Name: PWA_NAME,
                    Key: PWA_KEY,
                    Authorization: this.authorization
                },
                body: obj_form_data
            })
            .then(response => response.json())
            .then(response => {
                if (response.success) {
                    console.info('User authorization validated');
                    resolve();  
                } else {
                    console.warn('User authorization not validated');
                    reject(response.content);  
                }
            })
            .catch(error => {
                console.warn('Server not available to validate authorization', error)
                reject('Serviço de validação de autorização indisponível.'); 
            }); 
        });        
    }


    /**
     * Logoff
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    logoff() {
        // Reset
        this.resetLocalDB();
        HPWA.reset();
        // Página de login
        HPWA.showPage(HPWA.LOGIN);
    }


    /**
     * Actualiza utilizador no dispositivo (promessa)
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
            DBW.beginTransaction(['user'], DBW.WRITE)
            .then(transaction => {
                DBW.update(transaction, 'user', content);
                // Carregamento de variáveis
                content.forEach(item => {
                    this[item.key] = item.value;
                });
                document.getElementById('pwa-top-bar-avatar').style.backgroundImage = `url(${this.avatar})`;
                console.info('User updated on device')
                resolve();
            }).catch(error => {
                console.error('Error updating user on device', error);
            });
        });
    }


    /**
    * Actualiza variáveis no dispositivo pela local DB
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    async updateVarsFromLocalDB() {
        let transaction = await DBW.beginTransaction(['user'], DBW.READONLY);
        let content = await DBW.getList(transaction, 'user');
        // Carrega variáveis
        content.forEach(item => {
            this[item.key] = item.value;
        });
        document.getElementById('pwa-top-bar-avatar').style.backgroundImage = `url(${this.avatar})`;
        console.info('User updated on device')
    } 


    /**
     * Reset da tabela de utilizador
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    async resetLocalDB() {
        let transaction = await DBW.beginTransaction(['user'], DBW.WRITE);
        DBW.delete(transaction, 'user', ['authorization', 'user', 'timezone']);
        DBW.update(transaction, 'user', [{'key':'logged_in', 'logged_in': false}]);
    }

}
// --- END