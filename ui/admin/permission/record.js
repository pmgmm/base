/**
 * UI - REGISTO DE PERMISSÃO
 *  
 * @pmonteiro (yyyy-mm-dd))
 */


// Variáveis globais
var obj_ajax_helper;
var obj_shield;

// Garante o total carregamento da página antes de instanciar objectos
document.addEventListener("DOMContentLoaded", ready);
function ready() {
    obj_ajax_helper = new AjaxHelper(); 
    obj_shield = FormHelper.getComponent('fwk_shield');
}


/**
 * Grava (inser/update) o registo
 * 
 * @param int option = Opção pós-gravação: 
 *                   -1 - regressa à página anterior
 *                    0 - mantém-se no registo em modo de update
 *                    1 - mantém-se no formulário em modo de insert
 * 
 * @return void
 * 
 * @pmonteiro (yyyy-mm-dd)
 */
function saveRecord(option) {

    // Se a opção é válida
    if ([-1, 0, 1].includes(option)) {

        // Lista de componentes do formulário passíveis de validação
        var components = ['permission_code', 'permission_type'];

        // Validações 
        if (FormHelper.validateComponents(components) && specificValidations()) {

            // Activa shield com progress bar
            obj_shield.progress = true;

            // Define a action pelo valor do id
            var action = FormHelper.getComponentValue('id') == 0 ? 'insert' : 'update';

            // Pedido ajax
            obj_ajax_helper.call({
                fully_qualified_class_name: '\\CORE\\entities\\permission\\processors\\Base',
                action: action, 
                action_data: {
                    id: FormHelper.getComponentValue('id'),
                    code: FormHelper.getComponentValue('permission_code'),
                    description: FormHelper.getComponentValue('permission_description'),
                    type: FormHelper.getComponentValue('permission_type')
                }, 
                before: function() {
                }, 
                success: function(content) {
                    // Termina shield com progress bar
                    obj_shield.progress = false;
                    // Carrega id no respectivo componente
                    FormHelper.setComponentValue('id', content.id);
                    // Guarda mensagem para mostrar na página de saída
                    FormHelper.getComponent('fwk_messagebox').pendingMessage = ['success', content.message];
                    // Navega
                    switch(option) {
                        case -1:
                            window.location.href = FormHelper.getComponentValue('back_uri');
                            break;
                        case 0:
                            window.location.href = window.location.pathname + '?id=' + FormHelper.getComponentValue('id');
                            break;
                        case 1:
                            window.location.href = window.location.pathname;
                            break;
                    }
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
            });
        }
    }
}


/**
 * Recarrega página em modo de insert (limpa)
 * 
 * @return void
 * 
 * @pmonteiro (yyyy-mm-dd)
 */
function newRecord() {
    window.location.href = window.location.pathname;
}

/**
 * Regressa à página anterior
 * 
 * @return void
 * 
 * @pmonteiro (yyyy-mm-dd)
 */
function back() {
    window.location.href = FormHelper.getComponentValue('back_uri');
}


/**
 * Validações específicas do formulário:
 * 
 * @return bool = ? Ocorreram erros
 * 
 * @pmonteiro (yyyy-mm-dd)
 */
function specificValidations() {
    let result = true;
    return result;
}
// --- END