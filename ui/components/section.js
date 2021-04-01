var object_section;

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    object_section = document.getElementById('fwk_section_1');
}

function sct_hide() {
    object_section.hide = true;
}

function sct_show() {
    object_section.hide = false;
}

function sct_isHide() {
    alert(object_section.hide);
}

function sct_open() {
    object_section.open = true;
}

function sct_close() {
    object_section.open = false;
}

function sct_load() {
    object_section.value = 'Texto secção';
}