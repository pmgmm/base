/**
 * UI - LISTA DE GRUPOS
 *  
 * @pmonteiro (yyyy-mm-dd))
 */


// Variáveis globais
var obj_ajax_helper;
var obj_filter_helper;
var obj_reader_helper;
var obj_list;
var obj_shield;
var obj_askbox;
var obj_messagebox;
var obj_modal_filter_save;
var list_id = 'groups_list';

// Garante o total carregamento da página antes de instanciar objectos
document.addEventListener("DOMContentLoaded", ready);
function ready() {
   
    // Instanciação de objectos
    obj_list = FormHelper.getComponent(list_id);
    obj_ajax_helper = new AjaxHelper(); 
    obj_shield = FormHelper.getComponent('fwk_shield');
    obj_askbox = FormHelper.getComponent('fwk_askbox');
    obj_messagebox = FormHelper.getComponent('fwk_messagebox');
    // Helper de leitura para filtro
    obj_reader_helper = new ReaderHelper();
    // Apenas passa para o FilterHelper a informação diferente
    obj_filter_helper = new FilterHelper({});

    // Aplica o ultimo filtro utilizado (se exise)
    // Se não existe, atribui a ordenação por defeito e executa o filro                                     
    if (!obj_filter_helper.applyStored()) {
        // Ordenação default
        obj_reader_helper.addOrder('sg.name', 'ASC');
        applyFilter(); 
    }
    
}

/**
 * Carrega página de registo em modo de insert (limpa)
 * 
 * @return void
 * 
 * @pmonteiro (yyyy-mm-dd)
 */
function addRecord() {
    window.location.href = 'record.php';
}


/**
 * Carrega página de registo (se view ou update, é validado no record)
 * 
 * @param int id = Id do registo
 * 
 * @return void
 * 
 * @pmonteiro (yyyy-mm-dd)
 */
 function showRecord(id) {
    window.location.href = 'record.php?id='+id;
}


/**
 * Confirmação para eliminação de registo
 * 
 * @param int id = Id do registo
 * @param string name = Nome identificador do registo
 * 
 * @return void
 * 
 * @pmonteiro (yyyy-mm-dd)
 */
function confirmDeleteRecord(id, name) {
    obj_askbox.show =  {
        color: 'blue',
        title: TranslationHelper.translate('Eliminar grupo'),
        question: TranslationHelper.translate('Confirma a eliminação do grupo:') + '<br><b>' + name + '</b>', 
        actions: [
            {caption: TranslationHelper.translate('Não'), color: "white"},
            {caption: TranslationHelper.translate('Sim'), color: "gray", function: {"deleteRecords":[[id], false]}} 
            ]
    };
}


/**
 * Confirmação para eliminação bulk de registos
 * 
 * @return void
 * 
 * @pmonteiro (yyyy-mm-dd)
 */
function confirmDeleteBulk() {

    var ids = obj_list.getSelectedKeys('d');
    if (ids.length > 0) {
        obj_askbox.show =  {
            color: 'blue',
            title: TranslationHelper.translate('Eliminar grupos'),
            question: TranslationHelper.translate('Confirma a eliminação dos grupos selecionados?'),
            actions: [
                {caption: TranslationHelper.translate('Não'), color: "white"},
                {caption: TranslationHelper.translate('Sim'), color: "gray", function: {"deleteRecords":[ids, true]}}
                ]
        };
    }

}


/**
 * Eliminação de registo(s)
 *
 * @param array ids = Id's dos registos
 * @param bool bulk = Pedido bulk
 * 
 * @return void
 * 
 * @pmonteiro (yyyy-mm-dd)
 */
function deleteRecords(ids, bulk) {

    // Fecha janela de confirmação
    obj_askbox.show = false;

    // Activa shield com progress bar
    obj_shield.progress = true;

    // Pedido simples ou bulk
    if (bulk) {
        var action = 'delete_bulk';
        var data = {ids: ids};
    } else {
        var action = 'delete';
        var data = {id: ids[0]};
    }

    obj_ajax_helper.call({
        fully_qualified_class_name: '\\CORE\\entities\\group\\processors\\Base',
        action: action, 
        action_data: data,
        success: function(content) {
            // Termina shield com progress bar
            obj_shield.progress = false;
            // Mostra mensagem
            obj_messagebox.success = content.message;
            // Recarrega lista
            applyFilter();
        }, 
        failure: function(message) {
            // Termina shield com progress bar
            obj_shield.progress = false;
            // Mostra mensagem
            obj_messagebox.error = message;
        }, 
        exception: function(message) {
            // Termina shield com progress bar
            obj_shield.progress = false;
            // Mostra mensagem
            obj_messagebox.error = message;
        }
    })

}


/**
 * Reset do filtro de pesquisa
 * Esta função é utilizada pelo FilterHelper
 * 
 * @return void
 * 
 * @pmonteiro (yyyy-mm-dd)
 */
function resetFilterComponents() {
	FormHelper.setComponentValue('filter_id', '');
    FormHelper.setComponentValue('filter_search', '');
    FormHelper.setComponentValue('group_active', '');
 }


/**
 * Preenche o reader com os valores dos componentes do filtro
 * Esta função é utilizada pelo FilterHelper
 * 
 * @return void
 * 
 * @pmonteiro (yyyy-mm-dd)
 */
function setFilter() {
    obj_reader_helper.reset();
    obj_reader_helper.id = FormHelper.getComponentValue('filter_id');
    obj_reader_helper.search = FormHelper.getComponentValue('filter_search');
    obj_reader_helper.addField('sg.active', FormHelper.getComponentValue('group_active'));
}


/**
 * Preenche os componentes com os valores do filtro
 * Esta função é utilizada pelo FilterHelper
 * 
 * @param object filter = Estrutura de filtro
 * 
 * @return void
 * 
 * @pmonteiro (yyyy-mm-dd)
 */
 function populateComponents(filter) {
    resetFilterComponents();
    FormHelper.setComponentValue('filter_id', filter.id);
    FormHelper.setComponentValue('filter_search', filter.search);
    FormHelper.setComponentValue('group_active', filter.fields['sg.active']);
}


/**
* Aplica filtro de pesquisa
* Esta função é utilizada pelo FilterHelper 
* 
* @return void
* 
* @pmonteiro (yyyy-mm-dd)
*/
function applyFilter() {

    // Activa shield com progress bar
    obj_shield.progress = true;
    // Preenche o reader
    setFilter();
    // Pedido e injecção de objectos no componente
    var reader = {ajax: obj_ajax_helper, filter: obj_reader_helper, fully_qualified_class_name: '\\CORE\\entities\\group\\processors\\Base', action: 'get_list'};
    obj_list.fill({
        reader: reader,
    });

}
// --- END