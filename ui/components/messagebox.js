var obj_messagebox;

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    obj_messagebox = document.getElementById('fwk_messagebox_1');
}

function messagebox_error() {
    obj_messagebox.error = 'XXXXXXXXXXXXXXXXXXXX';
}

function messagebox_success() {
    obj_messagebox.success = 'XXXXXXXXXXXXXXXXXXXX';
}

function messagebox_information() {
    obj_messagebox.information = 'XXXXXXXXXXXXXXXXXXXX';
}