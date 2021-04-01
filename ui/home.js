/**
 * UI - HOME
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
// --- END