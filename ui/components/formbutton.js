var obj_ajax_helper;
var object_button;

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    object_ajax_helper = new AjaxHelper(); 
    object_formbutton = document.getElementById('fwk_formbutton_1');
}

function fbt_onclick() {
   alert('clicked !!!!')
}

function fbt_hide() {
    object_formbutton.hide = true;
}

function fbt_show() {
    object_formbutton.hide = false;
}

function fbt_isHide() {
    alert(object_formbutton.hide);
}

function fbt_disable() {
    object_formbutton.disable = true;
}

function fbt_enable() {
    object_formbutton.disable = false;
}

function fbt_isDisable() {
    alert(object_formbutton.disable);
}

function fbt_processing() {
    object_formbutton.processing = true;
}

function fbt_noprocessing() {
    object_formbutton.processing = false;
}

function fbt_load() {
    object_formbutton.value = 'Texto botão';
}

function fbt_color() {
    object_formbutton.color = 'gray';
}

function fbt_help() {
    object_formbutton.help = 'Texto de informação \n linha 2';
}

function fbt_noHelp() {
    object_formbutton.help = false;
}