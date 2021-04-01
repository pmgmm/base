/**
 * FRAMEWORK - COMPONENTS - MULTISELECT
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
        .container {
            --head-option-icon-size: 9px;
            --body-hover-color: white;
            --component-width: 200px;
        }
        
        /* container do componente */
        .container {
            display: block;
            position: relative;
            width: var(--component-width);
        }
        .container.hide {
            display: none;
        }
        .container.gray {
            --border-color: var(--gray-dark);
            --head-hover-color: var(--gray-dark);
            --head-border-color: var(--gray-light);
            --head-color: var(--gray-medium);
            --head-icon-color: var(--gray-light);
            --filter-color: var(--blue-medium);
            --body-color: var(--gray-medium);
            --body-background-hover-color: var(--gray-light);
            --placeholder-color: var(--gray-placeholder);
            --disable-color: var(--gray-disable);
        }
        .container.blue {
            --border-color: var(--blue-dark);
            --head-hover-color: var(--blue-dark);
            --head-border-color: var(--blue-light);
            --head-color: var(--blue-medium);
            --head-icon-color: var(--blue-light);
            --filter-color: var(--gray-medium);
            --body-color: var(--blue-medium);
            --body-background-hover-color: var(--blue-light);
            --placeholder-color: var(--blue-placeholder);
            --disable-color: var(--blue-disable);
        }

        /* área de visualização de seleção actual, cancelamento de selecção e trigger para área de seleção */
        .container .head {
            display: flex;
            box-sizing: border-box;
            border-width: 1px 1px 1px 2px;
            border-style: solid;
            color: var(--head-color);
            border-color: var(--head-border-color);
            background-color: var(--component-background-color);
            padding: 3px 3px 2px; 
            min-height: var(--component-height);
        }
        .container:not(.disable) .head:hover, .container:not(.disable).open .head, .container:not(.disable).focus {
            --head-border-color: var(--head-hover-color);
            --head-icon-color: var(--head-color);
        }  
        .container:not(.disable) .head.mandatory {
            border-left-color: var(--mandatory-color);
        }
        .container.disable .head {
            cursor: not-allowed;
            --head-color: var(--disable-color);
            --head-border-color: var(--disable-color);
        }

        /* seleção actual */
        .container .head .choice {
            display: flex;
            flex-direction: column;
            width: calc(100% - var(--head-icon-size) - 12px);
            padding: 2px 0px 0px 3px;
            }
        .container .head .choice.placeholder {
            line-height: var(--line-height);
            color: var(--placeholder-color);
            font-style: italic;
        }
        .container .head .choice > div {
            display: flex;
            line-height: var(--line-height);
        }
        .container .head .choice .option {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;  
        }
        .container.disable .head .choice .option {
            padding-left: 0px;
        }

        /* icone de cancel */
        .container .head .choice .cancel {
            cursor: pointer;
            align-self: center;
            min-width: var(--head-option-icon-size);
            max-width: var(--head-option-icon-size);
            fill: var(--head-icon-color);
            padding-bottom: 1px;
            margin-right: 4px;
        }  
        .container:not(.disable) .choice .cancel:hover {
            fill: var(--head-hover-color);
        }  
        .container.disable .head .choice .cancel {
            display: none;
        }      

        /* icone de controlo de body */
        .container .head .body-handle {
            align-self: start;
            margin: 5px 0px 0px auto;
            cursor: pointer;
            width: var(--head-icon-size);
            padding: 0px 4px;
            fill: var(--head-icon-color);
            transition: transform .1s;
            transform: rotate(0deg);
        }        
        .container:not(.disable) .head .body-handle:hover {
            fill: var(--head-hover-color);
        }  
        .container .head .body-handle.rotate { 
            transform: rotate(-180deg);
        }     
        .container.disable .head .body-handle {
            display: none;
        }
    
        /* área de selecção */   
        .container .body {
            z-index:10;
            position: absolute;
            box-sizing: border-box;
            margin-top: 2px;
            width: var(--component-width);
            background-color: var(--component-background-color);
            border: 1px solid var(--border-color);
            box-shadow: 3px 3px 10px 0px rgba(0,0,0,0.35);
        }
        .container .body.hide {
            display: none;
        }

        /* área de filtro */  
        .container .body .filter {
            display: flex;
            border: none;
            border-bottom: 1px solid var(--filter-color);
            padding: 5px 3px 1px 5px;
            margin-bottom: 3px;
        }
        .container .body .filter.hide {
            display: none;
        }
        .container .body .filter input {
            line-height: var(--line-height);
            width: calc(100% - 30px);
            border: none;
            outline: none;
            color: var(--filter-color);
        }
        /* icone de filtro */
        .container .body .filter svg {
            margin-left: auto;
            align-self: center;
            width: var(--filter-icon-size);
            fill: var(--filter-color);
            padding: 0px 4px;
        }  

        /* área de opções */
        .container .body .list { 
            display: flex;
            flex-direction: column;
        } 
        .container .body .options { 
            color: var(--body-color);
            overflow-y: auto;
            overflow-x: hide;
        } 

        /* área de injecção de opções via html e/ou javascript */
        .container .body .options div {
            line-height: var(--line-height);
            overflow: hidden;
            text-overflow: ellipsis; 
            text-align: left;
            white-space: nowrap;
            padding: 0px 6px 0px 7px;
            transition: background-color .3s;
        }
        .container .body .options div.selected {
            display: none;
        }
        .container .body .options div:hover {
            cursor: pointer;
            white-space: nowrap;
            background-color: var(--body-background-hover-color);
            color: var(--body-hover-color);
        }
        .container .body .options div.hide {
            display: none;
        }

    </style>

    <!--- html do componente -->
    <div id="fwk_multiselect" class="container gray">
        <div class="head">
            <div class="choice placeholder"></div>
            <svg class="body-handle" viewBox="0 0 64 64">
                <path d="M41.6 44L64 21.6L54.4 12L32 34.4L9.6 12L0 21.6L32 52.8625"/>
            </svg>
        </div>
        <div class="body hide">
            <div class="filter hide">
                <input type="text"></input>
                <svg viewBox="0 0 64 64">
                    <path d="M64 55.275L43.5 34.775C45.425 31.375 46.55 27.4625 46.55 23.275C46.55 10.425 36.125 0 23.275 0C10.425 0 0 10.425 0 23.275C0 36.125 10.425 46.55 23.275 46.55C27.4625 46.55 31.3875 45.4375 34.775 43.5L55.275 64L64 55.275ZM7.275 23.275C7.275 14.4375 14.4375 7.275 23.275 7.275C32.1125 7.275 39.275 14.4375 39.275 23.275C39.275 32.1125 32.1125 39.275 23.275 39.275C14.4375 39.275 7.275 32.1125 7.275 23.275Z"/>
                </svg>
            </div>
            <div class="list">
                <div class="options">
                    <slot name="options"></slot>
                </div>
            </div>
        </div>
        <div class="tooltips right">
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
    class FWK_multiselect extends HTMLElement {

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
            this.choice = this.head.querySelector('.choice');
            this.body_handle = this.head.querySelector('.body-handle')
            this.body = this.container.querySelector('.body');
            this.filter = this.body.querySelector('.filter');
            this.options = this.body.querySelector('.options');
            this.tooltips = this.container.querySelector('.tooltips');
            this.information = this.tooltips.querySelector('.information')
            this._error = this.tooltips.querySelector('.error');
            this.error_text = this._error.querySelector('.tooltip');

            // Defaults
            //Altura da linha
            this.line_heigth = 20;

            // Focus
            this.addEventListener('focus', evt => {
                this.container.classList.add('focus');
            });
            this.addEventListener('focusout', evt => {
                this.container.classList.remove('focus');
            });

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
         * @pmonteiro (yyyy-mm-dd)
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
                    this.error_text.innerHTML = '';
                }     
                else if (value === false) {
                    this._error.classList.add('hide');
                    this._error.classList.remove('empty');
                    this.error_text.innerHTML = '';
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


        // ------------------------------------------------------ VALOR, DESCRICAO E DADOS

        /**
         * Devolve valores das opções da selecção actual
         * 
         * @return array = Valors da opções
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        get value() {
            return JSON.parse(this.getAttribute('value'));
        }

        /**
         * Adiciona / Remove opções da selecção actual 
         *
         * @param array value = Valores da opções: [1,2] - adiciona; [] - remove todas
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        set value(value) {
            if (value.length > 0) {
                this.select(value);
            } else {
                this.unselect();
            }
        }

        /**
         * Devolve descrição da selecção actual
         * 
         * @return array = Descrições das opções
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        get selection() {
            let selection = [];
            this.value.forEach(option => {
                let element = this.options.querySelector('#' + this.id + ('_' + option).replace(/[^A-Za-z0-9_-]/g,'_'));
                selection.push(element.innerText);
            });
            return selection;
        }


        /**
         * Devolve dados da selecção actual
         * 
         * @return object = Dados das opções
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        get data() {
            let data = {};
            this.value.forEach(option => {
                let element = this.options.querySelector('#' + this.id + ('_' + option).replace(/[^A-Za-z0-9_-]/g,'_'));
                data[option] = JSON.parse(element.getAttribute('data-content'));
            });
            return data;
        }


        // ------------------------------------------------------ ADICIONA OPÇÕES / REMOVE OPÇÕES

        /**
         * Adiciona opções à selecção actual
         * 
         * @param array value = Valores das opções a seleccionar (acrescentar)
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        select(value) {

            if (value.length != 0) {

                // Remove placeholder
                this.choice.classList.remove('placeholder');

                // Carrega as opções já seleccionadas no componente
                var final_options =  JSON.parse(this.getAttribute('value'));
                if (final_options.length == 0) {
                    var final_options = [];
                    this.choice.innerText = '';
                }

                // Referência do componente para EventListener de remoção de opção
                var component = this;
                
                // Icon
                var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svg.classList.add('cancel');
                svg.setAttribute('viewBox', '0 0 64 64');
                let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('d','M64.125 9.6L54.525 0L32.125 22.4L9.725 0L0.125 9.6L22.525 32L0.125 54.4L9.725 64L32.125 41.6L54.525 64L64.125 54.4L41.725 32L64.125 9.6Z');
                svg.appendChild(path);

                // Para cada nova opção
                value.forEach(option_candidate => {
                    if (option_candidate != '' && !final_options.map(String).includes(option_candidate.toString())) {

                        // Carrega opção seleccionada
                        // Valor "limpo" de caracteres especiais
                        let option = this.options.querySelector('#' + this.id + ('_' + option_candidate).replace(/[^A-Za-z0-9_-]/g,'_'));
                        if (option) { // Se a opção existe
                            // Marca a opção como seleccionada
                            option.classList.add('selected');

                            // Adiciona o texto e icon de remoção da opção seleccionada
                            let option_container = document.createElement("div");

                            let svg_clone = svg.cloneNode(true);

                            // Evento de remoção de opção
                            svg_clone.addEventListener("click", evt => {
                                evt.stopPropagation();
                                component.unselect([option_candidate], true);
                            }) ;

                            let option_caption = document.createElement('div');
                            option_caption.classList.add('option');
                            option_caption.innerText = option.textContent;
                            option_container.appendChild(svg_clone);
                            option_container.appendChild(option_caption);
                            this.choice.appendChild(option_container);

                            // Acumula o valor da opção selecionada 
                            final_options.push(option_candidate);
                        }

                    }
                });

                // Ordena a lista de opções seleccionadas
                this.sortOptions('S');

                // Atribui ao componente o valor e os dados da opção selecionada 
                this.setAttribute('value', JSON.stringify(final_options));

                // Se já não tem opções para selecção, fecha o componente
                // if (this.options.querySelectorAll(':not(.selected)').length == 0) {
                //     this.close();
                // }

            }

        }

        /**
         * Remove opções da seleção actual   
         * 
         * @param array|null value = Valores das opções a remover da selecção actual (null=todas)
         * @param bool|null onchange = ? Executa onchange function
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */    
        unselect(values=null, onchange=false) {

            // Se existe pelo menos uma opção seleccionada
            if (this.getAttribute('value') != '[]') { 

                // Carrega as opções já seleccionadas no componente
                // Memória para onchange
                let previous_options = JSON.parse(this.getAttribute('value'));
                var final_options = [];
                var options_to_remove = previous_options;

                // Remoção parcial
                // Limpa as variáveis e volta a seleccionar as opções remanescentes
                if (!values) {values = JSON.parse(this.getAttribute('value'));}
                if (values) {

                    final_options = previous_options;

                    options_to_remove = values;

                    // Para cada uma das opções seleccionadas no componente
                    options_to_remove.forEach(option => {

                        // Remove opção das opções seleccionadas
                        final_options = final_options.filter(item => item !== option);

                        // Carrega opção
                        // Valor "limpo" de caracteres especiais
                        option = this.body.querySelector('#' + this.id + ('_' + option).replace(/[^A-Za-z0-9_-]/g,'_'));

                        // Desmarca a opção 
                        option.classList.remove('selected');
    
                    });

                } 

                // Remove a informação da seleção da área de visualização e do componente e coloca o placeholder
                if (final_options.length == 0) {
                    this.choice.innerText = this.getAttribute('placeholder') ? this.getAttribute('placeholder') : '';
                    this.choice.classList.add('placeholder');
                }

                // Inicializa valores
                this.setAttribute('value', '[]');

                this.select(final_options);

                // Onchange
                if (onchange) {
                    this.onchange(final_options, previous_options);
                }

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
                if (typeof this.function === 'function') { // No componente (carregamento js)
                    this.function(current_value, previous_value)
                } else { // Externa ao componente (carregamento html)
                    let function_parts = this.function.split('.');
                    if (function_parts[1]) { // Método de classe
                        window[function_parts[0]][function_parts[1]](current_value, previous_value);
                    } else { // Função de script
                        window[this.function](current_value, previous_value);
                    }
                }
            }
        
        }


        // ------------------------------------------------------ CARREGA OPÇÕES

        /**
         * Carrega opções via javascript (consumindo a classe do componente)
         * 
         * @param object data = Dados necessários ao carregamento
          * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */    
        fill(data) {

            // Disponibiliza áreas de trabalho
            let component = this;

            // Remove a seleção atual    
            this.unselect();

            // Remove filtro
            this.filter.firstElementChild.value = '';

            // Remove as opções existentes
            this.options.innerText = '';

            // Se exite, carrega a função responsável pelo evento "onchange"
            if (data['function_onchange']) {
                this.function = data['function_onchange'];
            }

            // Carrega as opções
            if (data['options']) { // Disponibilizadas directamente

                this.load(data);

            } else if (data.reader) { // Disponibilizadas por pedido Ajax
                
                component.reader = data.reader;
                delete data.reader;

                component.reader.ajax.call({
                    fully_qualified_class_name: component.reader.fully_qualified_class_name,
                    action: component.reader.action, 
                    action_data: {
                        filter: component.reader.filter
                    }, 
                    success: function(content) {
                        data['options'] = content;
                        component.load(data);
                    }, 
                    failure: function(message) {
                        // Mostra mensagem
                        FormHelper.getComponent('fwk_messagebox').error = message;
                    }, 
                    exception: function(message) {
                        // Mostra mensagem
                        FormHelper.getComponent('fwk_messagebox').error = message;
                    }
                })
            }

        }

        /**
         * Adiciona opções ao componente
         * 
         * @param array data = Dados necessários ao carregamento
           * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */  
        load(data) {
            
            // Carrega as opções
            var data_content_needed = true;
            // Para cada opção
            for (var i = 0; i < data['options'].length; i++) {

                // Carrega dados
                let content = data['options'][i];
                let option = document.createElement('div');

                // Adapta os dados ao funcionamento do componente
                // Id gerado com valor "limpo" de caracteres especiais
                option.id = this.id + ('_' + content[this.getAttribute('key-value')]).replace(/[^A-Za-z0-9_-]/g,'_');
                option.setAttribute('value', content[this.getAttribute('key-value')]);
                option.textContent = content[this.getAttribute('key-text')];

                // Na primeira opção, verifica se o data-content tem apenas os dados mínimos de operação 
                if (i==0) {
                    delete content[this.getAttribute('key-value')];
                    delete content[this.getAttribute('key-text')];
                    // Se sim não adiciona o data-contente a nenhuma das opções 
                    if (Object.keys(content).length == 0) {
                        data_content_needed = false;
                    }
                } else if (data_content_needed) { // Se tem mais dados, só esses serão adicionados
                    delete content[this.getAttribute('key-value')];
                    delete content[this.getAttribute('key-text')];
                }

                if (data_content_needed) {
                    option.setAttribute('data-content', JSON.stringify(content));
                }

                this.options.appendChild(option);
            
            }

            // Ordena a lista de opções disponíveis
            this.sortOptions('A');

            // Controlo de opção selecionada
            this.setAttribute('value','[]');
            this.select(data['value']);

        }


        // ------------------------------------------------------ FILTRA / ORDENA OPÇÕES

        /**
         * Filtra opções
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */  
        filterOptions() {
            let filter = this.filter.firstElementChild.value.toLowerCase();

            // Carrega opções
            let options = this.options.getElementsByTagName('div');
  
            // Itera todas as opções para "esconder" as não abrangidas pelo filtro 
            for (let i = 0; i < options.length; i++) {
                let option = options[i].textContent.toLowerCase();
                if (option.indexOf(filter) > -1) {
                    options[i].classList.remove('hide')
                } else {
                    options[i].classList.add('hide');
                }
            }
        }

        /**
         * Ordena opções
         * 
         * @param char type = Tipo de opções: ('A' = Available; 'S' = Selected)
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */  
        sortOptions(type) {

            switch(type) {
                case 'A':
                    // Carrega opções
                    var options = this.options.querySelectorAll('div');
                    break;
                case 'S':
                    // Carrega opções
                    var options = this.choice.querySelectorAll('.option');
                    break;
            }
  
            // Ordena o array
            var options = [].slice.call(options).sort(function (a, b) {
                a = a.textContent.normalize("NFD").replace(/[\u0300-\u036f]/g, '');
                b = b.textContent.normalize("NFD").replace(/[\u0300-\u036f]/g, '');
                return a > b ? 1 : -1;
            });

            // Ordena por flex order
            var order = 0;
            options.forEach(function (option) {
                if (type == 'S') {
                    option.parentElement.style.order = order; 
                } else {
                    option.style.order = order;  
                }
                order++;
            });

        }


        // ------------------------------------------------------ ÁREA DE SELECÇÃO

        /**
         * Fecha a área de selecção
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        close() {
            this.options.scrollTop = 0;
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
                
                // Para focus
                this.tabIndex = 0;
        
                // Função para onchange
                this.function;
                
                // Disponibiliza áreas de trabalho
                let component = this;
                let container = this.container;
                let head = this.head;
                let choice = this.choice;
                let body_handle = this.body_handle;
                let body = this.body;
                let options = this.options;
                let tooltips = this.tooltips;
                let information = this.information;
                let filter = this.filter;

                // Gera random ID se não atribuído
                if (!component.hasAttribute('id')) {component.setAttribute('id',fwkGenerateRandomID('multiselect'));}

                // Inicializar propriedades (se não existirem)
                if (!component.hasAttribute('value')) {component.setAttribute('value','[]');}

                // Tamanho (width) = default se não estiver definido no html do componente
                if (component.hasAttribute('width') && !isNaN(parseInt(component.getAttribute('width')))) {
                    container.style.width = body.style.width = component.getAttribute('width') + 'px';
                    component.classList.remove('width');
                } 

                // Opções visíveis na área de selecção (calculo de height)
                if (component.hasAttribute('rows') && !isNaN(parseInt(component.getAttribute('rows')))) {
                    options.style.maxHeight = (parseInt(component.getAttribute('rows')) * component.line_heigth) + 'px';
                    component.classList.remove('rows');
                } 

                // Preenchimento obrigatório
                if (component.hasAttribute('mandatory') && component.getAttribute('mandatory') == 'true') {
                    head.classList.add('mandatory');
                    component.classList.remove('mandatory');
                }

                // Placeholder
                if (component.hasAttribute('placeholder') && component.getAttribute('placeholder') != '') {
                    choice.innerText = component.getAttribute('placeholder');
                    choice.classList.add('placeholder');
                    component.classList.remove('placeholder');
                }

                // Filtro
                if (component.hasAttribute('filter') && component.getAttribute('filter') == 'true') {
                    filter.classList.remove('hide');
                    component.classList.remove('filter');
                } 

                // Estado activo / Inactivo
                if (component.hasAttribute('disable') && component.getAttribute('disable') == 'true') {
                    component.disable = true;
                    component.classList.remove('disable');
                }

                // Estado visível / invisível
                if (component.hasAttribute('hide') && component.getAttribute('hide') == 'true') {
                    component.hide = true;
                    component.removeAttribute('hide');
                }

                // Posição Tooltip
                if (component.hasAttribute('tooltip-position') && ['left'].includes(component.getAttribute('tooltip-position'))) {
                    tooltips.classList.remove('right');  
                    tooltips.classList.add(component.getAttribute('tooltip-position'));
                    component.classList.remove('tooltip-position');
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

                // Onchange function name
                if (component.hasAttribute('function') && component.getAttribute('function') != '') {
                    this.function = component.getAttribute('function');
                    component.removeAttribute('function');
                }


                // Opções carregadas por slot / html
                var slots = component.shadowRoot.querySelector('slot[name="options"]');
                this.slots_processed = false;
                slots.addEventListener('slotchange', evt => {
                    
                    if (!component.slots_processed) {

                        slots = slots.assignedElements();

                        // Prepara as opções
                        var data = [];
                        try {
                            data['value'] = JSON.parse(component.getAttribute('value')) ? JSON.parse(component.getAttribute('value')) : [];
                        } catch (e) {
                            data['value'] = [];
                        }
                        try {
                            data['options'] = JSON.parse(slots[0].innerText);
                        } catch (e) {
                            data['options'] = {};
                        }

                        // Carrega as opções
                        component.load(data);

                        component.slots_processed = true;

                        // Elimina slot
                        slots[0].remove();

                        // Remove a tag slot
                        let slottag = options.querySelector('slot[name="options"]');
                        slottag.remove(); 
        
                    }

                });


                /**
                 * Abre / Fecha a área de seleção
                 * 
                 * @return void
                 *
                 * @pmonteiro (yyyy-mm-dd)
                 */    
                head.addEventListener('click', evt => {

                    evt.stopPropagation();

                    // Se o componente não está disable   
                    if (!container.classList.contains('disable')) {
                        
                        // Se a área de seleção está fechada, abre-a
                        if (body.classList.contains('hide')) {
            
                            // Fecha (eventualmente) algum componente aberto
                            fwkCloseComponent(component);

                            // Abre a área de seleção
                            container.classList.add('open');
                            body.classList.remove('hide');
                            // Roda o icone
                            body_handle.classList.add('rotate');

                            // Atribui o componente à variável global que controla os componentes abertos
                            fwk_components_control.open = component;

                        } else {

                            // Remove o id deste componente da variável global que controla os componentes abertos
                            fwk_components_control.open = null;;

                            // Fecha a área de seleção
                            component.close();
                        }
                    }

                });


                /**
                 * Evita propagação de click em body
                 * 
                 * @return void
                 *
                 * @pmonteiro (yyyy-mm-dd)
                 */    
                body.addEventListener('click', evt => {
                    evt.stopPropagation();
                });


                /**
                 * Processa filtro de opções
                 * 
                 * @return void
                 *
                 * @pmonteiro (yyyy-mm-dd)
                 */    
                filter.firstElementChild.addEventListener('keyup', evt => {

                    component.filterOptions();

                });


                /**
                 * Adiciona um oçpão à selecção
                 * 
                 * @return void
                 *
                 * @pmonteiro (yyyy-mm-dd)
                 */   
                options.addEventListener('click', evt => {
                    
                    let previous_selected_options = JSON.parse(component.getAttribute('value'));

                    // Seleciona a opção
                    component.select([evt.target.getAttribute('value')]);

                    // Onchange
                    if (component.function && !previous_selected_options.map(String).includes(evt.target.getAttribute('value'))) {
                        component.onchange(JSON.parse(component.getAttribute('value')), previous_selected_options);
                    }
        
                });

                this.dom_ready = true;
            }

        }

    }

  // Adiciona o componente à lista de componentes customizados
  customElements.define('fwk-multiselect', FWK_multiselect);

})();
// --- END