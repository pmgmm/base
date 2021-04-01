/**
 * FRAMEWORK - COMPONENTS - LINKBUTTON
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
            position: relative;
            display: flex;
            width: min-content;
        }
        .container.hide {
            display: none;
        }
        .container.gray {
            --color: var(--gray-medium);
            --hover-color: var(--gray-dark);
            --processing-color: var(--gray-dark);
            --disable-color: var(--gray-disable);
        }
        .container.blue {
            --color: var(--blue-medium);
            --hover-color: var(--blue-dark);
            --processing-color: var(--blue-dark);
            --disable-color: var(--blue-disable);
        }
        .container.green {
            --color: var(--green-medium);
            --hover-color: var(--green-dark);
            --processing-color: var(--green-dark);
            --disable-color: var(--green-disable);
        }
        .container.red {
            --color: var(--red-medium);
            --hover-color: var(--red-dark);
            --processing-color: var(--red-dark);
            --disable-color: var(--red-disable);
        }

        /* área de texto e trigger para evento */
        .container .head {
            display: flex;
            height: var(--component-height);
            line-height: var(--line-height);
            cursor: pointer;
        }
        .container:not(.disable) .head:hover {
            --color: var(--hover-color);
        }  
        .container.disable .head {
            cursor: not-allowed;
            --color: var(--disable-color);
        }

        /* label */
        .container .head .label {
            padding: 2px 0px 0px;
            color: var(--color);
            white-space: nowrap;
            align-self: center;
        }

    </style>

    <!--- html do componente -->
    <div id="fwk_link" class="container gray">
        <div class="head">
            <div class="label"></div>
        </div>
        <div class="tooltips right">
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
    class FWK_link extends HTMLElement {

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
            this.label = this.head.querySelector('.label');
            this.tooltips = this.container.querySelector('.tooltips');
            this.information = this.tooltips.querySelector('.information')

            // Estado do evento click 
            this.link_active = true

            // Link address
            this._address = '';

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
                this.link_active = false;
            } else if (value === false) {
                this.container.classList.remove('hide');
                if (!this.container.hasAttribute('disable')) {
                    this.link_active = true;
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
                component.link_active = false;
            }     
            else if (value === false) {
                this.container.classList.remove('disable');
                component.link_active = true;
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
    

        // ------------------------------------------------------ VALOR E ADDRESS

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
            this.label.innerText = value;
        }

        /**
         * Carrega address no componente
         *
         * @param string value = Address
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        set address(value) {
            this._address = value;
            if (this.getAttribute('value') == '') {
                this.label.innerText = value;
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
                let label = this.label;
                let tooltips = this.tooltips;
                let information = this.information;

                // Gera random ID se não atribuído
                if (!component.hasAttribute('id')) {component.setAttribute('id',fwkGenerateRandomID('link'));}

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

                // Label
                if (component.hasAttribute('value') && component.getAttribute('value') != '') {
                    label.innerText = component.getAttribute('value');
                    component.removeAttribute('value');
                }

                // Address
                if (component.hasAttribute('address') && component.getAttribute('address') != '') {
                    component._address = component.getAttribute('address');
                    if (label.innerText == '') {
                        label.innerText = component._address;
                    }
                    component.removeAttribute('address');
                }

                // Posição Tooltip
                if (component.hasAttribute('tooltip-position') && ['left'].includes(component.getAttribute('tooltip-position'))) {
                    tooltips.classList.remove('right'); 
                    tooltips.classList.add(component.getAttribute('tooltip-position'));
                    component.removeAttribute('tooltip-position');
                }

                // Cor
                if (component.hasAttribute('color') && ['blue'].includes(component.getAttribute('color'))) {
                    this.container.classList.remove('gray');
                    this.container.classList.add(component.getAttribute('color'));
                    component.removeAttribute('color');
                }

                // Se existe slot de informação, mostra-a
                let slots_information = component.shadowRoot.querySelector('slot[name="information"]');
                if (slots_information.assignedElements().length > 0) {
                    information.classList.remove('hide');
                } 
                slots_information.addEventListener('slotchange', evt => {
                    information.classList.remove('hide');
                }); 

                // Abrir address
                this.head.addEventListener('click', evt => {
                    if (component.link_active && component._address != '') {
                        window.open(component._address, '_blank');
                    }
                }); 


                this.dom_ready = true;

            }

        }

    }

    // Adiciona o componente à lista de componentes customizados
    customElements.define('fwk-link', FWK_link);

})();
// --- END