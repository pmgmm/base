var object_ajax_helper;
var object_reader_helper;
var object_multiselect;

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    object_ajax_helper = new AjaxHelper(); 
    object_reader_helper = new ReaderHelper();
    object_multiselect = document.getElementById('fwk_multiselect_1');
  }

  
function msel_hide() {
    object_multiselect.hide = true;
}

function msel_show() {
    object_multiselect.hide = false;
}

function msel_isHide() {
    alert(object_multiselect.hide);
}

function msel_disable() {
    object_multiselect.disable = true;
}

function msel_enable() {
    object_multiselect.disable = false;
}

function msel_isDisable() {
    alert(object_multiselect.disable);
}

function msel_fillOptions() {
    var options = [
            {"id": "Espanha/xpto", "country":"Espanha",  "statistics":{"population":46934632, "gnc":1244757}},
            {"id": 2, "country":"Itália",   "statistics":{"population":60359546, "gnc":1787664}},
            {"id": 3, "country":"Portugal", "statistics":{"population":10276617, "gnc":212303}}
            ];
            object_multiselect.fill({
        options: options,
        value: ["Espanha/xpto",3],
        function_onchange: function (current_value, previous_value) {
            alert(previous_value + ' -> ' + current_value + ' (options)');
        }
    });
}

function msel_fillAjax() {
	//object_reader_helper.search = 'ssss';
	//object_reader_helper.addField('id', 1);
	//object_reader_helper.addOrder('descricao', 'DESC');
	//object_reader_helper.addOrder('id');
	//object_reader_helper.limit = 30;
	//object_reader_helper.offset = 0;

    var reader = {ajax: object_ajax_helper, filter: object_reader_helper, fully_qualified_class_name: '\\FWK\\components\\test_processors\\ProcessorSelect', action: 'get_options'};
    object_multiselect.fill({
        reader: reader, 
        value: ["Áustria/xpto",4,8],
        function_onchange: function (current_value, previous_value) {
            alert(previous_value + ' -> ' + current_value + ' (ajax)');
        }
    });
}

function msel_onchange(current_value, previous_value) {
    alert(previous_value + ' -> ' + current_value + ' (html)');
}

function msel_select() {
    //object_multiselect.select(1);
    object_multiselect.value = [1,2,3,4];
}

function msel_unselect() {
    //object_multiselect.unselect([2,3]);
    object_multiselect.value = [];
}

function msel_value() {
    let result = object_multiselect.value;
    if (result.length > 0) {
        alert(result);
    }
}

function msel_selection() {
    let result = object_multiselect.selection;
    if (result.length > 0) {
        alert(result);
    }
}

function msel_data() {

    for (const key of Object.keys(object_multiselect.data)) {
        alert(JSON.stringify(object_multiselect.data[key]['statistics']['population']));
    }
    let result = object_multiselect.data;
    if (Object.entries(result).length !== 0) {
        alert(JSON.stringify(result));
    } 
}

function msel_mandatory() {
    object_multiselect.mandatory = true;
}

function msel_free() {
    object_multiselect.mandatory = false;
}

function msel_isMandatory() {
    alert(object_multiselect.mandatory);
}

function msel_error() {
    object_multiselect.error = true;
}

function msel_errorText() {
    object_multiselect.error = 'Texto de erro \n linha 2';
}

function msel_noError() {
    object_multiselect.error = false;
}

function msel_hasError() {
    alert(object_multiselect.error);
}
