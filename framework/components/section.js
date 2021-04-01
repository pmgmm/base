/**
 * FRAMEWORK - COMPONENTS - SECTION
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
            --icon-svg-size: 16px;
            --icon-font-size: 15px;
            --icon-body-size: 12px;
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
            --hover-color: var(--gray-dark);
            --background-color: var(--gray-smoke);
            --icon-color: var(--gray-light);
        }
        .container.blue {
            --color: var(--blue-medium);
            --hover-color: var(--blue-dark);
            --background-color: var(--blue-smoke);
            --icon-color: var(--blue-light);
        }
        
        /* área de icone, texto e trigger para área de secção */
        .container .head {
            display: flex;
            height: var(--component-height);
        }
        .container .head .button {
            display: flex;
            width: min-content;
            cursor: pointer;
        }
        .container .head.right {
            justify-content: flex-end;
        }
        .container .head .button:hover, .container.open .head {
            --color: var(--hover-color);
            --icon-color: var(--hover-color);
        }  

        /* icon */
        .container .head .button .icon {
            align-self: center;
        }
        .container .head .button .icon.margin {
            margin-right: 6px;
        }  
        .container .head .button .icon.hide {
            display: none;
        }
 
        slot[name=icon]::slotted(svg) {
            width: var(--icon-size);
            fill: var(--color);
        }
        slot[name=icon]::slotted(i) {
            padding-top: 1px;
            font-size: var(--icon-size);
            color: var(--color);
        }

        /* caption */
        .container .head .button .caption {
            color: var(--color);
            white-space: nowrap;
            align-self: center;
            padding-top: 2px;
        }
        .container .button .caption.hide {
            display: none;
        }   

        /* icone de controlo de área de botão */
        .container .head .button .body-handle {
            width: var(--icon-body-size);
            margin: 2px 0px 0px 6px;
            fill: var(--icon-color);
            align-self: center;
            transition: transform .1s;
            transform: rotate(0deg);
        }    
        .container .head .button .body-handle.rotate { 
            transform: rotate(-180deg);
        }
    
        .container div.line {
            width: 100%;
            border-bottom: 2px solid var(--color);
        }
        .container:hover div.line {
            width: 100%;
            border-color: var(--hover-color);
        }

        /* área de seccão */   
        .container .body {
        }
        .container .body.hide {
            display: none; 
        }
        .container .body .content {
            text-align: left;
            box-sizing: border-box;
            min-height: 100px;
            background-color: var(--background-color);
            padding: 10px 0px;
            overflow-y: auto;
        }

    </style>

    <!--- html do componente -->
    <div id="fwk_section" class="container gray">
        <div class="head">
            <div class="button">
                <div class="icon hide">
                    <slot name="icon"></slot>
                </div>
                <div class="caption hide"></div>
                <svg class="body-handle" viewBox="0 0 64 64">
                    <path d="M41.6 44L64 21.6L54.4 12L32 34.4L9.6 12L0 21.6L32 52.8625"/>
                </svg>
            </div>
        </div>
        <div class="line"></div>
        <div class="body hide">
            <div class="content">
                <slot name="content"></slot>
            </div>
            <div class="line"></div>
        </div>
    </div>`;


    /**
     * Classe owner do componente
	 *
	 * @pmonteiro (yyyy-mm-dd)
     */
    class FWK_section extends HTMLElement {

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
            this.button = this.head.querySelector('.button');
            this.icon = this.head.querySelector('.icon');
            this.caption = this.head.querySelector('.caption');
            this.body_handle = this.head.querySelector('.body-handle')
            this.body = this.component.querySelector('.body');
            this.content = this.body.querySelector('.content');

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
            this.caption.innerText = value;
            this.caption.classList.remove('hide');
            this.icon.classList.add('margin');
        }


        // ------------------------------------------------------ ÁREA DE SECÇÃO

        /**
         * Abre / fecha componente
         * 
         * @return void
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        set open(value) {

            if (value === true) {
                this.content.scrollTop = 0;
                this.setAttribute('open', 'true');
                this.body.classList.remove('hide');
                this.container.classList.add('open');
                this.body_handle.classList.add('rotate');
            }     
            else if (value === false) {
                this.content.scrollTop = 0;
                this.setAttribute('open', 'false');
                this.body.classList.add('hide');
                this.container.classList.remove('open');
                this.body_handle.classList.remove('rotate');
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
                let button =this.button;
                let icon = this.icon;
                let caption = this.caption;
                let body = this.body;
                let content = this.content;

                // Gera random ID se não atribuído
                if (!component.hasAttribute('id')) {component.setAttribute('id',fwkGenerateRandomID('section'));}

                // Estado visível / invisível
                if (component.hasAttribute('hide') && component.getAttribute('hide') == 'true') {
                    component.hide = true;
                    component.removeAttribute('hide');
                }

                // Tamanho (height) se estiver definido no html do componente
                if (component.hasAttribute('min-height') && !isNaN(parseInt(component.getAttribute('min-height')))) {
                    content.style.minHeight = component.getAttribute('min-height') + 'px';
                    component.removeAttribute('min-height');
                }
                if (component.hasAttribute('max-height') && !isNaN(parseInt(component.getAttribute('max-height')))) {
                    content.style.maxHeight = component.getAttribute('max-height') + 'px';
                    component.removeAttribute('max-height');
                }
    
                // Estado aberta / fechada
                if (component.hasAttribute('open') && component.getAttribute('open') == 'true') {
                    component.open = true;
                    component.removeAttribute('open');
                }

                // Valor
                if (component.hasAttribute('value') && component.getAttribute('value') != '') {
                    caption.innerText = component.getAttribute('value');
                    caption.classList.remove('hide')
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
                    component.removeAttribute('align');
                }

                // Se existe slot de icone, mostra-o
                let slots = component.shadowRoot.querySelector('slot[name="icon"]');
                if (slots.assignedElements().length > 0) {
                    icon.classList.remove('hide');
                } 
                slots.addEventListener('slotchange', evt => {
                    if (!caption.classList.contains('hide')) {
                        icon.classList.add('margin'); 
                    }
                    icon.classList.remove('hide');
                }); 


                /**
                 * Abre / Fecha a área de secção
                 *
                 * @return void
                 *
                 * @pmonteiro (yyyy-mm-dd)
                 */    
                button.addEventListener('click', evt => {

                    evt.stopPropagation();
                        
                        // Se a área de secção está fechada, abre-a
                        if (body.classList.contains('hide')) {
            
                            component.open = true;

                        } else {

                            // Fecha a área de selecção
                            component.open = false;
                        }

                });


                this.dom_ready = true;
            }

        }

    } 

  // Adiciona o componente à lista de componentes customizados
  customElements.define('fwk-section', FWK_section);

})();
// --- END