/**
 * FRAMEWORK - COMPONENTS - INPUT
 * 
 * Custom Web Component 
 *
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
            --component-min-width: 250px;
            --component-min-height: 58px;
        }

        /* container do componente */
        .container {
            display: block;
            position: relative;
            min-width: var(--component-min-width);
        }
        .container.hide {
            display: none;
        }
        .container.gray {
            --border-color: var(--gray-light);
            --hover-color: var(--gray-dark);
            --color: var(--gray-medium);
            --disable-color: var(--gray-light);
        }
        .container.blue {
            --border-color: var(--blue-light);
            --hover-color: var(--blue-dark);
            --color: var(--blue-medium);
            --disable-color: var(--blue-light);
        }
        
        /* área de introdução de dados */
        .container .head {
            display: flex;
            box-sizing: border-box;
            border-width: 1px 1px 1px 2px;
            border-style: solid;
            border-color: var(--border-color);
            background-color: vvar(--component-background-color);
        }
        .container:not(.disable) .head:hover, .container:not(.disable).focus {
            --border-color: var(--hover-color);
        }  
        .container:not(.disable) .head.mandatory {
            border-left-color: var(--mandatory-color);
        }
        .container.disable .head {
            cursor: not-allowed;
            --color: var(--disable-color);
            --border-color: var(--disable-color);
        }

        /* introdução de dados */
        .container .head .textarea {
            font-family: var(--font-family);
            font-size: var(--font-size);
            line-height: 16px;
            outline: none;
            color: var(--color);
            border: none;
            min-width: calc(var--component-min-width);
            min-height: var(--component-min-height);
            width: calc(100% - 12px);
            padding: 5px 6px;
            align-self: center;
            resize: none;
        }
        .container .head .textarea[disabled] {
            background-color: var(--color-background);
            --color: var(--disable-color);
        }
        .container.disable .head .textarea {
            cursor: not-allowed;
            color: var(--disable-color);
        }

    </style>

    <!--- html do componente -->
    <div id="fwk_textarea" class="container gray">
        <div class="head">
            <textarea class="textarea"></textarea>
        </div>
        <div class="tooltips">
            <div class="information hide">
                <slot name="information"></slot>
            </div>
            <div class="error hide">
                <span class="tooltip error"></span>
            </div>
         </div>   
    </div>`;

    
    /**
     * Classe owner do componente
	 *
	 * @pmonteiro (yyyy-mm-dd)
     */
    class FWK_textarea extends HTMLElement {

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
            this.component = this.attachShadow({ mode: 'open' , delegatesFocus: true});

            // Prepara e adiciona template
            this.component.appendChild(template.content.cloneNode(true));

            // Áreas de operação
            this.container = this.component.querySelector('.container');
            this.head = this.container.querySelector('.head');
            this.textarea = this.head.querySelector('textarea');
            this.tooltips = this.container.querySelector('.tooltips');
            this.information = this.tooltips.querySelector('.information')
            this._error = this.tooltips.querySelector('.error');
            this.error_text = this._error.querySelector('.tooltip');

            // Focus
            this.addEventListener('focus', evt => {
                this.container.classList.add('focus');
            });
            this.addEventListener('focusout', evt => {
                this.container.classList.remove('focus');
            });
    
        }

        focus() {this.textarea.focus();}
        

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
                this.textarea.setAttribute('disabled','disabled');
            }     
            else if (value === false) {
                this.container.classList.remove('disable');
                this.textarea.removeAttribute('disabled');
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


        // ------------------------------------------------------ OBRIGATORIEDADE

        /**
         * Controlo de obrigatoriedade
         * 
         * @param bool value = ? Obrigatório
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        set mandatory(value) {

            if (value === true) {
                this.setAttribute('mandatory', 'true');
                this.head.classList.add('mandatory');
            }     
            else if (value === false) {
                this.setAttribute('mandatory', 'false');
                this.head.classList.remove('mandatory');
            }

        }

        /**
         * Devolve estado de obrigatoriedade
         * 
         * @return bool value = ? Obrigatório
         *
         * @pmonteiro (yyyy-mmm-dd)
         */
        get mandatory() {
            return this.head.classList.contains('mandatory');
        }


        // ------------------------------------------------------ ERRO

        /**
         * Controlo de erro
         * 
         * @param bool|string value = ? Erro (texto de erro = true)
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        set error(value) {

            if (typeof value === 'boolean') {
                if (value === true) {
                    this._error.classList.remove('hide');
                    this._error.classList.add('empty');
                    this.error_text.innerText = '';
                }     
                else if (value === false) {
                    this._error.classList.add('hide');
                    this._error.classList.remove('empty');
                    this.error_text.innerText = '';
                }
            } else if (value != '') {
                this._error.classList.remove('hide');
                this._error.classList.remove('empty');
                this.error_text.innerHTML = value;
            }

        }

        /**
         * Devolve estado de erro
         * 
         * @return bool value = ? Erro
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        get error() {
            return !this._error.classList.contains('hide');
        }


        // ------------------------------------------------------ VALOR

        /**
         * Devolve valor do componente
         * 
         * @return string = Valor
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        get value() {
            return this.textarea.value.trim();
        }

        /**
         * Carrega valor do componente
         *
         * @param string value = Valor
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        set value(value) {
            this.textarea.value = value;
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
                let textarea = this.textarea;
                let tooltips = this.tooltips;
                let information = this.information;

                // Gera random ID se não atribuído
                if (!component.hasAttribute('id')) {component.setAttribute('id',fwkGenerateRandomID('textarea'));}

                // Resize
                if (component.hasAttribute('resize') && ['both', 'vertical', 'horizontal'].includes(component.getAttribute('resize'))) {
                    textarea.style.resize = component.getAttribute('resize');
                    component.removeAttribute('resize');
                }

                // Tamanho (width) = default se não estiver definido no html do componente
                if (component.hasAttribute('min-width') && !isNaN(parseInt(component.getAttribute('min-width')))) {
                    container.style.minWidth = textarea.style.minWidth = component.getAttribute('min-width') + 'px';
                    component.removeAttribute('min-width');
                } 

                // Altura (height) = default se não estiver definido (rows) no html do componente
                if (component.hasAttribute('rows') && !isNaN(parseInt(component.getAttribute('rows')))) {
                    textarea.style.minHeight = (parseInt(component.getAttribute('rows')) * 16) + 'px';
                    component.removeAttribute('rows');
                }

                // Placeholder
                if (component.hasAttribute('placeholder') && component.getAttribute('placeholder') != '') {
                    textarea.setAttribute('placeholder', component.getAttribute('placeholder'));
                    component.removeAttribute('placeholder'); 
                }

                // Preenchimento obrigatório
                if (component.hasAttribute('mandatory') && component.getAttribute('mandatory') == 'true') {
                    head.classList.add('mandatory');
                    component.removeAttribute('mandatory');
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

                // maxlength
                if (component.hasAttribute('maxlength') && component.getAttribute('maxlength') != '') {
                    textarea.setAttribute('maxlength', component.getAttribute('maxlength'));
                    component.removeAttribute('maxlength');
                }

                // Valor
                if (component.hasAttribute('value') && component.getAttribute('value') != '') {
                    component.value = component.getAttribute('value');
                    component.removeAttribute('value');
                }

                // Posição Tooltip
                if (component.hasAttribute('tooltip-position') && ['left'].includes(component.getAttribute('tooltip-position'))) {
                    tooltips.classList.add(component.getAttribute('tooltip-position'));
                    component.removeAttribute('tooltip-position');
                } else {
                    tooltips.classList.add('right');  
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
  customElements.define('fwk-textarea', FWK_textarea);

})();
// --- END