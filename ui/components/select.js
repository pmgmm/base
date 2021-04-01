var object_ajax_helper;
var object_reader_helper;
var object_select;

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    object_ajax_helper = new AjaxHelper(); 
    object_reader_helper = new ReaderHelper();
    object_select = document.getElementById('fwk_select_1');
  }


function sel_hide() {
    object_select.hide = true;
}

function sel_show() {
    object_select.hide = false;
}

function sel_isHide() {
    alert(object_select.hide);
}

function sel_disable() {
    object_select.disable = true;
}

function sel_enable() {
    object_select.disable = false;
}

function sel_isDisable() {
    alert(object_select.disable);
}

function sel_fillOptions() {
    var options = [
            {"id": 1, "country":"Espanha",  "statistics":{"population":46934632, "gnc":1244757}},
            {"id": 2, "country":"Itália",   "statistics":{"population":60359546, "gnc":1787664}},
            {"id": 3, "country":"Portugal", "statistics":{"population":10276617, "gnc":212303}}
            ];
    object_select.fill({
        options: options,
        value: 2,
        function_onchange: function (current_value, previous_value) {
            alert(previous_value + ' -> ' + current_value + ' (options)');
        }
    });
}

function sel_fillAjax() {
	//object_reader_helper.search = 'ssss';
	//object_reader_helper.addField('id', 1);
	//object_reader_helper.addOrder('descricao', 'DESC');
	//object_reader_helper.addOrder('id');
	//object_reader_helper.limit = 30;
	//object_reader_helper.offset = 0;

    var reader = {ajax: object_ajax_helper, filter: object_reader_helper, fully_qualified_class_name: '\\FWK\\components\\test_processors\\ProcessorSelect', action: 'get_options'};
    object_select.fill({
        reader: reader, 
        value: 24,
        functfion_onchange: function (current_value, previous_value) {
            alert(previous_value + ' -> ' + current_value + ' (ajax)');
        }
    });
}

function sel_onchange(current_value, previous_value) {
    alert(previous_value + ' -> ' + current_value + ' (html)');
}

function sel_select() {
    //object_select.select(1);
    object_select.value = 1;
}

function sel_unselect() {
    //object_select.unselect();
    object_select.value = '';
}

function sel_value() {
    let result = object_select.value;
    if (result) {
        alert(result);
    }
}

function sel_selection() {
    alert(object_select.selection);
}

function sel_data() {
    let result = JSON.stringify(object_select.data);
    if (result) {
        alert(result);
    }
}

function sel_mandatory() {
    object_select.mandatory = true;
}

function sel_free() {
    object_select.mandatory = false;
}

function sel_isMandatory() {
    alert(object_select.mandatory);
}

function sel_error() {
    object_select.error = true;
}

function sel_errorText() {
    object_select.error = 'Texto de erro \n linha 2';
}

function sel_noError() {
    object_select.error = false;
}

function sel_hasError() {
    alert(object_select.error);
}