/**
 * HELPERS - PWA
 * 
 * Disponibiliza métodos que permitem gerir a PWA
 *
 * @pmonteiro (yyyy-mm-dd)
 */ 


class PwaHelper {

    constructor() {

        // Elementos fixos da PWA
        this.top_bar = document.getElementById('pwa-top-bar');
        this.top_menu = document.getElementById('pwa-top-menu');
        this.shield = document.getElementById('pwa-shield');
        this.loader = document.getElementById('pwa-loader');
        this.message = document.getElementById('pwa-message'); 
        this.question = document.getElementById('pwa-question'); 

        // Reset da PWA
        this.reset();

        // Prepara ambiente
        this.prepareEnvironment();

        // Adiciona de eventos a elementos
        this.addEventListeners();

    }


    // --- Getter's & Setter's

    // Service Worker
    set service_worker_registration(value) {this._service_worker_registration = value;}
    get service_worker_registration() {return this._service_worker_registration;}

    // Display Mode (browser ou standalone)
    set display_mode(value) {this._display_mode = value;}
    get display_mode() {return this._display_mode;}

    // Evento "Add To Desktop"
    set evt_add_to_desktop(value) {this._evt_add_to_desktop = value;}
    get evt_add_to_desktop() {return this._evt_add_to_desktop;}

    // Página actual
    set current_page(value) {this._current_page = value;}
    get current_page() {return this._current_page;}

    // Container actual
    set current_page_container(value) {this._current_page_container = value;}
    get current_page_container() {return this._current_page_container;}

    // Scroll de página actual
    set current_page_scroll_position(value) {this._current_page_scroll_position = value;}
    get current_page_scroll_position() {return this._current_page_scroll_position;}

    // É movimento de swipe ?
    set swipe(value) {this._swipe = value;}
    get swipe() {return this._swipe;}

    // Factor de direcção do swipe (1=esquerda/-1=direita) 
    set factor(value) {this._factor = value;}
    get factor() {return this._factor;}

    // Início de swipe horizontal
    set startX(value) {this._startX = value;}
    get startX() {return this._startX;}

    // Fim de swipe horizontal
    set endX(value) {this._endX = value;}
    get endX() {return this._endX;}

    // Deslocação em swipe
    set diffX(value) {this._diffX = value;}
    get diffX() {return this._diffX;}

    // É movimento de scroll ?
    set vertical_scroll(value) {this.vertical_scroll = value;}
    get vertical_scroll() {return this.vertical_scroll;}

    // Início de scroll vertical
    set startY(value) {this._startY = value;}
    get startY() {return this._startY;}

    // Fim de scroll vertical
    set endY(value) {this._endY = value;}
    get endY() {return this._endY;}

    // Deslocação em scroll
    set diffY(value) {this._diffY = value;}
    get diffY() {return this._diffY;}

    // Páginas
    get LOGIN() {return 0;}
    get TODO() {return 1;}
    get DONE() {return 2;}
    get ABORTED() {return 3;}
    get ALERTS() {return 4;}
    
