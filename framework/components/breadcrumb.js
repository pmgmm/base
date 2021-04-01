/**
 * FRAMEWORK - COMPONENTS - BREADCRUMB
 * 
 * Custom Web Component 
 * 
 * @pmonteiro (yyyy-mm-dd)
 */ 

 
(function () {

    // Template do componente (CSS+HTML)
    const template = document.createElement('template');
    template.innerHTML = `
    <!--- css do componente -->
    <style>
        /* css comum a todos os componentes */
        @import "/framework/components/shared.css";

        /* variáveis */
        .container {
            --component-height: 25px;
            --line-height: 15px;
            --color: white;
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
            --background-color: var(--gray-light);
            --background-hover-color: var(--gray-medium);
            --current-background-color: var(--gray-dark);
        }
        .container.blue {
            --background-color: var(--blue-light);
            --background-hover-color: var(--blue-medium);
            --current-background-color: var(--blue-dark);
        }

        /* área de breadcumb */
        .container .head {
            counter-reset: flag; 
            display: flex;
        }

        /* elemento de breadcumb */
        .container .head .element {
            display: flex;
            background-color: var(--background-color);
            box-sizing: border-box;
            line-height: var(--component-height);
            position: relative;
            margin-left: 0px;
            transition: background-color .3s;
        }
        .container .head .element.disable, .container.disable .head .element {
            pointer-events: none;
        }
        /* hover */
        .container .head .element:not(:last-child):hover {
            background-color: var(--background-hover-color) !important;
        }
        .container .head .element:hover:after {
            border-left-color: var(--background-hover-color) !important;
        }

       /* margem numerado */
        .container.numbered .head .element a:before {
            left: 25px !important;
        }
        /* todos */
        .container .head .element:not(:first-child) {
            margin-left: 3px;
            padding-left: 7px;
        }
        /* primeiro numerado */
        .container.numbered .head .element:not(:first-child) {
            padding-left: 12px;
        }
        .container.numbered .head .element:first-child a:before{
            left: 15px !important;
        }
        /* último */
        .container .head .element:last-child {
            padding: 0px 20px;
            background-color: var(--current-background-color);
            justify-content: center;
            flex: 1;
        }

        /* link / button */
        .container .head .element a, .container .head .element span {
            color: var(--color);
            text-decoration: none;
            white-space: nowrap;
            padding-left: 20px;
            padding-right: 10px;
        }
        /* numerado */
        .container.numbered .head .element a {
            padding-left: 40px;
        }
        /* numeração */
        .container.numbered .head .element a:before {
            counter-increment: flag;
            content: counter(flag);
            border-radius: 100%;
            width: var(--line-height);
            height: var(--line-height);
            line-height: var(--line-height);
            position: absolute;
            top: calc((var(--component-height) - var(--line-height)) / 2);
            color: var(--background-color);
            background: var(--color);
            text-align: center;
            z-index: 2;
        }
        .container.numbered .head .element:last-child a:before {
            color: var(--current-background-color);
        }
        .container.numbered .head .element:hover a:before {
            color: var(--background-hover-color);
        }
        /* formatação de elementos */
        .container .head .element:not(:last-child):before {
            position: absolute;
            top: 0;
            content: '';
            border-top: calc(var(--component-height) / 2) solid transparent;
            border-bottom: calc(var(--component-height) / 2) solid transparent;
            border-left: calc(var(--component-height) / 2) solid var(--color);
            right: calc((var(--component-height) / -2) - 2px);
            transition: .25s;
            z-index: 1;
        }
        /* excepto o último */
        .container .head .element:not(:last-child):after {
            position: absolute;
            top: 0;
            content: '';
            border-top: calc(var(--component-height) / 2) solid transparent;
            border-bottom: calc(var(--component-height) / 2) solid transparent;
            border-left: calc(var(--component-height) / 2) solid var(--background-color);;
            right: calc((var(--component-height) / -2) + 1px);
            transition: .25s;
            z-index: 3;
        }

    </style>

    <!--- html do componente -->
    <div id="fwk_breadcrumb" class="container gray">
        <div class="head">
            <slot name="content"></slot>
        </div>
    </div>`;

    
    /**
     * Classe owner do componente
	 *
	 * @pmonteiro (yyyy-mm-dd)
     */
    class FWK_breadcrumb extends HTMLElement {

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

                // Função para target (se existir)
                this.function;

                // Disponibiliza áreas de trabalho
                let component = this;
                let container = this.container;
                let head = this.head;

                // Gera random ID se não atribuído
                if (!component.hasAttribute('id')) {component.setAttribute('id',fwkGenerateRandomID('breadcrumb'));}

                // Estado activo / Inactivo
                if (component.hasAttribute('disable') && component.getAttribute('disable') == 'true') {
                    container.classList.add('disable');
                    component.removeAttribute('disable');
                }

                // Estado visível / invisível
                if (component.hasAttribute('hide') && component.getAttribute('hide') == 'true') {
                    component.hide = true;
                    component.removeAttribute('hide');
                }

                // Numerado
                if (component.hasAttribute('numbered') && component.getAttribute('numbered') == 'true') {
                    container.classList.add('numbered');
                    component.removeAttribute('numbered');
                }
                
                // Cor
                if (component.hasAttribute('color') && ['blue'].includes(component.getAttribute('color'))) {
                    container.classList.remove('gray');
                    container.classList.add(component.getAttribute('color'));
                    component.removeAttribute('color');
                }

                // Onchange function name
                if (component.hasAttribute('function') && component.getAttribute('function') != '') {
                    this.function = component.getAttribute('function');
                    component.removeAttribute('function');
                }

                // Elementos carregados por slot / html
                var slots = component.shadowRoot.querySelector('slot[name="content"]');
                this.slots_processed = false;
                slots.addEventListener('slotchange', evt => {
                    
                    if (!this.slots_processed) {

                        slots = slots.assignedElements();

                        // Carrega dados
                        let content = JSON.parse(slots[0].innerText);

                        // Carrega os elementos
                        let element_index = 0;
                        Object.entries(content).forEach(([key, element]) => {

                            // Adapta os dados ao funcionamento do componente
                            // Container de elemento de breadcrumb
                            let element_container = document.createElement('div');

                            element_container.setAttribute('id', component.id + '_' + element_index);
                            element_container.classList.add('element');
                            
                            // Se inactivo
                            if (element.disable === true) {
                                element_container.classList.add('disable');
                            } 

                            // Caption + Link
                            let link = document.createElement('a');
                            link.innerText = element.value;
                            if (element.target && element.target != '') {
                                if (!component.function) {
                                    link.href = element.target;
                                } else {
                                    link.href = '#';
                                    link.setAttribute('value', element.target);
                                    link.addEventListener('click', evt => {
                                        let function_parts = this.function.split('.');
                                        if (function_parts[1]) { // Método de classe
                                            window[function_parts[0]][function_parts[1]](evt.target.getAttribute('value'));
                                        } else { // Função de script
                                            window[this.function](evt.target.getAttribute('value'));
                                        }
                                    });
                                }
                            } else {
                                link.href = '#';
                            }
                            link.setAttribute('tabindex', -1);
                            element_container.appendChild(link);
                            head.appendChild(element_container);
                    
                        });

                        this.slots_processed = true;
                    
                        // Elimina slot
                        slots[0].remove();

                        // Remove a tag slot
                        let slottag = container.querySelector('slot');
                        slottag.remove(); 

                    }

                });

                this.dom_ready = true;
                
            }

        }

    }

  // Adiciona o componente à lista de componentes customizados
  customElements.define('fwk-breadcrumb', FWK_breadcrumb);

})();
// --- END