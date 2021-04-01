var object_text;

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    object_text = document.getElementById('fwk_text_1');
}

function txt_hide() {
    object_text.hide = true;
}

function txt_show() {
    object_text.hide = false;
}

function txt_isHide() {
    alert(object_text.hide);
}

function txt_value() {
    object_text.value = 'Text ............ <br> ............';
}