var object_breadcrumb;

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    object_breadcrumb = document.getElementById('fwk_breadcrumb_1');
}

function brc_hide() {
    object_breadcrumb.hide = true;
}

function brc_show() {
    object_breadcrumb.hide = false;
}

function brc_isHide() {
    alert(object_breadcrumb.hide);
}

function brc_click(value) {
    alert(value);
}