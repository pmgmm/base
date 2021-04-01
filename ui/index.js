/**
 * UI - INDEX
 *  
 * @pmonteiro (yyyy-mm-dd))
 */


// Variáveis globais
var obj_ajax_helper;
var obj_shield;

// Garante o total carregamento da página antes de instanciar objectos
document.addEventListener("DOMContentLoaded", ready);
function ready() {

    // Objectos
    obj_ajax_helper = new AjaxHelper();
    obj_shield = FormHelper.getComponent('fwk_shield');

    FormHelper.getComponent('user_or_email').focus();

    FormHelper.getComponent("BODY").addEventListener("keyup", evt => {
        if (evt.keyCode === 13) {
            evt.preventDefault();
            login();
        }
    });
}


/**
 * Muda o idioma e recarrega a página
 * 
 * @param string language = Identificador de idioma
 * 
 * @return void
 * 
 * @pmonteiro (yyyy-mm-dd)
 */
function setLanguage(language) {
    StorageHelper.addToSession('language', language);
    window.location = `${window.location.href.split('?')[0]}?language=${language}`;
}


/**
 * Login
 * 
 * @return void
 * 
 * @pmonteiro (yyyy-mm-dd)
 */
function login() {

    // Validações 
    if (FormHelper.validateComponents(['user_or_email', 'password'])) {

        // Activa shield com progress bar
        obj_shield.progress = true;

        obj_ajax_helper.call({
            fully_qualified_class_name: '\\CORE\\entities\\user\\processors\\Base',
            action: 'login',
            action_data: {
                user_or_email: FormHelper.getComponentValue('user_or_email'),
                password: FormHelper.getComponentValue('password')
            },
            success: function (content) {

                // Coloca variáveis na storage
                StorageHelper.resetSession();
                StorageHelper.addToSession('date_format', content.storage.date_format);
                StorageHelper.addToSession('language', content.storage.language);
                if (content.storage.language_translation) {
                    StorageHelper.addToSession('language_translation', content.storage.language_translation);
                } else {
                    StorageHelper.addToSession('language_translation', {});
                }

                // Termina shield com progress bar
                obj_shield.progress = false;

                // Mostra mensagem
                //FormHelper.getComponent('fwk_messagebox').pendingMessage = ['success', content.message];

                // Redirecciona
                window.location.href = 'home.php';

            },
            failure: function (message) {
                // Termina shield com progress bar
                obj_shield.progress = false;
                // Mostra mensagem
                FormHelper.getComponent('fwk_messagebox').error = TranslationHelper.translate(message);
            },
            exception: function (message) {
                // Termina shield com progress bar
                obj_shield.progress = false;
                // Mostra mensagem
                FormHelper.getComponent('fwk_messagebox').error = TranslationHelper.translate(message);
            }
        })
    }
}
// --- END