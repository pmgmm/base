<?php
/**
 * FRAMEWORK - HELPER - PAGE
 * 
 * Disponibiliza métodos que permitem gerir a pré-contrução de páginas para o browser
 *
 * @pmonteiro (yyyy-mm-dd)
 */ 


namespace FWK\helpers;

use \FWK\helpers\TranslationHelper as TH;

use \CORE\helpers\LogHelper;


final class PageHelper {

    use \FWK\traits\throwableHandler;

    // Constantes
    public const LOGIN = 'login';
    public const PAGE = 'page';
    public const DASHBOARDS = 'dashboards';
    public const FREE = 'free';
    public const LIST = 'list';
    public const FORM = 'form';

    // Inicialização de variáveis
    private ?string $type; 
    private array $scripts = array();
    private array $stylesheets = array();
    private string $title;
    private ?string $template;
    private string $menu;
    private ?string $current_menu;
    private bool $breadcrumb = false;
    private ?array $contents;
    private ?string $current_content;
    private string $last_uri;


   /**
     * Contructor
     *
     * @param string $type = Tipo de página a pré-construír (constante)  (default=page)
     * @param string|null $template = Template da página (default=type)
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function __construct(string $type=SELF::PAGE, ?string $template=null) {
        try {
        
            // Check session security
            if ($_SESSION['SECURITY'] != md5('SECURITY'.$_SERVER['REMOTE_ADDR'].$_SERVER['HTTP_USER_AGENT'])) {
                echo 'Não é proprietário da sessão. ';
                die();
            }

            // Valida Sessão
            if ($type != SELF::LOGIN && $type != SELF::FREE && !$_SESSION['ACTIVE']) {
                header('location: ' . BASE_URI);
                die(); 
            }

            // Current page type
            $this->type = $type;

            // Default menu
            $this->menu = 'base';

            // Template
            if (isset($template)) {
                $this->template = $template;
            } else {
                $this->template = $type;
            }

            // Default title
            $this->title = CORE['name'];

            // Token
            $_SESSION['authorization'] = md5(time());

            // Default scripts
            $scripts = "var translation_content={}; var authorization='".$_SESSION['authorization']."'; ";
            $scripts .= 'const DEVELOPMENT='.(DEVELOPMENT['status'] ? 'true' : 'false').'; ';
  
            $this->scripts[] = '<script type="text/javascript">'.$scripts.'</script>'; 
            $this->addScript('/framework/3rdparty/jquery/jquery-3.4.1.min.js', false);
            $this->addScript('/framework/helpers/AjaxHelper.js');
            $this->addScript('/framework/helpers/StorageHelper.js');
            $this->addScript('/framework/helpers/TranslationHelper.js');
            $this->addScript('/framework/helpers/FormHelper.js');
            $this->addScript('/framework/helpers/FilterHelper.js');
            $this->addScript('/framework/helpers/ReaderHelper.js');
            $this->addScript('/framework/components/shield.js');
            $this->addScript('/framework/components/messagebox.js');
            $this->addScript('/framework/components/askbox.js');

            // Default stylesheets
            $this->addStyleSheet('/framework/3rdparty/css/normalize.css');
            $this->addStyleSheet('/framework/css/default.css');
            $this->addStyleSheet('/framework/3rdparty/font_awesome/css/all.min.css');

            // Stylesheet associado ao template
            if(isset($this->template)) {
                $this->addStyleSheet(CORE_TEMPLATES_RPATH . 'page/css/' . $this->template . '.css');
            }

            unset($GLOBALS['MODULE']);

            switch($type) {
                case self::LOGIN:
                    // Page type scripts
                    $this->addScript('/framework/components/shared.js');
                    $this->addScript('/framework/components/box.js');
                    $this->addScript('/framework/components/label.js');
                    $this->addScript('/framework/components/formbutton.js');
                    $this->addScript('/framework/components/checkbox.js');
                    $this->addScript('/framework/components/input.js');
                    $this->addScript('/framework/components/image.js');
                    $this->addScript('/framework/components/select.js');
                    $this->addScript('/framework/components/button.js');
                    break;
                case self::LIST:
                case self::FORM:
                case self::PAGE:
                case self::FREE:
                    // Page type scripts
                    $this->addScript('/framework/components/shared.js');
                    $this->addScript('/framework/components/menu.js');
                    $this->addScript('/framework/components/breadcrumb.js');
                    $this->addScript('/framework/components/label.js');
                    $this->addScript('/framework/components/text.js');
                    $this->addScript('/framework/components/formbutton.js');
                    $this->addScript('/framework/components/checkbox.js');
                    $this->addScript('/framework/components/radiobutton.js');
                    $this->addScript('/framework/components/optionbutton.js');
                    $this->addScript('/framework/components/input.js');
                    $this->addScript('/framework/components/textarea.js');
                    $this->addScript('/framework/components/select.js');
                    $this->addScript('/framework/components/multiselect.js');
                    $this->addScript('/framework/components/dragdropselect.js');
                    $this->addScript('/framework/components/dropbutton.js');
                    $this->addScript('/framework/components/button.js');
                    $this->addScript('/framework/components/link.js');
                    $this->addScript('/framework/components/section.js');
                    $this->addScript('/framework/components/modal.js');
                    $this->addScript('/framework/components/table.js');
                    $this->addScript('/framework/components/box.js');
                    $this->addScript('/framework/components/upload.js');
                    $this->addScript('/framework/components/image.js');
                    $this->addScript('/framework/components/datetime.js');
                    $this->addScript('/framework/components/htabs.js');
                    $this->addScript('/framework/components/ftabs.js');
                    $this->addScript('/framework/components/treeview.js');
                break;
            }
            
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Define o menu
     *
     * @param string value = Nome do ficheiro de menu
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function setMenu(string $value): void {
        try {
            
            $this->menu = $value;

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Define o menu de topo actual
     *
     * @param string id = Identificador do menu
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function setCurrentMenu(string $id): void {
        try {
            
            $this->current_menu = $id;

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Actualiza o breadcrumb
     *
     * @param array value = Item actual
     * @param bool|null reset = ? Reset
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function setBreadcrumb(string $value, ?bool $reset=false): void {
        try {  

            $this->breadcrumb = true;

            // Reinicializa breadcrumb
            if ($reset) {
                $_SESSION['BREADCRUMB'] = array();
                if ($value != TH::translate('HOME')) {
                    $_SESSION['BREADCRUMB'][TH::translate('HOME')] = array('uri' => BASE_URI . 'home.php', 'disable' => false);
                }
            }

            // Guarda breadcrumb actual para auxilio de construção
            $arr_breadcrumb_aux = $_SESSION['BREADCRUMB'];

            // Inicía construção
            $_SESSION['BREADCRUMB'] = array();

            // Se exite pelo menos uma posição no breadcrumb
            if (end($arr_breadcrumb_aux)) {
                if ($reset) { // Se reinicializa
                    $arr_breadcrumb_aux = array_slice($arr_breadcrumb_aux, 0, 1);
                } else if (end($arr_breadcrumb_aux)['uri'] == $_SERVER['REQUEST_URI']) {
                    $arr_breadcrumb_aux[key($arr_breadcrumb_aux)]['disable'] = true; 
                    $arr_breadcrumb_aux[key($arr_breadcrumb_aux)]['uri'] = '';
                }
            }
            
            // Constrói o breadcrumb com base no remanescente do anterior
            foreach ($arr_breadcrumb_aux as $item_value => $item) {
                if (strpos($item['uri'], $_SERVER['PHP_SELF']) !== false && !$item['path']) { 
                    break;
                } else {
                    $_SESSION['BREADCRUMB'][$item_value] = array('uri' => $item['uri'], 'disable' => $item['disable']); 
                }
            }

            // Adiciona a última (corrente) posição
            $_SESSION['BREADCRUMB'][$value] = array('uri' => $_SERVER['REQUEST_URI'], 'disable' => false); 

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Retorna o URI anterior pelo breadcrumb 
     * 
     * @return string = URI
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    private function getPreviousUri() {
        try {
            $result = BASE_URI;

            if (!$this->breadcrumb) {
                $this->setBreadcrumb($_SERVER['REQUEST_URI']);
            }

            if (isset($_SESSION['BREADCRUMB']) && count($_SESSION['BREADCRUMB']) > 1) {
                
                foreach(array_reverse(array_slice($_SESSION['BREADCRUMB'],0,count($_SESSION['BREADCRUMB'])-1)) as $item)  {
                    if (!$item['disable']) {
                        $result = $item['uri'];
                        break;
                    }
                }

            }
            
            return $result;
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }



    /**
     * Define o sub título
     * O Título final é composto por (Nome da Aplicação - Sub-título) 
     *
     * @param string value = Sub título 
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function setSubTitle(string $value): void {
        try {
            
            $this->title = CORE['name'] . ' - ' .$value;

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Define o módulo Core a que a página pertence
     *
     * @param string $module = Constante de módulo
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function setCoreModule(string $module): void {
        try {

            $GLOBALS['MODULE'] = $module;
            array_unshift($this->scripts, "<script type=\"text/javascript\">sessionStorage.setItem('module', '$module');</script>");

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Adiciona script específico da página
     *
     * @param string $src = Endereço relativo do script
     * @param bool $version_cache = ? Cache gerida por versão
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function addScript(string $src, bool $version_cache = true): void {
        try {

            if ($version_cache) {
                $version_cache = '?'.CORE['version'];
            } else {
                $version_cache = '';
            }

            $this->scripts[] = '<script type="text/javascript" src="'.$src.$version_cache.'"></script>';

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Adiciona stylesheet específica da página
     *
     * @param string $href = Endereço relativo da stylesheet
     * @param bool $version_cache = ? Cache gerida por versão
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function addStyleSheet(string $href, bool $version_cache=true): void {
        try {

            if ($version_cache) {
                $version_cache = '?'.CORE['version'];
            } else {
                $version_cache = '';
            }

            $this->stylesheets[] = '<link type="text/css" href="'.$href.$version_cache.'" rel="stylesheet"></link>';

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Renderiza html de página
     *
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function render(): void {
        try {

            if (isset($this->current_content)) {
                $this->contents[$this->current_content] = ob_get_contents();
                unset($this->current_content);
                ob_end_clean();
            }
           
            $bodyHtml = $this->getBodyHtml();
            // Nota: o topHtml tem de ser gerado após o body (existem dependências)
            $topHtml = $this->getTopHtml();
      

            $html = '<!DOCTYPE html>' . PHP_EOL;
            $html .= '<!-- ---- Page Top --->' . PHP_EOL;
            $html .= $topHtml;
            $html .= '<!-- --- Page Template & Body --->' . PHP_EOL;
            $html .= $bodyHtml;
            $html .= '</div>' . PHP_EOL; 
            $html .= '<!-- --- Page Bottom --->' . PHP_EOL;
            if ($this->type != self::LOGIN) {
                $html .= '<input id="back_uri" type="hidden" value="'.$this->getPreviousUri().'"/>' . PHP_EOL;
            }
            $html .= '</body>' . PHP_EOL;
            $html .= '</html>' . PHP_EOL;
            $html .= '<!-- --- Page Scripts --->' . PHP_EOL;
            $html .= '<script>' . PHP_EOL;
            $html .= 'document.body.style.display = "block";' . PHP_EOL;
            $html .= 'document.getElementById(\'fwk_messagebox\').processPendingMessage();' . PHP_EOL;
            $html .= '</script>';
            echo $html;

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Devolve html de início da página
     * Desde <!DOCTYPE html> até <body>
     *
     * @return string = Html
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    private function getTopHtml(): string {
        try {
            $result = '';

            $result .= '<html>' . PHP_EOL;
            $result .= '<head>' . PHP_EOL;
            $result .= '    <title>' . $this->title . '</title>' . PHP_EOL;
            $result .= '    <meta charset="utf-8">' . PHP_EOL;
            $result .= '    <link href="/core/resources/'.strtolower(CORE['name']).'_16.png" sizes="16x16" type="image/png" rel="shortcut icon">' . PHP_EOL;
            $result .= '    <link href="/core/resources/'.strtolower(CORE['name']).'_32.png" sizes="32x32" type="image/png" rel="shortcut icon">' . PHP_EOL;
            $result .= '    <link href="/core/resources/'.strtolower(CORE['name']).'_96.png" sizes="96x96" type="image/png" rel="shortcut icon">' . PHP_EOL;

            foreach($this->scripts as $script) {
                $result .= '    ' . $script . PHP_EOL;
            }
            foreach($this->stylesheets as $stylesheet) {
                $result .= '    ' . $stylesheet . PHP_EOL;
            }
            $result .= '</head>' . PHP_EOL;
            $result .= '<body ondrop="return false">'. PHP_EOL;
            $result .= '<fwk-shield id="fwk_shield"></fwk-shield>' . PHP_EOL;
            $result .= '<fwk-messagebox id="fwk_messagebox"></fwk-messagebox>' . PHP_EOL;
            $result .= '<fwk-askbox id="fwk_askbox"></fwk-askbox>' . PHP_EOL;

            return $result;
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Inicia uma área de conteúdo
     * 
     * @param string area = Área de conteúdo a iniciar
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function startContent(string $area): void {
        try {

            if (isset($this->current_content)) {
                $this->contents[$this->current_content] = ob_get_contents();
                ob_end_clean();
            }
            ob_start();
            $this->current_content = $area;

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Devolve html de body gerado por tipo de página
     * 
     * @return string = Html
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    private function getBodyHtml() {
        try {
            $result = '';

            switch($this->type) {
                case self::LOGIN:

                    $template_pathname = CORE_TEMPLATES_PATH . 'page/' . $this->template . '.html';

                     // Carregar template (se exite)
                     if ($this->template = file_get_contents($template_pathname)) {

                        // Conteúdos
                        if (isset($this->contents)) {
                            foreach ($this->contents as $key => $content) {
                                $this->template = str_replace('{'.$key.'}', $content, $this->template);
                            }
                        }

                        $result = $this->template;

                    }

                    return $result;
                    break; 
                case self::LIST:
                case self::FORM:
                case self::PAGE:
                    
                    $template_pathname = CORE_TEMPLATES_PATH . 'page/' . $this->template . '.html';
                    $menu_pathname = CORE_MENUS_PATH . $this->menu . '.php';

                    // Carregar template (se exite)
                    if ($this->template = file_get_contents($template_pathname)) {

                        // Carregar menu (se exite e ainda não foi carregado)
                        if (!isset($_SESSION['USER']['menus'][$this->menu]) && file_exists($menu_pathname)) {
                            require_once $menu_pathname;
                            $_SESSION['USER']['menus'][$this->menu] = json_encode(${$this->menu.'_menu'});
                        }
                        if (isset($_SESSION['USER']['menus'][$this->menu])) {
                            // Menu actual
                            if (isset($this->current_menu)) {
                                $this->template = str_replace('{current_menu}', $this->current_menu, $this->template);
                            }
                            $this->template = str_replace('{menu}', $_SESSION['USER']['menus'][$this->menu], $this->template);
                        }

                        // Acções do template
                        $start_tag = strpos($this->template, '{actions:');
                        if ($start_tag !== false) {
                            $end_tag = strpos($this->template, '}',$start_tag);
                            $actions_name = substr($this->template, $start_tag + 9, ($end_tag-$start_tag)-9);
                            if (file_exists(CORE_TEMPLATES_PATH . "page/actions/$actions_name.html")) {
                                $this->template = str_replace("{actions:$actions_name}", file_get_contents(CORE_TEMPLATES_PATH . "page/actions/$actions_name.html"), $this->template);
                                // Script associado às acções do template
                                if (file_exists(CORE_TEMPLATES_PATH . "page/actions/$actions_name.js")) {       
                                    $this->addScript(CORE_TEMPLATES_RPATH . "page/actions/$actions_name.js");
                                }
                            }
                        }

                        // Variáveis fixas de template
                        $this->template = str_replace('{username}', $_SESSION['USER']['name'], $this->template);
                        $this->template = str_replace('{avatar}', $_SESSION['USER']['avatar'], $this->template);
                        $this->template = str_replace('{tasks}', TH::translate('Lista de tarefas'), $this->template);
                        $this->template = str_replace('{alerts}', TH::translate('Alertas'), $this->template);
                        $this->template = str_replace('{messages}', TH::translate('Mensagens'), $this->template);
                        $this->template = str_replace('{account}', TH::translate('Conta'), $this->template);
                        $this->template = str_replace('{logout}', TH::translate('SAÍR'), $this->template);

                        // Carregar breadcrump (se existe)
                        if ($this->breadcrumb && count($_SESSION['BREADCRUMB'])) {
                            $breadcrumb = array();
                            foreach($_SESSION['BREADCRUMB'] as $item_value => $item) {
                                $breadcrumb[] = array('value' => $item_value, 'target' => $item['uri'], 'disable' => $item['disable']);
                            }
                            $breadcrumb = json_encode($breadcrumb);
                            $this->template = str_replace('{breadcrumb}', $breadcrumb, $this->template);
                        }

                        // Conteúdos
                        if (isset($this->contents)) {
                            foreach ($this->contents as $key => $content) {
                                $this->template = str_replace('{'.$key.'}', $content, $this->template);
                            }
                        }

                        $result = $this->template;
                    }

                    return $result;
                    break;
                case self::FREE:

                    $template_pathname = CORE_TEMPLATES_PATH . 'page/' . $this->template . '.html';
                    $menu_pathname = CORE_MENUS_PATH . $this->menu . '.php';

                    // Carregar template (se exite)
                    if ($this->template = file_get_contents($template_pathname)) {

                        // Acções do template
                        $start_tag = strpos($this->template, '{actions:');
                        if ($start_tag !== false) {
                            $end_tag = strpos($this->template, '}',$start_tag);
                            $actions_name = substr($this->template, $start_tag + 9, ($end_tag-$start_tag)-9);
                            if (file_exists(CORE_TEMPLATES_PATH . "page/actions/$actions_name.html")) {
                                $this->template = str_replace("{actions:$actions_name}", file_get_contents(CORE_TEMPLATES_PATH . "page/actions/$actions_name.html"), $this->template);
                                // Script associado às acções do template
                                if (file_exists(CORE_TEMPLATES_PATH . "page/actions/$actions_name.js")) {       
                                    $this->addScript(CORE_TEMPLATES_RPATH . "page/actions/$actions_name.js");
                                }
                            }
                        }

                        // Variáveis fixas de template
                        $this->template = str_replace('{username}', $_SESSION['USER']['name'], $this->template);

                        // Conteúdos
                        if (isset($this->contents)) {
                            foreach ($this->contents as $key => $content) {
                                $this->template = str_replace('{'.$key.'}', $content, $this->template);
                            }
                        }

                        $result = $this->template;
                    }

                    return $result;
                    break;
            }

            return $result;
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }

}
// --- END