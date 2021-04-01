/**
 * FRAMEWORK - COMPONENTS - CHECKBOX
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
        /* css comum a vários componentes */
        @import "/framework/components/shared_tooltips.css";

        /* variáveis */
        .container {}

        /* container do componente */
        .container {
            display: flex;
            position: relative;
            width: min-content;
            color: var(--color);
            cursor: pointer;
        }
        .container.hide {
            display: none;
        }
        .container.gray {
            --color: var(--gray-medium);
            --label-color: var(--gray-dark);
            --hover-color: var(--gray-dark);
            --disable-color: var(--gray-disable);
        }
        .container.blue {
            --color: var(--blue-medium);
            --label-color: var(--blue-dark);
            --hover-color: var(--blue-dark);
            --disable-color: var(--blue-disable);
        }
        .container.white {
            --color: rgba(255,255,255,.25);
            --label-color: white;
            --hover-color: white;
        }
        .container.disable {
            cursor: not-allowed;
            --color: var(--disable-color) !important;
        }
        .container:not(.disable) .elements:hover {
            --color: var(--hover-color);
        }

        /* elementos */
        .container .elements {
            display: flex;
            align-items: center;
            height: var(--component-height);
            line-height: var(--line-height);
            align-items: center;
        }
        .container.simple .elements {
            height: min-content !important;
        }

        /* icone de checkbox */
        .container .elements svg {
            width: var(--icon-size);
            fill: var(--color);
            display: none;

        }  
        .container:not(.checked) .elements svg:nth-child(1) {
            display: block;
        }  
        .container.checked .elements svg:nth-child(1) {
            display: none;
        }  
        .container:not(.checked) .elements svg:nth-child(2) {
            display: none;
        }  
        .container.checked .elements svg:nth-child(2) {
            display: block;
        } 

        /* label */
        .container .elements div.label {
            color: var(--label-color);
            white-space: nowrap;    
            padding: 2px 0px 0px 8px;
        }
        .container.disable .elements div.label {
            color: var(--disable-color);
        }
        .container .elements div.label.hide {
            display: none;
        }

    </style>

    <!--- html do componente -->
    <div id="fwk_checkbox" class="container">
        <div class="elements">
            <svg viewBox="0 0 64 64">
                <path d="M64 64H0V0H64V64ZM5.875 58.1875H58.025V5.8125H5.875V58.1875Z"/>
            </svg>
            <svg viewBox="0 0 64 64">
                <path d="M27.4 48.7L13.4625 36.875L17.6375 32.4625L27.2125 40.725L49.025 17.6375L53.575 21.675L27.4 48.7ZM64 64H0V0H64V64ZM5.875 58.1875H58.025V5.8125H5.875V58.1875Z"/>
            </svg>
            <div class="label hide"></div>
        </div>
        <div class="tooltips">
            <div class="information hide">
                <slot name="information"></slot>
            </div>
        </div>
    </div>`;

    
    /**
     * Classe owner do componente
	 *
	 * @pmonteiro (yyyy-mm-dd)
     */
    class FWK_checkbox extends HTMLElement {

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
            this.elements = this.container.querySelector('.elements');
            this.label = this.elements.querySelector('.label');
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
         * @pmonteiro (yyyy-mm-dd)
         */
        get disable() {
            return this.container.classList.contains('disable');
        }


        // ------------------------------------------------------ VALUE (true / false)

        /**
         * Devolve valor do componente (true/false)
         * 
         * @return bool = ? Checked
         ª
         * @pmonteiro (yyyy-mm-dd)
         */
        get value() {
            return this.container.classList.contains('checked');
        }

        /**
         * Muda o valor do componente (true/false)
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        set value(value) {
            if (value === true)  {
                this.setAttribute('value', 'true');
                this.container.classList.add('checked');
            } else if (value === false)  {
                this.setAttribute('value', 'false');
                this.container.classList.remove('checked');
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

                // Função para onchange
                this.function;
                
                // Disponibiliza áreas de trabalho
                let component = this;
                let container = this.container;
                let elements = this.elements;
                let label = this.label;
                let tooltips = this.tooltips;            
                let information = this.information;

                // Gera random ID se não atribuído
                if (!component.hasAttribute('id')) {component.setAttribute('id',fwkGenerateRandomID('checkbox'));}

                // Etiqueta da checkbox
                if (component.hasAttribute('label') && component.getAttribute('label') != '') {
                    label.innerText = component.getAttribute('label')
                    label.classList.remove('hide');
                    component.removeAttribute('label');
                }

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
                if (component.hasAttribute('value') && component.getAttribute('value') == 'true') {
                    container.classList.add('checked');
                    component.removeAttribute('value');
                }

                // Cor
                if (component.hasAttribute('color') && ['blue', 'white'].includes(component.getAttribute('color'))) {
                    container.classList.add(component.getAttribute('color'));
                    component.removeAttribute('color');
                } else {
                    container.classList.add('gray');
                }

                // Versão simples
                if (component.hasAttribute('simple') && component.getAttribute('simple') == 'true') {
                    container.classList.add('simple')
                    label.classList.add('hide');

                } 

                // Posição Tooltip
                if (component.hasAttribute('tooltip-position') && ['left'].includes(component.getAttribute('tooltip-position'))) {
                    tooltips.classList.add(component.getAttribute('tooltip-position'));
                    component.removeAttribute('color');
                } else {
                    tooltips.classList.add('tooltip-position');  
                }

                // Se existe slot de informação, mostra-a
                let slots_information = component.shadowRoot.querySelector('slot[name="information"]');
                if (slots_information.assignedElements().length > 0) {
                    information.classList.remove('hide');
                } 
                slots_information.addEventListener('slotchange', evt => {
                    information.classList.remove('hide');
                }); 

                // Onchange function name
                if (component.hasAttribute('function') && component.getAttribute('function') != '') {
                    this.function = component.getAttribute('function');
                    component.removeAttribute('function');
                }
                
                
                /**
                 * Click no componente
                 * 
                 * @return void
                 *
                 * @pmonteiro (yyyy-mm-dd) 
                 */    
                elements.addEventListener('click', evt => {

                    // Se o componente não está disable   
                    if (component.function_active) {

                        if (container.classList.contains('checked')) {
                            component.value = false;
                        } else {
                            component.value = true;
                        }

                        // Função onchange (se existir)
                        if (component.function) {
                            let function_parts = this.function.split('.');
                            if (function_parts[1]) { // Método de classe
                                window[function_parts[0]][function_parts[1]](container.classList.contains('checked'));
                            } else { // Função de script
                                window[this.function](container.classList.contains('checked'));
                            }
                        }

                    }

                });

                this.dom_ready = true;
            }
        }

    }

  window.customElements.define('fwk-checkbox', FWK_checkbox);

})();
// --- END