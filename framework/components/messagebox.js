/**
 * FRAMEWORK - COMPONENTS - MESSAGEBOX
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

        /* variáveis */
        .container {
            --min-height: 70px;
            --min-width: 250px;
            --icon-size: 12px;
            --color: white;
        }

        /* container do componente */
        .container {
            opacity: 1;
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: 50;
            background-color: var(--background-color);
            border: 1px solid var(--border-color);
            box-shadow: 3px 3px 10px 0px rgba(0,0,0,0.35);
            transition: opacity .5s;
        }
        .container.hide {
            top: -1000px;
        }
        .container.fade {
            opacity: 0;
        }
        .container:hover {
            top: 10px;
            opacity: 1;
        } 
        .container.gray {
            --border-color: var(--gray-dark);
            --background-color: var(--gray-medium);
        }
        .container.blue {
            --border-color: var(--blue-dark);
            --background-color: var(--blue-medium);
        }
        .container.green {
            --border-color: var(--green-dark);
            --background-color: var(--green-medium);
        }
        .container.red {
            --border-color: var(--red-dark);
            --background-color: var(--red-medium);
        }
        
        /* área de mensagem */
        .container .head {
            box-sizing: border-box;
            display: flex;
            min-width: var(--min-width);
            min-height: var(--min-height);
            align-items: center;
        }
        
        /* mensagem */
        .container .head .message {
            line-height: 18px;
            white-space: nowrap;
            color: var(--color);
            padding: 12px 20px 12px 15px;
        }
        
        /* formatação em lista */
        .container .head .message ul {
            margin: 0;
            padding-left: 15px;
        }
        .container .head .message ul li {
            padding: 2px 0px;
        }

    </style>

    <!--- html do componente -->
    <div id="fwk_messagebox" class="container hide fade">
        <div class="head">
            <div class="message"></div>
        </div>
    </div>`;

    
    /**
     * Classe owner do componente
	 *
	 * @pmonteiro (yyyy-mm-dd)
     */
    class FWK_messagebox extends HTMLElement {

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
            this.message = this.head.querySelector('.message');

        }


        // ------------------------------------------------------ VISIBILIDADE

        /**
         * Desvanece componente
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        fade() {
            this.container.classList.add('fade');
            setTimeout(function(){fwk_components_control.messagebox.hide()}, 500);
        }

        /**
         * Esconde componente
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        hide() {
            this.container.classList.add('hide');
        }

        
        // ------------------------------------------------------ INFORMAÇÃO / ERRO

        /**
         * Mensagem de erro
         *
         * @param string value = Texto / html da mensagem de erro
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        set error(value) {
            value = this.formatMessage(value);
            if (value.trim() != '') {
                // Mostra Erro
                this.container.classList.remove(this.container.getAttribute('color-success'));
                this.container.classList.remove(this.container.getAttribute('color-information'));
                this.container.classList.add(this.container.getAttribute('color-error'));
                this.message.innerHTML = value;
                this.container.classList.remove('hide');
                this.container.classList.remove('fade');
                setTimeout(function(){fwk_components_control.messagebox.fade()}, 4000);
            }
        }
     
        /**
         * Mensagem de sucesso
         *
         * @param string value = Texto / html da mensagem de erro
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        set success(value) {
            value = this.formatMessage(value);
            if (value.trim() != '') {
                // Mostra Informação
                this.container.classList.remove(this.container.getAttribute('color-error'));
                this.container.classList.remove(this.container.getAttribute('color-information'));
                this.container.classList.add(this.container.getAttribute('color-success'));
                this.message.innerHTML = value;
                this.container.classList.remove('hide');
                this.container.classList.remove('fade');
                setTimeout(function(){fwk_components_control.messagebox.fade()}, 2000);

            }
        }

        /**
         * Mensagem de informação
         *
         * @param string value = Texto / html da mensagem de erro
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        set information(value) {
            value = this.formatMessage(value);
            if (value.trim() != '') {
                // Mostra Informação
                this.container.classList.remove(this.container.getAttribute('color-error'));
                this.container.classList.remove(this.container.getAttribute('color-success'));
                this.container.classList.add(this.container.getAttribute('color-information'));
                this.message.innerHTML = value;
                this.container.classList.remove('hide');
                this.container.classList.remove('fade');
                setTimeout(function(){fwk_components_control.messagebox.fade()}, 2000);

            }
        }

        /**
         * Formata mensagem
         *
         * @param string value = Texto / html da mensagem
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        formatMessage(value) {
            let result = '';
            if (Array.isArray(value)) {
                result += '<ul>';
                value.forEach(element => {
                    result += '<li>' + element + '</li>';
                });
                result += '</ul>';
            } else {
                result = value;
            }
            return result;
        }


        // ------------------------------------------------------ PROCESSAMENTO DIFERIDO


        /**
         * Coloca mensagem na Session Storage para processamento diferido
         * (ao entrar numa página, mostra mensagem da SS se existir. Ex: insert no regresso à lista)
         *
         * @param string value = Texto / html da mensagem
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */    
        set pendingMessage(value) {
            StorageHelper.addToSession('messagebox_pending_message', value);
        }

        /**
         * Mostra mensagem diferida
         *
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */ 
        processPendingMessage() {
            let message = StorageHelper.getFromSession('messagebox_pending_message');
            switch(message[0]) {
                case 'error':
                    this.error = message[1];
                    break;
                case 'success':
                    this.success = message[1];
                    break;
                case 'information':
                    this.information = message[1];
                    break;
            }
            StorageHelper.removeFromSession('messagebox_pending_message');
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

                // Regista componente para timeout's
                // (para esconder o componente mensagem após fade)
                window.fwk_components_control.messagebox = component
            
                // Gera random ID se não atribuído
                if (!component.hasAttribute('id')) {component.setAttribute('id',fwkGenerateRandomID('messagebox'));}

                // Cores
                if (component.hasAttribute('color-error') && ['gray', 'blue', 'green'].includes(component.getAttribute('color-error'))) {
                    container.setAttribute('color-error', component.getAttribute('color-error'));
                    component.removeAttribute('color-error');
                } else {
                    container.setAttribute('color-error', 'red');
                }
                if (component.hasAttribute('color-success') && ['gray', 'blue', 'red'].includes(component.getAttribute('color-success'))) {
                    container.setAttribute('color-success', component.getAttribute('color-success'));
                    component.removeAttribute('color-success');
                } else {
                    container.setAttribute('color-success', 'green');
                } 
                if (component.hasAttribute('color-information') && ['gray', 'green', 'red'].includes(component.getAttribute('color-information'))) {
                    container.setAttribute('color-information', component.getAttribute('color-information'));
                    component.removeAttribute('color-information');
                } else {
                    container.setAttribute('color-information', 'blue');
                } 

                this.dom_ready = true;

            }

        }

    }

  // Adiciona o componente à lista de componentes customizados
  customElements.define('fwk-messagebox', FWK_messagebox);

})();
// --- END