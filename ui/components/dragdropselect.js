var object_ajax_helper;
var object_reader_helper;
var object_dragdropselect;

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    object_ajax_helper = new AjaxHelper(); 
    object_reader_helper = new ReaderHelper();
    object_dragdropselect = document.getElementById('fwk_dragdropselect_1');
  }

  
function ddsel_hide() {
    object_dragdropselect.hide = true;
}

function ddsel_show() {
    object_dragdropselect.hide = false;
}

function ddsel_isHide() {
    alert(object_dragdropselect.hide);
}

function ddsel_disable() {
    object_dragdropselect.disable = true;
}

function ddsel_enable() {
    object_dragdropselect.disable = false;
}

function ddsel_isDisable() {
    alert(object_dragdropselect.disable);
}

function ddsel_fillOptions() {
    var options = [{"id":"1","code":"ADMINISTRATION"},{"id":"205","code":"APP_PWA"},{"id":"208","code":"DELIVERY_NOTIFICATION"},{"id":"207","code":"DELIVERY_USER"},{"id":"202","code":"GROUP"}];
    var details = {"1":false,"205":[true,true,false,false],"208":false,"207":true,"202":[true,true,false,true]};
    object_dragdropselect.fill({
        options: options,
        value: [1,205, 202],
        details: details
    });
}

function ddsel_fillAjax() {
	//object_ajax_filter_helper.search = 'ssss';
	//object_ajax_filter_helper.addField('id', 1);
    var reader = {ajax: object_ajax_helper, filter: object_reader_helper, fully_qualified_class_name: '\\FWK\\components\\test_processors\\ProcessorSelect', action: 'get_options_dragdrop'};
    object_dragdropselect.fill({
        reader: reader,
        value: [1,201,202,2,206, 203]
    });

}


function ddsel_select() {
    value=[1,201,202];
    details = {"1":false, "201":[true,true,true,false],"202":[true,false,false,true]};
    object_dragdropselect.select(value, details);
}

function ddsel_unselect() {
    //object_dragdropselect.unselect([1,2,3]);
    object_dragdropselect.value = [];
}

function ddsel_value() {
    let result = object_dragdropselect.value;
    if (result.length > 0) {
        alert(result);
    }
}

function ddsel_selection() {
    let result = object_dragdropselect.selection;
    if (result.length > 0) {
        alert(result);
    }
}

function ddsel_data() {
    let result = object_dragdropselect.data;
    if (Object.entries(result).length !== 0) {
        alert(JSON.stringify(result));
    } 
}

function ddsel_details() {

    let result = object_dragdropselect.details;
    if (Object.entries(result).length !== 0) {
        alert(JSON.stringify(result));
    } 
}

function ddsel_mandatory() {
    object_dragdropselect.mandatory = true;
}

function ddsel_free() {
    object_dragdropselect.mandatory = false;
}

function ddsel_isMandatory() {
    alert(object_dragdropselect.mandatory);
}

function ddsel_error() {
    object_dragdropselect.error = true;
}

function ddsel_errorText() {
    object_dragdropselect.error = 'Texto de erro \n linha 2';
}

function ddsel_noError() {
    object_dragdropselect.error = false;
}

function ddsel_hasError() {
    alert(object_dragdropselect.error);
}
