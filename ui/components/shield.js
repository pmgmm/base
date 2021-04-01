var object_shield;

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    object_shield = document.getElementById('fwk_shield');
}

function shield_disable() {
    object_shield.enable = false;
}
function shield_enable() {
    object_shield.enable = true;
}

function shield_progress_disable() {
    object_shield.progress = false;
}
function shield_progress_enable() {
    object_shield.progress = true;
}