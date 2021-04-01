var object_table;
var object_ajax_helper;
var object_reader_helper;

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    object_ajax_helper = new AjaxHelper();
    object_reader_helper = new ReaderHelper();
    object_table = document.getElementById('fwk_table_1');
}

function tableUpdate(key) {
    alert('update !!!! ' + key);
 }
function tableEdit(key) {
    alert('Edit !!!! ' + key);
 }
 function tableDelete(key) {
    alert('delete !!!! ' + key);
 }
function tableAdd() {
    alert('add !!!!');
 }
 function tbl_tableData() {
    alert(JSON.stringify(object_table.data(101)));
 }

function tbl_hide() {
    object_table.hide = true;
}

function tbl_show() {
    object_table.hide = false;
}

function tbl_isHide() {
    alert(object_table.hide);
}

function tbl_disable() {
    object_table.disable = true;
}

function tbl_enable() {
    object_table.disable = false;
}

function tbl_isDisable() {
    alert(object_table.disable);
}

function tbl_fillRows() {

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

    object_table.fill({records: rows});

}


function tbl_fillAjax() {;
;
	//object_ajax_filter_helper.search = 'sss';
	//object_ajax_filter_helper.addField('id', 1);
	//object_ajax_filter_helper.addOrder('descricao', 'DESC');
	//object_ajax_filter_helper.addOrder('id');
	//object_ajax_filter_helper.limit = 30;
	//object_ajax_filter_helper.offset = 0;

    var reader = {ajax: object_ajax_helper, filter: object_reader_helper, fully_qualified_class_name: '\\FWK\\components\\test_processors\\ProcessorTable', action: 'get_rows'};
    object_table.fill({
        reader: reader
    });
}