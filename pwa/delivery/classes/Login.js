/**
 * CLASSES - LOGIN
 * 
 * Disponibiliza métodos que permitem gerir o login da PWA
 *
 * @pmonteiro (yyyy-mm-dd)
 */ 


class Login {

    /**
     * Constructor
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    constructor() {}


    /**
     * Método único
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    async run() {

        let proceed = true;

        // Valores do formulário
        let ele_user_or_email = document.getElementById('user_or_email');
        let ele_password = document.getElementById('password');
        let user_or_email = ele_user_or_email.value.trim();
        let password = ele_password.value.trim();

        // Validações "mandatory"
        if (user_or_email == '') {
            ele_user_or_email.classList.add('mandatory');
            proceed = false;
        } else {
            ele_user_or_email.classList.remove('mandatory');
        }  
        if (password == '') {
            ele_password.classList.add('mandatory');
            proceed = false;
        } else {
            ele_password.classList.remove('mandatory');
        }    

        // Se validações ok
        if (proceed) {
            HPWA.shieldOn(false, true); 
            // Login no servidor
            USER.login(user_or_email, password).then(() => {
                // Sincronizar Configuração
                CONFIG.syncFromServer().then(() => {
                    // Permissão Notificações
                    HNOT.askPermission().then(() => {
                        // Permissão Geolocalização
                        HGPS.activateGeoLocation();
                    })
                });
                // Sincronizar Tarefas
                TASK.syncFromServer();
                // Limpar valores no formulário
                ele_user_or_email.value = '';
                ele_password.value = '';
                // Menú e Página
                HPWA.top_menu.classList.remove('hide');
                HPWA.showPage(HPWA.TODO);
                HPWA.shieldOff();
            }).catch(error => {
                // Login não efectuado
                HPWA.shieldOff();
                console.log(error);
                HPWA.showMessage(HPWA.ERROR, error);
            });
        }
        
    }

}
// --- END