// ------------------------------------------------------ VARIÁVEIS GLOBAIS DE COMPONENTES 

var fwk_components_control = {};

// ------------------------------------------------------ COMPORTAMENTOS PARTILHADOS ENTRE COMPONENTES 

// Click em window
window.onclick = evt => {fwkCloseComponent(evt.target.id);}

window.addEventListener("dragover", evt => {
    evt.preventDefault();
  },false);
  window.addEventListener("drop", evt => {
    evt.preventDefault();
  },false);


  function fwkGenerateRandomID(prefix){
    return `${prefix}_${new Date().getTime()}_${Math.random().toString(36).substr(2, 9)}`;
}


/**
 * Fecho de componentes
 * Garante que não existe mais do que um componente aberto (parte com posição absoluta)
 *
 * @param null|string component = Componente a manter aberto
 * 
 * @return void
 *
 * @pmonteiro (yyyy-mm-dd)
 */
function fwkCloseComponent(component) {
    if (fwk_components_control.open && component != fwk_components_control.open) {
       fwk_components_control.open.close();
    }
}


/**
* Drag & Drop em body
*
* @param object component = Componente a activar
*
* @pmonteiro (yyyy-mm-dd)
*/
function fwkDragDropAbsolute(component) {

    var start_position_x = 0, start_position_y = 0; 
    var end_position_x = 0, end_position_y = 0;

    // Atribui evento de mouse down (inicio de processo)
    component.onmousedown = fwkMouseDown;

    function fwkMouseDown(evt) {

        evt.preventDefault();

        component.style.opacity = 0.8;

        component.style.cursor = 'move';

        // Calcula a posição absoluta do cursor
        start_position_x = evt.clientX;
        start_position_y = evt.clientY;

        // Atribui evento de mouse move (dentro do documento)
        document.onmousemove = fwkMouseMove;

        // Atribui evento de mouse up (dentro do documento) (fim de processo)
        document.onmouseup = fwkMouseUp;
  
    }

    function fwkMouseMove(evt) {

        evt.preventDefault();

        // Calcula a nova posição do mouse
        end_position_x = start_position_x - evt.clientX;
        end_position_y = start_position_y - evt.clientY;

        // Actualiza a posição absoluta inicial do cursor
        start_position_x = evt.clientX;
        start_position_y = evt.clientY;

        // Calcula as coordernadas do canto superior esquerdo
        new_top = component.offsetTop - end_position_y;
        new_left = component.offsetLeft - end_position_x;
        
        // Garante que o componente não sai dos limites
        let rect = component.getBoundingClientRect();
        if(new_top < 10) {
            new_top = 10;
            fwkMouseUp();
        }
        if (new_top + rect.height > window.innerHeight - 10) {
            new_top = (window.innerHeight - rect.height - 10);
            fwkMouseUp();
        }
        if(new_left < 10) {
            new_left = 10;
            fwkMouseUp();
        }
        if (new_left + rect.width > window.innerWidth - 10) {
            new_left = (window.innerWidth - rect.width - 10);
            fwkMouseUp();
        }

        // Coloca o componente na nova posição
        component.style.top = new_top + "px";
        component.style.left = new_left + "px";
    
    }

    function fwkMouseUp() {
        // Remove os eventos (termina processo)
        component.style.cursor = 'default';
        component.style.opacity = 1;
        component.onmousedown = null;;
        document.onmouseup = null;
        document.onmousemove = null;
    }
}