/**
 * FRAMEWORK - COMPONENTS - BUTTON
 * 
 * Custom Web Component 
 * 
 * @pmonteiro (yyyy-mmm-dd)
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
        .container {}

        /* container do componente */
        .container {
            display: block;
            position: relative;
            width: min-content;
        }
        .container.hide {
            display: none;
        }
        .container.gray {
            --color: var(--gray-medium);
            --hover-color: var(--gray-dark);
            --border-color: var(--gray-light);
            --processing-color: var(--gray-dark);
            --disable-color: var(--gray-disable);
        }
        .container.blue {
            --color: var(--blue-medium);
            --hover-color: var(--blue-dark);
            --border-color: var(--blue-light);
            --processing-color: var(--blue-dark);
            --disable-color: var(--blue-disable);
        }
        
        /* área de icone, texto e trigger para evento */
        .container .head {
            line-height: var(--line-height);
            cursor: pointer;
            display: flex;
            box-sizing: border-box;
            height: var(--component-height);
            align-items: center;
        }
        .container.border .head {
            background-color: var(--component-background-color);
            padding: 0px 8px;
            border: 1px solid var(--border-color);
        }
        .container:not(.disable) .head:hover, .container.processing .head {
            --border-color: var(--hover-color);
            --color: var(--hover-color);
        }  
        .container.disable .head {
            cursor: not-allowed;
            --color: var(--disable-color);
            --border-color: var(--disable-color);
        }
        .container.processing .head {
            cursor: not-allowed;
        }

        /* icon */
        .container .head .icon {
            display: flex;
        }
        .container .head .icon.margin {
            margin-right: 6px;
        }  
        .container .head .icon.hide {
            display: none;
        }  

        slot[name=icon]::slotted(i) {
            padding-top: 1px;
            font-size: var(--icon-size);
            color: var(--color);
        }
        slot[name=icon]::slotted(svg) {
            width: var(--icon-size);
            fill: var(--color);
        }

        /* caption */
        .container .head .caption {
            color: var(--color);
            white-space: nowrap;
            padding-top: 2px;
        }
        .container .caption.hide {
            display: none;
        }   

        /* animação */
        .container.processing div.animation {
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
    <div id="fwk_button" class="container gray">
        <div class="head">
            <div class="icon hide">
                <slot name="icon"></slot>
            </div>
            <div class="caption hide"></div>
        </div>
        <div class="tooltips">
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
    class FWK_button extends HTMLElement {

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
            this.icon = this.head.querySelector('.icon');
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
                this.function_active = false;
            } else if (value === false) {
                this.container.classList.remove('hide');
                if (!this.container.hasAttribute('disable')) {
                    this.function_active = true;
                }
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
         * @pmonteiro (yyyy-mm-dd)
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
            this.caption.innerText = value;
            this.caption.classList.remove('hide');
            this.icon.classList.add('margin');
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
                let icon = this.icon;
                let caption = this.caption;
                let tooltips = this.tooltips;
                let information = this.information;

                // Gera random ID se não atribuído
                if (!component.hasAttribute('id')) {component.setAttribute('id',fwkGenerateRandomID('buttom'));}

                // Estado activo / inactivo
                if (component.hasAttribute('disable') && component.getAttribute('disable')== 'true') {
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
                    caption.classList.remove('hide');
                    component.removeAttribute('value');
                } 

                // Cor
                if (component.hasAttribute('color') && ['blue'].includes(component.getAttribute('color'))) {
                    this.container.classList.remove('gray');
                    this.container.classList.add(component.getAttribute('color'));
                    component.removeAttribute('color');
                }

                // Border
                if (component.hasAttribute('border') && component.getAttribute('border') == 'true') {
                    container.classList.add('border')
                    component.removeAttribute('border');
                } 

                // Posição Tooltip
                if (component.hasAttribute('tooltip-position') && ['left'].includes(component.getAttribute('tooltip-position'))) {
                    tooltips.classList.add(component.getAttribute('tooltip-position'));
                    component.removeAttribute('tooltip-position');
                } else {
                    tooltips.classList.add('right');  
                }
                
                // Se existe slot de icone, mostra-o
                let slots_icon = component.shadowRoot.querySelector('slot[name="icon"]');
                if (slots_icon.assignedElements().length > 0) {
                    icon.classList.remove('hide')
                } 
                slots_icon.addEventListener('slotchange', evt => {
                    if (!caption.classList.contains('hide')) {
                        icon.classList.add('margin'); 
                    }
                    icon.classList.remove('hide');
                }); 
                
                // Se existe slot de informação, mostra-a
                let slots_information = component.shadowRoot.querySelector('slot[name="information"]');
                if (slots_information.assignedElements().length > 0) {
                    information.classList.remove('hide');
                } 
                slots_information.addEventListener('slotchange', evt => {
                    information.classList.remove('hide');
                }); 

                // Onclick function
                if (component.hasAttribute('function') && component.getAttribute('function') != '') {
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
  customElements.define('fwk-button', FWK_button);

})();
// --- END