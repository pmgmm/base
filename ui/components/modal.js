var object_modal;

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    object_modal = document.getElementById('fwk_modal_1');
}

function modal_show() {
    object_modal.show = true;
}

function modal_hide() {
    object_modal.show = false;
}

function modal_title() {
    object_modal.title = 'Modal title AAAAAAAAA';
}