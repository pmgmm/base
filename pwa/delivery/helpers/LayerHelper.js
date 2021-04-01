/**
 * HELPERS - LAYER
 * 
 * Disponibiliza métodos que permitem gerir os layers da PWA
 *
 * @pmonteiro (yyyy-mm-dd)
 */ 


class LayerHelper {

    get LEFT() {return 'left';}
    get BOTTOM() {return 'bottom';}
    get TOP() {return 'top';}

    constructor() {}

     // --- Getter's & Setter's

    // Layer aberto
    set opened(value) {this._opened = value;}
    get opened() {return this._opened;}

    // Tipo de layer aberto
    set opened_type(value) {this._opened_type = value;}
    get opened_type() {return this._opened_type;}

    // É movimento de swipe ?
    set swipe(value) {this._swipe = value;}
    get swipe() {return this._swipe;}

    // Início de swipe horizontal
    set startX(value) {this._startX = value;}
    get startX() {return this._startX;}

    // Fim de swipe horizontal
    set endX(value) {this._endX = value;}
    get endX() {return this._endX;}

    // Deslocação em swipe
    set diffX(value) {this._diffX = value;}
    get diffX() {return this._diffX;}

    // É movimento de scroll ?
    set vertical_scroll(value) {this.vertical_scroll = value;}
    get vertical_scroll() {return this.vertical_scroll;}

    // Início de scroll vertical
    set startY(value) {this._startY = value;}
    get startY() {return this._startY;}

    // Fim de scroll vertical
    set endY(value) {this._endY = value;}
    get endY() {return this._endY;}

    // Deslocação em scroll
    set diffY(value) {this._diffY = value;}
    get diffY() {return this._diffY;}


