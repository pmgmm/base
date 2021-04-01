<?php
/**
 * UI - REGISTO DE GRUPO
 *  
 * @pmonteiro (yyyy-mm-dd))
 */

namespace UI\admin\group;

require_once $_SERVER['DOCUMENT_ROOT'] . '/core/config/autoload.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/core/config/base.php';

use \FWK\helpers\PageHelper;
use \FWK\helpers\TranslationHelper as TH;
use \FWK\helpers\PermissionHelper;
use \FWK\wrappers\repositories\MainRepository;
use \DEV\entities\translation\Translation;


final class _record {

    use \FWK\traits\throwableHandler;

    public function run(): void {
        try {

            // Setup de página
            $obj_page = new PageHelper(PageHelper::FORM);
            $obj_page->setSubTitle('Grupo');
            $obj_page->setCurrentMenu('administration');
            $obj_page->setCoreModule(MODULE_ADMINISTRATION);
            $obj_page->addScript('record.js');
            $obj_page->addStyleSheet('/framework/css/grid_form_data.css');

            // Define o valor do id pelo parâmetro do url
            $id = isset($_REQUEST['id']) ? intval($_REQUEST['id']) : 0;  

            // Permissões de página
            $permisson_operation = (boolval($id)) ? PermissionHelper::UPDATE : PermissionHelper::CREATE;
            // Sai se não tiver permissão
            // Recebe "modo view" se não existir permissão para udpdate 
            $view_mode = PermissionHelper::ValidateRecord(array('ADMINISTRATION', 'DEVELOPMENT', 'TRANSLATION'), $permisson_operation);

            // Inicialização de variáveis 
            $source = $layer = $en_us = $fr_fr = $es_es = '';
            $breadcrumb = TH::translate('NOVA TRADUÇÃO');

            // Repositório
            $repository = new MainRepository();

            // Carrega (se existir) o registo de grupo
            if ($id > 0) {

                $obj_translation = new Translation($repository);
                if ($obj_translation->load_byID($id)) {
                    if ($view_mode) {
                        $breadcrumb = TH::translate('VER TRADUÇÃO');
                    } else {
                        $breadcrumb = TH::translate('EDITAR TRADUÇÃO');  
                    }
                    $source = str_replace('<br>', PHP_EOL, $obj_translation->getProperty('source'));
                    $layer = $obj_translation->getProperty('layer');
                    $en_us = $obj_translation->getProperty('en_us');
                    $fr_fr = $obj_translation->getProperty('fr_fr');
                    $es_es = $obj_translation->getProperty('es_es');
                } else { // Se não exite, reinicializa o id (=0 para insert)
                    $id = 0;
                }

            }

            // Breadcrump
            $obj_page->setBreadcrumb($breadcrumb);

            // Variável View mode (form)
            $str_view_mode = $view_mode ? 'true' : 'false';

            // Inicia e carrega container body do template
            $obj_page->startContent('body');

            ?>

            <!-- baseado em "grid_form_data.css" carregado na página -->
            <div class="grid-structure two-columns">

                <!-- Coluna esquerda -->     
                <div class="grid-column">

                    <!-- Origem -->
                    <div class="grid-cell-label"><fwk-label value="<?=TH::translate('Origem')?>:"></fwk-label></div>
                    <div class="grid-cell-component">
                        <fwk-textarea id="translation_source" value="<?=$source?>" disable="<?=$str_view_mode?>" maxlength="255" rows="5" min-width="800"></fwk-textarea>
                    </div>

                    <!-- Layer -->
                    <div class="grid-cell-label"><fwk-label value="<?=TH::translate('Layer')?>:"></fwk-label></div>
                    <div class="grid-cell-component">
                        <fwk-radiobutton id="translation_layer" key-value="value" key-text="description" value="<?=$layer?>" disable="<?=$str_view_mode?>">
                            <div slot="options">[{"value": "be", "description": "<?=TH::translate('Backend')?>"},{"value": "fe", "description": "<?=TH::translate('Frontend')?>"}]</div>
                        </fwk-radiobutton>
                    </div>

                    <!-- en_US -->
                    <div class="grid-cell-label"><fwk-label value="<?=TH::translate('Inglês US')?>:"></fwk-label></div>
                    <div class="grid-cell-component">
                        <fwk-textarea id="translation_en_us" value="<?=$en_us?>" disable="<?=$str_view_mode?>" maxlength="255" rows="5" min-width="800"></fwk-textarea>
                    </div>

                    <!-- fr_FR -->
                    <div class="grid-cell-label"><fwk-label value="<?=TH::translate('Francês FR')?>:"></fwk-label></div>
                    <div class="grid-cell-component">
                        <fwk-textarea id="translation_fr_fr" value="<?=$fr_fr?>" disable="<?=$str_view_mode?>" maxlength="255" rows="5" min-width="800"></fwk-textarea>
                    </div>

                    <!-- es_ES -->
                    <div class="grid-cell-label"><fwk-label value="<?=TH::translate('Espanhol ES')?>:"></fwk-label></div>
                    <div class="grid-cell-component">
                        <fwk-textarea id="translation_es_es" value="<?=$es_es?>" disable="<?=$str_view_mode?>" maxlength="255" rows="5" min-width="800"></fwk-textarea>
                    </div>

                </div>

                <!-- Coluna direita --> 
                <div class="grid-column"></div>

            </div> 
 
            <?php 

            // Inicia e carrega container body-actions do template
            $obj_page->startContent('body-actions'); ?>

            <!-- Id do registo -->
            <input id="id" type="hidden" value="<?=$id?>"/>

            <!-- Botões -->
            <fwk-formbutton value="<?=TH::translate('VOLTAR')?>" color="white" function="back"></fwk-formbutton>
            <fwk-formbutton value="<?=TH::translate('LIMPAR')?>" color="white" function="newRecord" disable="<?=$str_view_mode?>"></fwk-formbutton>
            <fwk-formbutton value="<?=TH::translate('GRAVAR')?>" color="gray" function='{"saveRecord":[-1]}' disable="<?=$str_view_mode?>"></fwk-formbutton>
            <fwk-formbutton value="<?=TH::translate('GRAVAR')?> =" color="blue" function='{"saveRecord":[0]}' disable="<?=$str_view_mode?>"></fwk-formbutton>
            <fwk-formbutton value="<?=TH::translate('GRAVAR')?> +" color="blue" function='{"saveRecord":[1]}' disable="<?=$str_view_mode?>"></fwk-formbutton>

            <?php 

            // Render de página
            $obj_page->render();
            
        } catch (\Throwable $throwable) {
            $this->throwableHandle($throwable);
            header('location: ' . BASE_URI . 'home.php');
        }   
    }

}

// Instancia e processa
$obj = new _record();
$obj->run();
// --- END
