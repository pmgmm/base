var object_optionbutton;

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    object_optionbutton = document.getElementById('fwk_optionbutton_1');
  }


function obt_hide() {
    object_optionbutton.hide = true;
}

function obt_show() {
    object_optionbutton.hide = false;
}

function obt_isHide() {
    alert(object_optionbutton.hide);
}

function obt_disable() {
    object_optionbutton.disable = true;
}

function obt_enable() {
    object_optionbutton.disable = false;
}

function obt_isDisable() {
    alert(object_optionbutton.disable);
}

function obt_onchange(current_value, previous_value) {
    alert(previous_value + ' -> ' + current_value + ' (html)');
}

function obt_select() {
    //object_optionbutton.select(1);
    object_optionbutton.value = '1';
}

function obt_unselect() {
    //object_multiselect.unselect();
    object_optionbutton.value = '';
}

function obt_value() {
    let result = object_optionbutton.value;
    alert(result);
}

function obt_selection() {
    let result = object_optionbutton.selection;
    alert(result);
}

function obt_data() {
    let result = JSON.stringify(object_optionbutton.data);
    if (result) {
        alert(result);
    }
}