/**
 * FRAMEWORK - COMPONENTS - IMAGE
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
        :host {
            width: inherit;
            height: inherit;
        }

        /* container do componente */
        .container {
            display: block;
            position: relative;
            width: min-content;
            height: min-content;
            cursor: default;
        }
        .container.max {
            width: inherit;
            height: inherit;
        }

        .container.hide {
            display: none;
        }
        .container:not(.disable).function:hover {
            display: block;
            position: relative;
            cursor: pointer;
        }
        .container.gray {
            --border-color: var(--gray-dark);
        }
        .container.blue {
            --border-color: var(--blue-dark);
        }
        .container.white {
            --border-color: white;
        }

        /* área de imagem */
        .container .image {
            display: block;
            box-sizing: border-box;
            border: 0px solid var(--border-color);
        }
        .container.max .image {
            width: inherit;
            height: inherit;
        }
        .container .image.circle {
            border-radius: 50%;
        }
        .container .image.border {
            border-width: 1px;
        }

    </style>

    <!--- html do componente -->
    <div id="fwk_image" class="container gray max">
        <img class="image">
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
    class FWK_image extends HTMLElement {

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
            this.image = this.container.querySelector('.image');
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
                let image = this.image;
                let tooltips = this.tooltips;
                let information = this.information;

                // Função para onclick
                this.function;
                this.function_parameters;
                // Script para onclick
                this.script;

                // Gera random ID se não atribuído
                if (!component.hasAttribute('id')) {component.setAttribute('id',fwkGenerateRandomID('image'));}

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

                // Src
                if (component.hasAttribute('src') && component.getAttribute('src') != '') {
                    image.src = component.getAttribute('src');
                    component.removeAttribute('src');
                }

                // Tamanho (width) se estiver definido no html do componente
                if (component.hasAttribute('width') && !isNaN(parseInt(component.getAttribute('width')))) {
                    image.width = component.getAttribute('width');
                    component.removeAttribute('width');
                    // Deixa de ajustar tamanho às medidas do "pai"
                    container.classList.remove('max');
                }

                // Tamanho (height)
                if (component.hasAttribute('height') && !isNaN(parseInt(component.getAttribute('height')))) {
                    image.height = component.getAttribute('height');
                    component.removeAttribute('height');
                    // Deixa de ajustar tamanho às medidas do "pai"
                    container.classList.remove('max');
                }

                // Cor
                if (component.hasAttribute('color') && ['blue', 'white'].includes(component.getAttribute('color'))) {
                    this.container.classList.remove('gray');
                    this.container.classList.add(component.getAttribute('color'));
                    component.removeAttribute('color');
                }

                // Tamanho (border)
                if (component.hasAttribute('border') && !isNaN(parseInt(component.getAttribute('border')))) {
                    image.style.borderWidth = component.getAttribute('border') + 'px';
                    component.removeAttribute('border');
                }

                // Formato
                if (component.hasAttribute('circle') && component.getAttribute('circle') == 'true') {
                    image.classList.add('circle');
                    component.removeAttribute('circle');
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
                if (component.hasAttribute('function') && component.getAttribute('function') != '') {
                    this.function_parameters = [];
                    try {
                        let func = JSON.parse(component.getAttribute('function'));
                        this.function = Object.keys(func)[0];
                        this.function_parameters = func[this.function].concat(this.function_parameters);
                    } catch (e) {
                        this.function = component.getAttribute('function');
                    }
                    this.image.addEventListener('click', evt => {
                        if (component.function_active && !container.classList.contains('processing')) {
                            let function_parts = component.function.split('.');
                            if (function_parts[1]) { // Método de classe
                                window[function_parts[0]][function_parts[1]](...component.function_parameters);
                            } else { // Função de script
                                window[component.function](...component.function_parameters);
                            }
                        }
                    });
                    container.classList.add('function');
                    component.removeAttribute('function');
                }

                // Onclick script
                if ((component.hasAttribute('script') && component.getAttribute('script') != '' )) {
                    this.script = component.getAttribute('script');
                    this.head.addEventListener('click', evt => {
                        eval(this.script);
                    });
                    container.classList.add('function');
                    component.removeAttribute('script');
                }

                this.dom_ready = true;
                
            }

        }

    }

  // Adiciona o componente à lista de componentes customizados
  customElements.define('fwk-image', FWK_image);

})();
// --- END