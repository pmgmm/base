
/**
 * Login
 * 
 * @return void
 * 
 * @pmonteiro (yyyy-mm-dd)
 */
function userLogout() {

    // Activa shield com progress bar
    obj_shield = FormHelper.getComponent('fwk_shield');
    obj_shield.progress = true;

    obj_ajax_helper = new AjaxHelper(); 
    obj_ajax_helper.call({
        fully_qualified_class_name: '\\CORE\\entities\\user\\processors\\Base',
        action: 'logout', 
        action_data: {},
        success: function(content) {
            // Termina shield com progress bar
            obj_shield.progress = false;
            //FormHelper.getComponent('fwk_messagebox').pendingMessage = ['success', content.message];
            StorageHelper.resetSession();
            window.location.href = '/ui/';
        }, 
        failure: function(message) {
            // Termina shield com progress bar
            obj_shield.progress = false;
            // Mostra mensagem
            FormHelper.getComponent('fwk_messagebox').error = message;
        }, 
        exception: function(message) {
            // Termina shield com progress bar
            obj_shield.progress = false;
            // Mostra mensagem
            FormHelper.getComponent('fwk_messagebox').error = message;
        }
    })
}

