var object_link;

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    object_link = document.getElementById('fwk_link_1');
}

function lnk_onclick(key) {
    alert('clicked !!!! ' + key);
 }

function lnk_hide() {
    object_link.hide = true;
}

function lnk_show() {
    object_link.hide = false;
}

function lnk_isHide() {
    alert(object_link.hide);
}

function lnk_disable() {
    object_link.disable = true;
}

function lnk_enable() {
    object_link.disable = false;
}

function lnk_isDisable() {
    alert(object_link.disable);
}

function lnk_load() {
    object_link.value = 'Texto link';
}

function lnk_address() {
    object_link.address = 'https://www.w3schools.com/jsref/met_win_open.asp';
}