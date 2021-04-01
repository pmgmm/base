/**
 * FRAMEWORK - COMPONENTS - ASK BOX
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
            --min-width: 350px;
            --header-height: 30px;
            --header-color: white;
            --header-close-hover-color: white;
        }

        /* container do componente */
        .container {
            display: block;
            position: fixed;
            z-index: 1100;
            background-color: var(--component-background-color);
            border: 1px solid var(--border-color);
            box-shadow: 3px 3px 10px 0px rgba(0,0,0,0.35);
        }
        .container.center {
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
        .container.hide {
            display: none;
        }
        .container.gray {
            --body-color: var(--blue-medium);
            --header-close-color: var(--gray-light);
            --border-color: var(--gray-medium);
            --header-background-color: var(--gray-medium);
        }
        .container.blue {
            --body-color: var(--gray-medium);
            --header-close-color: var(--blue-light);
            --border-color: var(--blue-medium);
            --header-background-color: var(--blue-medium);
        }
        
        /* área de titulo e trigger de fecho */
        .container .header {
            display: flex;
            box-sizing: border-box;
            height: var(--header-height);
            align-items: center;
            padding: 0px 10px 0px 7px;
            background-color: var(--header-background-color);
        }
        /* title */
        .container .header .title {
            justify-content: flex-start;
            overflow: hidden;
            white-space: nowrap;
            padding-right: 10px;
            text-overflow: ellipsis;  
            color: var(--header-color);
        }
        /* icon close */
        .container .header .icon {
            cursor: pointer;
            justify-content: flex-end;
            margin-left: auto;
            width: var(--head-icon-size);
            fill: var(--header-close-color);
        }
        .container .header .icon:hover {
            fill: var(--header-close-hover-color);
        }

        /* área de pergunta */
        .container .body {
            color: var(--body-color);
            min-width: var(--min-width);
            width: fit-content;
            padding: 10px;
            box-sizing: border-box;
        }
        /* mensagem */
        .container .body .question {
            line-height: 22px;
            white-space: nowrap;
        }

        /* acções */
        .container .body .actions {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-top: 10px;
        }
        .container .body .actions > * {
            margin-left: 7px;
        }

    </style>

    <!--- html do componente -->
    <div id="fwk_askbox" class="container gray center hide">
        <div class="header">
            <div class="title"></div>
            <svg class="icon" viewBox="0 0 64 64">
                <path d="M64.125 9.6L54.525 0L32.125 22.4L9.725 0L0.125 9.6L22.525 32L0.125 54.4L9.725 64L32.125 41.6L54.525 64L64.125 54.4L41.725 32L64.125 9.6Z"/>
            </svg>
        </div>
        <div class="body">
            <div class="question"></div>
            <div class="actions"></div>
        </div>
    </div>`;

    
    /**
     * Classe owner do componente
	 *
	 * @pmonteiro (yyyy-mm-dd)
     */
    class FWK_askbox extends HTMLElement {

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
            this.header = this.container.querySelector('.header');
            this._title = this.header.querySelector('.title');
            this.icon = this.header.querySelector('.icon');
            this.body = this.container.querySelector('.body');
            this._question = this.body.querySelector('.question');
            this.actions = this.body.querySelector('.actions');

        }

        
        // ------------------------------------------------------ PERGUNTA

        /**
         * Mostra pergunta / fecha pergunta
         *
         * @param object value = Texto / html da pergunta + botões
         * 
         * @return void
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        set show(value) {

            this.container.classList.add('center');
            this.container.removeAttribute('style');

            if (value) {
                // Activa shield
                if (document.getElementById('fwk_shield')) {
                    document.getElementById('fwk_shield').enable = true;
                }
                // Cor alternativa
                if (value.color && ['gray', 'blue'].includes(value.color)) {
                    this.container.classList.add(value.color);
                }

                // Constrói pergunta
                this._title.innerText = value.title ? value.title : '?';
                this._question.innerHTML = value.question ? value.question : '?';
                value.actions.forEach(action => {
                    let fwk_formbutton = document.createElement('fwk-formbutton');
                    fwk_formbutton.setAttribute('value', action.caption);
                    fwk_formbutton.setAttribute('color', action.color);
                    if (action.function) {
                        if (typeof action.function === 'object') {
                            fwk_formbutton.setAttribute('function', JSON.stringify(action.function));
                        } else {
                            fwk_formbutton.setAttribute('function', action.function);
                        }
                    } else {
                        fwk_formbutton.setAttribute('script', "document.getElementById('"+this.id+"').show = false"); 
                    }
                    this.actions.appendChild(fwk_formbutton);
                });
                // Mostra pergunta
                this.container.classList.remove('hide');

            } else {

                // Esconde pergunta
                this.container.classList.add('hide');
                this._title.innerText = '';
                this._question.innerHTML = '';
                this.actions.innerHTML = '';
                
                // Desactiva shield
                if (document.getElementById('fwk_shield')) {
                    document.getElementById('fwk_shield').enable = false;
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

                // Disponibiliza áreas de trabalho
                let component = this;
                let container = this.container;
                let header = this.header;
                let icon = this.icon;

                // Cor
                if (component.hasAttribute('color') && ['blue'].includes(component.getAttribute('color'))) {
                    container.classList.remove('gray');
                    container.classList.add(component.getAttribute('color'));
                    component.removeAttribute('color');
                }

                // Evento mouse down (drag)
                header.addEventListener('mousedown', evt => {
                    if (container.classList.contains('center')) {
                        container.style.top = container.offsetTop - (container.clientHeight/2) - 1 + 'px';
                        container.style.left = container.offsetLeft - (container.clientWidth/2) - 1 + 'px';
                        container.classList.remove('center');
                    }
                    fwkDragDropAbsolute(container);
                });

                // Fecho de Pergunta
                icon.addEventListener('click', evt => { 
                    component.show = false; 
                });  

                this.dom_ready = true;

            }

        }

    }

    // Adiciona o componente à lista de componentes customizados
    customElements.define('fwk-askbox', FWK_askbox);

})();
// --- END