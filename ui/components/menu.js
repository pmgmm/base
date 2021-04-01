var object_menu;

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    object_menu = document.getElementById('fwk_menu_1');
}

function mnu_hide() {
    object_menu.hide = true;
}

function mnu_show() {
    object_menu.hide = false;
}

function mnu_isHide() {
    alert(object_menu.hide);
}