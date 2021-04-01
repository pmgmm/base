/**
 * FRAMEWORK - COMPONENTS - TREEVIEW
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
            --header-color: white; 


            --body-icon-size: 14px; 
            --filter-icon-size: 14px; 
            --link-font-size: calc(var(--font-size) - 2px);
            
            --header-color-icon-hover: white;
            --header-color-icon-active: white;
            --color-background: white;
            --color-filter-header: white;
            --color-filter-icon-hover: white;
            --color-filter-background: white;
        }

        /* container do componente */
        .container {
            display: flex;
            flex-direction: column;
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
            --color-table-border: var(--gray-medium);
            --color-body-zebra-background: var(--gray-ultralight);
            --header-color-background: var(--gray-medium);
            --header-color-icon: var(--gray-light);
            --color-tooltip: var(--gray-dark);
            --color-tooltip-background: var(--gray-ultralight);
            --color-filter-border: var(--blue-medium);
            --color-filter-header-background: var(--blue-medium);
            --color-filter-icon: var(--blue-light);
            --color-filter-actions-background: var(--blue-ultralight);
            --color-disable: var(--gray-disable);
        }
        .container.blue {
            --color: var(--blue-medium);
            --color-table-border: var(--blue-medium);
            --color-body-zebra-background: var(--blue-ultralight);
            --header-color-background: var(--blue-medium);
            --header-color-icon: var(--blue-light);
            --color-tooltip: var(--blue-dark);
            --color-tooltip-background: var(--blue-ultralight);
            --color-filter-border: var(--gray-medium);
            --color-filter-header-background: var(--gray-medium);
            --color-filter-icon: var(--gray-light);
            --color-filter-actions-background: var(--gray-ultralight):
            --color-disable: var(--blue-disable);
        }
        .container.disable {
            --color-table-border: var(--color-disable);
            --header-color-background: var(--color-disable);
        }

        /* área de operações */
        .container .top_actions {
            display: flex;  
            margin-bottom: 2px;
        }
        .container .top_actions .right {
            display: flex;
            margin-left: auto;
        }
        .container .top_actions .custom {
            display: flex;
            justify-content: flex-end;
            margin-left: auto;
        }
        .container.disable .top_actions .custom, .container .top_actions .custom.hide {
            display: none;
        }
        .container slot[name=table-top-action]::slotted(*) {
            margin-left: 15px;
        }
        .container .top_actions .bulk {
            display: flex;
            justify-self:  flex-end;
            padding-left: 15px;
            margin-left: auto;
        }
        .container.disable .top_actions .bulk, .container .top_actions .bulk.hide {
            display: none;
        }

        /* área de titulo */
        .container .header {
            display: flex;            
            height: var(--header-height);
            font-size: var(--font-size);
            background-color: var(--header-color-background);
            color:  var(--header-color);
            fill: var(--header-color-icon);
            justify-content: center;
            align-items: center;
            border: 1px solid var(--color-table-border);
            border-bottom: none;
        }
        .container .header .caption {
            display: flex;
            padding: 0px 20px;
            box-sizing: border-box;
            white-space: nowrap;  
        }

        /* área de nós */
        .container .body  {
            overflow-y: auto;
            box-sizing: border-box;
            color: var(--color);
            background-color: var(--color-background);
            border: 1px solid var(--color-table-border);
            padding: 5px;
            min-width: 300px;
            min-height: 175px;
            border-top: none;
        }

        .container .body .node {
            padding-left: 5px;

            border: 2px solid transparent;
        }

        .container .body .node > .head {
            display: flex;
            align-items: center;
        }
        .container .body .node > .head .actions {
            display: flex;
            align-items: center;
        }
        
        .container .body .node > .head .actions > svg {
            display: none;
        }
        .container .body .node.isparent > .head .actions > svg {
            display: block;
            width: 12px;
            transform: rotate(0deg);
        }
        .container .body .node.open > .head .actions > svg {
            transform: rotate(90deg);
        }
        .containcer .body .node.isparent > .head .actions > fwk-checkbox {
            padding-left: 5px;
        }

        .container .body .node.isparent > .head .actions > *:not(:first-child) {
            padding-left: 5px;
        }
        .container .body .node:not(.isparent) > .head .actions > *:nth-child(1n+3) {
            padding-left: 5px;
        }

        .container .body .node.drop-area {
            border: 2px dashed var(--blue-light);
        }
        .container .body .node:hover {
            color: #333;
            cursor: pointer;
        }

        .container .body .node.child.isparent {
            margin-left: 10px;
        }
        .container .body .node.child:not(.isparent) {
            margin-left: 20px;
        }

        .container .body .node .head > .data {
            background-color: none;
            display: flex;
            min-width: 60px;
            align-items: center;
            width: min-content;
        }







        .container .body .node > .head .data .caption {
            padding-top: 1px;
            margin: 0px 5px;
            white-space: nowrap;
            overflow: hidden;
            max-width: 100%;
            text-overflow: ellipsis;  
        }

        .container .body .node > .children {
            display: none;
            flex-direction: column;
            display: none;
        }
        .container .body .node.open > .children {
            display: flex;
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
            background-color: var(--color-tooltip-background);
            color: var(--color-tooltip);
            box-shadow: 3px 3px 10px 0px rgba(0,0,0,0.35);
        }
        .container .table .body .row .column>span:hover .tooltip {
            display: block;
        }

    </style>

    <!--- html do componente -->
    <div id="fwk_treeview" class="container gray">
        <div class="top_actions">
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
                    <slot name="treeview-bulk-action" slot="content"></slot>
                </fwk-dropbutton>
            </div>
        </div>
        <div class="header">
            <div class="caption"></div>
        </div>
        <div class="body"></div> 
        <slot name="config"></slot>
        <slot name="nodes"></slot>
    </div>`;

    
    /**
     * Classe owner do componente
	 *
	 * @pmonteiro (yyyy-mm-dd)
     */
    class FWK_treeview extends HTMLElement {

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
            this.actions_custom = this.container.querySelector('.top_actions .custom');
            this.action_bulk = this.container.querySelector('.top_actions .bulk');     
            this.header = this.container.querySelector('.header');     
            this.caption = this.header.querySelector('.caption');      
            this.body = this.component.querySelector('.body');

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


        toggleNodeStatus(node) {

            //let node = this.body.querySelector(`#${this.id}_node_${key}`);
            if (node) {
                let key = node.id.split('_').pop();
                if (node.classList.contains('open')) {
                    node.classList.remove('open');
                    this.open_nodes = this.open_nodes.filter(item => item !== key);
                } else {
                    node.classList.add('open');
                    this.open_nodes.push(key);
                }
                sessionStorage.setItem(this.id, JSON.stringify(this.open_nodes));

            }

        }


        closeNode(key) {
            let node = this.body.querySelector(`#${this.id}_node_${key}`);
            if (node) {
                if (node.classList.contains('open')) {
                    node.classList.remove('open'); 
                    this.open_nodes = this.open_nodes.filter(item => item !== key);
                    sessionStorage.setItem(this.id, JSON.stringify(this.open_nodes));
                }
            }
        }

        
        openNode(key) {
            let node = this.body.querySelector(`#${this.id}_node_${key}`);
            if (node) {
                if (!node.classList.contains('open')) {
                    node.classList.add('open'); 
                    this.open_nodes.push(key);
                    sessionStorage.setItem(this.id, JSON.stringify(this.open_nodes));
                }
            }
        }


        // ------------------------------------------------------ DADOS DE NÓ

        /**
         * Devolve dados de nó
         * 
         * @return object = Dados
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        data(key) {
            let element = this.body.querySelector('#' + this.id + ('_node_' + key).replace(/[^A-Za-z0-9_-]/g,'_'));
            if (element) {
                return JSON.parse(element.querySelector('.data').getAttribute('data-content'));
            } else {
                return {};
            }
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

                this.has_nodes = true;

                // Icone abrir / fechar
                let base_svg_node_handle = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                base_svg_node_handle.setAttribute('viewBox', '0 0 64 64');
                let path_node_handle = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path_node_handle.setAttribute('d','M44 22.4L21.6 0L12 9.6L34.4 32L12 54.4L21.6 64L52.8625 32');
                base_svg_node_handle.appendChild(path_node_handle);

                // Checkbox de operações de grupo (bulk)
                let base_node_checkbox = document.createElement('fwk-checkbox');
                base_node_checkbox.className = 'action';
                base_node_checkbox.color = this.color;

                // Dropbutton para operações de nó
                let base_node_actions = document.createElement('fwk-dropbutton');
                base_node_actions.classList.add('action');
                base_node_actions.setAttribute('color', this.color);
                base_node_actions.setAttribute('simple', 'true');
                let svg_node_actions = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svg_node_actions.setAttribute('slot', 'icon');
                svg_node_actions.setAttribute('viewBox', '0 0 64 64');
                let path_node_actions_1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                let path_node_actions_2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                let path_node_actions_3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path_node_actions_1.setAttribute('d','M0 18V8H64V18H0Z');
                path_node_actions_2.setAttribute('d','M0 37V27H64V37H0Z');
                path_node_actions_3.setAttribute('d','M0 56V46H64V56H0Z');
                svg_node_actions.appendChild(path_node_actions_1);
                svg_node_actions.appendChild(path_node_actions_2);
                svg_node_actions.appendChild(path_node_actions_3);
                base_node_actions.appendChild(svg_node_actions);

                // Para cada registo
                for (var i = 0; i < data['records'].length; i++) {

                    let content = data['records'][i];
                    let node = document.createElement('div');
                    node.id = this.id + '_node_' + content.key;
                    node.classList.add('node');
                    if (content.parent_key) {
                        node.setAttribute('data-parent-key', content.parent_key);
                    }
                  

                    node.addEventListener('click', evt => {
                        evt.stopPropagation();
                        if (evt.currentTarget.classList.contains('isparent')) {
                            this.toggleNodeStatus(evt.currentTarget);
                        } 
  
                    });


                    let node_head = document.createElement('div');
                    node_head.classList.add('head');

                        let node_actions = document.createElement('div');
                        node_actions.classList.add('actions');

                            let node_handle = base_svg_node_handle.cloneNode(true)
                            node_handle.setAttribute('data-node-key', content.key);
                            node_actions.appendChild(node_handle);

                            // Checkbox de operações de grupo
                            if (!this.config.treeview.bulk) {
                                let node_checkbox = base_node_checkbox.cloneNode(true);
                                // Id gerado com valor "limpo" de caracteres especiais
                                node_checkbox.id = this.id + '_chk_' + content.key;
                                node_checkbox.setAttribute('permissions', JSON.stringify(content._permissions));
                                node_actions.appendChild(node_checkbox);
                            }
                    
                    
                            // Dropbutton de operações de node
                            if (this.config.treeview.node_actions) {

                                if (content._actions) {

                                    let node_actions_actions = base_node_actions.cloneNode(true);
                                    // Id gerado com valor "limpo" de caracteres especiais
                                    node_actions_actions.id = this.id + '_dbt_' + content.key;
                                    // Container de acções
                                    let node_actions_actions_elements = document.createElement('div');
                                    node_actions_actions_elements.setAttribute('slot', 'content');

                                    let innerHtml = '';
                                    content._actions.forEach(action => {
                                        innerHtml += action;
                                    });
                                    node_actions_actions_elements.innerHTML = innerHtml;

                                    node_actions_actions.appendChild(node_actions_actions_elements);

                                    node_actions.appendChild(node_actions_actions);
                                }
                            }

                        node_head.appendChild(node_actions);

                     // Adapta os dados ao funcionamento do componente

                    let node_data = document.createElement('div');
                    node_data.classList.add('data');
                    node_data.setAttribute('data-content','{}');

                    // Atributos extra
                    if (content._data) {
                        node_data.setAttribute('data-content', JSON.stringify(content._data));
                    }

                    let node_caption = document.createElement('div');
                    node_caption.classList.add('caption');
                    node_caption.innerText = content.value;
                    node_data.appendChild(node_caption);

                    node_head.appendChild(node_actions);
                    node_head.appendChild(node_data);
                    node.appendChild(node_head);


                    let node_children = document.createElement('div');
                    node_children.classList.add('children')
                    node.appendChild(node_children);


                // Permitir drag (depende de disable)
                node_data.draggable = !this.disable;

                // Evento drag
                node_data.addEventListener('dragstart', evt => {
                    evt.stopPropagation();
    
                    evt.dataTransfer.effectAllowed = "move";
                    let node = evt.currentTarget.parentNode.parentNode;
                   
                    evt.dataTransfer.setData("text", node.id);

                    this.dragnode = [node, node.classList.contains('open')];

                    this.closeNode(node.id.split('_').pop());

                });

     
                // Evento dragover
                node.addEventListener('dragover', evt => {
               
                    evt.stopPropagation();
                    evt.dataTransfer.effectAllowed = "move";
 
                        let drag_parent_id = this.id + '_node_' + this.dragnode[0].getAttribute('data-parent-key');
                        if(this.dragnode[0].id != evt.currentTarget.id && drag_parent_id != evt.currentTarget.id ) {
                            console.log('drag',this.dragnode[0].id);
                            console.log('drag parent',this.dragnode[0].parentNode.id);
                            console.log('current',evt.currentTarget.id);
                        evt.currentTarget.classList.add('drop-area');
                        }
           
  
                    });
        

                    node.addEventListener('dragleave', evt => {
                        evt.preventDefault();
                        evt.stopPropagation();
                        // Se o componente não está disable  
                   
                        evt.currentTarget.classList.remove('drop-area');
                
                    });

                    node_data.addEventListener('dragend', evt => {
                        evt.preventDefault();
                        evt.stopPropagation();
                        // Se o componente não está disable  
                   
                        if(this.dragnode[1]){
                            this.openNode(this.dragnode[0].id.split('_').pop());
                        }
                
                    });

                    node_data.addEventListener('drop', evt => {
                        evt.preventDefault();
                        evt.stopPropagation();
                        // Se o componente não está disable  
                   
                        if(this.dragnode[1]){
                            this.openNode(this.dragnode[0].id.split('_').pop());
                        }
                
                    });

                    
            // Evento drop
     


                        if (content.parent_key && content.parent_key !='') {
                            let parent_node = this.component.getElementById(this.id + '_node_' + content.parent_key);
                            if (parent_node) {
                                let parent_node_children = parent_node.querySelector(':scope > .children');
                                if (parent_node_children) {
                                    node.classList.add('child');
                                    parent_node_children.appendChild(node);
                                    parent_node_children.parentNode.classList.add('isparent');
                                }
                            }
                        } else {
                            this.body.appendChild(node);
                        }

                        if (this.open_nodes.includes(content.key)) {
                            node.classList.add('open');
                        }

                    }




            } else if (this.reader.end && !this.has_nodes){ // Se não existem registos

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
            this.color = 'gray';
            this.inverted_color = 'blue';

            // Disponibiliza áreas de trabalho
            let component = this;
            let container = this.container;
            let actions_custom  = this.actions_custom;
            let action_bulk = this.action_bulk;
            let header = this.header;
            let caption =this.caption;
            let body = this.body;


            this.open_nodes = sessionStorage.getItem(this.id) ? JSON.parse(sessionStorage.getItem(this.id)) : [];


            // Caption do botão bulk actions
            action_bulk.setAttribute('value', this.language.bulk_actions);

            // Gera random ID se não atribuído
            if (!component.hasAttribute('id')) {component.setAttribute('id',fwkGenerateRandomID('treeview'));}

            // Valor
            if (component.hasAttribute('value') && component.getAttribute('value') != '') {
                caption.innerText = component.getAttribute('value');
                component.removeAttribute('value');
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
                     /*    filter_action.classList.remove('hide');
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
                        });   */  
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

                    // Acções de nó
                    config.node_actions = content.node_actions;
           
                    // Altura (existe uma altura mínima)
                    if (content.nodes) {
                        config.height = (content.nodes * 20);
                    }
                    config.template_height = content.template_height ?? component.template_height;
                    if (config.height && !isNaN(config.height)) {
                        // Número de nós a mostrar
                        filter_body.style.height = (config.height-36) + 'px'; // footer
                        body.style.height = config.height + 1 + 'px';   
                        // Página
                        // O número de linhas do pedido é = content.rows + 10;
                        config.limit = content.nodes + 10;
                    } else if(config.template_height && !isNaN(config.template_height)) { 
                        // O footer da tabela acompanha o footer da página
                        // config.template_height é o ajuste de topo do template até à tabela
                        var no_treeview_height = config.template_height + 34; // header
                        if (config.bulk || config.actions) {
                            no_treeview_height += 30; // linha de acções
                        }              
                        no_treeview_height += 5; // Margem inferior
                        body.style.height = 'calc(100vh - ' + (no_treeview_height) + 'px)';
                        // Página
                        // Calcula o número de linhas que cabem na altura máxima disponível (tendo em conta o ecran)
                        // Com uma margem 2 duas linhas passa o número, por segurança, para a dezena seguinte: ex: 28 => 30; 28.1 => 40
                    //let min_rows_to_load  = Math.ceil((((screen.height - no_treeview_height) / 28) + 2) / 10) * 10;
                        // O número de linhas do pedido nunca pode ser inferior ao calculado
                    //config.limit = (content.page ?? 0) > min_rows_to_load ? content.page : min_rows_to_load;
                    }

                    // Guarda a configuração da treeview
                    component.config.treeview = config;

                    this.slots_config_processed = true

                    // Elimina slot
                    slots_config[0].remove();

                    // Remove a tag slot
                    let slottag = container.querySelector('slot[name="config"]');
                    slottag.remove(); 
                    
                }

            });


            // Nós carregadas por slot / html
            var slots_nodes = component.shadowRoot.querySelector('slot[name="nodes"]');
            this.slots_nodes = false;
            slots_nodes.addEventListener('slotchange', evt => {
            
                if (!this.slots_nodes) {

                    // Ler linhas
                    slots_nodes = slots_nodes.assignedElements();
                    var data = [];
                    data['records'] = JSON.parse(slots_nodes[0].innerText);

                    // Carrega as linhas na tabela 
                    component.load(data);

                    this.slots_nodes = true;

                    // Elimina slot
                    slots_nodes[0].remove();

                    // Remove a tag slot
                    let slottag = container.querySelector('slot[name="nodes"]');
                    slottag.remove();

                }

            });

        }

    }

  // Adiciona o componente à lista de componentes customizados
  customElements.define('fwk-treeview', FWK_treeview);

})();
// --- END