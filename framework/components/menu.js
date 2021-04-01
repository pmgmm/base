/**
 * FRAMEWORK - COMPONENTS - MENU
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
            --font-size: 14px; /* specific */
            --line-height: 24px; /* specific */
            --color: white;
            --body-hover-color: white;
        }

        /* container do componente */
        .container {
            display: flex;
            position: relative;
            background-color: var(--background-color);
        }
        .container.hide {
            display: none;
        }
        .container.gray {
            --background-color: var(--gray-medium);
            --background-hover-color: var(--gray-dark);
            --body-color: var(--gray-dark);
            --disable-color: var(--gray-disable);
        }
        .container.blue {
            --background-color: var(--blue-medium);
            --background-hover-color: var(--blue-dark);
            --body-color: var(--blue-dark);
            --disable-color: var(--blue-disable);
        }

        /* titulo */
        .container .menu > .title {
            cursor: pointer;
            line-height: var(--line-height);
            padding: 8px 25px 6px;
            white-space: nowrap;
            font-size: var(--font-size);
            color: var(--color);
            transition: background-color .3s;
        }
        .container.disable .menu > .title, .container .menu.disable > .title {
            cursor: not-allowed;
            color: var(--disable-color);
        }
        .container:not(.disable) .menu:not(.disable).current > .title, .container:not(.disable) .menu:not(.disable):hover > .title {
            background-color: var(--background-hover-color);
        }

        /* área de menu e trigger para body */
        .container .menu {
            position: relative;
        }
        .container.disable .menu, .container .menu.disable {
            cursor: not-allowed;
        }

        /* área de menu */   
        .container .menu .body {
            z-index: 60;
            position: absolute;
            top: 100%;
            display: none;
            width: min-content;
            background-color: var(--component-background-color);
            border: 1px solid var(--body-color);
            box-shadow: 3px 3px 10px 3px rgba(0,0,0,0.35);
        }
        .container:not(.disable) .menu:not(.disable):hover .body:not(.sub) {
            display: block;
        }

        /* container de menu */ 
        .container .menu .body .element {
            position: relative;
            display: flex;
            align-items: center;
            line-height: var(--line-height);
            cursor: pointer;
            color: var(--body-color);
            --color-fill: var(--body-color);
            transition: background-color .3s ease-out;
        }
        .container .menu .body .element:not(:first-child) {
            border-top: 1px solid transparent;
        }
        .container .menu .body .element.final {
            padding: 6px 25px 4px 25px;
        }
        .container .menu .body .element:not(.final) {
            padding: 6px 10px 4px 25px;
        }
        .container .menu .body .element.disable {
            cursor: not-allowed;
            color: var(--disable-color);
            --color-fill: var(--disable-color);
        }
        .container .menu .body .element:not(.disable):hover {
            background-color: var(--body-color);
            color: var(--body-hover-color);
            --color-fill: var(--body-hover-color);
        }

        /* title de elemento */
        .container .menu .body .element .title { 
            background-color: none;
            white-space: nowrap;
        }

        /* icon de navegação para submenu */
        .container .menu .body .element svg {
            padding-left: 10px;
            width: var(--icon-size);
            fill: var(--color-fill);
        }  

        /* sub menu */
        .container .menu .body.sub {
            position: absolute;
            display: none;
            top: -1px;
            left: 100%;
        }
        .container .menu .element:not(.disable):not(.final):hover > .body.sub {
            display: block;
        }  

    </style>
    
    <!--- html do componente -->
    <div id="fwk_menu" class="container gray">
        <slot name="content"></slot>
    </div>`;

    
    /**
     * Classe owner do componente
	 *
	 * @pmonteiro (yyyy-mm-dd)
     */
    class FWK_menu extends HTMLElement {

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

            // Container de menus livres
            this.submenus = {};

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
                this.container.classList.add('hide');
            } else if (value === false) {
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


        // ------------------------------------------------------ GERAÇÃO DE BODY DE MENUS

        /**
         * Cria body de menu
         *
         * @param string content = Contúdo do menu 
         * @param bool sub = ? Menu livre
         * 
         * @return dom = DOM de body
         *
         * @pmonteiro (yyyy-mm-dd)
         */
        createMenuBody(content, sub=false) {

            // Container de menu
            let menu = document.createElement('div');
            menu.classList.add('body');

            // Se é livre
            if (sub) {
                menu.classList.add('sub'); 
            }

            // Para cada elemento do menu
            content.elements.forEach(element => {

                // Adapta os dados ao funcionamento do componente
                var element_container = document.createElement('div');
                // Id gerado com valor "limpo" de caracteres especiais
                element_container.setAttribute('id', this.id + ('_' + element.id).replace(/[^A-Za-z0-9_-]/g,'_'));
                element_container.classList.add('element');

                // Texto do elemento
                let element_title = document.createElement('div');
                element_title.classList.add('title');
                element_title.innerText = element.value;
                element_container.appendChild(element_title);

                // Se inactivo
                if (element.disable === true) {
                    element_container.classList.add('disable');
                } 

                // Se o element navega para página
                if (element.action.toLowerCase() == 'page') {
                    element_container.classList.add('final');
                    element_container.addEventListener('click', evt => {
                        if (element.disable !== true) {
                            window.location.href = element.target;
                        }
                    });

                } else if (element.action.toLowerCase() == 'menu' && this.submenus['sub_'+element.target]) {  // Se o elemento navega para submenu

                    // Icone de navegação para menu "livre"
                    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    svg.setAttribute('viewBox', '0 0 64 64');
                    let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    path.setAttribute('d','M44 22.4L21.6 0L12 9.6L34.4 32L12 54.4L21.6 64L52.8625 32');
                    svg.appendChild(path);
                    element_container.appendChild(svg);

                    // Gera o body do menu "livre" (recursivo)
                    if (element.disable !== true) {
                        element_container.appendChild(this.createMenuBody(this.submenus['sub_'+element.target], true));
                    }
                  
                }

                menu.appendChild(element_container);

            });

            return menu;

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

                // Gera random ID se não atribuído
                if (!component.hasAttribute('id')) {component.setAttribute('id',fwkGenerateRandomID('menu'));}

                // Estado visível / invisível
                if (component.hasAttribute('hide') && component.getAttribute('hide') == 'true') {
                    component.hide = true;
                    component.removeAttribute('hide');
                }

                // Estado activo / Inactivo
                if (component.hasAttribute('disable') && component.getAttribute('disable') == 'true') {
                    container.classList.add('disable');
                    component.removeAttribute('disable');
                }
                
                // Cor
                if (component.hasAttribute('color') && ['blue'].includes(component.getAttribute('color'))) {
                    container.classList.remove('gray');
                    container.classList.add(component.getAttribute('color'));
                    component.removeAttribute('color');
                }

                
                // Menus carregados por slot (via html)
                var slots = component.shadowRoot.querySelector('slot[name="content"]');
                this.slots_processed = false;
                slots.addEventListener('slotchange', evt => {
                    
                    if (!this.slots_processed) {
                
                        slots = slots.assignedElements();

                        let content = JSON.parse(slots[0].innerText);

                        // Para cada menu "livre
                        Object.entries(content).forEach(([key, menu]) => {

                            if (!menu.main || menu.main !== true) {
                                component.submenus['sub_'+ menu.id] = menu;
                            }
                    
                        });

                        // Para cada menu de topo
                        Object.entries(content).forEach(([key, menu]) => {

                            if (menu.main === true) {

                                // Adapta os dados ao funcionamento do componente
                                let menu_div = document.createElement('div');
                                menu_div.setAttribute('id', component.id + ('_' + menu.id).replace(/[^A-Za-z0-9_-]/g,'_'));
                                menu_div.classList.add('menu');

                                // Se inactivo
                                if (menu.disable === true) {
                                    menu_div.classList.add('disable');
                                } else { // Se é o menu actual seleccionado
                                    if (component.hasAttribute('current') && component.getAttribute('current') == menu.id) {
                                        menu_div.classList.add('current');
                                    }
                                }

                                // Título
                                let title = document.createElement('div');
                                title.classList.add('title');
                                title.innerText = menu.value;
                                menu_div.appendChild(title);

                                menu_div.appendChild(component.createMenuBody(menu));
                                container.appendChild(menu_div);

                            }
                    
                        });

                        this.slots_processed = true;
                    
                        // Elimina slot
                        slots[0].remove();

                        // Remove a tag slot
                        let slottag = container.querySelector('slot');
                        slottag.remove(); 

                        // Elimina o objecto de menus livres
                        delete component.submenus;

                    }

                });
                
                this.dom_ready = true;
                    
            }

        }

    }

  // Adiciona o componente à lista de componentes customizados
  customElements.define('fwk-menu', FWK_menu);

})();
// --- END