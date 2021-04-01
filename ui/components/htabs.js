var object_htabs;

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    object_htabs = document.getElementById('fwk_htabs_1');
}

function hts_hide() {
    object_htabs.hide = true;
}

function hts_show() {
    object_htabs.hide = false;
}

function hts_isHide() {
    alert(object_htabs.hide);
}

function hts_hideTab() {
    object_htabs.hideTab('b');
}

function hts_showTab() {
    object_htabs.showTab('b');
}

function hts_isTabHide() {
    alert(object_htabs.isTabHide('b'));
}

function hts_select() {
    object_htabs.value = 'a';
}

function hts_value() {
    let result = object_htabs.value;
    if (result) {
        alert(result);
    }
}

function hts_counter() {
    object_htabs.counter('a', 23);
}