    // Tipos de mensagem
    get ERROR() {return 'error'}
    get SUCCESS() {return 'success'}
    get INFORMATION() {return 'information'}

    
   /**
     * Adiciona PWA ao desktop
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    addToDesktop() {
        // Mosta prompt do browser
        this.evt_add_to_desktop.prompt();
        this.evt_add_to_desktop.userChoice.then((answer) => {
            if (answer.outcome === 'accepted') {
                // Esconde botão "Adicionar PWA ao dispositivo" no menu "more" de topo
                document.getElementById('pwa-top-menu-install').classList.add('hide');
                console.info('PWA installed');
                this.evt_add_to_desktop = null;
                this.showMessage(HPWA.SUCCESS, 'PWA adicionada ao dispositivo.<br>Pode fechar o browser e continuar na PWA.');
            } else {
                // Mostra botão "Adicionar PWA ao dispositivo" no menu "more" de topo
                document.getElementById('pwa-top-menu-install').classList.remove('hide');
                console.info('PWA install dismissed');
            }
        });
    }


    /**
     * Mostra página
     * 
     * @param int page = Identificador de página (constante = propriedade)
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    showPage(page) {
        // Se é página de login, esconde a barra e menu de topo
        if (page == this.LOGIN) {
            this.top_bar.classList.add('hide');
            this.top_menu.classList.add('hide');
        }
        // Guarda identificador e container da página
        this.current_page = page;
        this.current_page_container = document.getElementById(`pwa-page-${page}`);
        // Reposiciona as páginas à esquerda e direita
        for (var i = 0; i<=4; i++) {
            this[`page_${i}`].classList.add('hide');
            if (i > 0) {
                // Remove a selecção prévia
                this[`top_menu_${i}`].classList.remove('selected');
                if (i < page) {
                    this[`page_${i}`].style.left = (screen.width * -1)+ 'px';
                } else if (i > page) {
                    this[`page_${i}`].style.left = (screen.width)+ 'px'; 
                }
            }
        }
        // Mostra a página
        this[`page_${page}`].classList.remove('hide');
        // Se não é página de login
        // Mostra a barra de topo
        // Actualiza e mostra o menu de topo
        if (page != this.LOGIN) {
            this[`top_menu_${page}`].classList.add('selected');
            this[`page_${page}`].style.left = '0px';
            this.top_bar.classList.remove('hide');
            this.top_menu.classList.remove('hide');
            this.current_pageScroll = this[`page_${page}`].scrollTop;
        }
    }


    /**
     * Arrasto (swipe) de página
     * 
     * @param event evt = Evento
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    pageTouchStart(evt) {
        // Coordenadas iniciais
        this.startX = evt.touches[0].clientX;
        this.startY = evt.touches[0].clientY;
        this.diffX = 0;
        this.diffY = 0;
    }
    pageTouchMove(evt) {
        // Coordenadas no ponto movido
        this.endX = evt.touches[0].clientX;
        this.endY = evt.touches[0].clientY;
        // Deslocação até ao ponto movido
        this.diffX = this.endX - this.startX;
        this.diffY = this.endY- this.startY;
        // Calculo do factor de direcção do swipe (1=esquerda/-1=direita) 
        // Para definir o movimento e a página a colar
        if (this.diffX < 0) {
            this.factor = 1;
        } else {
            this.factor = -1;
        }
        // Se o movimento aida não está definido, calcula-o pelo tipo de deslocação
        if (!this.swipe && !this.vertical_scroll) {
            if (Math.abs(this.diffY) > 10) { // Movimento Scroll
                this.swipe = false;
                this.vertical_scroll = true;
            } else if (Math.abs(this.diffX) > 7) { // Movimento Swipe
                this.vertical_scroll = false;
                this.swipe = true;
            } else {
                return;
            }
        }
        // Se é um movimento de swipe, move a página actual e a próxima ("coladas")
        if (this.swipe) {
            if (evt.cancelable) {evt.preventDefault();}
             // Página actual
            let current_page = HPWA.current_page;
            // Página a colar
            let next_page = current_page + this.factor;
            if (next_page >= 1 && next_page <= 4) {
                HPWA[`page_${current_page}`].style.left = this.diffX + 'px';
                HPWA[`page_${next_page}`].classList.remove('hide');
                HPWA[`page_${next_page}`].style.left = ((screen.width * this.factor) + this.diffX) + 'px';
            }
        }
    }
    pageTouchEnd(evt) {
        // Se é um movimento de swipe
        if (this.swipe) {
                // Página actual
            let current_page = HPWA.current_page;
            // Página a colar
            let next_page = current_page + this.factor;
            // Se existe página a colar
            if (next_page >= 1 && next_page <= 4) {
                // Coloca ambas as páginas em modo swipe
                HPWA[`page_${current_page}`].classList.add('swipe');
                HPWA[`page_${next_page}`].classList.add('swipe');
                // Define o ponto de mudança de página
                let threshold = screen.width / 3;
                // Se não muda de página, ambas regressam à posição original
                if (Math.abs(this.diffX) < threshold) {
                    HPWA[`page_${current_page}`].style.left = 0;
                    HPWA[`page_${next_page}`].style.left = (this.factor * 100) + '%';
                    // Depois do reposiciomamento, reinicia style
                    setTimeout(function() {
                        HPWA[`page_${next_page}`].classList.add('hide');
                        HPWA[`page_${current_page}`].classList.remove('swipe');
                        HPWA[`page_${next_page}`].classList.remove('swipe');
                    }, 400);
                } else { // Se muda de página, faz a transição até ao fim
                    HPWA[`page_${next_page}`].classList.remove('hide');
                    HPWA[`page_${current_page}`].style.left = (-1 * this.factor * 100) + '%';
                    HPWA[`page_${next_page}`].style.left = 0;
                    window[`pwa-top-menu-${current_page}`].classList.remove('selected');
                    window[`pwa-top-menu-${next_page}`].classList.add('selected');
                    HPWA.current_pageScroll = HPWA[`page_${next_page}`].scrollTop;
                    // Depois do reposiciomamento, reinicia style
                    setTimeout(function() {
                        HPWA[`page_${current_page}`].classList.add('hide');
                        HPWA[`page_${current_page}`].classList.remove('swipe');
                        HPWA[`page_${next_page}`].classList.remove('swipe');
                    }, 400);
                    // Guarda identificador de página corrente
                    HPWA.current_page = next_page;
                }
            }
        }
        this.swipe =null;
        this.vertical_scroll = null;
    }
    
    
    /**
     * Acções dericada do scroll verical de página
     * 
     * @param int page = Identificador de página (constante = propriedade)
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    pageOnScroll(page) {
        // Scroll da página
        let page_scroll_position = this[`page_${page}`].scrollTop;
        if (this.current_page_scroll_position > page_scroll_position) {
            // Scroll para baixo, mostra barra de topo e actualiza espaço em todas as páginas
            this.top_bar.style.top = "0px";
            this.top_menu.style.top = "40px";
            document.getElementById("pwa-top-menu-content").classList.remove('no-top-bar');
            for (let i=1; i<=PWA_PAGES; i++) {
                HPWA[`page_${i}`].classList.remove('no-top-bar');
            }
        } else {
            // Scroll para cima, esconde barra de topo e actualiza espaço em todas as páginas
            this.top_bar.style.top = "-50px";
            this.top_menu.style.top = "0px";
            document.getElementById("pwa-top-menu-content").classList.add('no-top-bar');
            for (let i=1; i<=PWA_PAGES; i++) {
                HPWA[`page_${i}`].classList.add('no-top-bar');
            }
        }
        // Guarda scroll da página
        this.current_page_scroll_position = page_scroll_position;
    }    


    /**
     * Muda idioma
     * 
     * @param string value = Identificador de idioma
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    changeLanguage(value) {
        // Guarda indentificador de idioma
        CONFIG.language = value;
        // Actualiza a selecção no interface
        LANGUAGES.forEach(language => {
            document.getElementById(`btn-${language}`).classList.remove('selected');
        });
        document.getElementById(`btn-${CONFIG.language}`).classList.add('selected');
        // Traduz os conteúdos
        INDEX.translateContent();
    }


    /**
     * Traduz texto para o idioma corrente
     * 
     * @param string value = Texto
     * 
     * @return string = texto traduzido
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    translate(value) {
        return CONFIG.language_data[value] ? CONFIG.language_data[value] : (CONFIG.language == 'pt_PT') ? value : `_${value}`;
    }


    /**
     * Activa shield e, eventualmente, loader
     * 
     * @param bool dark = ? Versão escura (default=false)
     * @param bool loader = ? Activa loader (default=false)
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    shieldOn(dark=false, loader=false) {
        if (dark) {
            this.shield.classList.add('dark'); 
        }
        // Activa shield
        this.shield.classList.add('on');
        // activa loader
        if (loader) {
            this.loader.classList.add('on'); 
        }
        // Adiciona evento ao chield
        this.shield.addEventListener('click', HLAYER.close); 
    }


    /**
     * Desactiva shield e loader
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    shieldOff() {
        this.loader.classList.remove('on');
        this.shield.classList.remove('on');
        this.shield.classList.remove('dark'); 
    }


    /**
     * Mostra mensagem (promessa)
     * 
     * @param string type = Tipo de mensagem (constante = propriedade)
     * @param string text = Texto (ou html) da mensagem
     * @param bool timer = ? Esconde automáticamente (default=true)
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    showMessage(type, text, timer=true) {
        // Promessa
        return new Promise((resolve) => {
            // Remove classes de tipo prévias
            this.message.classList.remove(this.ERROR);
            this.message.classList.remove(this.SUCCESS);
            this.message.classList.remove(this.INFORMATION);
            // Elimina timeout prévio
            if (this.message_process) {clearTimeout(this.message_process);}
            this.message.innerHTML = this.translate(text);
            this.message.classList.add(type);
            this.message.classList.remove('hide');
            // Timeout
            if (timer) {
                this.message_process = setTimeout(function(){HPWA.message.classList.add('hide'); resolve();}, 3000);
            }
        }); 
    }
    

    /**
     * Esconde mensagem 
     *   
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    hideMessage() {
        this.message.classList.add('hide');
    }
    

    /**
     * Mostra pergunta (promessa)
     * 
     * O Botão 1 é sempre light
     * 
     * @param string text = Texto (ou html) da pergunta
     * @param string btn1 = Texto para botão 
     * @param string btn2 = Texto para botão 
     * @param string btn3 = Texto para botão 
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    showQuestion(text, btn1, btn2, btn3) {
        // Promessa
        return new Promise((resolve) => {
            this.shieldOn();
            let text_container = document.getElementById('pwa-question-text');
            let b1 = document.getElementById('pwa-question-btn-1');
            let b2 = document.getElementById('pwa-question-btn-2');
            let b3 = document.getElementById('pwa-question-btn-3');
            text_container.innerHTML = this.translate(text);
            // Limpa botões prévios
            b1.innerText = b2.innerText = b3.innerText = '';
            // Adiciona botões (se instanciados)
            if (btn1) {
                b1.innerText = this.translate(btn1);
                b1.classList.remove('hide');
                // Adiciona evento click para botão
                b1.addEventListener('click', function() {
                    HPWA.shieldOff();
                    HPWA.question.classList.add('hide');
                    resolve(1); 
                });
            }
            if (btn2) {
                b2.innerText = this.translate(btn2);
                b2.classList.remove('hide');
                // Adiciona evento click para botão
                b2.addEventListener('click', function() {
                    HPWA.shieldOff();
                    HPWA.question.classList.add('hide');
                    resolve(2); 
                });
            }
            if (btn3) {
                b3.innerText = this.translate(btn3);
                b3.classList.remove('hide');
                // Adiciona evento click para botão
                b3.addEventListener('click', function() {
                    HPWA.shieldOff(); 
                    HPWA.question.classList.add('hide');
                    resolve(3);
                });
            }
            // Mostra pergunta
            this.question.classList.remove('hide');
        });
    }


    /**
     * Esconde pergunta 
     *   
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    hideQuestion() {
        this.question.classList.add('hide');
    }


    /**
     * Prepara ambiente da PWA
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    prepareEnvironment() {

        // Esconde eventual mensagem activa
        this.hideMessage();

        // Display mode
        if (window.matchMedia('(display-mode: standalone)').matches) {
            this.display_mode = 'standalone';
        } else if (navigator.standalone)  {
            this.display_mode = 'ios';
        } else {
            this.display_mode = 'browser';
        }

        // Desactivar menu de contexto (long touch)
        window.oncontextmenu = function(evt) {
            evt.preventDefault();
            evt.stopPropagation();
            return false;
        };
        
    }


   /**
     * Adiciona eventos a elementos
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    addEventListeners() {
  
        // Adicionar PWA ao desktop (pergunta ou botão no menu "more" de topo)
        window.addEventListener('beforeinstallprompt', (evt) => {
            evt.preventDefault();
            // Se ainda não foi feita a pergunta
            if (!this.install_asked) { 
                this.install_asked = true;  // Evita que a pergunta reapareça imediatamente após recusa no browser
                // Guarda o evento para prompt
                HPWA.evt_add_to_desktop = evt;
                // Mostra botão "Adicionar PWA ao dispositivo" no menu "more" de topo
                document.getElementById('pwa-top-menu-install').classList.remove('hide');
                setTimeout(function() {
                    // A pergunta apenas aparece se o utilizador não estiver logado (portanto, no login), 
                    // caso contrário, mostra botão "Adicionar ao dispositivo" no menu "more" de topo
                    if (!USER.logged_in) {
                        // Pergunta
                        let question = 'Adicione a PWA DELIVERY ao seu dispositivo.<br>É gratuita, rápida, ocupa pouca memória e permitirá uma melhor experiência de utilização.';
                        HPWA.showQuestion(question, 'Agora não', 'ADICIONAR').then(answer => {
                            if (answer == 2) {
                                // Esconde botão "Adicionar PWA ao dispositivo" no menu "more" de topo
                                document.getElementById('pwa-top-menu-install').classList.add('hide');
                                HPWA.addToDesktop();
                            }
                        });
                    }
                }, 500);
            }
        });


        // Páginas e respectivos botões no menu de topo operativos (fixos da PWA)
        for (let i=0; i<=PWA_PAGES; i++) {

            this[`page_${i}`] = document.getElementById(`pwa-page-${i}`);
            this[`top_menu_${i}`] = document.getElementById(`pwa-top-menu-${i}`);

            if (i > 0) {
                this[`page_${i}`].addEventListener("scroll", function() {HPWA.pageOnScroll(i)});
                this[`page_${i}`].addEventListener("touchstart", this.pageTouchStart, {passive: true});
                this[`page_${i}`].addEventListener("touchmove", this.pageTouchMove, {passive: true});
                this[`page_${i}`].addEventListener("touchend", this.pageTouchEnd, {passive: true});
                this[`top_menu_${i}`].addEventListener("click", function() {HPWA.showPage(i)});
            }
        }
        this['top_menu_0'].addEventListener("click", function() {
            HLAYER.open('pwa-top-menu-content');
        });

        // Touch Blink
        document.addEventListener('touchstart', evt => {
                evt.stopPropagation();
                if (evt.target.classList.contains('touch')){
                    evt.target.parentNode.classList.add('blink');
                    evt.target.classList.add('blink');
                    setTimeout(function(){
                        evt.target.parentNode.classList.remove('blink');
                        evt.target.classList.remove('blink');
                    }, 200);
                }
            }, false);


        // Device Offline -> Online
        window.addEventListener("online", evt => {
            HPWA.hideMessage();
            if (HPWA.current_page == 0) {
                HPWA.current_page_container.querySelector('.form').classList.remove('hide');
                HPWA.current_page_container.querySelector('.languages').classList.remove('hide');
                INDEX.startEngine();
            } else {
                // Falta sync
                HPWA.showMessage(HPWA.SUCCESS, 'Dispositivo Online. A utilizar dados actualizados ...');
            }
        });

        // Device Online -> Offline
        window.addEventListener("offline", evt => {
            if (HPWA.current_page == 0) {
                INDEX.startEngine();
            } else {
                HPWA.showMessage(HPWA.ERROR, 'Dispositivo Offline. A utilizar dados locais ...');
            }
        });

        // Idiomas
        LANGUAGES.forEach(language => {
            document.getElementById(`btn-${language}`).addEventListener('click', function() {HPWA.changeLanguage(language);});
        });

        // Click na mensagem
        this.message.addEventListener("click", this.hideMessage);

    }


    /**
     * Reset da PWA
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    reset() {
        USER.name = '';
        USER.authorization = 'RA';
        USER.logged_in = false;
        CONFIG.vapid_public_key = null;
        this.current_page = 0;
        this.current_page_container = document.getElementById(`pwa-page-${this.current_page}`);
        this.current_page_scroll_position = 0;
    }

}
// --- END