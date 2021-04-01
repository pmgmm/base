/**
 * FRAMEWORK - COMPONENTS - TABLE
 * 
 * Custom Web Component 
 * 
 * @pmonteiro (yyyy-mmm-dd)
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
            --header-height: 34px;
            --body-icon-size: 14px; 
            --header-color: white; 
            --header-icon-hover-color: white;
            --header-order-icon-active-color: white;
            --filter-icon-hover-color: white;
        }

        /* container do componente */
        .container {
            display: flex;
            position: relative;
            width: min-content;
            user-select: none;
            overflow-x: auto;
        }
        .container.hide {
            display: none;
        }
        .container.gray {
            --color: var(--gray-medium);
            --table-border-color: var(--gray-medium);
            --body-zebra-background-color: var(--gray-ultralight);
            --header-background-color: var(--gray-medium);
            --header-icon-color: var(--gray-light);
            --tooltip-color: var(--gray-dark);
            --tooltip-background-color: var(--gray-ultralight);
            --filter-border-color: var(--blue-medium);
            --filter-header-background-color: var(--blue-medium);
            --filter-icon-color: var(--blue-light);
            --filter-actions-background-color: var(--blue-ultralight);
            --disable-color: var(--gray-disable);
        }
        .container.blue {
            --color: var(--blue-medium);
            --table-border-color: var(--blue-medium);
            --body-zebra-background-color: var(--blue-ultralight);
            --header-background-color: var(--blue-medium);
            --header-icon-color: var(--blue-light);
            --tooltip-color: var(--blue-dark);
            --tooltip-background-color: var(--blue-ultralight);
            --filter-border-color: var(--gray-medium);
            --filter-header-background-color: var(--gray-medium);
            --filter-icon-color: var(--gray-light);
            --filter-actions-background-color: var(--gray-ultralight):
            --disable-color: var(--blue-disable);
        }
        .container.disable {
            --table-border-color: var(--disable-color);
            --header-background-color: var(--disable-color);
        }

        /* área de operações */
        .container .table .top_actions {
            display: flex;  
            margin-bottom: 2px;
        }
        .container .table .top_actions .right {
            display: flex;
            margin-left: auto;
        }
        .container .table .top_actions .custom {
            display: flex;
            justify-content: flex-end;
            margin-left: auto;
        }
        .container.disable .table .top_actions .custom, .container .table .top_actions .custom.hide {
            display: none;
        }
        .container slot[name=table-top-action]::slotted(*) {
            margin-left: 15px;
        }
        .container .table .top_actions .filter {
            display: flex;
            justify-self: flex-start;
            padding-right: 10px;
        }
        .container .table .top_actions .filter.hide {
            display: none;
        }
        .container .table .top_actions .bulk {
            display: flex;
            justify-self:  flex-end;
            padding-left: 15px;
            margin-left: auto;
        }
        .container.disable .table .top_actions .bulk, .container .table .top_actions .bulk.hide {
            display: none;
        }

        /* área de filtro */
        .container>.filter {
            display: grid;
            grid-template-rows: 30px 35px auto 36px;
            grid-template-columns: min-content;
            margin-right: 10px;
            background-color: var(--component-background-color);
        }
        .container>.filter.hide {
            display: none;
        }
        /* área de operações */
        .container>.filter .top_actions {
            display: flex;  
            margin-bottom: 2px;
        }
        .container>.filter slot[name=filter-top-action]::slotted(*) {
            margin-right: 15px;
        }
        /* área de titulo de filtro */
        .container>.filter .header {
            display: flex;
            align-items: center;
            padding: 0px 10px 0px 7px;
            font-size: var(--font-size);
            background-color: var(--filter-header-background-color);
            border: 1px solid var(--filter-border-color);
            border-bottom: none;
        }
        /* caption */
        .container>.filter .header .caption {
            white-space: nowrap;
            padding-top: 1px;
            color: var(--header-color);
        }
        /* icon close */
        .container>.filter .header .icon {
            cursor: pointer;
            justify-content: flex-end;
            padding-left: 12px;
            margin-left: auto;
            width: var(--head-icon-size);
            fill: var(--filter-icon-color);
        }
        .container>.filter .header .icon:hover {
            fill: var(--filter-icon-hover-color);
        }
        /* área de componentes de filtro */
        .container>.filter .body {
            box-sizing: border-box;
            overflow-y: auto;
            overflow-x: hidden;
            min-height: 139px;
            padding: 10px;
            border: 1px solid var(--filter-border-color);
            border-top: none;
            border-bottom: none;
        }
        slot[name=filter-component]::slotted(*) {
            margin-bottom: 5px;
        }
        /* área de operações sobre filtro */
        .container>.filter .actions {
            display: flex;
            padding: 0px 10px;
            align-items: center;
            justify-content: flex-end;
            background-color: var(--filter-actions-background-color);
            border: 1px solid var(--filter-border-color);
            border-top: none
        }
        .container>.filter .actions:first-child {
            margin-left: auto;
        } 
        slot[name=filter-action]::slotted(*) {
            margin-left: 7px;
        }

        /* área de tabela */
        .container .table {
            display: inline-table;
        }
        /* área de titulos de colunas */
        .container .table .header {
            display: flex;            
            height: var(--header-height);
            font-size: var(--font-size);
            background-color: var(--header-background-color);
            color:  var(--header-color);
            fill: var(--header-icon-color);
            border: 1px solid var(--table-border-color);
            border-bottom: none;
        }
        .container .table .header .column {
            display: flex;
            box-sizing: border-box;
            white-space: nowrap;  
            align-items: center;
        }
        .container .table .header .column.data {
            display: none;
        }
        .container .table .header .column:not(.actions) {
            border-right: 1px solid #d3d3d3;
        }
        .container.disable .table .header .column.actions {
            display: none;
        }
        .container .table .header .column.action_bulk {
            width: 28px;
            justify-content: center;
        }
        .container.disable .table .header .column.action_bulk {
            display: none;
        }
        .container .table .header .column .title {
            margin: 1px auto 0px;
        }
        .container .table .header .column .order {
            display: grid;
            padding: 0px 4px;
        }
        .container .table .header .column .order .asc, .container .table .header .column .order .desc {
            height: var(--head-icon-size);
        }
        .container .table .header .column .order .asc:hover, .container .table .header .column .order .desc:hover {
            fill: var(--header-icon-hover-color);
            cursor: pointer;
        }
        .container .table .header .column .order .asc.active, .container .table .header .column .order .desc.active {
            fill: var(--header-order-icon-active-color);
        }
        .container .table .header .column:not(.actions) div:nth-child(1) {
            padding: 0px 4px;
        }
        /* área de linhas */
        .container .table .body  {
            overflow-y: auto;
            box-sizing: border-box;
            color: var(--color);
            background-color: var(--component-background-color);
            border: 1px solid var(--table-border-color);
            min-width: 250px;
            min-height: 175px;
            border-top: none;
        }
        .container .table .body div.norecords {
            padding: 10px;
        }
        .container .table .body .row {
            display: flex;
            height: min-content;
        }
        .container .table .body .row:nth-child(even) {
            background-color: var(--body-zebra-background-color);
        }
        .container .table .body .row .column {
            position: relative;
            display: flex;
            box-sizing: border-box;
        }
        .container .table .body .row .column.data {
            display: none;
        }
        .container .table .body .row .column:not(.action_bulk):not(.actions):not(.boolean) {
            padding: 6px 8px 4px 8px; 
            justify-content: flex-start;
            align-items: center;
        }
        .container .table .body .row .column:not(.key):not(.actions) {
            border-right: 1px solid #d3d3d3;
        }
        .container .table .body .row .column span:not(.tooltip) {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis; 
        }
        /* linha bulk */
        .container .table .body .column.action_bulk {
            width: 28px;
            align-items: center;
            justify-content: center;
        }
        .container.disable .table .body .column.action_bulk {
            display: none;
        }
        /* linha acções */
        .container .table .body .column.actions {
            white-space: nowrap;
            align-items: center;
            padding: 0px 8px; 
        }
        .container.disable .table .body .column.actions {
            display: none;
        }
        .container .table .body .column.actions div {
            padding: 0px 4px; 
        }
        /* linha checkbox */
        .container .table .body .row .column.boolean {
            align-items: center;
            justify-content: center;
        }
        .container .table .body .row .column svg {
            fill: var(--color);
            width: var(--body-icon-size);
        }

        /* tooltip célula */
        .container .table .body .row .column>span .tooltip {
            position: absolute;
            z-index: 1;
            display: none;
            font-size: 13px;
            min-width: 50px;
            padding: 4px 6px;
            top: 6px;
            background-color: var(--tooltip-background-color);
            color: var(--tooltip-color);
            box-shadow: 3px 3px 10px 0px rgba(0,0,0,0.35);
        }
        .container .table .body .row .column>span:hover .tooltip {
            display: block;
        }

    </style>

    <!--- html do componente -->
    <div id="fwk_table" class="container gray">
        <div class="filter hide">
            <div class="top_actions">
                <slot name="filter-top-action"></slot>
            </div>
            <div class="header">
                <div class="caption"></div>
                <svg class="icon" viewBox="0 0 64 64">
                    <path d="M64.125 9.6L54.525 0L32.125 22.4L9.725 0L0.125 9.6L22.525 32L0.125 54.4L9.725 64L32.125 41.6L54.525 64L64.125 54.4L41.725 32L64.125 9.6Z"/>
                </svg>
            </div>
            <div class="body">
                <slot name="filter-component"></slot>
            </div>
            <div class="actions">
                <slot name="filter-action"></slot>
            </div>
        </div>
        <div class="table">
            <div class="top_actions">
                <fwk-button class="filter hide" color="blue" align="left">
                    <svg slot="icon" viewBox="0 0 64 64">
                        <path d="M64 3H0L25.6 33.272V60.6H38.4V33.272L64 3Z"/>
                    </svg>
                </fwk-button>
                <div class="right">
                    <div class="custom hide">
                        <slot name="table-top-action"></slot>
                    </div>
                    <fwk-dropbutton class="bulk hide" color="blue" border="true" body-align="right">
                        <svg slot="icon" viewBox="0 0 64 64">
                            <path d="M35.75 2H62V28.25H35.75V2Z"/>
                            <path d="M35.75 35.75H62V62H35.75V35.75Z"/>
                            <path d="M2 2H28.25V28.25H2V2Z"/>
                            <path d="M2 35.75H28.25V62H2V35.75Z"/>
                        </svg>
                        <slot name="table-bulk-action" slot="content"></slot>
                    </fwk-dropbutton>
                </div>
            </div>
            <div class="header"></div>
            <div class="body"></div> 
        </div>
        <slot name="config"></slot>
        <slot name="columns"></slot> 
        <slot name="rows"></slot>
    </div>`;

    
    /**
     * Classe owner do componente
	 *
	 * @pmonteiro (yyyy-mm-dd)
     */
    class FWK_table extends HTMLElement {

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
            this.filter_action = this.container.querySelector('.top_actions .filter');
            this.filter_action_caption = this.container.querySelector('fwk-button');
            this.actions_custom = this.container.querySelector('.top_actions .custom');
            this.action_bulk = this.container.querySelector('.top_actions .bulk');
            this.filter = this.container.querySelector('.container>.filter'); 
            this.filter_header_caption = this.filter.querySelector('.caption');
            this.filter_body = this.filter.querySelector('.body');  
            this.filter_icon = this.filter.querySelector('.header>svg');       
            this.header = this.container.querySelector('.table .header');         
            this.body = this.container.querySelector('.table .body');

            // Defaults 
            // Parent template used height (list)
            this.template_height = 175;

            // Idiomas
            this.pt_PT = {filter: 'FILTRO', bulk_actions: 'Ações de grupo', norecords: 'Sem registos ...'};
            this.es_ES = {filter: 'FILTRAR', bulk_actions: 'Acciones grupales', norecords: 'No hay registros ...'};
            this.fr_FR = {filter: 'FILTRE', bulk_actions: 'Actions de groupe', norecords: 'Pas d\'enregistrementss ...'};
            this.en_US = {filter: 'FILTER', bulk_actions: 'Group actions', norecords: 'No records ...'};

            // Idioma (prioridade: localStorage -> 'pt_PT')
            // A variável transforma-se no array após a leituta do atributo
            this.language = localStorage.getItem('language');
            if (!this.language) {this.language = 'pt_PT'};
            this.language = this[this.language];
           
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


        // ------------------------------------------------------ SELECCIONADOS  / SELECCIONA TODOS/ CANCELA SELECÇÃO

        /**
         * Devolve as keys das linhas seleccionados 
         * Permite validar uma permissão de linha
         * Usado em operações bulk
         *
         * @param string permission = Permissão a validar (c,r,u,d ou outra)
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        getSelectedKeys(permission=null) {

            let action_checkboxes_checked = this.body.querySelectorAll('fwk-checkbox.action[value="true"]');
            var ids = [];    
            action_checkboxes_checked.forEach(element => {
                if (!permission || JSON.parse(element.getAttribute('permissions')).includes(permission)) {
                    let id = element.id.split('_').pop();
                    ids.push(id);
                }
            });

            return ids;
        }

        /**
         * Desselecciona todas as linhas seleccionadas
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        unselect() {
            let action_checkboxes_checked = this.body.querySelectorAll('fwk-checkbox.action[value="true"]');
            action_checkboxes_checked.forEach(element => {
                element.value = false;
            });
        }

        /**
         * Selecciona todas as linhas não seleccionadas
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        select() {
            let action_checkboxes_unchecked = this.body.querySelectorAll('fwk-checkbox.action:not([value="true"])');
            action_checkboxes_unchecked.forEach(element => {
                element.value = true;
            });
        }


        // ------------------------------------------------------ DADOS DE LINHA

        /**
         * Devolve dados de linda
         * 
         * @return object = Dados
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        data(key) {
            
            let data = {};
            key = `${key}`.replace(/[^A-Za-z0-9_-]/g,'_');
            if (this.component.getElementById(this.id + '_row_' + key )) {
                data = JSON.parse(this.component.getElementById(this.id + '_row_' + key).getAttribute('data-content'));
            }
            return data;
        }


        // ------------------------------------------------------ CARREGA LINHAS

        /**
         * Carrega linhas via javascript (consumindo a classe do componente)
         * 
         * @param object data = Dados necessários ao carregamento
         * @param bool start = ? Reinicia o carregamento
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */    
        fill(data, start = true) {
           
            // Disponibiliza áreas de trabalho
            let component = this;

            // Carrega os registos
            if (data['records']) { // Disponibilizadas directamente

                // Remove as linhas existentes
                this.body.innerText = '';
                this.has_rows = false;

                // Carrega linhas
                this.load(data);

            } else if (data.reader) { // Disponibilizadas por pedido Ajax
                
                component.reader = data.reader;
                delete data.reader;
                component.reader.filter.limit = component.config.table.limit;
                
                if (start) {
                    // Remove as linhas existentes
                    this.body.innerText = '';
                    component.reader.filter.offset = 0;
                    component.reader.end = false;
                    // Limpar ordenação anterior
                    component.config.table.order_objects.forEach(order_object => {
                        order_object.classList.remove('active'); 
                    });
                    // Atibuír ordenação
                    if (component.reader.filter.order) {
                        component.reader.filter.order.forEach(order => {
                            order = order.split(' ');
                            order = this.header.querySelector(`svg[key='${order[0]}'].${order[1].toLowerCase()}`);
                            if (order) {
                                order.classList.add('active');
                            }
                        });
                    }
                } else {
                    component.reader.filter.offset += component.config.table.limit; 
                }

                component.reader.ajax.call({
                    fully_qualified_class_name: component.reader.fully_qualified_class_name,
                    action: component.reader.action, 
                    action_data: {
                        filter: component.reader.filter
                    },
                    success: function(content) {
                        data.records = content;
                        if (data.records.length < component.config.table.limit) {
                            component.reader.end = true;
                        }
                        component.load(data);
                        data['records'] = null;
                        // Termina shield com progress bar
                        document.getElementById('fwk_shield').progress = false;
                        sessionStorage.setItem(component.id, JSON.stringify(component.reader.filter.getBase()));
                    }, 
                    failure: function(message) {
                        // Termina shield com progress bar
                        document.getElementById('fwk_shield').progress = false;
                        // Mostra mensagem
                        FormHelper.getComponent('fwk_messagebox').error = message;
                    }, 
                    exception: function(message) {
                        // Termina shield com progress bar
                        document.getElementById('fwk_shield').progress = false;
                        // Mostra mensagem
                        FormHelper.getComponent('fwk_messagebox').error = message;
                    }
                })
            } 

        }


        /**
         * Adiciona linhas ao componente
         * 
         * @param object data = Dados necessários ao carregamento
           * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */  
        load(data) {

            // Se existem registos
            if (data['records'].length) {

                this.has_rows = true;

                // Icone Checkbox
                let svg_checkbox = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svg_checkbox.classList.add('boolean');
                svg_checkbox.setAttribute('viewBox', '0 0 64 64');
                let path_checkbox = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path_checkbox.setAttribute('d','M64 64H0V0H64V64ZM5.875 58.1875H58.025V5.8125H5.875V58.1875Z');
                svg_checkbox.appendChild(path_checkbox)

                // Icone Checkbox Checked
                let svg_checkbox_checked = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svg_checkbox_checked.classList.add('boolean');
                svg_checkbox_checked.setAttribute('viewBox', '0 0 64 64');
                let path_checkbox_checked = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path_checkbox_checked.setAttribute('d','M27.4 48.7L13.4625 36.875L17.6375 32.4625L27.2125 40.725L49.025 17.6375L53.575 21.675L27.4 48.7ZM64 64H0V0H64V64ZM5.875 58.1875H58.025V5.8125H5.875V58.1875Z');
                svg_checkbox_checked.appendChild(path_checkbox_checked);

                // Checkbox de operações de grupo
                let base_fwk_checkbox = document.createElement('fwk-checkbox');
                base_fwk_checkbox.className = 'action';
                base_fwk_checkbox.color = this.color;

                // Para cada registo
                for (var i = 0; i < data['records'].length; i++) {

                    let content = data['records'][i];
                    let row = document.createElement('div');
                    // Id gerado com valor "limpo" de caracteres especiais
                    row.id = this.id + ('_row_' + content.key).replace(/[^A-Za-z0-9_-]/g,'_');
                    row.classList.add('row');
                    row.setAttribute('data-content', '{}');

                    // Checkbox de operações de grupo
                    if (this.config.table.bulk) {
                        let cell = document.createElement('div');
                        cell.classList.add('column');
                        cell.classList.add('action_bulk');
                        let fwk_checkbox = base_fwk_checkbox.cloneNode(true);
                        // Id gerado com valor "limpo" de caracteres especiais
                        fwk_checkbox.id = this.id + ('_chk_' + content.key).replace(/[^A-Za-z0-9_-]/g,'_');
                        fwk_checkbox.setAttribute('permissions', JSON.stringify(content._permissions));
                        cell.appendChild(fwk_checkbox);
                        row.appendChild(cell);
                    }

                    var extra_attributes = {};

                    // Itera colunas da linha
                    for (var [key, column] of Object.entries(content.values)) {

                        // Adapta os dados ao funcionamento do componente
                        if (!this.config.columns[key]) { // Atributo extra

                            extra_attributes[key] = content.values[key];

                        } else { // Columa

                            let cell = document.createElement('div');
                            cell.classList.add('column');
                            let tooltip = ''; 

                            if (key == '_actions' && this.config.table.row_actions) {

                                cell.classList.add('actions');
                                let style = 'width: ' + column.width + 'px; ';
                                style += 'justify-content: ' + column.align;
                                cell.style = style;
                                content._actions.forEach(action => {
                                    let action_container  = document.createElement('div');
                                    action_container.innerHTML = action;
                                    cell.appendChild(action_container);
                                });
    
                            } else {
    
                                let style = 'width: ' + column.width + 'px; ';
                                style += 'justify-content: ' + column.align;
                                cell.style = style; 
    
                                if (typeof content.values[key] === "boolean") {
                                    cell.classList.add('boolean');
                                    if (content.values[key]) {
                                        cell.appendChild(svg_checkbox_checked.cloneNode(true)); 
                                    } else {
                                        cell.appendChild(svg_checkbox.cloneNode(true)); 
                                    }
                                } else {
                                    if(column.tooltip)  {
                                        tooltip = '<span class="tooltip specific hide">'+content.values[key]+'</span>';
                                    }
                                    cell.innerHTML = '<span>'+content.values[key]+tooltip+'</span>';
                                }
    
                            }
                                
                            row.appendChild(cell);

                        }
                    
                    }

                    row.setAttribute('data-content', JSON.stringify(extra_attributes));

                    this.body.appendChild(row);

                }

            } else if (this.reader.end && !this.has_rows){ // Se não existem registos

                let cell = document.createElement('div');
                cell.classList.add('norecords');
                cell.innerText = this.language.norecords;
                this.body.appendChild(cell);
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

            // Variáveis de configuração
            this.config = {};
            this.config.table = {};
            this.config.columns = {};
            this.color = 'gray';
            this.inverted_color = 'blue';

            // Disponibiliza áreas de trabalho
            let component = this;
            let container = this.container;
            let actions_custom  = this.actions_custom;
            let action_bulk = this.action_bulk;
            let filter_action = this.filter_action;
            let filter_action_caption = this.filter_action_caption;
            let filter_icon = this.filter_icon;
            let filter_header_caption = this.filter_header_caption
            let filter = this.filter;
            let filter_body = this.filter_body;
            let header = this.header;
            let body = this.body;

            // Caption do cabeçalho filtro
            filter_header_caption.innerText = this.language.filter;
            // Caption do botão filtro
            filter_action_caption.setAttribute('value', this.language.filter);
            // Caption do botão bulk actions
            action_bulk.setAttribute('value', this.language.bulk_actions);

            // Gera random ID se não atribuído
            if (!component.hasAttribute('id')) {component.setAttribute('id',fwkGenerateRandomID('table'));}

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

            // Cor
            if (component.hasAttribute('color') && ['blue'].includes(component.getAttribute('color'))) {
                container.classList.add(component.getAttribute('color'));
                component.removeAttribute('color');
            } else {
                container.classList.add('gray');
            }


            // Configurações carregadas por slot / html
            var slots_config = component.shadowRoot.querySelector('slot[name="config"]');
            this.slots_config_processed = false;
            slots_config.addEventListener('slotchange', evt => {
                
                if (!this.slots_config_processed) {
                    
                    // Ler configuração
                    slots_config = slots_config.assignedElements();
                    let content = JSON.parse(slots_config[0].innerText);

                    // Carrega e aplica a configuração 
                    let config = {};

                    // Área de filtro
                    config.filter = content.filter ;  
                    if (config.filter) {
                        filter_action.classList.remove('hide');
                        filter.classList.remove('hide');
                        // Mostra / esconde filtro
                        filter_action.addEventListener('click', evt => {
                            if (filter.classList.contains('hide')) {
                                filter.classList.remove('hide'); 
                            } else {
                                filter.classList.add('hide'); 
                            }
                        });
                        // Esconde filtro
                        filter_icon.addEventListener('click', evt => {
                            filter.classList.add('hide'); 
                        });    
                    }

                    // Área de acções de topo
                    config.actions = content.actions;
                    if (config.actions) {
                        actions_custom.classList.remove('hide');
                    }

                    // Acções bulk
                    config.bulk = content.bulk;
                    if (config.bulk) {
                        action_bulk.classList.remove('hide');
                    }

                    // Área de acções de linha
                    config.row_actions = content.row_actions;
           
                    // Altura (existe uma altura miníma)
                    if (content.rows) {
                        config.height = (content.rows * 28);
                    }
                    config.template_height = content.template_height ?? component.template_height;
                    if (config.height && !isNaN(config.height)) {
                        // Número de linhas a mostrar
                        filter_body.style.height = (config.height-36) + 'px'; // footer
                        body.style.height = config.height + 1 + 'px';   
                        // Página
                        // O número de linhas do pedido é = content.rows + 10;
                        config.limit = content.rows + 10;
                    } else if(config.template_height && !isNaN(config.template_height)) { 
                        // O footer da tabela acompanha o footer da página
                        // config.template_height é o ajuste de topo do template até à tabela
                        var no_table_height = config.template_height + 34; // header
                        if (config.filter || config.bulk || config.actions) {
                            no_table_height += 30; // linha de acções
                        }              
                        no_table_height += 5; // Margem inferior
                        filter_body.style.height = 'calc(100vh - ' + (no_table_height + 36) + 'px)'; // footer
                        body.style.height = 'calc(100vh - ' + (no_table_height) + 'px)';
                        // Página
                        // Calcula o número de linhas que cabem na altura máxima disponível (tendo em conta o ecran)
                        // Com uma margem 2 duas linhas passa o número, por segurança, para a dezena seguinte: ex: 28 => 30; 28.1 => 40
                        let min_rows_to_load  = Math.ceil((((screen.height - no_table_height) / 28) + 2) / 10) * 10;
                        // O número de linhas do pedido nunca pode ser inferior ao calculado
                        config.limit = (content.page ?? 0) > min_rows_to_load ? content.page : min_rows_to_load;
                    }

                    // Ordenação 
                    config.order_objects = [];

                    // Guarda a configuração da tabela
                    component.config.table = config;

                    this.slots_config_processed = true

                    // Elimina slot
                    slots_config[0].remove();

                    // Remove a tag slot
                    let slottag = container.querySelector('slot[name="config"]');
                    slottag.remove(); 
                    
                }

            });


            // Colunas carregadas por slot / html
            var slots_config_columns = component.shadowRoot.querySelector('slot[name="columns"]');
            this.slots_config_columns_processed = false;
            slots_config_columns.addEventListener('slotchange', evt =>  {

                if (!this.slots_config_columns_processed) {

                    // Ler colunas
                    slots_config_columns = slots_config_columns.assignedElements();
                    let content = JSON.parse(slots_config_columns[0].innerText);

                    // Coluna de checkbox de operações de grupo (bulk)
                    if (component.config.table.bulk) {
                        let cell = document.createElement('div');
                        cell.classList.add('column');
                        cell.classList.add('action_bulk');
                        let fwk_checkbox = document.createElement('fwk-checkbox');
                        fwk_checkbox.id = component.id + '_all';
                        fwk_checkbox.setAttribute('color', 'white');

                        // Ouvir click na checkbox
                        fwk_checkbox.addEventListener('click', evt =>  {
                            if (fwk_checkbox.value) { // Seleccionar todas as linhas carregadas
                                component.select();
                            } else { // Desseleccionar todas as linhas carregadas
                                component.unselect();
                            }
                        });

                        cell.appendChild(fwk_checkbox);
                        header.appendChild(cell);

                    }


                    // Icone Order ASC
                    let svg_order_asc = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    svg_order_asc.classList.add('asc');
                    svg_order_asc.setAttribute('viewBox', '0 -6 64 64');
                    let path_order = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    path_order.setAttribute('d','M22.4 20L0 42.4L9.6 52L32 29.6L54.4 52L64 42.4L32 11.1375');
                    svg_order_asc.appendChild(path_order)

                    // Icone Order DESC
                    let svg_order_desc = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    svg_order_desc.classList.add('desc');
                    svg_order_desc.setAttribute('viewBox', '0 6 64 64');
                    path_order = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    path_order.setAttribute('d','M41.6 44L64 21.6L54.4 12L32 34.4L9.6 12L0 21.6L32 52.8625');
                    svg_order_desc.appendChild(path_order);


                    // Iterar configuração de colunas
                    Object.entries(content).forEach(([key, column]) => {

                        let config = {}

                        // Adapta os dados ao funcionamento do componente
                        let cell = document.createElement('div');
                        cell.classList.add('column');

                        // Por tipo de coluna
                        if (component.config.table.row_actions && key == '_actions') {
                            // Coluna de acções
                            config.width = parseInt(column.width);
                            cell.style.minWidth = config.width ? config.width + 'px' : null;
                            cell.classList.add('actions');
                        } else {
                            // Coluna normal
                            // Titulo
                            config.title = column.title ? column.title : '';
                            config.width = parseInt(column.width);
                            cell.style.minWidth = config.width ? config.width + 'px' : null;
                            let label = document.createElement('div');
                            label.classList.add('title');
                            label.innerText = column.title;
                            cell.appendChild(label);

                            // Ordenação
                            // activa o icone desde que tenha a propriedade order com um dos valores possíveis
                            if (column.order) {

                                let order = document.createElement('div');
                                order.classList.add('order');

                                // Ascendente
                                var svg_asc = svg_order_asc.cloneNode(true); 
                                svg_asc.setAttribute('key', key);

                                // Ouvir click no icone
                                svg_asc.addEventListener('click', evt => {
                                    if ((component.reader.filter.order && component.reader.filter.order.length != 1) || !this.classList.contains('active')) {
                                        component.config.table.order_objects.forEach(order_object => {
                                            order_object.classList.remove('active'); 
                                        });
                                        // Carregamento de linhas ordenadas
                                        evt.currentTarget.classList.add('active');
                                        component.reader.filter.resetOrder();
                                        component.reader.filter.addOrder(evt.currentTarget.getAttribute('key'), 'ASC');
                                        component.fill({reader: component.reader});
                                    }
                                });
                                component.config.table.order_objects.push(svg_asc);
                                order.appendChild(svg_asc);

                                // Descendente
                                var svg_desc = svg_order_desc.cloneNode(true); 
                                svg_desc.setAttribute('key', key);

                                // Ouvir click no icone
                                svg_desc.addEventListener('click', evt => {
                                    if ((component.reader.filter.order && component.reader.filter.order.length != 1) || !this.classList.contains('active')) {
                                        component.config.table.order_objects.forEach(order_object => {
                                            order_object.classList.remove('active'); 
                                        });
                                        evt.currentTarget.classList.add('active');
                                        component.reader.filter.resetOrder();
                                        component.reader.filter.addOrder(evt.currentTarget.getAttribute('key'), 'DESC');
                                        component.fill({reader: component.reader});
                                    }
                                });
                                component.config.table.order_objects.push(svg_desc);
                                order.appendChild(svg_desc);

                                cell.appendChild(order);

                            } else {
                                cell.appendChild(document.createElement('span'));
                            }

                            // Tooltip
                            config.tooltip = column.tooltip ? column.tooltip : false;    
                    
                        }

                        // Alinhamento
                        if (column.align) {
                            if (column.align == 'right') {
                                config.align = 'flex-end';
                            } else if (column.align == 'center') {
                                config.align = 'center';
                            } else {
                                config.align = 'flex-start';
                            }
                        }

                        component.config.columns[key] = config;

                        header.appendChild(cell);
                       
                    });

                    this.slots_config_columns_processed = true;

                    // Elimina slot
                    slots_config_columns[0].remove();

                    // Remove a tag slot
                    let slottag = container.querySelector('slot[name="columns"]');
                    slottag.remove();

                }

            });


            // Linhas carregadas por slot / html
            var slots_rows = component.shadowRoot.querySelector('slot[name="rows"]');
            this.slots_rows_processed = false;
            slots_rows.addEventListener('slotchange', evt => {
            
                if (!this.slots_rows_processed) {

                    // Ler linhas
                    slots_rows = slots_rows.assignedElements();
                    var data = [];
                    data['records'] = JSON.parse(slots_rows[0].innerText);

                    // Carrega as linhas na tabela 
                    component.load(data);

                    this.slots_rows_processed = true;

                    // Elimina slot
                    slots_rows[0].remove();

                    // Remove a tag slot
                    let slottag = container.querySelector('slot[name="rows"]');
                    slottag.remove();

                }

            });


            // Scroll da tabela com carregamento de nova página
            body.addEventListener('scroll', evt => {
                if (!component.reader.end && body.scrollHeight - (body.scrollTop) == body.clientHeight) {
                    document.getElementById('fwk_shield').progress = true;
                    component.fill({reader: component.reader}, false);
                }
            });

        }

    }

  // Adiciona o componente à lista de componentes customizados
  customElements.define('fwk-table', FWK_table);

})();
// --- END