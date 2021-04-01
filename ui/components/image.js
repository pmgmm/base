var object_image;

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    object_image = document.getElementById('fwk_image_1');
}

 function img_onclick_modal() {
    object_modal.show = true;
 }

function img_hide() {
    object_image.hide = true;
}

function img_show() {
    object_image.hide = false;
}

function img_isHide() {
    alert(object_image.hide);
}

function img_disable() {
    object_image.disable = true;
}

function img_enable() {
    object_image.disable = false;
}

function img_isDisable() {
    alert(object_image.disable);
}