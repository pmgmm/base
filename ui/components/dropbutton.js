var object_dropbutton;

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    object_dropbutton = document.getElementById('fwk_dropbutton_1');
}

function dbt_hide() {
    object_dropbutton.hide = true;
}

function dbt_show() {
    object_dropbutton.hide = false;
}

function dbt_isHide() {
    alert(object_dropbutton.hide);
}

function dbt_disable() {
    object_dropbutton.disable = true;
}

function dbt_enable() {
    object_dropbutton.disable = false;
}

function dbt_isDisable() {
    alert(object_dropbutton.disable);
}

function dbt_load() {
    object_dropbutton.value = 'Texto botão';
}