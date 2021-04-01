<?php
/**
 * UI - LOGIN
 *  
 * @pmonteiro (yyyy-mm-dd))
 */

namespace UI;

require_once $_SERVER['DOCUMENT_ROOT'] . '/core/config/autoload.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/core/config/base.php';

use \FWK\helpers\PageHelper;
use \FWK\helpers\TranslationHelper as TH;

final class _index {

    use \FWK\traits\throwableHandler;

    public function run(): void {
        try {

            $_SESSION['USER'] = array();
            $_SESSION['BREADCRUMB'] = array();

            // Tradução de conteúdos de entrada
            $_SESSION['LANGUAGE']['translation'] = array();
            $language = $_REQUEST['language'] ?? $_SESSION['LANGUAGE']['current'];
            if ($language != '') {
                $translation_file_php = CORE_TRANSLATIONS_PATH . $language . '_login.php';
                $translation_file_js = CORE_TRANSLATIONS_PATH . $language . '_login.js';
                if (file_exists($translation_file_php)) {
                    include ($translation_file_php);
                    $_SESSION['LANGUAGE']['current'] = $language;
                }
                if (file_exists($translation_file_js)) {
                    $translation_file_js = '/core/translations/' . $language . '_login.js';
                } else {
                    $translation_file_js = null;
                }
            }  else {
                $language = $_SESSION['LANGUAGE']['current'];
            }
          
            // Setup de página
            $obj_page = new PageHelper(PageHelper::LOGIN);
            $obj_page->setSubTitle('Login');
            $obj_page->setCoreModule(MODULE_BASE);
            $obj_page->addScript('index.js');
            if (isset($translation_file_js)) {
                $obj_page->addScript($translation_file_js);
            }
            // Inicia e carrega container actions do template
            $obj_page->startContent('actions'); 
            
            ?>
            
            <!-- Idioma -->
            <fwk-select id="app_language" key-value="code" key-text="description" placeholder="<?=TH::translate('Idioma')?>" value="<?=$language?>" width="120" rows="12" cancel="false" mandatory="true" function="setLanguage">
                <div slot="options"><?=json_encode(AVAILABLE_LANGUAGES)?></div>
            </fwk-select>
            
            <?php

            // Inicia e carrega container body do template
            $obj_page->startContent('body');

            ?>

            <!-- Utilizador -->
            <fwk-input id="user_or_email" type="text" width="200" maxlength="25" mandatory="true" placeholder="<?=TH::translate('Utilizador ou email')?>"></fwk-input>
            <!-- Password -->
            <fwk-input id="password" type="password" width="200" maxlength="25" mandatory="true" placeholder="<?=TH::translate('Password')?>"></fwk-input>
            
            <?php 

            // Inicia e carrega container body-actions do template
            $obj_page->startContent('body-actions'); 
            
            ?>

            <!-- Botões -->
            <fwk-formbutton value="<?=TH::translate('ENTRAR')?>" color="blue" function="login"></fwk-formbutton>

            <?php 

            // Inicia e carrega container app-info do template
            $obj_page->startContent('app-info'); 
            
            ?>

            <fwk-label color="blue"value="<?=TH::translate('Versão')?>:"></fwk-label>
            <fwk-label value="<?=CORE['version']?>"></fwk-label>
            <fwk-label color="blue"value="<?=TH::translate('Direitos')?>:">
            </fwk-label><fwk-label value="© <?=CORE['copyright']?>"></fwk-label>

            <?php 

            // Render de página
            $obj_page->render();
            
        } catch (\Throwable $throwable) {
            $this->throwableHandle($throwable);
        }   
    }

}

// Instancia e processa
$obj = new _index();
$obj->run();
// --- END