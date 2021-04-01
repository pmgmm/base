/**
 * FRAMEWORK - COMPONENTS - UPLOAD
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
            --file-icon-size: 9px;
        }

        /* container do componente */
        .container {
            display: block;
            position: relative;
            width: min-content;
            cursor: defautt; 
        }
        .container.hide {
            display: none;
        }
        .container.gray {
            --hover-color: var(--gray-dark);
            --border-color: var(--gray-light);
            --color: var(--gray-medium);
            --color-hover: var(--gray-dark);
            --file-icon-color: var(--gray-light);
            --drop-icon-color: var(--blue-light);
            --drop-border-color: var(--blue-light);
            --drop-border-hover-color: var(--blue-medium);
            --placeholder-color: var(--gray-placeholder);
            --disable-color: var(--gray-disable);
        }
        .container.blue {
            --hover-color: var(--blue-dark);
            --border-color: var(--blue-light);
            --color: var(--blue-medium);
            --color-hover: var(--blue-dark);
            --file-icon-color: var(--blue-light);
            --drop-icon-color: var(--gray-light);
            --drop-border-color: var(--gray-light);
            --drop-border-hover-color: var(--gray-medium);
            --placeholder-color: var(--blue-placeholder);
            --disable-color: var(--blue-disable);
        }
        .container.disable {
            cursor: not-allowed; 
        }  

        /* área de informação, botão e drop de ficheiros */
        .container .head {
            display: grid;
            grid-template-columns: calc(100% - 60px) 60px;
            grid-template-rows: auto;
            border-width: 1px 1px 1px 2px;
            border-style: solid;
            border-color: var(--border-color);
            padding: 3px 3px 2px;
            box-sizing: border-box;
            min-height: 28px;
            width: 250px;
        }
        .container:not(.disable) .head:hover, .container:not(.disable).focus {
            --border-color: var(--color-hover);
            --file-icon-color: var(--color);
        }  
        .container:not(.disable) .head.mandatory {
            border-left-color: var(--mandatory-color);
        }

        /* área de informação de ficheiros */
        .container .head .files-area {
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            color: var(--color);
            background-color: var(--component-background-color);
            padding: 2px 5px 0px 3px;
            margin: auto 0px;;
        }
        .container .head .files-area.placeholder {
            line-height: var(--line-height);
            color: var(--placeholder-color);
            font-style: italic;
        }
        .container .head .files-area .file {
            display: flex;
            line-height: var(--line-height);
        }
        .container .head .files-area .file-name {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;  
        }

        /* icone de cancel */
        .container .head .files-area .cancel {
            cursor: pointer;
            align-self: center;
            width: var(--file-icon-size);
            fill: var(--file-icon-color);
            padding-bottom: 1px;
            margin-right: 4px;
        }  
        .container .files-area .cancel:hover {
            fill: var(--color-hover);
        }  

        /* área de drop de ficheiros */
        .container .head .drop-area {
            box-sizing: border-box;
            display: flex;
            align-content: center;
            justify-content: center;
            padding: 2px 0px;
            border: 2px dashed var(--drop-border-color);
            fill: var(--drop-icon-color);
            cursor: pointer;
        }
        /* icone de drop */
        .container .head .drop-area svg {
            width: 40px;
        }
        .container.disable .head .drop-area {
            --drop-border-color: var(--disable-color);
            fill: var(--disable-color);
            cursor: not-allowed; 
        }  
        .container:not(.disable) .head .drop-area:hover {
            fill: var(--drop-border-hover-color);
        }  
        .container:not(.disable) .head .drop-area.border_hover {
            border: 2px solid var(--drop-border-hover-color);
        }  
        .container .uploader {
            display: none;
        }

    </style>

    <!--- html do componente -->
    <div id="fwk_upload" class="container gray">
        <div class="head">
            <div class="files-area"></div>
            <div class="drop-area">
                <svg viewBox="0 0 64 64">
                    <path d="M30.1144 0.781048C31.1557 -0.260349 32.8443 -0.260349 33.8856 0.781048L41.8856 8.78104C42.9269 9.82245 42.9269 11.5109 41.8856 12.5523C40.8443 13.5937 39.1557 13.5937 38.1144 12.5523L34.6667 9.10456V40C34.6667 41.4728 33.4728 42.6667 32 42.6667C30.5272 42.6667 29.3333 41.4728 29.3333 40V9.10456L25.8856 12.5523C24.8442 13.5937 23.1558 13.5937 22.1144 12.5523C21.073 11.5109 21.073 9.82245 22.1144 8.78104L30.1144 0.781048ZM16 24C14.5273 24 13.3333 25.1939 13.3333 26.6667V56C13.3333 57.4728 14.5273 58.6667 16 58.6667H48C49.4728 58.6667 50.6667 57.4728 50.6667 56V26.6667C50.6667 25.1939 49.4728 24 48 24H42.6667C41.1939 24 40 22.8061 40 21.3333C40 19.8606 41.1939 18.6667 42.6667 18.6667H48C52.4184 18.6667 56 22.2484 56 26.6667V56C56 60.4184 52.4184 64 48 64H16C11.5817 64 8 60.4184 8 56V26.6667C8 22.2484 11.5817 18.6667 16 18.6667H21.3333C22.8061 18.6667 24 19.8606 24 21.3333C24 22.8061 22.8061 24 21.3333 24H16Z"/>
                </svg>
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
         <input class="uploader" type="file" />  
    </div>`;

    
    /**
     * Classe owner do componente
	 *
	 * @pmonteiro (yyyy-mm-dd)
     */
    class FWK_upload extends HTMLElement {

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
            this.files_area = this.container.querySelector('.files-area');
            this.drop_area = this.container.querySelector('.drop-area');
            this.tooltips = this.container.querySelector('.tooltips');
            this.information = this.tooltips.querySelector('.information')
            this._error = this.tooltips.querySelector('.error');
            this.error_text = this._error.querySelector('.tooltip');
            this.uploader = this.container.querySelector('.uploader');

            // Container interno de ficheiros
            this.files = {};
            // Tamanho máximo de upload
            this.upload_max_size = null;
            // Upload multiplo?
            this.upload_multiple = false;
            // Formatos
            this.formats = [];
            
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
         * @return array = Ficheiros candidato a upload (array of objects)
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        get value() {
            let value = [];
            Object.entries(this.files).forEach(([name, file]) => {  
                value.push(file);
            });
            return value;
        }


        // ------------------------------------------------------ ADICIONA OPÇÕES / REMOVE OPÇÕES

        /**
         * Refresca a lista de ficheiros para upload
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        refresh() {

            if (Object.entries(this.files).length != 0) {

                // Remove placeholder
                this.files_area.innerHTML = '';
                this.files_area.classList.remove('placeholder');

                // Referência do componente para EventListener de remoção de ficheiro
                var component = this;
                
                // Icon
                var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svg.classList.add('cancel');
                svg.setAttribute('viewBox', '0 0 64 64');
                let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('d','M64.125 9.6L54.525 0L32.125 22.4L9.725 0L0.125 9.6L22.525 32L0.125 54.4L9.725 64L32.125 41.6L54.525 64L64.125 54.4L41.725 32L64.125 9.6Z');
                svg.appendChild(path);

                // Para cada ficheiro na lista
                for (let [key, value] of Object.entries(this.files)) {

                    // Adiciona o texto e icon de remoção de ficheiro da lista de upload
                    let file_container = document.createElement("div");
                    file_container.className = 'file';

                    let svg_clone = svg.cloneNode(true);

                    // Evento de remoção de ficheiro
                    svg_clone.addEventListener("click", evt => {
                        evt.stopPropagation();
                        component.remove(key);
                    }) ;

                    let file_name = document.createElement('div');
                    file_name.className = 'file-name';
                    file_name.innerText = key;
                    file_container.appendChild(svg_clone);
                    file_container.appendChild(file_name);
                    this.files_area.appendChild(file_container);

                }

            }

        }

        /**
         * Remove ficheiro da lista para upload
         * 
         * @param string name = Nome do ficheiro a remover
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        remove(name) {

            // Remove o ficheiro da lista de upload
            delete this.files[name];

            // Prepara e adiciona  os ficheiros remanescentes ao "input file"
            let data_transfer = new DataTransfer();
            for (var [key, value] of Object.entries(this.files)) {
                data_transfer.items.add(value);
            }
            this.uploader.files = data_transfer.files; 

            // Mostra placeholder se já não restarem ficheiros
            if (data_transfer.files.length == 0) {
                this.files_area.innerText = this.getAttribute('placeholder') ? this.getAttribute('placeholder') : '';
                this.files_area.classList.add('placeholder');
            }
            
            // Refresca a lista de ficheiros
            this.refresh();

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
                let head = this.head;
                let files_area = this.files_area;
                let drop_area = this.drop_area;
                let tooltips = this.tooltips;
                let information = this.information;
                let uploader = this.uploader;

                // Gera random ID se não atribuído
                if (!component.hasAttribute('id')) {component.setAttribute('id',fwkGenerateRandomID('upload'));}

                // Cor
                if (component.hasAttribute('color') && ['blue'].includes(component.getAttribute('color'))) {
                    this.container.classList.remove('gray');
                    this.container.classList.add(component.getAttribute('color'));
                    component.removeAttribute('color');
                }
                
                // Tamanho (width) = default se não estiver definido no html do componente
                if (component.hasAttribute('width') && !isNaN(parseInt(component.getAttribute('width')))) {
                    head.style.width = component.getAttribute('width') + 'px';
                    component.classList.remove('width');
                    component.removeAttribute('width');
                }

                // Placeholder
                if (component.hasAttribute('placeholder') && component.getAttribute('placeholder') != '') {
                    files_area.innerText = component.getAttribute('placeholder');
                    files_area.classList.add('placeholder');
                }

                // Preenchimento obrigatório
                if (component.hasAttribute('mandatory') && component.getAttribute('mandatory') == 'true') {
                    head.classList.add('mandatory');
                    component.removeAttribute('mandatory');
                }

                // Multiplos ficheiros admitidos ?
                if (component.hasAttribute('multifiles') && component.getAttribute('multifiles') == 'true') {
                    uploader.setAttribute('multiple','');
                    component.upload_multiple = true;
                    component.removeAttribute('multifiles');
                }

                // Formatos admitidos
                    try {
                        component.formats = JSON.parse(component.getAttribute('formats')) ? JSON.parse(component.getAttribute('formats')) : [];
                        uploader.setAttribute('accept', component.formats.toString());
                    } catch (e) {}
                    component.removeAttribute('formats');

                // Tamanho (kb) máximo de ficheiro admitido
                if (component.hasAttribute('max-size') && component.getAttribute('max-size') != '') {
                    component.upload_max_size = parseInt(component.getAttribute('max-size'));
                    component.removeAttribute('max-size');
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

                // Se existe slot de informação, mostra-a
                let slots_information = component.shadowRoot.querySelector('slot[name="information"]');
                if (slots_information.assignedElements().length > 0) {
                    information.classList.remove('hide');
                } 
                slots_information.addEventListener('slotchange', evt => {
                    information.classList.remove('hide');
                }); 


                // Adiciona ficheiro(s) via selecção
                uploader.addEventListener('change', evt => {
                    evt.preventDefault();
                    
                    // Se o componente só admite o upload de 1 ficheiro, reinicializa a lista
                    if (!component.upload_multiple) {component.files = {};}

                    // Junta os ficheiros aos já existentes 
                    for (var i = 0; i < uploader.files.length; i++) {
                        // Verifica se já existe e se não excede o tamanho permitido
                        if (!component.files[uploader.files[i].name] && (!component.upload_max_size || uploader.files[i].size <= component.upload_max_size)) {
                            component.files[uploader.files[i].name] = uploader.files[i];
                        }
                    }  

                    // Prepara e adiciona os ficheiros ao "input file"
                    let data_transfer = new DataTransfer();
                    for (var [key, value] of Object.entries(component.files)) {
                        data_transfer.items.add(value);
                    }
                    uploader.files = data_transfer.files; 
                    
                    // Refresca a lista de ficheiros
                    component.refresh();

                });


                // Adiciona ficheiro(s) via drag & drop
                drop_area.addEventListener('click', evt => {
                    evt.preventDefault();
                    // Se o componente não está disable   
                    if (!container.classList.contains('disable')) {
                        uploader.click();
                    }
                });
                drop_area.addEventListener('dragover', evt => {
                    evt.preventDefault();
                    evt.dataTransfer.effectAllowed = "move";
                    // Se o componente não está disable   
                    if (!container.classList.contains('disable')) {
                        drop_area.classList.add('border_hover');
                    }
                });
                drop_area.addEventListener('dragleave', evt => {
                    evt.preventDefault();
                    // Se o componente não está disable  
                    if (!container.classList.contains('disable')) {
                        drop_area.classList.remove('border_hover');
                    }
                });
                drop_area.addEventListener('drop', evt => {
                    evt.preventDefault();

                    // Se o componente não está disable   
                    if (!container.classList.contains('disable')) {
                        
                        drop_area.classList.remove('border_hover');
                        
                        // ficheiros candidatos
                        let candidate_files = evt.dataTransfer.files;
                    
                        // Se o componente só admite o upload de 1 ficheiro, reinicializa a lista
                        if (!component.upload_multiple) {component.files = {};}

                        // Junta os ficheiros aos já existentes
                        for (var i = 0; i < candidate_files.length; i++) {
                            // Verifica se já existe e se não excede o tamanho permitido
                            if (!component.files[candidate_files[i].name] 
                                && (!component.upload_max_size || candidate_files[i].size <= component.upload_max_size) 
                                && (component.formats.length == 0 || component.formats.includes(`.${candidate_files[i].name.split('.').pop().toLowerCase().trim()}`))) {
                                component.files[candidate_files[i].name] = candidate_files[i];
                                // Termina o loop se o componente só admite o upload de 1 ficheiro
                                if (!component.upload_multiple) {break;}
                            }
                        }           

                        // Prepara e adiciona os ficheiros ao "input file"
                        let data_transfer = new DataTransfer();
                        for (var [key, value] of Object.entries(component.files)) {
                            data_transfer.items.add(value);
                        }
                        uploader.files = data_transfer.files;   
                        
                        // Refresca a lista de ficheiros
                        component.refresh();

                    }
                
                });

            }

            this.dom_ready = true;

        }

    }

  // Adiciona o componente à lista de componentes customizados
  customElements.define('fwk-upload', FWK_upload);

})();
// --- END