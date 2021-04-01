/**
 * FRAMEWORK - COMPONENTS - TEXT
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
        .container {}

        /* container do componente */
        .container {
            display: block;
            position: relative;
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

        /* área de texto */
        .container .head {
            display: flex;
            min-height: var(--component-height); 
            align-items: center;
        }
        .container.top .head {
            align-items: flex-start;
        }
        .container.bottom .head {
            align-items: flex-end;
        }

        .container .head .text {
            color: var(--color);
        }

    </style>

    <!--- html do componente -->
    <div id="fwk_text" class="container gray">
        <div class="head">
            <div class="text">
                <slot name="content"></slot>
            </div>
        </div>
    </div>`;

    
    /**
     * Classe owner do componente
	 *
	 * @pmonteiro (yyyy-mm-dd)
     */
    class FWK_text extends HTMLElement {

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
            this.text = this.head.querySelector('.text');

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
            this.text.innerHTML = value;
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
            
                // Gera random ID se não atribuído
                if (!component.hasAttribute('id')) {component.setAttribute('id',fwkGenerateRandomID('text'));}

                // Estado visível / invisível
                if (component.hasAttribute('hide') && component.getAttribute('hide') == 'true') {
                    component.hide = true;
                    component.removeAttribute('hide');
                }

                // Alinhamento
                if (component.hasAttribute('align')) { 
                    if (component.getAttribute('align') == 'top') {
                        container.classList.add('top');
                    } else if (component.getAttribute('align') == 'bottom') {
                        container.classList.add('bottom');
                    }
                    component.removeAttribute('align');
                }

                // Cor
                if (component.hasAttribute('color') && ['blue', 'green', 'red'].includes(component.getAttribute('color'))) {
                    this.container.classList.remove('gray');
                    this.container.classList.add(component.getAttribute('color'));
                    component.removeAttribute('color');
                }

                this.dom_ready = true;
            }

        }

    }

  // Adiciona o componente à lista de componentes customizados
  customElements.define('fwk-text', FWK_text);

})();
// --- END