var object_box;

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    object_box = document.getElementById('fwk_box_1');
}

function box_hide() {
    object_box.hide = true;
}

function box_show() {
    object_box.hide = false;
}

function box_isHide() {
    alert(object_box.hide);
}