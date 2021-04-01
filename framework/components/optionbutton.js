/**
 * FRAMEWORK - COMPONENTS - OPTIONBUTTON
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
        .container {
            --min-width: 60px;
            --selected-color: white;
        }

        /* container do componente */
        .container {
            display: flex;
            position: relative;
            box-sizing: border-box; 
            height: var(--component-height);
            width: min-content;
            color: var(--color);
            cursor: pointer;                  
        }
        .container.hide {
            display: none;
        }
        .container.gray {
            --color: var(--gray-medium);
            --border-color: var(--gray-light);
            --border-hover-color: var(--gray-dark);
            --background-selected-color: var(--gray-medium);
            --background-hover-color: var(--gray-light);
            --disable-color: var(--gray-disable)
        }
        .container.blue {
            --color: var(--blue-medium);
            --border-color: var(--blue-light);
            --border-hover-color: var(--blue-dark);
            --background-selected-color: var(--blue-medium);
            --background-hover-color: var(--blue-light);
            --disable-color: var(--blue-disable)
        }
        .container.disable {
            cursor: not-allowed;
            --color: var(--disable-color);
            --border-color: var(--disable-color);
        }

        /* área de injecção de opções */
        .container .options {
            display: inline-flex;
            background-color: var(--component-background-color);
            border: 1px solid var(--border-color);
        }
        .container:not(.disable) .options:hover {
            --border-color: var(--border-hover-color);
        }

        /* opções */
        .container .options div {
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: var(--line-height);          
            min-width: var(--min-width);
            color: var(--color);
            padding: 2px 7px 0px;
            transition: background-color .3s;
        }
        .container:not(.disable) .options div.selected {
            background-color: var(--background-selected-color);
            color: var(--selected-color);
        }
        .container:not(.disable) .options div:not(.selected):hover {
            background-color: var(--background-hover-color);
            color: var(--selected-color);
        }
        .container.disable .options div.selected {
            background-color: var(--disable-color);
            color: var(--selected-color);
        }

    </style>

    <!--- html do componente -->
    <div id="fwk_optionbutton" class="container gray">
        <div class="options">
            <slot name="options"></slot>
        </div>
        <div class="tooltips right">
            <div class="information hide">
                <slot name="information"></slot>
            </div>
        </div
    </div>`;


    class FWK_optionbutton extends HTMLElement {

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
            this.options = this.container.querySelector('.options');
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
                // Para cada uma das opções
                this.options.querySelectorAll('div:not(.label)').forEach(option => {
                    option.classList.add('disable')
                });
            }     
            else if (value === false) {
                this.container.classList.remove('disable');
                 // Para cada uma das opções
                this.options.querySelectorAll('div:not(.label)').forEach(option => {
                    option.classList.remove('disable')
                });
            }

        }

        /**
         * Devolve estado de inactivo
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        get disable() {
            return this.container.classList.contains('disable');
        }


        // ------------------------------------------------------ VALOR, DESCRICAO E DADOS

        /**
         * Devolve valor da opção seleccionada
         * 
         * @return {*} = Valor da opção
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        get value() {
            return this.getAttribute('value');
        }

        /**
         * Selecciona / Cancela selecção
         *
         * @param string value = Valor da opção
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        set value(value) {
            if (value != '') {
                this.select(value);
            } else {
                this.unselect();
            }
        }

        /**
         * Devolve descrição da opção seleccionada
         * 
         * @return string = Descrição da opção
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        get selection() {
            let option = this.container.querySelector('#' + this.id + ('_' + this.value).replace(/[^A-Za-z0-9_-]/g,'_'));
            return option.innerText;
        }

        /**
         * Devolve dados da opção seleccionada
         * 
         * @return object = Dados da opção
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        get data() {
            let option = this.container.querySelector('#' + this.id + ('_' + this.value).replace(/[^A-Za-z0-9_-]/g,'_'));
            return JSON.parse(option.getAttribute('data-content'));
        }        


        // ------------------------------------------------------ SELECCIONA  / CANCELA SELECÇÃO

        /**
         * Selecciona uma opção
         * 
         * @param string value = Valor da opção
         * @param bool onchange = ? Executa onchange
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        select(value, onchange=false) {

            // Se a opção seleccionada mudou
            if (this.getAttribute('value') != value) {

                // Memória para onchange
                let previous_selected_option = this.getAttribute('value');

                // Carrega opção seleccionada
                var option = this.options.querySelector('#' + this.id + ('_' + value).replace(/[^A-Za-z0-9_-]/g,'_'));
                
                // Se a opção existe
                if (option) {

                    // Remove a selecção actual
                    this.unselect();

                    // Marca a opção como seleccionada
                    option.classList.add('selected');

                    // Atribuí ao componente o valor da opção selecionada 
                    this.setAttribute('value', option.getAttribute('value'));

                    // Onchange
                    if (onchange) {
                        this.onchange(value, previous_selected_option);
                    }

                }

            }

        }

        /**
         * Remove a selecção actual   
         * 
         * @param string onchange = ? Executa onchange function
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */    
        unselect() {

            // Se existe uma opção seleccionada
            if (this.getAttribute('value') != '') { 

                this.options.querySelectorAll('div:not(.label)').forEach(option => {

                    option.classList.remove('selected');

                });

                // Remove a informação da selecção do componente
                this.setAttribute('value', '');

            }

        }

        /**
         * Executa onchange function
         * 
         * @param array current_value = Valores das opções da selecção actual
         * @param array previous_value = Valores das opções da seleção anterior
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        onchange(current_value, previous_value) {

           // Função onchange (se existir)
            if (this.function) {
                let function_parts = this.function.split('.');
                if (function_parts[1]) { // Método de classe
                    window[function_parts[0]][function_parts[1]](current_value, previous_value);
                } else { // Função de script
                    window[this.function](current_value, previous_value);
                }
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
                let options = this.options;
                let tooltips = this.tooltips;
                let information = this.information;

                // Gera random ID se não atribuído
                if (!component.hasAttribute('id')) {component.setAttribute('id',fwkGenerateRandomID('optionbutton'));}

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

                // Se existe slot de informação, mostra-a
                let slots_information = component.shadowRoot.querySelector('slot[name="information"]');
                if (slots_information.assignedElements().length > 0) {
                    information.classList.remove('hide');
                } 
                slots_information.addEventListener('slotchange', evt => {
                    information.classList.remove('hide');
                }); 

                // Posição Tooltip
                if (component.hasAttribute('tooltip-position')  &&  ['left'].includes(component.getAttribute('tooltip-position'))) {
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

                // Onchange function name
                if (component.hasAttribute('function') && component.getAttribute('function') != '') {
                    this.function = component.getAttribute('function');
                    component.removeAttribute('function');
                }


                // Elementos carregados por slot / html
                var slots = component.shadowRoot.querySelector('slot[name="options"]');
                this.slots_processed = false;
                slots.addEventListener('slotchange', evt => {
                    
                    if (!this.slots_processed) {

                        slots = slots.assignedElements();

                        // Carrega dados
                        let content = JSON.parse(slots[0].innerHTML);

                        // Carrega as opções
                        var data_content_needed = true;
                        // Para cada opção
                        for (var i = 0; i < Object.keys(content).length; i++) {

                            // Carrega dados
                            let element = content[i];

                            // Adapta os dados ao funcionamento do componente
                            let option = document.createElement('div');
                            // Id gerado com valor "limpo" de caracteres especiais
                            option.id = component.id + ('_' + element[component.getAttribute('key-value')]).replace(/[^A-Za-z0-9_-]/g,'_');
                            option.setAttribute('value', element[component.getAttribute('key-value')]);
                            option.textContent = element[component.getAttribute('key-text')];

                            // Estado activo / Inactivo (depende de container)
                            if (container.classList.contains('disable')) {
                                option.classList.add('disable');
                            } 

                            // Evento de selecção
                            option.addEventListener("click", evt => {
                                // Apenas se o componente estiver activo
                                if (!option.classList.contains('disable')) {
                                    component.select(option.getAttribute('value'), true);
                                }
                            });

                            // Na primeira opção, verifica se o data-content tem apenas os dados mínimos de operação 
                            if (i==0) {
                                delete element[component.getAttribute('key-value')];
                                delete element[component.getAttribute('key-text')];
                                // Se sim não adiciona o data-contente a nenhuma das opções 
                                if (Object.keys(element).length == 0) {
                                    data_content_needed = false;
                                }
                            } else if (data_content_needed) { // Se tem mais dados, só esses serão adicionados
                                delete element[component.getAttribute('key-value')];
                                delete element[component.getAttribute('key-text')];
                            }

                            if (data_content_needed) {
                                option.setAttribute('data-content', JSON.stringify(element));
                            }

                            options.appendChild(option);

                        }

                        this.slots_processed = true;

                        // Elimina slot
                        slots[0].remove();

                        // Remove a tag slot
                        let slottag = container.querySelector('slot');
                        slottag.remove(); 

                        // Selecção default
                        let default_option = component.getAttribute('value');
                        component.setAttribute('value','');
                        component.select(default_option);

                    }

                });

                this.dom_ready = true;
            }

        }

    }

  // Adiciona o componente à lista de componentes customizados
  window.customElements.define('fwk-optionbutton', FWK_optionbutton);
  
})();
// --- END