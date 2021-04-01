var obj_askbox;

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    obj_askbox = document.getElementById('fwk_askbox_1');
}

function askbox_question() {
    obj_askbox.show =  {
        color: 'blue',
        title: 'AAAAA',
        question: '33XX weçl epwro ~wer ~weçr ~weçor ~wpeor<br>wer p~weo r~pwe ~wepr ow~ro we~r owe~ XXXXXXXXXX X XXXXXXX ?',
        actions: [
            {caption: "Não", color: "white", function: {"ask_onclick":[false]}},
            {caption: "Sim", color: "gray", function: {"ask_onclick":[true]}}
            ]
    };
}

function ask_onclick(result) {
    if (result) {alert('SIM');} else {alert('NÃO');}
    obj_askbox.show = false;

}