   /**
     * Arrasto (swipe) de layer
     * 
     * @param event evt = Evento
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    touchStart(evt) {
        // Coordenadas iniciais
        this.startX = evt.touches[0].clientX;
        this.startY = evt.touches[0].clientY;
        this.diffX = 0;
        this.diffY = 0;
    }
    touchMove(evt) {
        // Coordenadas no ponto movido
        this.endX = evt.touches[0].clientX;
        this.endY = evt.touches[0].clientY;
        // Deslocação até ao ponto movido
        this.diffX = this.endX - this.startX;
        this.diffY = this.endY- this.startY;
        if (HLAYER.opened_type == HLAYER.LEFT && !this.swipe && !this.vertical_scroll) {
            if (Math.abs(this.diffY) > 10) { // Movimento Scroll
                this.swipe = false;
                this.vertical_scroll = true;
            } else if (Math.abs(this.diffX) > 7) { // Movimento Swipe
                this.vertical_scroll = false;
                this.swipe = true;
            } else {
                return;
            }
        } else if (HLAYER.opened_type != HLAYER.LEFT) {
            this.swipe = true;
        }
        //Se é um movimento de swipe, move o layer
        if (this.swipe) {
            if (evt.cancelable) {evt.preventDefault();}
            if (HLAYER.opened_type == HLAYER.LEFT  && this.startX > this.endX) { // Layer esquerdo
                this.style.left = `${this.diffX}px`;
            } else if (HLAYER.opened_type == HLAYER.BOTTOM && this.startY < this.endY) { // Layer rodapé
                this.style.bottom = `${this.diffY*-1}px`;
            } else if (HLAYER.opened_type == HLAYER.TOP && this.startY > this.endY) { // Layer topo
                this.style.top = `${this.diffY}px`;
            }
        }
    }
    touchEnd(evt) {
        // Se é um movimento de swipe
        if (this.swipe) {
    
            if (HLAYER.opened_type == HLAYER.LEFT && this.startX > this.endX) { // Layer esquerdo
                // Define o ponto de fecho de layer
                let threshold = (HLAYER.opened.clientWidth) / 3;
                this.classList.add('swipe');
                // Se não fecha layer
                if (Math.abs(this.diffX) < threshold) {
                    this.style.left = 0;
                    // Depois da recolocação, reinicia style
                    setTimeout(function() {HLAYER.opened.classList.remove('swipe');}, 400);
                } else {
                    // Fecha layer
                    HLAYER.close();
                }
            } else if (HLAYER.opened_type == HLAYER.BOTTOM && this.startY < this.endY) { // Layer rodapé
                let threshold = (HLAYER.opened.clientHeight) / 3;
                this.classList.add('swipe');
                // Se não fecha layer
                if (Math.abs(this.diffY) < threshold) {
                    this.style.bottom = 0;
                    // Depois da recolocação, reinicia style
                    setTimeout(function() {HLAYER.opened.classList.remove('swipe');}, 400);
                } else {
                    // Fecha layer
                    HLAYER.close();
                }
            } else if (HLAYER.opened_type == HLAYER.TOP && this.startY > this.endY) { // Layer topo
                let threshold = (HLAYER.opened.clientHeight) / 3;
                this.classList.add('swipe');
                // Se não fecha layer
                if (Math.abs(this.diffY) < threshold) {
                    this.style.top = 0;
                    // Depois da recolocação, reinicia style
                    setTimeout(function() {HLAYER.opened.classList.remove('swipe');}, 400);
                } else {
                    // Fecha layer
                    HLAYER.close();
                }
            }
        }
        this.swipe =null;
        this.vertical_scroll = null;
    }


    /**
     * Abre layer pelo seu identificador
     * 
     * @param string id = Identificador do layer
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    open(id) {
        HPWA.shieldOn(true);
        let element = document.getElementById(id);
        this.opened = element;
        if (element.classList.contains(this.LEFT)) { // Layer esquerdo
            this.opened_type = this.LEFT;
            element.left = `${-1 * HLAYER.opened.clientWidth}px`;
        } else if (element.classList.contains(this.BOTTOM)) { // Layer rodapé
            this.opened_type = this.BOTTOM;
            element.bottom = `${-1 * HLAYER.opened.clientHeight}px`;
        } else if (element.classList.contains(this.TOP)) { // Layer topo
            element.top = `${-1 * HLAYER.opened.clientHeight}px`;
            this.opened_type = this.TOP;
        }
        // Adiciona eventos de swipe
        element.addEventListener("touchstart", this.touchStart, {passive: true});
        element.addEventListener("touchmove", this.touchMove, {passive: true});
        element.addEventListener("touchend", this.touchEnd, {passive: true});
        element.classList.add('swipe');
        element.classList.remove('hide');
        // Depois da abertura, reinicia style
        setTimeout(function() {HLAYER.opened.classList.remove('swipe');}, 400);
    }
   

    /**
     * Fecha layer aberto (promessa)
     * 
     * @param event evt = Evento (se existir, como no caso do fecho por click no shield)
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    close(evt) {
        // Promessa
        return new Promise((resolve) => {
            if (evt) {evt.stopPropagation();}
            // Se exite layer aberto
            if (HLAYER.opened) {
                HPWA.shieldOff();
                HLAYER.opened.classList.add('swipe');
                if (HLAYER.opened.classList.contains(HLAYER.LEFT)) { // Layer esquerdo
                    HLAYER.opened.style.left = `${-1 * HLAYER.opened.clientWidth}px`;
                } else if (HLAYER.opened.classList.contains(HLAYER.BOTTOM)) { // Layer rodapé
                    HLAYER.opened.style.bottom = `${-1 * HLAYER.opened.clientHeight}px`;
                } else if (HLAYER.opened.classList.contains(HLAYER.TOP)) { // Layer topo
                    HLAYER.opened.style.top = `${-1 * HLAYER.opened.clientHeight}px`;
                }
                // Depois do fecho, reinicia style
                setTimeout(function() {
                    if (HLAYER.opened) {
                        HLAYER.opened.classList.add('hide');
                        HLAYER.opened.removeAttribute('style');
                        HLAYER.opened.classList.remove('swipe');
                        HLAYER.opened = null;
                    }
                    resolve();
                }, 400);
            } else {resolve();}
        } );
    }

}
// --- END