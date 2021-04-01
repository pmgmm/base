var object_upload;

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    object_upload = document.getElementById('fwk_upload_1');
}

function up_hide() {
    object_upload.hide = true;
}

function up_show() {
    object_upload.hide = false;
}

function up_isHide() {
    alert(object_upload.hide);
}

function up_disable() {
    object_upload.disable = true;
}

function up_enable() {
    object_upload.disable = false;
}

function up_isDisable() {
    alert(object_upload.disable);
}

function up_value() {
    let result = object_upload.value;
    alert(result);
}

function up_mandatory() {
    object_upload.mandatory = true;
}

function up_free() {
    object_upload.mandatory = false;
}

function up_isMandatory() {
    alert(object_upload.mandatory);
}

function up_error() {
    object_upload.error = true;
}

function up_errorText() {
    object_upload.error = 'Texto de erro \n linha 2';
}

function up_noError() {
    object_upload.error = false;
}

function up_hasError() {
    alert(object_upload.error);
}