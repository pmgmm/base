/**
 * FRAMEWORK - COMPONENTS - DROPBUTTON
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
            width: min-content;
        }
        .container.hide {
            display: none;
        }
        .container.gray {
            --head-color: var(--gray-medium);
            --body-color: var(--blue-medium);
            --hover-color: var(--gray-dark);
            --border-color: var(--gray-light);
            --head-icon-color: var(--gray-light);
            --disable-color: var(--gray-disable);
        }
        .container.blue {
            --head-color: var(--blue-medium);
            --body-color: var(--gray-medium);
            --hover-color: var(--blue-dark);
            --border-color: var(--blue-light);
            --head-icon-color: var(--blue-light);
            --disable-color: var(--blue-disable);
        }

        /* área de icone, texto e trigger para área de botão */
        .container .head {
            display: flex;
            align-items: center;
            line-height: var(--line-height);
            cursor: pointer;
            box-sizing: border-box;
            height: var(--component-height);
        }
        .container.border .head {
            background-color: var(--component-background-color);
            padding: 0px 8px;
            border: 1px solid var(--border-color);
        }
        .container.simple .head {
            height: min-content !important;
            padding: 0px !important;
            border: none !important;
        }
        .container:not(.disable) .head:hover, .container:not(.disable).open .head {
            --border-color: var(--hover-color);
            --head-color: var(--hover-color);
            --head-icon-color: var(--hover-color);
        }  
        .container.disable .head {
            cursor: not-allowed;
            --head-color: var(--disable-color);
            --border-color: var(--disable-color);
        }

        /* icon */
        .container .head .icon {
            display: flex;
        }
        .container:not(.simple) .head .icon.margin {
            margin-right: 6px;
        }  
        .container .head .icon.hide {
            display: none;
        }    
        slot[name=icon]::slotted(svg) {
            width: var(--icon-size);
            fill: var(--head-color);
        }
        slot[name=icon]::slotted(i) {
            padding-top: 1px;
            font-size: var(--icon-size);
            color: var(--head-color);
        }

        /* caption */
        .container .head .caption {
            color: var(--head-color);
            white-space: nowrap;
            padding-top: 2px;
        }
        .container .head .caption.hide {
            display: none;
        }   

        /* icone de controlo de área de botão */
        .container .head .body-handle {
            width: var(--head-icon-size);
            margin: 2px 0px 0px 6px;
            fill: var(--head-icon-color);
            transition: transform .1s;
            transform: rotate(0deg);
        } 
        .container.simple .head .body-handle {
            display: none !important;
        }
        .container .head .body-handle.rotate { 
            transform: rotate(-180deg);
        }
        .container.disable .head .body-handle {
            display: none;
        }
    
        /* área de botão */   
        .container .body {
            box-sizing: border-box;
            z-index: 10;
            position: absolute;
            cursor: default;
            color: var(--body-color);
            background-color: var(--component-background-color);
            border: 1px solid var(--hover-color);
            box-shadow: 3px 3px 10px 0px rgba(0,0,0,0.35);
            margin: 2px 0px 10px;
            padding: 10px 10px;
            overflow-y: auto;
        }
        .container.right .body {
            right: 0px;
        }
        .container.left .body {
            left: 0px;
        }
        .container .body.hide {
            display: none;
        }

    </style>

    <!--- html do componente -->
    <div id="fwk_dropbutton" class="container gray">
        <div class="head">
            <div class="icon hide">
                <slot name="icon"></slot>
            </div>
            <div class="caption hide"></div>
            <svg class="body-handle" viewBox="0 0 64 64">
                <path d="M41.6 44L64 21.6L54.4 12L32 34.4L9.6 12L0 21.6L32 52.8625"/>
            </svg>
        </div>
        <div class="body hide">
            <slot name="content"></slot>
        </div>
    </div>`;

    
    /**
     * Classe owner do componente
	 *
	 * @pmonteiro (yyyy-mm-dd)
     */
    class FWK_dropbutton extends HTMLElement {

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
            this.body_handle = this.head.querySelector('.body-handle')
            this.body = this.component.querySelector('.body');

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
                this.close();
            }     
            else if (value === false) {
                this.container.classList.remove('disable');
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
            if (!this.container.classList.contains('simple')) {
                this.caption.innerText = value;
                this.caption.classList.remove('hide');
                this.icon.classList.add('margin');
            }
        }


        // ------------------------------------------------------ ÁREA DE BOTÃO

        /**
         * Fecha a área de botão
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        close() {
            this.body.scrollTop = 0;
            this.body.classList.add('hide');
            this.container.classList.remove('open');
            this.body_handle.classList.remove('rotate');
            fwk_components_control.open = null;
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
                let icon = this.icon;
                let caption = this.caption;
                let body_handle = this.body_handle;
                let body = this.body;

                // Gera random ID se não atribuído
                if (!component.hasAttribute('id')) {component.setAttribute('id',fwkGenerateRandomID('dropbutton'));}

                // Tamanho (height) se estiver definido no html do componente
                if (component.hasAttribute('min-height') && !isNaN(parseInt(component.getAttribute('min-height')))) {
                    body.style.minHeight = component.getAttribute('min-height') + 'px';
                    component.removeAttribute('min-height');
                }
                if (component.hasAttribute('max-height') && !isNaN(parseInt(component.getAttribute('max-height')))) {
                    body.style.maxHeight = component.getAttribute('max-height') + 'px';
                    component.removeAttribute('max-height');
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
                if (component.hasAttribute('value') && component.getAttribute('value') != '') {
                    component.value = component.getAttribute('value');
                    caption.classList.remove('hide')
                    component.removeAttribute('value');
                }

                // Cor
                if (component.hasAttribute('color') && ['blue'].includes(component.getAttribute('color'))) {
                    this.container.classList.remove('gray');
                    this.container.classList.add(component.getAttribute('color'));
                    component.removeAttribute('color');
                }

                // Border (associado ao border está o icone de trigger do body)
                if (component.hasAttribute('border') && component.getAttribute('border') == 'true') {
                    container.classList.add('border')
                    component.removeAttribute('border');
                } 

                // Alinhamento de body
                if (component.hasAttribute('body-align')) {
                    if(component.getAttribute('body-align') == 'left') {
                        container.classList.remove('right');
                        container.classList.add('left');
                    } else if(component.getAttribute('body-align') == 'right') {
                        container.classList.remove('left');
                        container.classList.add('right');
                    }
                    component.removeAttribute('body-align'); 
                } else {
                    container.classList.remove('right');
                    container.classList.add('left');
                }

                // Se existe slot de icone, mostra-o
                let slots = component.shadowRoot.querySelector('slot[name="icon"]');
                if (slots.assignedElements().length > 0) {
                    if (!caption.classList.contains('hide')) {
                        icon.classList.add('margin'); 
                    }
                    icon.classList.remove('hide');
                    // Se existe icone pode activar a versão simples (se tal foi solicitado)
                    if (component.hasAttribute('simple') && component.getAttribute('simple') == 'true') {
                        container.classList.add('simple')
                        caption.classList.add('hide');
                        component.removeAttribute('simple');
                    } 
                } 
                slots.addEventListener('slotchange', evt => {
                    if (!caption.classList.contains('hide')) {
                        icon.classList.add('margin'); 
                    }
                    icon.classList.remove('hide');
                    // Se existe icone pode activar a versão simples (se tal foi solicitado)
                    if (component.hasAttribute('simple') && component.getAttribute('simple') == 'true') {
                        container.classList.add('simple')
                        caption.classList.add('hide');
                        component.removeAttribute('simple');
                        
                    } 
                }); 

                /**
                 * Abre / Fecha a área de selecção
                * 
                * @return void
                *
                * @pmonteiro (yyyy-mm-dd)
                */    
                head.addEventListener('click', evt => {

                    evt.stopPropagation();

                    // Se o componente não está disable   
                    if (!container.classList.contains('disable')) {
                        
                        // Se a área de botão está fechada, abre-a
                        if (body.classList.contains('hide')) {
            
                            // Fecha (eventualmente) algum componente aberto
                            fwkCloseComponent(component);

                            // Abre a área de botão
                            container.classList.add('open');
                            body.classList.remove('hide');
                            // Roda o icone
                            body_handle.classList.add('rotate');

                            // Atribui o componente à variável global que controla os componentes abertos
                            fwk_components_control.open = component;

                        } else {

                            // Remove o id deste componente da variável global que controla os componentes abertos
                            fwk_components_control.open = null;

                            // Fecha a área de selecção
                            component.close();
                        }
                    }

                });


                /**
                 * Controlo de propagação
                 * 
                 * @return void
                 *
                 * @pmonteiro (yyyy-mm-dd)
                 */  
                body.addEventListener('click', evt => {
                    evt.stopPropagation();
                });

                this.dom_ready = true;

            }    

        }

    }

  // Adiciona o componente à lista de componentes customizados
  customElements.define('fwk-dropbutton', FWK_dropbutton);

})();
// --- END