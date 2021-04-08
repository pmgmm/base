/**
 * FRAMEWORK - COMPONENTS - DRAGDROPSELECT
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
            --header-height: 30px;
            --header-color: white;
            --body-hover-color: white;
            --component-width: 200px;
        }
        
        /* container do componente */
        .container {
            position: relative;
            display: flex;
            box-sizing: border-box;
            width: min-content;
            border-width: 1px 1px 1px 2px;
            border-style: solid;
            border-color: var(--border-color);
            background-color: var(--component-background-color);
            cursor: default; 
        }
        .container.hide {
            display: none;
        }
        .container .available {
            border-right: 1px solid var(--border-color);
        }
        .container.disable {
            --border-color: var(--disable-color);
            --header-background-color: var(--disable-color);
            cursor: not-allowed; 
        }  
        .container.gray {
            --border-color: var(--gray-light);
            --border-hover-color: var(--gray-dark);
            --header-background-color: var(--gray-medium);
            --filter-color: var(--blue-medium);
            --body-color: var(--gray-medium);
            --body-background-hover-color: var(--gray-light);
            --placeholder-color: var(--gray-placeholder);
            --disable-color: var(--gray-disable);
        }
        .container.blue {
            --border-color: var(--blue-light);
            --border-hover-color: var(--blue-dark);
            --header-background-color: var(--blue-medium);
            --filter-color: var(--gray-medium);
            --body-color: var(--blue-medium);
            --body-background-hover-color: var(--blue-light);
            --placeholder-color: var(--blue-placeholder);
            --disable-color: var(--blue-disable);
        }
        .container:not(.disable):hover, .container:not(.disable).focus {
            --border-color: var(--border-hover-color);
        }  
        .container:not(.disable).mandatory {
            border-left-color: var(--mandatory-color);
        }
    
        /* titulos */
        .container .header {
            display: flex;
            padding: 1px 0px 0px; 
            align-items: center;
            justify-content: center;
            height: var(--header-height);
            width: var(--component-width);
            border-bottom: 1px solid var(--border-color);
            color: var(--header-color);
            background-color: var(--header-background-color);
        }
        .container .header .title {
            white-space: nowrap;
            padding: 0px 4px;
        }

        /* áreas de selecção */   
        .container .available .body, .container .selected .body  {
            box-sizing: border-box;
            width: var(--component-width);
            margin-top: 2px;
        }

        /* áreas de filtro */  
        .container .filter {
            display: flex;
            border: none;
            border-bottom: 1px solid var(--filter-color);
            padding: 2px 3px 1px 4px;
            margin-bottom: 3px;
        }
        .container .filter.hide {
            display: none;
        }
        .container .filter input {
            line-height: var(--line-height);
            width: calc(100% - 30px);
            border: none;
            outline: none;
            color: var(--filter-color);
        }
        /* icone de filtro */
        .container .filter svg {
            margin-left: auto;
            align-self: center;
            width: var(--filter-icon-size);
            fill: var(--filter-color);
            padding: 0px 4px;
            cursor: default;
        }  

        /* áreas de opções */
        .container .body .list { 
            color: var(--body-color);
            overflow-y: auto;
            overflow-x: hide;
        } 
        .container.disable .body .list { 
            color: var(--disable-color);
        } 
        .container .body .options { 
            display: flex;
            flex-direction: column;
        } 
        .container .body .option {
            display: flex;
            align-items: center;
            line-height: var(--line-height);
            padding: 0px 6px 0px 7px;
            transition: background-color .3s;
        }
        .container .body .option.hide {
            display: none;
        }
        .container:not(.disable) .body .option:hover {
            white-space: nowrap;
            background-color: var(--body-background-hover-color);
            color: var(--body-hover-color);
        }

        /* texto de opção */
        .container .body .option .text {
            overflow: hidden;
            text-overflow: ellipsis; 
            text-align: left;
            white-space: nowrap;
            margin-right: auto;
        }
        .container .selected .text {
            padding-top: 1px;
        }

        /* área de detalhe de opções seleccionadas */
        .container .body .option .details {
            display: flex;
            align-items: center;
        }
        /* detalhes de opções seleccionadas */
        .container .selected .details > *  {
            padding-left: 10px;
        }

    </style>

    <!--- html do componente -->
    <div id="fwk_dragdropselect" class="container gray">
        <div class="available">
            <div class="header">         
                <div class="title"></div>
            </div> 
            <div class="body">
                <div class="filter hide">
                    <input type="text"></input>
                    <svg viewBox="0 0 64 64">
                        <path d="M64 55.275L43.5 34.775C45.425 31.375 46.55 27.4625 46.55 23.275C46.55 10.425 36.125 0 23.275 0C10.425 0 0 10.425 0 23.275C0 36.125 10.425 46.55 23.275 46.55C27.4625 46.55 31.3875 45.4375 34.775 43.5L55.275 64L64 55.275ZM7.275 23.275C7.275 14.4375 14.4375 7.275 23.275 7.275C32.1125 7.275 39.275 14.4375 39.275 23.275C39.275 32.1125 32.1125 39.275 23.275 39.275C14.4375 39.275 7.275 32.1125 7.275 23.275Z"/>
                    </svg>
                </div>
                <div class="list">
                    <div class="options left"></div>
                </div>
            </div>
        </div>
        <div class="selected">
            <div class="header">
                <div class="title"></div>
            </div> 
            <div class="body">
                <div class="filter hide">
                    <input type="text"></input>
                    <svg viewBox="0 0 64 64">
                        <path d="M64 55.275L43.5 34.775C45.425 31.375 46.55 27.4625 46.55 23.275C46.55 10.425 36.125 0 23.275 0C10.425 0 0 10.425 0 23.275C0 36.125 10.425 46.55 23.275 46.55C27.4625 46.55 31.3875 45.4375 34.775 43.5L55.275 64L64 55.275ZM7.275 23.275C7.275 14.4375 14.4375 7.275 23.275 7.275C32.1125 7.275 39.275 14.4375 39.275 23.275C39.275 32.1125 32.1125 39.275 23.275 39.275C14.4375 39.275 7.275 32.1125 7.275 23.275Z"/>
                    </svg>
                </div>
                <div class="list">
                    <div class="options right"></div>
                </div>
            </div>
        </div>
        <slot name="details"></slot>
        <slot name="template_details"></slot>
        <slot name="options"></slot>
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
    class FWK_dragdropselect extends HTMLElement {

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
            this.available = this.container.querySelector('.available');
            this.header_available = this.available.querySelector('.header');
            this.title_available = this.available.querySelector('.title');
            this.body_available = this.available.querySelector('.body');
            this.filter_available = this.body_available.querySelector('.filter');
            this.list_available = this.body_available.querySelector('.list');
            this.options_available = this.body_available.querySelector('.options');
            this.selected = this.container.querySelector('.selected');
            this.header_selected = this.selected.querySelector('.header');
            this.title_selected = this.selected.querySelector('.title');
            this.body_selected = this.selected.querySelector('.body');;
            this.filter_selected = this.body_selected.querySelector('.filter');
            this.list_selected = this.body_selected.querySelector('.list');
            this.options_selected = this.body_selected.querySelector('.options');
            this.tooltips = this.container.querySelector('.tooltips');
            this.information = this.tooltips.querySelector('.information')
            this._error = this.tooltips.querySelector('.error');
            this.error_text = this._error.querySelector('.tooltip');

            // Detalhes para opções
            this.template_details = [];
            this.options_details = {};

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
            }     
            else if (value === false) {
                this.container.classList.remove('disable');
            }

            this.setAttribute('disable', value);

            let details = this.container.querySelectorAll('.detail');
            details.forEach(detail => {
                detail.disable = value;
            });

            let options = this.container.querySelectorAll('.option');
            options.forEach(option => {
                option.draggable = !value;
            });

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
                this.container.classList.add('mandatory');
            }     
            else if (value === false) {
                this.container.classList.remove('mandatory');
            }

            this.setAttribute('mandatory', value);

        }

        /**
         * Devolve estado de obrigatoriedade
         * 
         * @return bool value = ? Obrigatório
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        get mandatory() {
            return this.container.classList.contains('mandatory');
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


        // ------------------------------------------------------ VALOR, DESCRIÇÃO, DADOS E DETALHES

        /**
         * Devolve valores das opções da selecção actual
         * 
         * @return array = Valores das opções
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        get value() {
            return JSON.parse(this.getAttribute('value'));
        }

        /**
         * Adiciona / Remove opções da selecção actual 
         *
         * @param array value = Valores da opções: ["1","2"] - adiciona; [] - remove todas
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
         * Devolve descrições da selecção actual
         * 
         * @return array = Descrições das opções
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        get selection() {

            let selection = [];
            this.value.forEach(option => {
                let element = this.container.querySelector('#' + this.id + ('_' + option).replace(/[^A-Za-z0-9_-]/g,'_'));
                selection.push(element.querySelector('.text').innerText);
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
                let element = this.container.querySelector('#' + this.id + ('_' + option).replace(/[^A-Za-z0-9_-]/g,'_'));
                data[option] = JSON.parse(element.getAttribute('data-content'));
            });

            return data;

        }

        /**
         * Devolve detalhes da selecção actual
         * 
         * @return object = Detalhes das opções
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        get details() {

            let details = {};
            this.value.forEach(option => {
                
                let option_id_prefix = this.id + ('_' + option).replace(/[^A-Za-z0-9_-]/g,'_');

                let element = this.container.querySelector('#' + option_id_prefix);
                let element_details = element.querySelectorAll('.detail');
                
                details[option] = {};
                
                element_details.forEach(element_detail => {
                    let id = element_detail.id.replace(option_id_prefix + '_', '');
                    details[option][id] = element_detail.value;
                });

            });

            return details;

        }


        // ------------------------------------------------------ ADICIONA e REMOVE OPÇÕES

        /**
         * Adiciona opções à selecção actual
         * 
         * @param array value = Valores das opções a seleccionar (acrescentar)
         * @param array|null details = Valores dos detalhes das opções a seleccionar (acrescentar) 
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        select(value, details=null) {

            if (value.length != 0) {

                // Concatena novas propriedades no object de valores de detalhes
                if (details) {
                    Object.assign(this.options_details, details);
                }

                // Carrega as opções já seleccionadas no componente
                var final_options =  JSON.parse(this.getAttribute('value'));
                if (final_options.length == 0) {
                    var final_options = [];
                }
                
                // Para cada nova opção
                value.forEach(option_candidate => {
                    if (option_candidate != '' && !final_options.map(String).includes(option_candidate.toString())) {

                        // Acumula o valor da opção selecionada 
                        final_options.push(option_candidate);
    
                    }
                    
                });

                // Atribui ao componente o valor da opção selecionada 
                this.setAttribute('value', JSON.stringify(final_options));

                // Move de lista
                this.moveOptions('S', value);

            }

        }

        /**
         * Remove opções da seleção actual   
         * 
         * @param array|null value = Valores das opções a remover da selecção actual (null=todas)
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */    
        unselect(value=null) {

            // Se existe pelo menos uma opção seleccionada
            if (this.getAttribute('value') != '[]') { 

                // Carrega as opções já seleccionadas no componente
                var current_options = JSON.parse(this.getAttribute('value'));
                var remaining_options = [];

                // Elimina as opções
                if (value) {

                    // Para cada uma das opções seleccionadas no componente
                    value.forEach(option => {

                        // Remove opção das opções seleccionadas
                        remaining_options = current_options.filter(item => item.toString() !== option);
    
                    });

                } 

                // Atribui ao componente o valor das opções restantes
                this.setAttribute('value', JSON.stringify(remaining_options));

                // Move de lista
                this.moveOptions('A', value);

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

            // Remove filtros
            this.filter_available.firstElementChild.value = '';
            this.filter_selected.firstElementChild.value = '';

            // Remove as opções existentes
            this.options_available.innerText = '';
            this.options_selected.innerText = '';

            // Carrega as opções
            if (data['options']) { // Disponibilizadas directamente

                this.options_details = data['details'] ? data['details'] : [];
                delete data.details;
                this.load(data);

            } else if (data.reader) { // Disponibilizadas por pedido Ajax
                
                component.reader = data.reader;
                delete data.reader;

                component.reader.ajax.call({
                    fully_qualified_class_name: component.reader.fully_qualified_class_name,
                    action:  component.reader.action, 
                    action_data: {
                        value: data.value,
                        filter: component.reader.filter
                    },
                    success: function(content) {
                        data['options'] = content['options'];
                        component.options_details = content['details'] ? content['details'] : [];
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
                option.classList.add('option');

                // Adapta os dados ao funcionamento do componente
                // Id gerado com valor "limpo" de caracteres especiais
                option.id = this.id + ('_' + content[this.getAttribute('key-value')]).replace(/[^A-Za-z0-9_-]/g,'_');
                option.setAttribute('value', content[this.getAttribute('key-value')]);

                let option_text = document.createElement('div');
                option_text.classList.add('text')
                option_text.textContent = content[this.getAttribute('key-text')];
                option.appendChild(option_text);

                // Na primeira opção, verifica se o data-content tem apenas os dados mínimos de operação 
                if (i==0) {
                    delete content[this.getAttribute('key-value')];
                    delete content[this.getAttribute('key-text')];
                    // Se sim não adiciona o data-content a nenhuma das opções 
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

                // Permitir drag (depende de disable)
                option.draggable = !this.disable;

                // Evento drag
                option.addEventListener('dragstart', evt => {
                    evt.dataTransfer.effectAllowed = "move";
                    evt.dataTransfer.setData("text/plain", evt.target.id);
                });

                // Área de detalhes
                let option_details = document.createElement('div');
                option_details.classList.add('details');
                option.appendChild(option_details);

                this.options_available.appendChild(option);
            
            }

            // Controlo de opções selecionadas
            this.select(data['value']);

        }


        // ------------------------------------------------------ FILTRA, ORDENA E MOVE OPÇÕES

        /**
         * Filtra opções
         * 
         * @param char type = Tipo de opções: ('A' = Available; 'S' = Selected)
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */  
        filterOptions(type) {

            switch(type) {
                case 'A':
                    // Selecciona o filtro
                    var filter = this.filter_available.firstElementChild.value.toLowerCase();
                    // Carrega opções
                    var options = this.options_available.querySelectorAll('.option');
                    break;
                case 'S':
                    // Selecciona o filtro
                    var filter = this.filter_selected.firstElementChild.value.toLowerCase();
                    // Carrega opções
                    var options = this.options_selected.querySelectorAll('.option');
                    break;

            }
  
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
                    var options = this.options_available.querySelectorAll('.option');
                    break;
                case 'S':;
                    // Carrega opções
                    var options = this.options_selected.querySelectorAll('.option');
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
                option.style.order = order;
                order++;
            });

        }

        /**
         * Move opções
         * 
         * @param char destiny = Destino das opções: ('A' = Available; 'S' = Selected)
         * @param array|null value = Valor das opções 
         * @param array|null details = Valores dos detalhes das opções 
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */  
        moveOptions(destiny, value=null) {

            switch(destiny) {
                case 'A':
                    // Para Disponíveis
                    if (!value) {
                        // Todas as opções seleccionadas
                        value = this.options_selected.querySelectorAll('.option');
                        if (value) {
                            value.forEach(option => {
                                option.childNodes[1].innerText = '';
                                this.options_available.appendChild(option);
                            });
                        }
                    } else {
                        // Apenas as opções indicadas
                        value.forEach(option => {
                            option = this.options_selected.querySelector('#' + this.id + ('_' + option).replace(/[^A-Za-z0-9_-]/g,'_'));
                            if (option) { // Se a opção existe
                                option.childNodes[1].innerText = '';
                                this.options_available.appendChild(option);
                            }
                        });
                    }
                    break;
                case 'S':
                    // Para Seleccionadas
                    value.forEach(option => {
                        var option_id = option;
                        option = this.container.querySelector('#' + this.id + ('_' + option).replace(/[^A-Za-z0-9_-]/g,'_'));
                        if (option) { // Se a opção existe
                            // Se há detalhes da selecção, isola-os numa variável para ser utilizada no ciclo
                            if (this.options_details) {
                                var option_details = this.options_details[option_id];
                            }
                            this.options_selected.appendChild(option);
                            // Adiciona os componentes de detalhe (se a opção os utiliza) e os valores dos detalhes (se existirem)
                            if (this.template_details && option_details) {
                                option.childNodes[1].innerText = '';
                                var index = 0;
                                for (var detail of this.template_details) {
                                    var new_detail = detail.cloneNode(true);
                                    new_detail.classList.add('detail');
                                    new_detail.id = option.id + '_' + detail.id;
                                    new_detail.name = option.id + '_' + detail.id;
                                    // Se há detalhes da selecção
                                    if (option_details && Array.isArray(option_details)) {
                                        new_detail.setAttribute('value',option_details[index]);
                                    }
                                    option.childNodes[1].appendChild(new_detail);
                                    new_detail.disable = this.disable;
                                    index++;
                                }
                            }           
                        }             
                    });
                    break;

            }

            // Orderna a lista de opções destino
            this.sortOptions(destiny);

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
                
                // Disponibiliza áreas de trabalho
                let component = this;
                let container = this.container;
                let header_available = this.header_available;
                let title_available = this.title_available;
                let body_available = this.body_available;
                let filter_available = this.filter_available.firstElementChild;
                let list_available = this.list_available;
                let options_available = this.options_available;
                let header_selected = this.header_selected;
                let title_selected = this.title_selected;
                let body_selected = this.body_selected;
                let filter_selected = this.filter_selected.firstElementChild;
                let list_selected = this.list_selected;
                let options_selected = this.options_selected;
                let tooltips = this.tooltips;
                let information = this.information;

                // Gera random ID se não atribuído
                if (!component.hasAttribute('id')) {component.setAttribute('id',fwkGenerateRandomID('dragdropselect'));}

                // Inicializar propriedades (se não existirem)
                if (!component.hasAttribute('value')) {component.setAttribute('value','[]');}
    
                // Tamanho coluna "available" (width) = default se não estiver definido no html do componente
                if (component.hasAttribute('width-available') && !isNaN(parseInt(component.getAttribute('width-available')))) {
                    header_available.style.width = body_available.style.width = component.getAttribute('width-available') + 'px';
                    component.removeAttribute('width-available');
                } 

                // Tamanho coluna "available" (width) = default se não estiver definido no html do componente
                if (component.hasAttribute('width-selected') && !isNaN(parseInt(component.getAttribute('width-selected')))) {
                    header_selected.style.width = body_selected.style.width = component.getAttribute('width-selected') + 'px';
                    component.removeAttribute('width-selected');
                } 

                // Título coluna "selected"
                if (component.hasAttribute('title-available') && component.getAttribute('title-available') != '') {
                    title_available.innerText = component.getAttribute('title-available');
                    component.removeAttribute('title-available');
                } 

                // Título coluna "selected"
                if (component.hasAttribute('title-selected') && component.getAttribute('title-selected') != '') {
                    title_selected.innerText = component.getAttribute('title-selected');
                    component.removeAttribute('title-selected');
                } 
                
                // Opções visíveis na área de selecção
                if (component.hasAttribute('rows') && !isNaN(parseInt(component.getAttribute('rows')))) {
                    list_available.style.height = list_selected.style.height = (parseInt(component.getAttribute('rows')) * component.line_heigth) + 'px';
                    options_available.style.minHeight = options_selected.style.minHeight = (parseInt(component.getAttribute('rows')) * component.line_heigth) + 'px';
                    component.removeAttribute('rows');
                }
            
                // Preenchimento obrigatório
                if (component.hasAttribute('mandatory') && component.getAttribute('mandatory') == 'true') {
                    container.classList.add('mandatory');
                    component.removeAttribute('mandatory');
                }

                // Filtro
                if (component.hasAttribute('filter') && component.getAttribute('filter') == 'true') {
                    this.filter_available.classList.remove('hide');
                    this.filter_selected.classList.remove('hide');
                    component.removeAttribute('filter');
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

                // Posição Tooltip
                if (component.hasAttribute('tooltip-position') && ['left'].includes(component.getAttribute('tooltip-position'))) {
                    tooltips.classList.remove('right'); 
                    tooltips.classList.add(component.getAttribute('tooltip-position'));
                    component.removeAttribute('tooltip-position');
                }

                // Cor
                if (component.hasAttribute('color') && ['blue'].includes(component.getAttribute('color'))) {
                    container.classList.remove('gray');
                    container.classList.add(component.getAttribute('color'));
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


                // Template de detalhe para opções (componentes)
                var slots_template_details = component.shadowRoot.querySelector('slot[name="template_details"]');
                this.slots_template_details_processed = false;
                slots_template_details.addEventListener('slotchange', evt => {
                    
                    if (!component.slots_template_details_processed) {

                        slots_template_details = slots_template_details.assignedElements();

                        // Guarda detalhes para atribuír às opções 
                        component.template_details = slots_template_details[0].children;

                        component.slots_template_details_processed = true;

                        // Elimina slot
                        slots_template_details[0].remove();

                        // Remove a tag slot
                        let slottag = container.querySelector('slot[name="template_details"]');
                        slottag.remove(); 

                    }

                });


                // Valores de detalhe de opções carregados por slot / html
                var slots_details = component.shadowRoot.querySelector('slot[name="details"]');
                this.slots_details_processed = false;
                slots_details.addEventListener('slotchange', evt => {
                    
                    if (!component.slots_details_processed) {

                        slots_details = slots_details.assignedElements();

                        // Guarda detalhes para atribuír às opções 
                        component.options_details = JSON.parse(slots_details[0].innerText) ? JSON.parse(slots_details[0].innerText) : {};

                        component.slots_details_processed = true;

                        // Elimina slot
                        slots_template_details[0].remove();

                        // Remove a tag slot
                        let slottag = container.querySelector('slot[name="details"]');
                        slottag.remove(); 

                    }

                });


                // Opções carregadas por slot / html
                var slots_options = component.shadowRoot.querySelector('slot[name="options"]');
                this.slots_options_processed = false;
                slots_options.addEventListener('slotchange', evt => {
                    
                    if (!component.slots_options_processed) {

                        slots_options = slots_options.assignedElements();

                        // Prepara as opções
                        var data = [];
                        data['value'] = JSON.parse(component.getAttribute('value')) ? JSON.parse(component.getAttribute('value')) : [];
                        try {
                            data['options'] = JSON.parse(slots_options[0].innerText);
                        } catch (e) {
                            data['options'] = {};
                        }

                        // Carrega as opções
                        component.load(data);
                        
                        // Move opções seleccionadas
                        component.moveOptions('S', data['value']);

                        component.slots_options_processed = true;

                        // Elimina slot
                        slots_options[0].remove();

                        // Remove a tag slot
                        let slottag = container.querySelector('slot[name="options"]');
                        slottag.remove(); 
        
                    }

                });


                // Evento dragover
                options_available.addEventListener('dragover', evt => {
                    evt.preventDefault();
                    evt.dataTransfer.effectAllowed = "move";
                });
                options_selected.addEventListener('dragover', evt => {
                    evt.preventDefault();
                    evt.dataTransfer.effectAllowed = "move";
                });

                // Evento drop
                options_available.addEventListener('drop', evt => {
                    let option = container.querySelector('#' + evt.dataTransfer.getData("text/plain"))
                    
                    // Remove a opção da selecção
                    component.unselect([option.getAttribute('value')]);

                });
                options_selected.addEventListener('drop', evt => {
                    let option = container.querySelector('#' + evt.dataTransfer.getData("text/plain"))
                    
                    // Adiciona a opção à selecção
                    component.select([option.getAttribute('value')]);

                });


                /**
                 * Processa filtro de opções disponíveis
                 * 
                 * @return void
                 *
                 * @pmonteiro (yyyy-mm-dd)
                 */    
                filter_available.addEventListener('keyup', evt => {

                    component.filterOptions('A');

                });


                /**
                 * Processa filtro de opções seleccionadas
                 * 
                 * @return void
                 *
                 * @pmonteiro (yyyy-mm-dd)
                 */    
                filter_selected.addEventListener('keyup', evt => {

                    component.filterOptions('S');

                });

                this.dom_ready = true;
            
            }

        }

    }

  // Adiciona o componente à lista de componentes customizados
  customElements.define('fwk-dragdropselect', FWK_dragdropselect);

})();
// --- END
