var object_input;

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    object_input = document.getElementById('fwk_input_1');
}

function in_hide() {
    object_input.hide = true;
}

function in_show() {
    object_input.hide = false;
}

function in_isHide() {
    alert(object_input.hide);
}

function in_disable() {
    object_input.disable = true;
}

function in_enable() {
    object_input.disable = false;
}

function in_isDisable() {
    alert(object_input.disable);
}

function in_load() {
    object_input.value = 'ÁÁÁçççç!!!|||ººº';
}

function in_clean() {
    object_input.value = '';
}

function in_value() {
    let result = object_input.value;
    alert(result);
}

function in_email() {
    alert (FormHelper.isEmail(object_input.value));
}
function in_integer() {
    alert (FormHelper.isInteger(object_input.value));
}
function in_decimal() {
    alert (FormHelper.isDecimal(object_input.value));
}
function in_datetime() {
    alert (FormHelper.isDatetime(object_input.value));
}
function in_date() {
    alert (FormHelper.isDate(object_input.value));
}
function in_time() {
    alert (FormHelper.isTime(object_input.value));
}

function in_mandatory() {
    object_input.mandatory = true;
}

function in_free() {
    object_input.mandatory = false;
}

function in_isMandatory() {
    alert(object_input.mandatory);
}

function in_validate() {
    alert(FormHelper.validateComponents(['fwk_input_1']));
}

function in_error() {
    object_input.error = true;
}

function in_errorText() {
    object_input.error = 'Texto de erro \n linha 2';
}

function in_noError() {
    object_input.error = false;
}

function in_hasError() {
    alert(object_input.error);
}