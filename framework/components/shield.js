/**
 * FRAMEWORK - COMPONENTS - SHIELD
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

        /* variáveis */
        .container {}

        /* container do componente */
        .container {}
        .container .area {
            position: relative;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 1000;
            background-color: #FFF;
            opacity: 0.5;
        }
        .container.on .area {
            position: fixed;
        }        
        .container.on.transparent .area {
            opacity: 0;
        }

        /* barra de progresso */
        .container .progress {
            position: fixed;
            bottom: 0px;
            width: 100%;
            height: 5px;
            z-index: 1001;
            background-size: 100% 5px !important;
            background: linear-gradient(to right,rgb(76,217,105),rgb(90,200,250),rgb(0,132,255),rgb(52,170,220),rgb(88,86,217),rgb(255,45,83));
            opacity: 0;
            transition: opacity 1s;
        }
        .container.on .progress.on {
            opacity: 1;
            animation:progress 30s ease-out forwards;
        }
        @keyframes progress {
            from {width: 0%;}
            to {width: 100%;}
        }


    </style>

    <!--- html do componente -->
    <div id="fwk_shield" class="container">
        <div class="area"></div>
        <div class="progress"></div>
    </div>`;

    
    /**
     * Classe owner do componente
	 *
	 * @pmonteiro (yyyy-mm-dd)
     */
    class FWK_shield extends HTMLElement {

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
            this.area = this.container.querySelector('.area');
            this._progress = this.container.querySelector('.progress');

            // Controlo de estado
            this._enable = false;

        }


        // ------------------------------------------------------ ACTIVO / INACTIVO

        /**
         * Controlo de estado activo / inactivo
         * 
         * @param bool value = ? Activo
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        set enable(value) {

            if (!this._enable && value === true) {
                this._enable = value;
                // Inibe scroll
                document.body.style.top = `-${window.scrollY}px`;
                document.body.style.position = 'fixed';
                // Activa shield
                this.container.classList.add('on');
            }     
            else if (this._enable && value === false) {
                this._enable = value;
                // Repõe scroll
                let scrollY = document.body.style.top;
                document.body.style.position = '';
                document.body.style.top = '';
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
                // Inactiva shield
                this.container.classList.remove('on');
            }

        }


        // ------------------------------------------------------ PROGRESS BAR ACTIVA / INACTIVA 

        /**
         * Controlo de progresso activo / inactivo
         * 
         * @param bool value = ? Activa
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        set progress(value) {
            if (value === true) {
                // Activa shield em modo transparente
                this.container.classList.add('transparent');
                this.enable = true;
                // Inicia a progress bar
                this._progress.classList.add('on');
            }
            else if (value === false) {
                // Termina a progress bar
                this._progress.classList.remove('on');
                // Inactiva shield e coloca-a em modo normal
                this.enable = false;
                this.container.classList.remove('transparent');
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

                // Disponibiliza áreas de trabalho
                let component = this;

                // Gera random ID se não atribuído
                if (!component.hasAttribute('id')) {component.setAttribute('id',fwkGenerateRandomID('shield'));}

                this.dom_ready = true;
            }

        }
        
    }

  // Adiciona o componente à lista de componentes customizados
  customElements.define('fwk-shield', FWK_shield);

})();
// --- END