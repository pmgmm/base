var object_checkbox;

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    object_checkbox = document.getElementById('fwk_checkbox_1');
  }


function chk_hide() {
    object_checkbox.hide = true;
}

function chk_show() {
    object_checkbox.hide = false;
}

function chk_isHide() {
    alert(object_checkbox.hide);
}

function chk_disable() {
    object_checkbox.disable = true;
}

function chk_enable() {
    object_checkbox.disable = false;
}

function chk_isDisable() {
    alert(object_checkbox.disable);
}

function chk_onchange(current_value) {
    alert(current_value);
}

function chk_check() {
    object_checkbox.value = true;
}

function chk_uncheck() {
    object_checkbox.value = false;
}

function chk_checked() {
    let result = object_checkbox.value;
    alert(result);
}