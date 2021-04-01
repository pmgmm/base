/**
 * FRAMEWORK - COMPONENTS - HORIZONTAL TABS
 * 
 * Custom Web Component 
 * 
 * @pmonteiro (yyyy-mm-dd)
 */ 


(function() {

    // Template do componente (CSS+HTML)
    const template = document.createElement('template');
    template.innerHTML = `
    <!--- css do componente -->
    <style>
        /* css comum a todos os componentes */
        @import "/framework/components/shared.css";

        /* variáveis */
        .container {
            --tag-min-width: 60px;
            --body-min-width: 320px;
            --body-min-height: 160px;
        }

        /* container do componente */
        .container {
            display: block;
            position: relative;
        }
        .container.hide {
            display: none;
        }
        .container.gray {
            --color: var(--gray-medium);
            --border-color: var(--gray-light);
            --selected-color: var(--gray-dark);
            --hover-color: var(--gray-dark);
        }
        .container.blue {
            --color: var(--blue-medium);
            --border-color: var(--blue-light);
            --selected-color: var(--blue-dark);
            --hover-color: var(--blue-dark);
        }
        
        /* área de tabs */
        .container .head {
            display: flex;
            width: 100%;
            height: 32px;
            border-bottom: 2px solid var(--border-color);
        }
        .container .head.right {
            justify-content: flex-end;
        }
        .container:hover .head, .container:hover .body {
            --border-color: var(--hover-color);
        }  
        .container .head slot[name=tab]::slotted(div) {
            display: flex;
            box-sizing: border-box;
            color: var(--color);
            fill: var(--color);
            border: 2px solid transparent;
            padding: 4px 10px 0px;
            min-width: var(--tag-min-width);
            white-space: nowrap;
            align-items: center;
            margin-bottom: -2px;
        }
        .container .head slot[name=tab]::slotted(div.hide) {
            display: none;
        }
        .container .head slot[name=tab]::slotted(div:hover) {
            color: var(--hover-color);
            cursor: pointer;
        }
        .container .head slot[name=tab]::slotted(div.selected) {
            color: var(--selected-color);
            fill: var(--selected-color);
            border: 2px solid var(--border-color);
            border-bottom: 2px solid var(--page-background-color);
        }

        /* área de conteúdos */
        .container .body {
            box-sizing: border-box;
            min-width: var(--body-min-width);
            min-height: var(--body-min-height);
            height: min-content;
            overflow-y: auto;
            padding: 10px 0px 0px;
        }
        .container.border .body {
            border: 2px solid var(--border-color);
            padding: 10px 10px 20px;
            border-top: none;
        }
        .container .body slot[name=content]::slotted(div.hide) {
            display: none;
        }

    </style>

    <!--- html do componente -->
    <div id="fwk_htabs" class="container gray">
        <div class="head">
            <slot name="tab"></slot>
        </div>
        <div class="body">
            <slot name="content"></slot>
        </div>
    </div>`;


    /**
     * Classe owner do componente
	 *
	 * @pmonteiro (yyyy-mm-dd)
     */
    class FWK_htabs extends HTMLElement {

        /**
         * Contructor
         * 
         * Disponibiliza as áreas de operação em propriedades da classe
         * 
         * @pmonteiro (yyyy-mm-dd)
         */
        constructor() {
            super();

            // Ativa shadow DOM
            this.component = this.attachShadow({ mode: 'open' });

            // Prepara e adiciona template
            this.component.appendChild(template.content.cloneNode(true));

            // Áreas de operação
            this.container = this.component.querySelector('.container');
            this.head = this.container.querySelector('.head');
            this.body = this.container.querySelector('.body');

            // Defaults 
            // Parent template used height (form)
            this.template_height = 225;

        }


        // ------------------------------------------------------ VISIBILIDADE

        /**
         * Esconde / mostra componente
         *
         * @param bool value = ? Esconde
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        set hide(value) {
            if (value === true) {
                this.container.classList.add('hide');
            } else if (value === false) {
                this.container.classList.remove('hide');
            }
        }
        
        /**
         * Devolve estado de visibilidade
         * 
         * @return bool value = ? Invisível
         * 
         * @pmonteiro (yyyy-mm-dd)
         */
        get hide() {
            return this.container.classList.contains('hide');
        }

        /**
         * Esconde tab
         *
         * @param string key = Identificador da tab
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */
         hideTab(key) {
            let tab = this.querySelector(`#${this.id}_tab_${key}`);
            // Esconde tab
            if (tab) {
                tab.classList.add('hide');
                let content = this.querySelector(`#${this.id}_content_${key}`);
                if (content) {
                    content.classList.add('hide');
                }
                // Se era a tab activa, a primeira que encontrar visível
                if (key == this.tab_selected) {
                    let new_tab_selected = this.querySelector('div:not(.hide)[slot=tab]');
                    if (new_tab_selected) {
                        this.value = new_tab_selected.id.replace(`${this.id}_tab_`, '');
                    }
                }
            }
        }

        /**
         * Mostra tab
         *
         * @param string key = Identificador da tab
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        showTab(key) {
            let tab = this.querySelector(`#${this.id}_tab_${key}`);
            if (tab) {
                tab.classList.remove('hide');
            }
        }

        /**
         * Devolve estado de visibilidade de uma tab
         * 
         * @param string key = Identificador da tab
         * 
         * @return bool value = ? Escondida
         * 
         * @pmonteiro (yyyy-mm-dd)
         */
        isTabHide(key) {
            let tab = this.querySelector(`#${this.id}_tab_${key}`);
            if (tab) {
                return tab.classList.contains('hide');
            } else {
                return true;
            }
        }
        
        // ------------------------------------------------------ VALOR DE TAB / CONTADOR DE TAB

        /**
         * Devolve valor da tab seleccionada
         * 
         * @return int = Valor da tab
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        get value() {
            return this.tab_selected;
        }

        /**
         * Selecciona uma tab
         * 
         * @param string value = Identificador da tab
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        set value(value) {
            if (this.tab_selected != '') {
                this.querySelector(`#${this.id}_tab_${this.tab_selected}`).classList.remove('selected');
                this.querySelector(`#${this.id}_content_${this.tab_selected}`).classList.add('hide');
            }
            this.tab_selected = value;
            this.querySelector(`#${this.id}_tab_${value}`).classList.add('selected');
            this.querySelector(`#${this.id}_content_${value}`).classList.remove('hide');
        }


        /**
         * Atribui um valor ao contador de tab
         * 
         * @param string key = Identificador da tab
         * @param int value = Valor para contador
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */
         counter(key, value) {
            let tab = this.querySelector(`#${this.id}_tab_${key}`);
            if (tab) {
                let counter = tab.querySelector('.counter');
                if (counter) {
                    counter.value = `(${value})`;
                }
            }
        }


        // ------------------------------------------------------ CALLBACK'S

        /**
         * Após disponibilização do componente no DOM   
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */     
        connectedCallback() {
               
            // Se ainda não foi adicionado ao DOM
            if (!this.dom_ready) {

                // Disponibiliza áreas de trabalho
                let component = this;
                let container = this.container;
                let head = this.head;
                let body = this.body;

                // Gera random ID se não atribuído
                if (!component.hasAttribute('id')) {component.setAttribute('id', fwkGenerateRandomID('htabs'));}

                // Estado visível / invisível
                if (component.hasAttribute('hide') && component.getAttribute('hide') == 'true') {
                    component.hide = true;
                    component.removeAttribute('hide');
                }

                // Tamanho (height) se estiver definido no html do componente
                if (component.hasAttribute('min-height') && !isNaN(parseInt(component.getAttribute('min-height')))) {
                    body.style.minHeight = component.getAttribute('min-height') + 'px';
                    component.removeAttribute('min-height');
                }
                if (component.hasAttribute('max-height') && !isNaN(parseInt(component.getAttribute('max-height')))) {
                    body.style.maxHeight = component.getAttribute('max-height') + 'px';
                    component.removeAttribute('max-height');
                    component.removeAttribute('template_height');
                } else if(component.hasAttribute('template_height') && !isNaN(parseInt(component.getAttribute('template_height')))){
                    body.style.height = 'calc(100vh - ' + (parseInt(component.getAttribute('template_height')) + 34) + 'px)'; // template + header
                    component.removeAttribute('template_height');
                } else {
                    body.style.height = 'calc(100vh - ' + (component.template_height + 34) + 'px)'; // template + header
                }

                // Border
                if (component.hasAttribute('border') && component.getAttribute('border') == 'true') {
                    container.classList.add('border');
                    component.removeAttribute('border');
                }

                // Valor
                component.tab_selected = 1; // Default
                if (component.hasAttribute('value') && component.getAttribute('value') != '') {
                    component.tab_selected = component.getAttribute('value');
                    component.removeAttribute('value');
                }

                // Cor
                if (component.hasAttribute('color') && ['blue'].includes(component.getAttribute('color'))) {
                    container.classList.remove('gray');
                    container.classList.add(component.getAttribute('color'));
                    component.removeAttribute('color');
                }

                // Alinhamento
                if (component.hasAttribute('align') && component.getAttribute('align') == 'right') {
                    head.classList.add('right');
                    component.removeAttribute('right');
                }


                // Tabs carregadas por slot / html
                var slots_tabs = component.shadowRoot.querySelector('slot[name="tab"]');
                var index_tabs = 0;
                slots_tabs.addEventListener('slotchange', evt => {

                    let slots = slots_tabs.assignedElements();

                    slots.forEach(slot => {
            
                        // Se ainda não foi processado
                        if (!slot.id.includes(component.id) ) {

                            // Gera identificador
                            let id_suffix = '';
                            if (slot.id) { // Com base no id da slot
                                id_suffix = slot.id;
                            } else { // Sequêncial
                                index_tabs++;
                                id_suffix = index_tabs;
                            }
                            slot.id = `${component.id}_tab_${id_suffix}`;

                            // Tab escondida
                            if (slot.hasAttribute('hide') && slot.getAttribute('hide') == 'true') {
                                slot.classList.add('hide');
                                if (id_suffix == component.tab_selected) {
                                    component.tab_selected = '';
                                }
                            } else if (!component.tab_selected || component.tab_selected == '') {
                                // Se nenhuma tab está definida, selecciona a 1ª visível
                                if (!component.tab_selected || component.tab_selected == '') {
                                    component.tab_selected = id_suffix;
                                }
                            }

                            // Selecciona tab
                            if (id_suffix == component.tab_selected) {
                                slot.classList.add('selected');
                                slot.removeAttribute('selected');
                            }

                            // Click de tab
                            slot.addEventListener('click', evt => {
                                let id = slot.id.substring(slot.id.lastIndexOf("_") + 1);
                                component.value = id;
                            });
                            
                        }
                    
                    });

                });


                // Conteúdos carregadas por slot / html
                var slots_contents = component.shadowRoot.querySelector('slot[name="content"]');
                var index_contents = 0;
                slots_contents.addEventListener('slotchange', evt => {

                    let slots = slots_contents.assignedElements();

                    slots.forEach(slot => {

                        // Se ainda não foi processado
                        if (!slot.id.includes(component.id) ) {

                            // Gera identificador
                            let id_suffix = '';
                            if (slot.id) { // Com base no id da slot
                                id_suffix = slot.id;
                            } else { // Sequêncial
                                index_contents++;
                                id_suffix = index_contents;
                            }
                            slot.id = `${component.id}_content_${id_suffix}`;
                            slot.classList.add('hide');

                            // Abre conteúdo
                            if (id_suffix == component.tab_selected) {
                                slot.classList.remove('hide');
                            }

                        }

                    });

                });

                this.dom_ready = true;
                
            }

        }

    } 

  // Adiciona o componente à lista de componentes customizados
  customElements.define('fwk-htabs', FWK_htabs);

})();
// --- END