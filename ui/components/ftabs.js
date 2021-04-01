var object_ftabs;

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    object_ftabs = document.getElementById('fwk_ftabs_1');
}

function fts_hide() {
    object_ftabs.hide = true;
}

function fts_show() {
    object_ftabs.hide = false;
}

function fts_isHide() {
    alert(object_ftabs.hide);
}

function fts_hideTab() {
    object_ftabs.hideTab('b');
}

function fts_showTab() {
    object_ftabs.showTab('b');
}

function fts_isTabHide() {
    alert(object_ftabs.isTabHide('b'));
}

function fts_select() {
    object_ftabs.value = 'a';
}

function fts_value() {
    let result = object_ftabs.value;
    if (result) {
        alert(result);
    }
}

function fts_counter() {
    object_ftabs.counter('a', 23);
}