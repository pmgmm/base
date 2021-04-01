var object_treeview;
var object_ajax_helper;
var object_reader_helper;

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    object_ajax_helper = new AjaxHelper();
    object_reader_helper = new ReaderHelper();
    object_treeview = document.getElementById('fwk_treeview_1');
}

function tv_function(key) {
    fwkCloseComponent();
    alert(key);
    alert(object_treeview.data(key).value);
}

function tv_selected() {
    fwkCloseComponent();
    alert(object_treeview.getSelectedKeys('xpto'));
}


function treeviewUpdate(key) {
    alert('update !!!! ' + key);
 }
function treeviewEdit(key) {
    alert('Edit !!!! ' + key);
 }
 function treeviewDelete(key) {
    alert('delete !!!! ' + key);
 }
function treeviewAdd() {
    alert('add !!!!');
 }
 function trv_treeviewData() {
    alert(JSON.stringify(object_treeview.data(101)));
 }

function trv_hide() {
    object_treeview.hide = true;
}

function trv_show() {
    object_treeview.hide = false;
}

function trv_isHide() {
    alert(object_treeview.hide);
}

function trv_disable() {
    object_treeview.disable = true;
}

function trv_enable() {
    object_treeview.disable = false;
}

function trv_isDisable() {
    alert(object_treeview.disable);
}

function trv_fillRows() {

    var rows = [{"key":"101", "values": {"sr.name":"TEST-A", "sr.description":"Teste de funcionalidades", "sr.active":true}, 
    "_data": {"last_update": "2021-01-01"},
    "_permissions":["u","d"], 
    "_actions": ["<fwk-button value=\"Editar\" color=\"blue\" function='{\"editRecord\":[101]}'><\/fwk-button>",
                "<fwk-button value=\"Eliminar\" color=\"blue\" disable=\"false\" function='{\"confirmDeleteRecord\":[101, \"TEST\"]}'><\/fwk-button>"]},
    {"key":"3","values": {"sr.name":"SUPPORT-A", "sr.description":"Suporte à solução", "sr.active":true},
    "_data": {"last_update": "2021-01-01"},
    "_permissions":["u"],
    "_actions":["<fwk-button value=\"Editar\" color=\"blue\" function='{\"editRecord\":[3]}'><\/fwk-button>",
                "<fwk-button value=\"Eliminar\" color=\"blue\" disable=\"true\" function='{\"confirmDeleteRecord\":[3, \"SUPPORT\"]}'><\/fwk-button>"]}];

    object_treeview.fill({records: rows});

}


function trv_fillAjax() {;
;
	//object_ajax_filter_helper.search = 'sss';
	//object_ajax_filter_helper.addField('id', 1);
	//object_ajax_filter_helper.addOrder('descricao', 'DESC');
	//object_ajax_filter_helper.addOrder('id');
	//object_ajax_filter_helper.limit = 30;
	//object_ajax_filter_helper.offset = 0;

    var reader = {ajax: object_ajax_helper, filter: object_reader_helper, fully_qualified_class_name: '\\FWK\\components\\test_processors\\ProcessorTable', action: 'get_rows'};
    object_treeview.fill({
        reader: reader
    });
}