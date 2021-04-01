var object_button;

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    object_button = document.getElementById('fwk_button_2');
}

function bt_onclick() {
    alert('clicked !!!!')
 }
 function bt_onclick_modal() {
    object_button.processing = true;
    object_modal.show = true;
    object_button.processing = false;
 }

function bt_hide() {
    object_button.hide = true;
}

function bt_show() {
    object_button.hide = false;
}

function bt_isHide() {
    alert(object_button.hide);
}

function bt_disable() {
    object_button.disable = true;
}

function bt_enable() {
    object_button.disable = false;
}

function bt_isDisable() {
    alert(object_button.disable);
}

function bt_processing() {
    object_button.processing = true;
}

function bt_noprocessing() {
    object_button.processing = false;
}

function bt_load() {
    object_button.value = 'Texto botão';
}