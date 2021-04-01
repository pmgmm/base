var object_textarea;

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    object_textarea = document.getElementById('fwk_textarea_1');
}

function ta_hide() {
    object_textarea.hide = true;
}

function ta_show() {
    object_textarea.hide = false;
}

function ta_isHide() {
    alert(object_textarea.hide);
}

function ta_disable() {
    object_textarea.disable = true;
}

function ta_enable() {
    object_textarea.disable = false;
}

function ta_isDisable() {
    alert(object_textarea.disable);
}

function ta_load() {
    object_textarea.value = 'ÁÁÁçççç!!!|||ººº';
}

function ta_clean() {
    object_textarea.value = '';
}

function ta_value() {
    let result = object_textarea.value;
    alert(result);
}

function ta_mandatory() {
    object_textarea.mandatory = true;
}

function ta_free() {
    object_textarea.mandatory = false;
}

function ta_isMandatory() {
    alert(object_textarea.mandatory);
}

function ta_error() {
    object_textarea.error = true;
}

function ta_errorText() {
    object_textarea.error = 'Texto de erro \n linha 2';
}

function ta_noError() {
    object_textarea.error = false;
}

function ta_hasError() {
    alert(object_textarea.error);
}