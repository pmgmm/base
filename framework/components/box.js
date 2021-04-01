/**
 * FRAMEWORK - COMPONENTS - BOX
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
            border: 2px solid var(--border-color);
            padding: 10px 10px 20px;
            width: min-content;
            height: min-content;
        }
        .container.hide {
            display:none;
        }
        .container.gray {
            --border-color: var(--gray-light);
            --border-color-hover: var(--blue-dark);
        }
        .container.blue {
            --border-color: var(--blue-light);
            --border-color-hover: var(--blue-dark);
        }
        .container:hover {
            --border-color: var(--border-color-hover);
        }  

    </style>

    <!--- html do componente -->
    <div id="fwk_box" class="container gray">
        <slot name="content"></slot>
    </div>`;

    
    /**
     * Classe owner do componente
	 *
	 * @pmonteiro (yyyy-mm-dd)
     */
    class FWK_box extends HTMLElement {

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
                if(document.getElementById(this.id+'_label')){
                    document.getElementById(this.id+'_label').hide = true;
                } 
                this.container.classList.add('hide');
            } else if (value === false) {
                if(document.getElementById(this.id+'_label')){
                    document.getElementById(this.id+'_label').hide = false;
                } 
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

                // Gera random ID se não atribuído
                if (!component.hasAttribute('id')) {component.setAttribute('id',fwkGenerateRandomID('box'));}

                // Estado visível / invisível
                if (component.hasAttribute('hide') && component.getAttribute('hide') == 'true') {
                    component.hide = true;
                    component.removeAttribute('hide');
                }

                // Padding
                if (component.hasAttribute('padding') && component.getAttribute('padding') != '') {
                    container.style.padding = component.getAttribute('padding');
                    component.removeAttribute('padding');
                }

                // Cor
                if (component.hasAttribute('color') && ['blue'].includes(component.getAttribute('color'))) {
                    container.classList.remove('gray');
                    container.classList.add(component.getAttribute('color'));
                    component.removeAttribute('color');
                }

                this.dom_ready = true;
            }

        }

    }

  // Adiciona o componente à lista de componentes customizados
  customElements.define('fwk-box', FWK_box);

})();
// --- END