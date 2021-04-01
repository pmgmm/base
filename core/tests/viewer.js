/**
 * TESTES - VISUALIZADOR DE RELATÓRIOS DE ERROS
 * 
 * @pmonteiro (2020-03-20)
 */  


/**
 * Esconde todas as linhas de testes bem sucedidos
 * Controla também comportamentos de interface do botão 
 *
 * @return void
 * 
 * @pmonteiro (2020-03-20)
 */
function hideSuccesses() {
    var button = document.getElementById("hideSuccesses");
    button.disabled = true;
    button.classList.add("processing");
    var x = document.getElementsByClassName("success");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    button.classList.remove("processing");
    button.disabled = false;
}