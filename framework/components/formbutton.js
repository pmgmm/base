/**
 * FRAMEWORK - COMPONENTS - FORMBUTTON
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
        /* css comum a vários componentes */
        @import "/framework/components/shared_tooltips.css";

        /* variáveis */
        .container {
            --min-width: 60px;
        }

        /* container do componente */
        .container {
            display: block;
            position: relative;
            width: min-content
        }
        .container.hide { 
            display: none;
        }
        .container.gray { 
            --color: white;
            --background-color: var(--gray-medium);
            --hover-color: var(--gray-dark);
            --border-color: var(--gray-dark);
            --processing-color: white;
            --disable-color: var(--gray-disable);
        }
        .container.blue {
            --color: white;
            --background-color: var(--blue-medium);
            --hover-color: var(--blue-dark);
            --border-color: var(--blue-dark);
            --processing-color: white;
            --disable-color: var(--blue-disable);
        }
        .container.white {
            --color: var(--gray-medium); 
            --background-color: white;
            --hover-color: var(--gray-dark);
            --border-color: var(--gray-light);
            --processing-color: var(--gray-dark);
            --disable-color: var(--gray-disable);
        }

        /* área de botão */
        .container .head {
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            height: var(--component-height);
            line-height: var(--line-height);
            width: min-content;
            min-width: var(--min-width);
            color: var(--color);
            background-color: var(--background-color);
            border: 1px solid var(--border-color);
            padding: 0px 10px; 
            transition: border-color .3s;
            transition: background-color .3s;
        }
        .container:not(.disable):not(.white) .head:hover, .container:not(.disable):not(.white).processing .head {
            --background-color: var(--hover-color);
        }  
        .container:not(.disable).white .head:hover, .container:not(.disable).white.processing .head {
            --color: var(--hover-color);
            --border-color: var(--hover-color);
        }  
        .container.disable .head {
            cursor: not-allowed;
            --color: var(--disable-color);
            --background-color: white;
            --border-color: var(--disable-color);
        }
        .container.processing .head {
            cursor: not-allowed;
        }
        /* caption */
        .container .head .caption {
            white-space: nowrap;
            padding-top: 1px;
        }

        /* animação */
        .container:not(.disable).processing div.animation {
            height: 1px;
            width: 12px;
            background-color: var(--processing-color);
            position: absolute;
            top: calc(100% - 2px);
            animation-duration: 1s;
            animation-name: processing;
            animation-iteration-count: infinite;
        }
        @keyframes processing {
            from {left: 1px;}
            to {left: calc(100% - 13px);}
        }

    </style>

    <!--- html do componente -->
    <div id="fwk_formbutton" class="container gray">
        <div class="head">
            <div class="caption hide"></div>
        </div>
        <div class="tooltips right">
            <div class="information hide">
                <slot name="information"></slot>
            </div>
        </div> 
        <div class="animation">
    </div>`;

    
    /**
     * Classe owner do componente
	 *
	 * @pmonteiro (yyyy-mm-dd)
     */
    class FWK_formbutton extends HTMLElement {

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
            this.caption = this.head.querySelector('.caption');
            this.tooltips = this.container.querySelector('.tooltips');
            this.information = this.tooltips.querySelector('.information')

            // Estado do evento click 
            this.function_active = true

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

        
        // ------------------------------------------------------ ACTIVO / INACTIVO

        /**
         * Controlo de estado activo / inactivo
         * 
         * @param bool value = ? Inactivo
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        set disable(value) {

            if (value === true) {
                this.container.classList.add('disable');
                // Evitar hack html
                this.function_active = false;
            }     
            else if (value === false) {
                this.container.classList.remove('disable');
                // Evitar hack html
                this.function_active = true;
            }

        }

        /**
         * Devolve estado de inactivo
         * 
         * @return bool value = ? Inactivo
         * 
         * @pmonteiro (yyyy-mm-dd)2)
         */
        get disable() {
            return this.container.classList.contains('disable');
        }
     

    // ------------------------------------------------------ PROCESSING

        /**
         * Controlo de estado de processamento
         * 
         * @param bool value = ? Em processamento
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        set processing(value) {

            if (value === true) {
                this.container.classList.add('processing');
            }     
            else if (value === false) {
                this.container.classList.remove('processing');
            }

        }


        // ------------------------------------------------------ VALOR

        /**
         * Carrega texto no componente
         *
         * @param string value = Valor
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        set value(value) {
            this.setAttribute('value', value);
            this.caption.innerText = value;
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

                // Função para onclick
                this.function;
                this.function_parameters;
                // Script para onclick
                this.script;
                
                // Disponibiliza áreas de trabalho
                let component = this;
                let container = this.container;
                let caption = this.caption;
                let tooltips = this.tooltips;
                let information = this.information;

                // Gera random ID se não atribuído
                if (!component.hasAttribute('id')) {component.setAttribute('id',fwkGenerateRandomID('formbutton'));}

                // Estado activo / Inactivo
                if (component.hasAttribute('disable') && component.getAttribute('disable') == 'true') {
                    component.disable = true;
                    component.removeAttribute('disable');
                }

                // Estado visível / invisível
                if (component.hasAttribute('hide') && component.getAttribute('hide') == 'true') {
                    component.hide = true;
                    component.removeAttribute('hide');
                }

                // Valor
                if (component.hasAttribute('value') && component.getAttribute('value') != '') {
                    component.value = component.getAttribute('value');
                    caption.classList.remove('hide')
                    component.removeAttribute('value');
                } 
                
                // Cor
                if (component.hasAttribute('color') && ['white', 'blue'].includes(component.getAttribute('color'))) {
                    this.container.classList.remove('gray');
                    this.container.classList.add(component.getAttribute('color'));
                    component.removeAttribute('color');
                }

                // Posição Tooltip
                if (component.hasAttribute('tooltip-position') && ['left'].includes(component.getAttribute('tooltip-position'))) {
                    tooltips.classList.remove('right'); 
                    tooltips.classList.add(component.getAttribute('tooltip-position'));
                    component.removeAttribute('tooltip-position');
                }

                // Se existe slot de informação, mostra-a
                let slots_information = component.shadowRoot.querySelector('slot[name="information"]');
                if (slots_information.assignedElements().length > 0) {
                    information.classList.remove('hide');
                } 
                slots_information.addEventListener('slotchange', evt => {
                    information.classList.remove('hide');
                }); 

                // Onclick function
                if ((component.hasAttribute('function') && component.getAttribute('function') != '' )) {
                    this.function_parameters = [];
                    try {
                        let func = JSON.parse(component.getAttribute('function'));
                        this.function = Object.keys(func)[0];
                        this.function_parameters = func[this.function].concat(this.function_parameters);
                    } catch (e) {
                        this.function = component.getAttribute('function');
                    }
                    this.head.addEventListener('click', evt => {
                        if (component.function_active && !container.classList.contains('processing')) {
                            let function_parts = component.function.split('.');
                            if (function_parts[1]) { // Método de classe
                                window[function_parts[0]][function_parts[1]](...component.function_parameters);
                            } else { // Função de script
                                window[component.function](...component.function_parameters);
                            }
                        }
                    });
                    component.removeAttribute('function');
                }

                // Onclick script
                if ((component.hasAttribute('script') && component.getAttribute('script') != '' )) {
                    this.script = component.getAttribute('script');
                    this.head.addEventListener('click', evt => {
                        eval(this.script);
                    });
                    component.removeAttribute('script');
                }

                this.dom_ready = true;
                
            }

        }

    }

  // Adiciona o componente à lista de componentes customizados
  customElements.define('fwk-formbutton', FWK_formbutton);

})();
// --- END