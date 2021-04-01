/**
 * FRAMEWORK - COMPONENTS - LABEL
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
        .container {}

        /* container do componente */
        .container {
            display: block;
            position: relative;
            width: min-content;
            margin-right: 4px;
        }
        .container.hide {
            display: none;
        }
        .container.gray {
            --color: var(--gray-dark);
        }
        .container.blue {
            --color: var(--blue-dark);
        }
        .container.green {
            --color: var(--green-dark);
        }
        .container.red {
            --color: var(--red-dark);
        }

        /* área de label */
        .container .head {
            display: flex;
            height: var(--component-height); 
            align-items: center;
        }

        .container .head .label {
            color: var(--color);
            padding-top: 1px;
            white-space: nowrap;  
        }

    </style>

    <!--- html do componente -->
    <div id="fwk_label" class="container gray">
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
    class FWK_label extends HTMLElement {

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

                // Disponibiliza áreas de trabalho
                let component = this;
                let container = this.container;
                let label = this.label;
                let tooltips = this.tooltips;
                let information = this.information;

                // Gera random ID se não atribuído
                if (!component.hasAttribute('id')) {component.setAttribute('id',fwkGenerateRandomID('label'));}

                // Estado visível / invisível
                if (component.hasAttribute('hide') && component.getAttribute('hide') == 'true') {
                    component.hide = true;
                    component.removeAttribute('hide');
                }

                // Valor
                if (component.hasAttribute('value') && component.hasAttribute('value') != '') {
                    label.textContent = component.getAttribute('value');
                    component.removeAttribute('value');
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

                this.dom_ready = true;

            }
        }

    }

    // Adiciona o componente à lista de componentes customizados
    customElements.define('fwk-label', FWK_label);

})();
// --- END