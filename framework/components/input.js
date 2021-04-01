/**
 * FRAMEWORK - COMPONENTS - INPUT
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
            --component-width: 250px;
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
            height: var(--component-height);
            border-width: 1px 1px 1px 2px;
            border-style: solid;
            border-color: var(--border-color);
            background-color: var(--component-background-color);
            padding: 0px 3px;
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
        .container .head .input {
            font-size: var(--font-size);
            line-height: var(--line-height);
            color: var(--color);
            border: none;
            width: calc(100% - 6px);
            padding: 2px 3px 0px;
            align-self: center;
        }
        .container.disable .head .input {
            cursor: not-allowed;
            --color: var(--disable-color);
        }

    </style>

    <!--- html do componente -->
    <div id="fwk_input" class="container gray">
        <div class="head">
            <input type="text" class="input"></input>
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
    class FWK_input extends HTMLElement {

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
            this.input = this.head.querySelector('input');
            this.tooltips = this.container.querySelector('.tooltips');
            this.information = this.tooltips.querySelector('.information')
            this._error = this.tooltips.querySelector('.error');
            this.error_text = this._error.querySelector('.tooltip');

            // Defaults
            // Tipo 
            this.type = 'text';

            // Formato de data a apresentar (prioridade: html -> sessionStorage -> 'y-m-d')
            this.format = sessionStorage.getItem('date_format');
            if (!this.format) {this.format = 'y-m-d'};

            // Focus
            this.addEventListener('focus', evt => {
                this.container.classList.add('focus');
            });
            this.addEventListener('focusout', evt => {
                this.container.classList.remove('focus');
            });
    
        }

        focus() {this.input.focus();}


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
                        document.getElementById(this.id+'_label').hide = false;;
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
                this.input.setAttribute('disabled','disabled');
            }     
            else if (value === false) {
                this.container.classList.remove('disable');
                this.input.removeAttribute('disabled');
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
            var result = '';

            let datetime, date, day, month, year, time = null;
            let value = this.input.value.trim();
            if (value != '') {
                switch(this.type) {
                    case 'datetime':
                        datetime = this.input.value.replaceAll('/', '-').trim().split(' ');
                        date = datetime[0].split('-');
                        day = date[0].padStart(2,'0');
                        month = (date[1] ? date[1] : '').padStart(2,'0');
                        year = (date[2] ? date[2] : '')
                        time = (datetime[1] ? datetime[1] : '00:00');
                        result = `${year}-${month}-${day} ${time}`;
                    break;
                    case 'date':
                        date = this.input.value.replaceAll('/', '-').trim().split('-');
                        day = date[0].padStart(2,'0');
                        month = (date[1] ? date[1] : '').padStart(2,'0');
                        year = (date[2] ? date[2] : '')
                        result = `${year}-${month}-${day}`;
                    break;
                    default:
                        result = this.input.value.trim()
                    break;
                } 
            }

            return result;
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

            if (value != '') {
                switch(this.type) {
                    case 'datetime':
                    case 'date':
                    case 'time':
                        //Processa o valor
                        value = this.processDateTime(value);
                        if (value.success) {  
                            // Coloca a data ou data/hora no input
                            this.input.value = value.formated;
                            // Carrega valores isolados
                            this.year = value.year;
                            this.month = value.month;
                            this.day = value.day;
                            this.hour = value.hour;
                            this.minute = value.minute;
                        }
                    break
                    default:
                        // Coloca o valor no input
                        this.input.value = value;
                    break

                }
            } else {
                this.input.value = value;
            }
        }


        // ------------------------------------------------------ DATA / DATA HORA / HORA

        /**
         * Processamento de data, data/hora ou hora (em bruto)
         * 
         * @param string value = Data, data/hora ou hora (formatos admitidos: yyyy-mm-dd ou yyyy-mm-dd hh:ss ou hh:mm)
         * 
         * @return object = {
         *                  bool success (? valor válido),
         *                  int year,
         *                  int month,
         *                  int day,
         *                  int hour,
         *                  int minute
         *                  }
         * 
         * @pmonteiro (yyyy-mm-dd)
         */ 
        processDateTime(value) {

            // Separador de processamento
            let sep = '-';
            
            // Incializa objecto de resposta
            let result = {success:false, formated:''};
            let  year, month, day, hour, minute = '';

            // Se exite data
            if (this.type == 'date'|| this.type == 'datetime') {

                // Separador de processamento
                let sep = '-';
                // Separa data (com separador "/") da hora (se existir)
                let datetime = value.replaceAll('/', '-').trim().split(' ');
                // Separa a data nos seus elementos
                let date = datetime[0].split('-');
                year = date[0];
                month = (date[1] ? date[1] : '').padStart(2,'0');
                day = (date[2] ? date[2] : '').padStart(2,'0');
    
                // Valida data
                var regexp = /^((((19|[2-9]\d)\d{2})\-(0[13578]|1[02])\-(0[1-9]|[12]\d|3[01]))|(((19|[2-9]\d)\d{2})\-(0[13456789]|1[012])\-(0[1-9]|[12]\d|30))|(((19|[2-9]\d)\d{2})\-02\-(0[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))\-02\-29))$/;
                if (regexp.test(`${year}${sep}${month}${sep}${day}`)) {
                    // Muda separador de processamento para separador de formato de display (se solicitado)
                    if (this.format.indexOf('/') !== -1) {sep = '/';}
                    switch (this.format) {
                        case "d/m/y":
                        case "d-m-y":
                            result.success = true;
                            // Formato de display
                            result.formated = `${day}${sep}${month}${sep}${year}`;
                            break;
                        case "y/m/d":    
                        case "y-m-d":
                            result.success = true;
                            // Formato de display
                            result.formated = `${year}${sep}${month}${sep}${day}`;
                            break;
                    }
                }
            }

           // Se existe hora
           if (this.type == 'datetime'|| this.type == 'time') {
                // Separa a hora nos seus elementos
                let time = '??';
                if (this.type == 'time') {
                    value = value.split(':');
                    if (value[0] && value[0] != '' && value[1] && value[1] != '') {
                       time = value;
                    }
                } else if (this.type == 'datetime') {
                    result.formated += ' ';
                    value = value.split(' ');
                    if (value[1]) {
                        value = value[1].split(':');
                        if (value[0] && value[0] != '' && value[1] && value[1] != '') {
                           time = value;
                        }
                    } else {
                        time = ['0','0']
                    }
                }
                hour = time[0].padStart(2,'0');
                minute = time[1].padStart(2,'0');

                // Valida hora
                if ((this.type == 'datetime' && result.success) || this.type == 'time') {
                    var regexp = /^([0-1]?[0-9]|[2][0-3])(:([0-5]?[0-9])(:([0-5]?[0-9]))?)?$/;
                    if (regexp.test(`${hour}:${minute}`)) {
                        // Formato de display
                        result.formated += `${hour}:${minute}`;
                        result.success = true;
                    } else {
                        // Se inválida, todo o resultado é inválido
                        result.success = false;
                        delete result.formated;
                    }
                }

            }

            return result;

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
                let input = this.input;
                let tooltips = this.tooltips;
                let information = this.information;

                // Gera random ID se não atribuído
                if (!component.hasAttribute('id')) {component.setAttribute('id',fwkGenerateRandomID('input'));}

                // Tipo
                if (component.hasAttribute('type') && ['password', 'integer', 'decimal', 'datetime', 'date', 'time', 'email'].includes(component.getAttribute('type'))) {
                    if (component.getAttribute('type') == 'password') {
                        input.setAttribute('type', 'password');
                    } else {
                        input.setAttribute('subtype', component.getAttribute('type'));
                    }
                    component.type = component.getAttribute('type');
                    component.removeAttribute('type');
                }

                // Formato (data)
                if (component.hasAttribute('format') && ['y-m-d', 'd-m-y', 'y/m/d', 'd/m/y'].includes(component.getAttribute('format'))) {
                    component.format = component.getAttribute('format');
                    component.removeAttribute('format');
                }

                // Tamanho (width) = default se não estiver definido no html do componente
                if (component.hasAttribute('width') && !isNaN(parseInt(component.getAttribute('width')))) {
                    container.style.width = component.getAttribute('width') + 'px';
                    component.removeAttribute('width');
                }

                // Placeholder
                if (component.hasAttribute('placeholder') && component.getAttribute('placeholder') != '') {
                    input.setAttribute('placeholder',component.getAttribute('placeholder'));
                    component.removeAttribute('placeholder'); 
                }

                // Preenchimento obrigatório
                if (component.hasAttribute('mandatory') && component.getAttribute('mandatory') == 'true') {
                    head.classList.add('mandatory');
                    component.removeAttribute('mandatory'); 
                }

                // Estado activo / Inactivo
                if (component.hasAttribute('disable') && component.getAttribute('disable') == 'true') {
                    component.disabe = true;
                    component.removeAttribute('disable'); 
                }

                // Estado visível / invisível
                if (component.hasAttribute('hide') && component.getAttribute('hide') == 'true') {
                    component.hide = true;
                    component.removeAttribute('hide');
                }

                // maxlength
                switch(component.type) {
                    // Por tipo
                    case 'datetime':
                        input.setAttribute('maxlength', '16');
                    break;
                    case 'date':
                        input.setAttribute('maxlength', '10');
                        
                    break;
                    case 'time':
                        input.setAttribute('maxlength', '5');
                    break;
                    default:
                        if (component.hasAttribute('maxlength') && component.getAttribute('maxlength') != '') {
                            input.setAttribute('maxlength', component.getAttribute('maxlength'));
                            component.removeAttribute('maxlength'); 
                        }
                    break; 
                }

                // Valor
                if (component.hasAttribute('value') && component.getAttribute('value') != '') {
                    component.value = component.getAttribute('value');
                    component.removeAttribute('value');

                }

                // Posição Tooltip
                if (component.hasAttribute('tooltip-position') && ['left'].includes(component.getAttribute('tooltip-position'))) {
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
    customElements.define('fwk-input', FWK_input);

})();
// --- END