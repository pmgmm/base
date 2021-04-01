var object_label;

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    object_label = document.getElementById('fwk_label_1');
}

function lbl_hide() {
    object_label.hide = true;
}

function lbl_show() {
    object_label.hide = false;
}

function lbl_isHide() {
    alert(object_label.hide);
}