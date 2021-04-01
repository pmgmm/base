var object_radiobutton;

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    object_radiobutton = document.getElementById('fwk_radiobutton_1');
  }


function rbt_hide() {
    object_radiobutton.hide = true;
}

function rbt_show() {
    object_radiobutton.hide = false;
}

function rbt_isHide() {
    alert(object_radiobutton.hide);
}

function rbt_disable() {
    object_radiobutton.disable = true;
}

function rbt_enable() {
    object_radiobutton.disable = false;
}

function rbt_isDisable() {
    alert(object_radiobutton.disable);
}

function rbt_onchange(current_value, previous_value) {
    alert(previous_value + ' -> ' + current_value + ' (html)');
}

function rbt_select() {
    //object_radiobutton.select(1);
    object_radiobutton.value = '1';
}

function rbt_unselect() {
    //object_radiobutton.unselect();
    object_radiobutton.value = '';
}

function rbt_value() {
    let result = object_radiobutton.value;
    alert(result);
}

function rbt_selection() {
    let result = object_radiobutton.selection;
    alert(result);
}

function rbt_data() {
    let result = JSON.stringify(object_radiobutton.data);
    if (result) {
        alert(result);
    }
}