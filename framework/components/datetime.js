/**
 * FRAMEWORK - COMPONENTS - DATETIME
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
        /* css comum a vários componentes */
        @import "/framework/components/shared_tooltips.css";

        /* variáveis */
        .container {
            --component-width: 175px;
            --selector-icon-size: 14px;
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
            --body-color: var(--gray-medium);
            --body-background-hover-color: var(--gray-ultralight);
            --body-hover-color: var(--gray-dark);
            --week-number-color: var(--blue-light);
            --weekend-day-color: var(--blue-light);
            --selected-color: var(--gray-medium);
            --hour-background-color: var(--gray-ultralight);
            --hour-border-color: var(--gray-medium);
            --placeholder-color: var(--gray-placeholder);
            --disable-color: var(--gray-disable);
        }
        .container.blue {
            --border-color: var(--blue-dark);
            --head-hover-color: var(--blue-dark);
            --head-border-color: var(--blue-light);
            --head-color: var(--blue-medium);
            --head-icon-color: var(--blue-light);
            --body-color: var(--blue-medium);
            --body-background-hover-color: var(--blue-ultralight);
            --body-hover-color: var(--blue-dark);
            --week-number-color: var(--gray-light);
            --weekend-day-color: var(--gray-light);
            --selected-color: var(--blue-medium);
            --hour-background-color: var(--blue-ultralight);
            --hour-border-color: var(--blue-medium);
            --placeholder-color: var(--blue-placeholder);
            --disable-color: var(--blue-disable);
        }

        /* área de visualização de selecção actual, cancelamento de selecção e trigger para área de selecção */
        .container .head {
            display: flex;
            box-sizing: border-box;
            border-width: 1px 1px 1px 2px;
            border-style: solid;
            color: var(--head-color);
            border-color: var(--head-border-color);
            background-color: var(--component-background-color);
            height: var(--component-height);
            padding: 0px 3px; 
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

        /* vista anos de década */
        .container .body .decade-years {
            display: flex;
            width: 100%;
            flex-wrap: wrap;
            flex-direction: row;
            justify-content: center;
            padding: 4px 0px;
        }
        .container .body .decade-years.hide {
            display: none;
        }
        .container .body .decade-years .year {
            display: flex;
            padding: 4px;
            justify-content: center;
            width: 40%;
            cursor: pointer;
        }
        .container .body .decade-years .year:not(.selected):hover {
            background-color: var(--body-background-hover-color);
        } 
        /* ano seleccionado */
        .container .body .decade-years .year.selected {
            background-color: var(--selected-color);
            color: white;
        }

        /* meses de ano */
        .container .body .year-months {
            display: flex;
            width: 100%;
            flex-wrap: wrap;
            flex-direction: row;
            justify-content: center;
            padding: 4px 0px;
        }
        .container .body .year-months.hide {
            display: none;
        }
        .container .body .year-months .month {
            display: flex;
            padding: 4px;
            justify-content: center;
            width: 40%;
            cursor: pointer;
        }
        .container .body .year-months .month:not(.selected):hover {
            background-color: var(--body-background-hover-color);
        } 
        /* mes seleccionado */
        .container .body .year-months .month.selected {
            background-color: var(--selected-color);
            color: white;
        }

        /* selecção actual */
        .container .head .choice {
            line-height: var(--line-height);
            overflow: hidden;
            white-space: nowrap;
            margin-right: auto;
            text-overflow: ellipsis; 
            align-self: center; 
            padding: 2px 0px 0px 3px;
            width: calc(100% - var(--head-icon-size) * 2 - 20px);
        }
        .container .head .choice.placeholder {
            color: var(--placeholder-color);
            font-style: italic;
        }

        /* icone de cancel */
        .container .head .cancel {
            cursor: pointer;
            align-self: center;
            width: var(--head-icon-size);
            padding: 0px 4px;
            fill: var(--head-icon-color);
        }  
        .container:not(.disable) .head .cancel:hover {
            fill: var(--head-hover-color);
        }
        .container.disable .head .cancel {
            display: none;
        }    

        /* icone de controlo de body */
        .container .head .body-handle {
            cursor: pointer;
            align-self: center;
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
            background-color: var(--component-background-color);
            color: var(--body-color);
            fill: var(--body-color);
            border: 1px solid var(--border-color);
            box-shadow: 3px 3px 10px 0px rgba(0,0,0,0.35);
            width: var(--component-width);
        }
        .container.week .body {
            width: 200px;
        }
        .container .body.hide {
            display: none;
        }

        /* área selectora de vista */
        .container .body .selector {
            display: flex;
            height: 34px;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            border-bottom: 1px solid var(--border-color);
        }
        /* icone de anterior e seguinte */
        .container .body .selector .previous, .container .body .selector .next {
            width: var(--selector-icon-size);
            padding: 0px 4px;
        }  
        .container .body .selector .previous:hover, .container .body .selector .next:hover {
            fill: var(--body-hover-color);
            cursor: pointer;
        }  
        /* botão vista superior */
        .container .body .selector .button {
            display: flex;
            align-content: center;
            justify-content: center;
            white-space: nowrap;
            min-width: 100px;
            height: min-content;
            padding: 5px 8px 4px;
        } 
        .container .body .selector .button:not(.noaction):hover {
            background-color: var(--body-background-hover-color);
            cursor: pointer;
        } 

        /* área de calendário */
        .container .body .calendar { 
            display: flex;
            width: 100%;
            justify-content: center;
            flex-direction: column;
            padding-bottom: 4px;
        } 
        .container .body .calendar.hide {
            display: none;
        }

        /* dias da semana */
        .container .body .calendar .week_days { 
            display: flex;
            flex-direction: row;
            color: white;
            padding: 0px 2px 0px 2px;
            margin-bottom: 4px;
            background-color: var(--body-color);
        }
        .container .body .calendar .week_days .day {
            display: flex;
            width: 22px;
            height: 22px; 
            padding: 5px;
            align-items: center;
            justify-content: center;
            margin: 1px;
        }
        .container .body .calendar .week_days .day.empty {
            width: 26px;
            margin: 0px;
            display: flex;
        }
        .container:not(.week) .body .calendar .week_days .day:nth-child(1) {
            display: none;
        }
        /* semanas */
        .container .body .calendar .week {
            display: flex;
            flex-direction: row;
            margin: 0px 3px;
        }
        /* número da semana */
        .container .body .calendar .week .number {
            display: flex;
            box-sizing: border-box;
            width: 20px;
            height: 20px; 
            padding: 5px;
            border: 1px dotted var(--week-number-color);
            color: var(--week-number-color);
            margin: 2px 2px 1px 2px;
            align-items: center;
            justify-content: center;
        }
        .container:not(.week) .body .calendar .week .number:nth-child(1) {
            display: none;
        }
        /* dias da semana */
        .container .body .calendar .week .day {
            display: flex;
            box-sizing: border-box;
            width: 22px;
            height: 22px; 
            padding: 5px;
            margin: 1px;
            align-items: center;
            justify-content: center;
        }
        .container .body .calendar .week .day.today {
            border: 1px solid var(--body-color);
        }
        .container .body .calendar .week .day:not(.empty):hover {
            cursor: pointer;
        }
        .container .body .calendar .week .day:not(.empty):not(.selected):hover {
            background-color: var(--body-background-hover-color);
            border: none;
        }
        /* dias de fim de semana */
        .container .body .calendar .week .day:nth-child(7), .container .body .calendar .week  .day:nth-child(8) {
            display: flex;
            width: 22px;
            height: 22px; 
            color: var(--weekend-day-color);
            align-items: center;
            justify-content: center;
            margin: 1px;
        }
        /* dia seleccionado */
        .container .body .calendar .week .day.selected {
            background-color: var(--selected-color);
            color: white;
            border: none;
        }

        /* botão today */
        .container .body > .today {
            display: flex;
            align-content: center;
            justify-content: center;
            white-space: nowrap;
            width: 100%;
            height: min-content;
            box-sizing: border-box;
            padding: 5px 8px 4px;
            border-top: 1px solid var(--border-color);
        } 
        .container .body > .today.hide {
            display: none;
        } 
        .container .body > .today:hover {
            background-color: var(--body-background-hover-color);
            cursor: pointer;
        } 

        /* área de horas do dia / minutos da hora */
        .container .body .day-hours, .container .body .hour-minutes {
            display: flex;
            width: 100%;
            flex-wrap: wrap;
            flex-direction: row;
            justify-content: center;
            padding: 4px 0px;
        }
        .container .body .day-hours.hide, .container .body .hour-minutes.hide {
            display: none;
        }
        .container .body .day-hours .hour, .container .body .hour-minutes .minute {
            display: flex;
            padding: 4px;
            justify-content: center;
            width: 20%;
            cursor: pointer;
        }
        .container .body .day-hours .hour:not(.selected):hover, .container .body .hour-minutes .minute:not(.selected):hover {
            background-color: var(--body-background-hover-color);
        } 
        .container .body .day-hours .hour.selected, .container .body .hour-minutes .minute.selected {
            background-color: var(--selected-color);
            color: white;
        }

        /* área de minutos da hora (auxiliar) */
        .container .body .hour-minutes-aux {
            display: flex;
            justify-content: center;
            background-color: var(--hour-background-color);
        }
        .container .body .hour-minutes-aux.hide {
            display: none;
        }

        .container .body .hour-minutes-aux div {
            justify-content: center;
            align-self: center;
            width: min-content;
            padding-top: 1px;
            white-space: nowrap;
        }
        .container .body .hour-minutes-aux input {
            font-size: var(--font-size);
            color: var(--color);
            border: 1px solid var(--hour-border-color);
            padding: 2px 3px 1px;
            margin: 4px;
            width: 26px;
            box-sizing: border-box;
            text-align: center;
            background-color: var(--component-background-color);
        }

    </style>

    <!--- html do componente -->
    <div id="fwk_datetime" class="container gray">
        <div class="head">
            <div class="choice placeholder"></div>
            <svg class="cancel" viewBox="0 0 64 64">
                <path d="M64.125 9.6L54.525 0L32.125 22.4L9.725 0L0.125 9.6L22.525 32L0.125 54.4L9.725 64L32.125 41.6L54.525 64L64.125 54.4L41.725 32L64.125 9.6Z"/>
            </svg>
            <svg class="body-handle" viewBox="0 0 64 64">
                <path d="M41.6 44L64 21.6L54.4 12L32 34.4L9.6 12L0 21.6L32 52.8625"/>
            </svg>
        </div>
        <div class="body hide">
            <div class="selector">
                <svg class="previous" viewBox="0 0 64 64">
                    <path d="M20 41.6L42.4 64L52 54.4L29.6 32L52 9.6L42.4 0L11.1375 32"/>
                </svg>
                <div class="button"></div>
                <svg class="next" viewBox="0 0 64 64">
                    <path d="M44 22.4L21.6 0L12 9.6L34.4 32L12 54.4L21.6 64L52.8625 32"/>
                </svg>
            </div>
            <div class="decade-years hide"></div>
            <div class="year-months hide"></div>
            <div class="calendar"></div>
            <div class="today hide"></div>
            <div class="day-hours hide"></div>
            <div class="hour-minutes hide"></div>
            <div class="hour-minutes-aux hide">
                <div></div>
                <input type="text" maxlength="2"></input>
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
    class FWK_datetime extends HTMLElement {

        /**
         * Contructor
         * 
         * Disponibiliza as áreas de operação em propriedades da classe
         * 
         * @pmonteiro (yyyy-mm-dd-)
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
            this.cancel = this.head.querySelector('.cancel');
            this.body_handle = this.head.querySelector('.body-handle')
            this.body = this.container.querySelector('.body');
            this.decade_years = this.body.querySelector('.decade-years');
            this.year_months = this.body.querySelector('.year-months');
            this.calendar = this.body.querySelector('.calendar');
            this.day_hours = this.body.querySelector('.day-hours');
            this.hour_minutes = this.body.querySelector('.hour-minutes');
            this.hour_minutes_aux = this.body.querySelector('.hour-minutes-aux');
            this.hour_aux = this.hour_minutes_aux.querySelector('div');
            this.minute_aux = this.hour_minutes_aux.querySelector('input');
            this.selector = this.body.querySelector('.selector');
            this.selector_previous = this.selector.querySelector('.previous');
            this.selector_next = this.selector.querySelector('.next');
            this.selector_button = this.selector.querySelector('.button');
            this.today_button = this.body.querySelector('.today');
            this.tooltips = this.container.querySelector('.tooltips');
            this.information = this.tooltips.querySelector('.information')
            this._error = this.tooltips.querySelector('.error');
            this.error_text = this._error.querySelector('.tooltip');

            // Idiomas
            this.pt_PT = {
                // Hoje
                today: 'Hoje',
                // Dias da semana
                week_days: ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
                // Meses
                months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
            };
            this.es_ES = {
                // Hoje
                today: 'Hoy',
                // Dias da semana
                week_days: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
                // Meses
                months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
            };
            this.fr_FR = {
                // Hoje
                today: 'Aujourd\'hui',
                // Dias da semana
                week_days: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
                // Meses
                months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
            };
            this.en_US = {
                // Hoje
                today: 'Today',
                // Dias da semana
                week_days: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
                // Meses
                months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            };


            // Dia de hoje
            let today = new Date();
            this.today_day = today.getDate();
            this.today_month = today.getMonth();
            this.today_year = today.getFullYear();

            // Defaults
            // Idioma (prioridade: html -> sessionStorage -> 'pt_PT')
            // A variável transforma-se no array após a leituta do atributo
            this.language = sessionStorage.getItem('language');
            if (!this.language) {this.language = 'pt_PT'};
            this.language = this[this.language];

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
         * Devolve data ou data hora (conforme o tipo de componente)
         * 
         * @return string = Valor da opção
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        get value() {
            // Só existe valor se existe ano
            if (this.selected_year) {
                if (this.has_time) {
                    return this.datetime;
                } else {
                    return this.date;
                }
            } else {
                return '';
            }
        }

        /**
         * Selecciona / Cancela uma opção
         *
         * @param string value = Valor da opção
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        set value(value) {
            if (value != '') {

                // Separa a data ou data/hora nas suas partes e formata
                value = this.processDateTime(value);
                
                // Se é um data ou data hora
                if (value.success) {

                    // Coloca a data ou data/hora seleccionada na área de visualização
                    this.choice.classList.remove('placeholder');
                    this.choice.innerText = value.formated;

                    // Carrega valores seleccionados e candidatos
                    this.selected_year = this.candidate_year = value.year;
                    this.selected_month = this.candidate_month = value.month;
                    this.selected_day = this.candidate_day = value.day;
                    this.selected_hour = this.candidate_hour = value.hour;
                    this.selected_minute = this.candidate_minute = value.minute;
                    
                }
            } else {
                this.unselect();
            }
        }


        /**
         * Devolve valores
         * Só existem valores se dia existir
         * 
         * @return string = Valor
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        // yyyy-mm-dd hh:mm
        get datetime() {
            // Só existe valor se existe ano
            if (this.selected_year) {
                return `${this.selected_year}-${String(this.selected_month + 1).padStart(2, '0')}-${String(this.selected_day).padStart(2, '0')} ${String(this.selected_hour).padStart(2, '0')}:${String(this.selected_minute).padStart(2, '0')}`;
            } else {
                return '';
            }
        }
        // yyyy-mm-dd
        get date() {
            // Só existe valor se existe ano
            if (this.selected_year) {
                return `${this.selected_year}-${String(this.selected_month + 1).padStart(2, '0')}-${String(this.selected_day).padStart(2, '0')}`;
            } else {
                return '';
            }
        }
        // yyyy
        get year() {
            // Só existe valor se existe ano
            if (this.selected_year) {
                return `${this.selected_year}`;
            } else {
                return '';
            }
        }
        // mm
        get month() {
            // Só existe valor se existe ano
            if (this.selected_year) {
                return `${String(this.selected_month + 1).padStart(2, '0')}`;
            } else {
                return '';
            }
        }
        // ww
        get week() {
            // Só existe valor se existe ano
            if (this.selected_year) {
                return this.getWeekNumber(this.selected_year, this.selected_month, this.selected_day);
            } else {
                return '';
            }
        }
        // dd
        get day() {
            // Só existe valor se existe ano
            if (this.selected_year) {
                return `${String(this.selected_day).padStart(2, '0')}`;
            } else {
                return '';
            }
        }
        // hh:mm
        get time() {
            // Só existe valor se existe ano
            if (this.selected_year) {
                return `${String(this.selected_hour).padStart(2, '0')}:${String(this.selected_minute).padStart(2, '0')}`;
            } else {
                return '';
            }
        }
        // hh
        get hour() {
            // Só existe valor se existe ano
            if (this.selected_year) {
                return `${String(this.selected_hour).padStart(2, '0')}`;
            } else {
                return '';
            }
        }
        // mm
        get minute() {
            // Só existe valor se existe ano
            if (this.selected_year) {
                return `${String(this.selected_minute).padStart(2, '0')}`;
            } else {
                return '';
            }
        }
        

        // ------------------------------------------------------ CANCELA SELECÇÃO

        /**
         * Remove a selecção actual   
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */    
        unselect() {

            // Remove a data ou data/hora da área de visualização e coloca o placeholder
            this.choice.innerText = this.getAttribute('placeholder') ? this.getAttribute('placeholder') : '';
            this.choice.classList.add('placeholder');

            // Limpa valores seleccionados e candidatos
            this.candidate_year = this.today_year;
            this.candidate_month = this.today_month;
            this.selected_year = this.selected_month = this.selected_day = this.selected_hour = this.selected_minute = null;
            this.candidate_day = this.candidate_hour = this.candidate_minute = null;
            this.minute_aux.value = ''; 

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

            // Repõe os valores candidatos pelos seleccionados
            // para, se fecha antes de finalizar selecção, os valores candidatos
            // passsem a ser os da selecção anterior
            this.candidate_year = this.selected_year;
            this.candidate_month = this.selected_month;
            this.candidate_day = this.selected_day;
            this.candidate_hour = this.selected_hour;
            this.candidate_minute = this.selected_minute;
            this.minute_aux.value = '';

            this.body.classList.add('hide');
            this.container.classList.remove('open');
            this.body_handle.classList.remove('rotate');
            fwk_components_control.open = null;
        }


        // ------------------------------------------------------ VISTAS GERADAS

        /**
         * Activa e mostra uma vista pelo seu identificador
         * É um "proxy"
         * 
         * @param string view = Identificador da vista
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */ 
        showView(view) {

            // Esconde todas as vistas
            this.decade_years.classList.add('hide');
            this.year_months.classList.add('hide');
            this.calendar.classList.add('hide');
            this.today_button.classList.add('hide');
            this.day_hours.classList.add('hide');
            this.hour_minutes.classList.add('hide');
            this.hour_minutes_aux.classList.add('hide');

            // Actualiza vista activa
            this.active_view = view;

            switch(view) {
                // Decada / anos
                case 'DY':
                    // Coloca o ano como "caption" do botão selector de vista
                    this.selector_button.innerText = this.candidate_year;
                    this.selector_button.classList.add('noaction');
                    // Mostra
                    this.decade_years.classList.remove('hide');
                    this.showDecadeYears();
                break;
                // Ano / meses
                case 'YM':
                    // Coloca o ano como "caption" do botão selector de vista
                    this.selector_button.innerText = this.candidate_year;
                    this.selector_button.classList.remove('noaction');
                    // Mostra
                    this.year_months.classList.remove('hide');
                    this.preSetMonth();
                break;
                // Mês / dias (calendário)
                case 'MD':
                    // Coloca o mês e ano como "caption" do botão selector de vista
                    this.selector_button.innerText = `${this.language.months[this.candidate_month]} ${this.candidate_year}`;
                    this.selector_button.classList.remove('noaction');
                    // Mostra
                    this.calendar.classList.remove('hide');
                    this.today_button.classList.remove('hide');
                    this.showCalendar();
                break;
                // Dia / horas
                case 'DH':
                    // Coloca o mês e ano como "caption" do botão selector de vista
                    this.selector_button.innerText = `${String(this.candidate_day).padStart(2,'0')} ${this.language.months[this.candidate_month]} ${this.candidate_year}`;
                    this.selector_button.classList.remove('noaction');
                    // Mostra
                    this.day_hours.classList.remove('hide');
                    this.preSetHour();
                break;
                // Hora / minutos
                case 'HM':
                    // Coloca o mês e ano como "caption" do botão selector de vista
                    this.selector_button.innerText = `${String(this.candidate_day).padStart(2,'0')} ${this.language.months[this.candidate_month]} ${this.candidate_year}`;
                    this.selector_button.classList.remove('noaction');
                    // Mostra
                    this.hour_minutes.classList.remove('hide');
                    this.hour_minutes_aux.classList.remove('hide');
                    this.showHourMinutes();

                break;
            }

        }

        /**
         * Gera e mostra a vista decada / anos
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */ 
        showDecadeYears() {

            // Limpa o container
            this.decade_years.innerHTML = '';

            // Calcula o primeiro ano da decada (do ano candidato)
            let first_year = parseInt(this.candidate_year/100)*100;
            first_year = first_year+ parseInt((this.candidate_year-first_year)/10)*10;

            // Coloca o intervalo de anos da década como "caption" do botão selector de vista
            this.selector_button.innerText = `${first_year} - ${first_year+9}`;

            // Adiciona anos à decada
            // Para cada um dos 10 anos da década
            for (let i = first_year; i < first_year + 10; i++) {
                
                // Cria e adiciona a célula do ano
                let decade_year = document.createElement("div");
                decade_year.classList.add('year');
                decade_year.setAttribute('data-value', i);

                // Texto
                decade_year.innerText = i;

                // Estilo de "seleccionado"
                if (i == this.selected_year) {decade_year.classList.add('selected');}

                // Evento click do ano
                decade_year.addEventListener('click', evt => {
                    // Altera ano candidato
                    this.candidate_year = parseInt(evt.currentTarget.getAttribute('data-value'));
                    this.showView('YM');
                });

                // Adiciona ano à decada
                this.decade_years.appendChild(decade_year);

            }

        }

        /**
         * Gera e mostra a vista Mês / dias (calendário)
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */ 
       showCalendar() {

            // Limpa o container
            this.calendar.innerHTML = '';

            // Valores candidatos ou default
            this.candidate_year = this.candidate_year ? this.candidate_year : this.today_year;
            this.candidate_month = (this.candidate_month || this.candidate_month == 0) ? this.candidate_month : this.today_month;;

            // Calculos relativos à apresentação do calendário do ano/mês
            let first_day_date = new Date();
            first_day_date.setFullYear(this.candidate_year);
            first_day_date.setDate(1);
            first_day_date.setMonth(this.candidate_month);

            // Calcula o número relativo da primeira semana do mês no ano
            let week_number = this.getWeekNumber(this.candidate_year, this.candidate_month);

            // Coloca o mês e ano como "caption" do botão selector de vista
            this.selector_button.innerText = `${this.language.months[this.candidate_month]} ${this.candidate_year}`;

            // Cabeçalho com dias da semana
            let week_days = document.createElement("div");
            week_days.classList.add('week_days');

            // Espaço canto superior esquerdo
            let day = document.createElement("div");
            day.classList.add('day');
            day.classList.add('empty')
            week_days.appendChild(day);

            // Adiciona cada um dos 7 dias da semana
            for (let i = 0; i < 7; i++) {
                let day = document.createElement("div");
                day.classList.add('day');
                // Texto
                day.innerText = this.language.week_days[i];
                week_days.appendChild(day);
            }
            // Adiciona dias ao cabeçalho
            this.calendar.appendChild(week_days);

            // Dia da semana para o dia 1
            let first_month_week_day = this.getWeekDay(this.candidate_year, this.candidate_month);
            
            // Adiciona dias ao calendário
            // Para cada um dos dias do mês
            for (let i = 1; i <= this.getMonthDays(this.candidate_year, this.candidate_month); i++) {
                
                //  Se é o primeiro dia da semana 
                if ([1, 9-first_month_week_day, 
                    9-first_month_week_day+7, 
                    9-first_month_week_day+14, 
                    9-first_month_week_day+21, 
                    9-first_month_week_day+28].includes(i)) {
                    
                    // Se não é a primeira semana adiciona a semana anterior ao calendário
                    if (i>1) {this.calendar.appendChild(week_row);}

                    // Adiciona a célula com o número relativo da semana no ano
                    var week_row = document.createElement("div");
                    week_row.classList.add('week');
                    let week = document.createElement("div");
                    week.classList.add('number');
                    week.innerText = week_number;
                    week_row.appendChild(week);
                    week_number++;
                }

                // Para o primeiro dia, adiciona as células vazias à esquerda 
                if (i==1) {
                    for (let j = 1; j < first_month_week_day; j++) {
                        let day = document.createElement("div");
                        day.classList.add('day');
                        day.classList.add('empty');
                        week_row.appendChild(day);
                    }
                }

                // Cria e adiciona a célula do dia
                let day = document.createElement("div");
                day.classList.add('day');

                // Texto
                day.innerText = i;

                // Estilo de "hoje"
                if (this.candidate_year == this.today_year && this.candidate_month == this.today_month && i == this.today_day) {
                    day.classList.add('today');
                }
                // Estilo de "seleccionado"
                if (this.selected_year == this.candidate_year && this.selected_month == this.candidate_month && i == this.candidate_day) {
                    day.classList.add('selected');
                }

                // Evento click do dia
                day.addEventListener('click', evt => {
                    // Estilo de "seleccionado" anterior
                    let previous_selected = this.calendar.querySelector('.selected');
                    if (previous_selected) {
                        previous_selected.classList.remove('selected');
                    }
                    evt.currentTarget.classList.add('selected');

                    // Guarda a selecção candidata
                    this.candidate_day = parseInt(evt.currentTarget.innerText);

                    // Se o componente gere hora
                    if (this.has_time) {
                        // Coloca o dia, mês e ano como "caption" do botão selector de vista
                        this.selector_button.innerText = `${String(this.candidate_day).padStart(2,'0')} ${this.language.months[this.candidate_month]} ${this.candidate_year}`;
                        this.showView('DH');
                    } else { // Se só gere data
                        // Atribuí o nova data ao componente
                        this.value = `${this.candidate_year}-${this.candidate_month+1}-${this.candidate_day}`;
                    }
                });

                // Adiciona dia à linha da semana
                week_row.appendChild(day);
            }

            // Calcula e adiciona as células vazias à direita do útimo dia
            for (let i = week_row.children.length; i < 8; i++) {
                let day = document.createElement("div");
                day.classList.add('day');
                day.classList.add('empty');
                week_row.appendChild(day);
            }
            
            // Adiciona semana ao calendário
            this.calendar.appendChild(week_row);

        }
        
        /**
         * Gera e mostra a vista hora / minutos
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */ 
        showHourMinutes() {

            // Limpa o container
            this.hour_minutes.innerHTML = '';

            // Minuto auxiliar
            this.minute_aux.value = '';

            // Adiciona minutos à hora
            // Para cada um dos intervalos de 5 minutos dentro da hora
            for (let i = 0; i <= 55; i+=5) {

                // Cria e adiciona a célula do minuto
                let minute = document.createElement("div");
                minute.classList.add('minute');
                minute.setAttribute('data-value', i);
                minute.innerText = `${String(this.candidate_hour).padStart(2,'0')}:${String(i).padStart(2,'0')}`;

                // Estilo de "seleccionado"
                if (this.selected_year == this.candidate_year &&
                    this.selected_month == this.candidate_month &&
                    this.selected_day == this.candidate_day &&
                    this.selected_hour == this.candidate_hour &&
                    i == this.candidate_minute) {
                        minute.classList.add('selected');
                }

                // Evento click do minuto
                minute.addEventListener('click', evt => {
                    // Estilo de "seleccionado" anterior
                    let previous_selected = this.hour_minutes.querySelector('.selected');
                    if (previous_selected) {
                        previous_selected.classList.remove('selected');
                    }
                    evt.currentTarget.classList.add('selected');

                    // Guarda a selecção candidata
                    this.candidate_minute = parseInt(evt.currentTarget.getAttribute('data-value'));
                    this.minute_aux.value = String(this.candidate_minute).padStart(2,'0');
                    // Atribuí o nova data/hora ao componente
                    this.value = `${this.candidate_year}-${this.candidate_month+1}-${this.candidate_day} ${this.candidate_hour}:${this.candidate_minute}`;
                });

                this.hour_minutes.appendChild(minute);
            }

            // Hora e minuto auxiliar 
            this.hour_aux.innerText = `${String(this.candidate_hour).padStart(2,'0')} :`;

            if (this.selected_year == this.candidate_year &&
                this.selected_month == this.candidate_month &&
                this.selected_day == this.candidate_day &&
                this.selected_hour == this.candidate_hour) {
                    this.minute_aux.value = `${String(this.candidate_minute).padStart(2,'0')}`;
            }

        }

        
        // ------------------------------------------------------ PRÉ SELECÇÃO

        /**
         * Pré selecção de mês na vista (estática)
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */ 
        preSetMonth() {
            // Estilo de "seleccionado" anterior
            let month = this.year_months.querySelector('.selected');
            if (month) {
                month.classList.remove('selected');
            }
            if (this.selected_year == this.candidate_year) {
                let month = this.year_months.querySelector(`[data-value='${this.selected_month}']`);
                if (month) {
                    month.classList.add('selected');
                }
            }
        }

        /**
         * Pré selecção de hora na vista (estática)
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */ 
        preSetHour() {
            // Estilo de "seleccionado" anterior
            let hour = this.day_hours.querySelector('.selected');
            if (hour) {
                hour.classList.remove('selected');
            }
            if (this.selected_year == this.candidate_year &&
                this.selected_month == this.candidate_month &&
                this.selected_day == this.candidate_day &&
                this.selected_hour == this.candidate_hour) {
                    let hour = this.day_hours.querySelector(`[data-value='${this.selected_hour}']`);
                    if (hour) {
                        hour.classList.add('selected');
                    }
            }
        }


        // ------------------------------------------------------ DATA / DATA HORA

        /**
         * Devolve o número relativo da semana do dia (no ano)
         * 
         * @param int year = Ano a considerar
         * @param int month = Mês a considerar
         * @param int!null day = Dia a considerar (opcional)
         * 
         * @return int = Número da semana
         *
         * @pmonteiro (yyyy-mm-dd)
         */ 
        getWeekNumber(year, month, day=1) {
            let date = new Date(year, month, day);
            var first_day_year = new Date(date.getFullYear(),0,1);
            return Math.ceil((((date - first_day_year) / 86400000) + first_day_year.getDay())/7);
        }

         /**
         * Devolve o número de dias de um mês
         * 
         * @param int year = Ano a considerar
         * @param int month = Mês a considerar
         * 
         * @return int = Número de dias
         *
         * @pmonteiro (yyyy-mm-dd)
         */ 
        getMonthDays(year, month) {
            let days_in_months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            let days = days_in_months[month];
            if (month == 1 && this.isLeapYear(year)) {
                days = 29
            }
            return days;
        }

        /**
         * Devolve o identificador de dia da semana 
         * 
         * 1=Segunda; 2=Terça; 3=Quarta; 4=Quinta; 5= Sexta; 6=Sábado; 7=Domingo
         * 
         * @param int year = Ano a considerar
         * @param int month = Mês a considerar
         * @param int!null day = Dia a considerar (opcional)
         * 
         * @return int = Identificador do dia da semana
         *
         * @pmonteiro (yyyy-mm-dd)
         */ 
        getWeekDay(year, month, day=1) {
            let date = new Date(year, month, day);
            let week_day = date.getDay();
            if (week_day == 0) {
                week_day = 7;
            }
            return week_day;
        }

        /**
         * Devolve confirmação de ano bissexto
         * 
         * 1=Segunda; 2=Terça; 3=Quarta; 4=Quinta; 5= Sexta; 6=Sábado; 7=Domingo
         * 
         * @param int year = Ano a considerar
         * 
         * @return object = ? Bissexto
         *
         * @pmonteiro (yyyy-mm-dd)
         */ 
        isLeapYear(year) {
            if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)) {
                return true;
            }
            return false;
        }

        
        /**
         * Processamento de data ou data/hora (em bruto)
         * 
         * 1=Segunda; 2=Terça; 3=Quarta; 4=Quinta; 5= Sexta; 6=Sábado; 7=Domingo
         * 
         * @param string value = Data ou data/hora (formatos admitidos: yyyy-mm-dd ou yyyy-mm-dd hh:ss)
         * 
         * @return object = {
         *                  bool success (? valor válido),
         *                  int year,
         *                  int month (0=Janeiro, ...),
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
            let result = {success:false};

            // Separa data (com separador "/") da hora (se existir)
            let datetime = value.replaceAll('/', '-').split(' ');
            // Separa a data nos seus elementos
            let date = datetime[0].split('-');
            var year = date[0];
            var month = (date[1] ? date[1] : '').padStart(2,'0');
            var day = (date[2] ? date[2] : '').padStart(2,'0')
            var hour = null;
            var minute = null;

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
                
                // Se existe hora e a data já está validada
                if (result.success && this.has_time) {
                    // Separa a hora nos seus elementos
                    let time = '??';
                    if (datetime[1]) {
                        let value = datetime[1].split(':');
                        if (value[0] && value[0] != '' && value[1] && value[1] != '') {
                            time = value;
                        }
                    } else {
                        time = ['0','0']
                    }
                    var hour = time[0].padStart(2,'0');
                    var minute = time[1].padStart(2,'0');      

                    // Valida hora
                    regexp = /^([0-1]?[0-9]|[2][0-3])(:([0-5]?[0-9])(:([0-5]?[0-9]))?)?$/;
                    if (regexp.test(`${hour}:${minute}`)) {
                        // Formato de display
                        result.formated += ` ${hour}:${minute}`;
                    } else {
                        // Se inválida, todo o resultado é inválido
                        result.success = false;
                        delete result.formated;
                    }
                }

            }

            // Se processada com sucesso, completa o resultado
            if(result.success) {
                result.year = parseInt(year);
                result.month =  parseInt(month)-1;
                result.day = parseInt(day);
                result.hour = parseInt(hour);
                result.minute = parseInt(minute);
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

                // Para focus
                this.tabIndex = 0; 
                
                // Disponibiliza áreas de trabalho
                let component = this;
                let container = this.container;
                let head = this.head;
                let choice = this.choice;
                let cancel = this.cancel;
                let body_handle = this.body_handle;
                let body = this.body;
                let selector_previous = this.selector_previous;
                let selector_next = this.selector_next;
                let selector_button = this.selector_button;
                let today_button = this.today_button;
                let minute_aux = this.minute_aux;
                let tooltips = this.tooltips;
                let information = this.information;

                // Gera random ID se não atribuído
                if (!component.hasAttribute('id')) {component.setAttribute('id',fwkGenerateRandomID('datetime'));}

                // Tamanho (width) = default se não estiver definido no html do componente
                if (component.hasAttribute('width') && !isNaN(parseInt(component.getAttribute('width')))) {
                    container.style.width = component.getAttribute('width') + 'px';
                    component.removeAttribute('width');
                }

                // Idioma
                if (component.hasAttribute('language') && ['pt_PT', 'es_ES', 'fr_FR', 'en_US'].includes(component.getAttribute('language'))) {
                    component.language = component[component.getAttribute('language')]
                    component.removeAttribute('language');
                }

                // Mês do botão selector
                today_button.innerText = component.language.today;

                // Formato
                if (component.hasAttribute('format') && ['y-m-d', 'd-m-y', 'y/m/d', 'd/m/y'].includes(component.getAttribute('format'))) {
                    component.format = component.getAttribute('format');
                    component.removeAttribute('format');
                }

                // Preenchimento obrigatório
                if (component.hasAttribute('mandatory') && component.getAttribute('mandatory') == 'true') {
                    head.classList.add('mandatory');
                    component.removeAttribute('mandatory');
                }

                // Placeholder
                if (component.hasAttribute('placeholder') && component.getAttribute('placeholder') != '') {
                    choice.innerText = component.getAttribute('placeholder');
                    choice.classList.add('placeholder');
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

                // Número da semana no ano
                if (component.hasAttribute('week') && component.getAttribute('week') == 'true') {
                    container.classList.add('week');
                    component.removeAttribute('week');
                }

                // Time
                component.has_time = false;
                if (component.hasAttribute('time') && component.getAttribute('time') == 'true') {
                    component.has_time = true;
                    component.removeAttribute('time');
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

                // Valor
                if (component.hasAttribute('value') && component.getAttribute('value') != '') {
                    component.value = component.getAttribute('value');
                    component.removeAttribute('value');
                }

                // Carrega vista ano/meses (estática)    
                var count = 0;
                this.language.months.forEach(month => {
                    
                    // Cria e adiciona a célula do mês
                    let year_month = document.createElement("div");
                    year_month.classList.add('month');
                    year_month.setAttribute('data-value', count);
                    year_month.innerText = month;

                    // Evento click do mês
                    year_month.addEventListener('click', evt => {
                        component.candidate_month = parseInt(evt.currentTarget.getAttribute('data-value'));
                        component.showView('MD');

                    });
                    this.year_months.appendChild(year_month);
                    count++;

                });

                // Carrega vista dia/horas (estática)    
                for (let i = 0; i < 24; i++) {
                    
                    // Cria e adiciona a célula da hora
                    let day_hour = document.createElement("div");
                    day_hour.classList.add('hour');
                    day_hour.setAttribute('data-value', i);
                    day_hour.innerText = `${String(i).padStart(2,'0')}:00`;

                    // Evento click da hora
                    day_hour.addEventListener('click', evt => {
                        component.candidate_hour = parseInt(evt.currentTarget.getAttribute('data-value'));
                        component.showView('HM');
                    });
                    this.day_hours.appendChild(day_hour);
                }


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
                        
                        // Se a área de selecção está fechada, abre-a
                        if (body.classList.contains('hide')) {
            
                            // Fecha (eventualmente) algum componente aberto
                            fwkCloseComponent(component);

                            // Abre a área de selecção
                            container.classList.add('open');
                            body.classList.remove('hide');
                            // Roda o icone
                            body_handle.classList.add('rotate');

                            // Mostra vista de calendário
                            component.showView('MD');

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
                 * Reset da selecção por click em icone
                 * 
                 * @return void
                 *
                 * @pmonteiro (yyyy-mm-dd)
                 */    
                cancel.addEventListener('click', evt => {
                    evt.stopPropagation();
                    component.unselect(true);
                    component.close();
                });


                /**
                 * Acções do botão selector de vista
                 * 
                 * @return void
                 *
                 * @pmonteiro (yyyy-mm-dd)
                 */ 
                selector_button.addEventListener('click', evt => {
                    evt.stopPropagation();
                    switch (component.active_view) {
                        // Vista ano/mêses
                        case 'YM':
                            // Mostra vista decada/anos
                            component.showView('DY');
                        break;
                        // Vista mês/dias (calendário)
                        case 'MD':
                            // Mostra vista ano/mêses
                            component.showView('YM');
                        break;
                        // Vista dia/horas
                        case 'DH':
                            // Mostra vista mês/dias
                            component.showView('MD');
                        break;
                        // Vista hora/minutos
                        case 'HM':
                            // Mostra vista dia/horas
                            component.showView('DH');
                        break;
                    }   
                });


                /**
                 * Acções do botão selector anterior
                 * 
                 * @return void
                 *
                 * @pmonteiro (yyyy-mm-dd)
                 */ 
                selector_previous.addEventListener('click', evt => {
                    evt.stopPropagation();
                    switch (component.active_view) {
                        // Vista decada/anos
                        case 'DY':
                            // Decada anterior
                            component.candidate_year-=10;
                        break;
                        // Vista ano/mêses
                        case 'YM':
                            // Ano anterior
                            component.candidate_year--;
                        break;
                        // Vista mês/dias (calendário)
                        case 'MD':
                            // Mês anterior
                            component.candidate_month--;
                            // Verifica se muda de ano
                            if (component.candidate_month == -1) {
                                component.candidate_month = 11;
                                component.candidate_year--;
                            }
                        break;
                        // Vista dia/horas
                        case 'DH':
                            // Dia anterior
                            component.candidate_day--;
                            
                            // Verifica se muda de mês
                            if (component.candidate_day == 0) {
                                component.candidate_month--;
                                component.candidate_day = this.getMonthDays(component.candidate_year, component.candidate_month);;           
                                component.candidate_hour = 0;
                                component.candidate_minute = null;
                                component.minute_aux.value = '';
                                // Verifica se muda de ano
                                if (component.candidate_month == -1) {
                                    component.candidate_year--;
                                    component.candidate_month = 11; 
                                }
                            }
                        break;
                        case 'HM':
                            // Hora anterior
                            component.candidate_hour--;

                            // Verifica se muda de dia
                            if (component.candidate_hour == -1) {
                                component.candidate_day--;
                                component.candidate_hour = 23;
                                component.candidate_minute = null;
                                component.minute_aux.value = '';
                                // Verifica se muda de mês
                                if (component.candidate_day == 0) {
                                    component.candidate_month--;
                                    if (component.candidate_month != -1) {
                                        component.candidate_day = this.getMonthDays(component.candidate_year, component.candidate_month);
                                    }
                                    // Verifica se muda de ano
                                    if (component.candidate_month == -1) {
                                        component.candidate_year--;
                                        component.candidate_month = 11; 
                                        component.candidate_day = this.getMonthDays(component.candidate_year, component.candidate_month);
                                    }
                                }
                            }
                        break;
                    }

                    component.showView(component.active_view);
                });


                /**
                 * Acções do botão selector seguinte
                 * 
                 * @return void
                 *
                 * @pmonteiro (yyyy-mm-dd)
                 */
                selector_next.addEventListener('click', evt => {
                    evt.stopPropagation();
                    switch (component.active_view) {
                        // Vista decada/anos
                        case 'DY':
                            // Decada seguinte
                            component.candidate_year+=10;
                        break;
                        // Vista ano/mêses
                        case 'YM':
                            // Ano seguinte
                            component.candidate_year++;
                        break;
                        // Vista mês/dias (calendário)
                        case 'MD':
                            // Mês seguinte
                            component.candidate_month++;
                            // Verifica se muda de ano
                            if (component.candidate_month == 12) {
                                component.candidate_month = 0;
                                component.candidate_year++;
                            }
                        break;
                        // Vista dia/horas
                        case 'DH':
                            // Dia seguinte
                            component.candidate_day++;
                            
                            // Verifica se muda de mês
                            if (component.candidate_day > this.getMonthDays(component.candidate_year, component.candidate_month)) {
                                component.candidate_month++;
                                component.candidate_day = 1;           
                                component.candidate_hour = 0;
                                component.candidate_minute = null;
                                component.minute_aux.value = '';

                                // Verifica se muda de ano
                                if (component.candidate_month > 11) {
                                    component.candidate_year++;
                                    component.candidate_month = 0; 
                                }
                            }
                        break;
                        // Vista hora/minutos
                        case 'HM':
                            // Hora seguinte
                            component.candidate_hour++;

                            // Verifica se muda de dia
                            if (component.candidate_hour == 24) {
                                component.candidate_day++;
                                component.candidate_hour = 0;
                                component.candidate_minute = null;
                                component.minute_aux.value = '';
                                // Verifica se muda de mês
                                if (component.candidate_day > this.getMonthDays(component.candidate_year, component.candidate_month)) {
                                    component.candidate_month++;
                                    component.candidate_day = 1;
                                    // Verifica se muda de ano
                                    if (component.candidate_month > 11) {
                                        component.candidate_year++;
                                        component.candidate_month = 0; 
                                    }
                                }
                            }
                        break;
                        }

                        component.showView(component.active_view);
                    });


                /**
                 * Selecciona o dia de hoje
                 * 
                 * @return void
                 *
                 * @pmonteiro (yyyy-mm-dd)
                 */
                today_button.addEventListener('click', evt => {

                    // Carrega valores seleccionados e candidatos do dia
                    component.selected_year = component.candidate_year = component.today_year;
                    component.selected_month = component.candidate_month = component.today_month;
                    component.selected_day = component.candidate_day = component.today_day;
                    // Limpa restantes valores
                    component.selected_hour = component.candidate_hour = null;
                    component.selected_minute = component.candidate_minute = null;
                    component.minute_aux.value = '';

                    // Se o componente gere hora
                    if (component.has_time) {
                        // Coloca o dia, mês e ano como "caption" do botão selector de vista
                        component.selector_button.innerText = `${String(component.candidate_day).padStart(2,'0')} ${component.language.months[component.candidate_month]} ${component.candidate_year}`;
                        component.showView('DH');
                    } else { // Se só gere data
                        // Atribuí o nova data ao componente
                        component.value = `${component.candidate_year}-${component.candidate_month+1}-${component.candidate_day}`;
                        component.showView('MD');
                    }
                });


                /**
                 * Controla a alteração manual da hora
                 * 
                 * @return void
                 *
                 * @pmonteiro (yyyy-mm-dd)
                 */
                minute_aux.addEventListener('keyup', evt => {

                    // Valida hora/minuto
                    let hour_minute_aux =  `${component.candidate_hour}:${String(evt.currentTarget.value).padStart(2,'0')}`;

                    // Se válida
                    let regexp = /^([0-1]?[0-9]|[2][0-3])(:([0-5]?[0-9])(:([0-5]?[0-9]))?)?$/;
                    if (regexp.test(hour_minute_aux)) {
                        // Estilo de "seleccionado" anterior
                        var minute = this.hour_minutes.querySelector('.selected');
                        if (minute) {
                            minute.classList.remove('selected');
                        }
                        component.selected_minute = component.candidate_minute = parseInt(evt.currentTarget.value);
                    } else {
                        evt.currentTarget.value = '00';
                        component.selected_minute = component.candidate_minute = 0;
                    }

                    // Estilo de "seleccionado" novo (se existir na lista)
                    minute = this.hour_minutes.querySelector(`[data-value='${component.selected_minute}']`);
                    if (minute) {
                        minute.classList.add('selected');
                    }
                    
                    // Atribuí o nova data/hora ao componente
                    component.value = `${component.candidate_year}-${component.candidate_month+1}-${component.candidate_day} ${component.candidate_hour}:${component.candidate_minute}`;
                    
                });

                this.dom_ready = true;
            }

        }

    }

    // Adiciona o componente à lista de componentes customizados
    customElements.define('fwk-datetime', FWK_datetime);

})();
// --- END