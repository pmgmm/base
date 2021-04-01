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
use \CORE\entities\group\Group;


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
            $id = isset($_REQUEST['id']) ? intval(base64_decode($_REQUEST['id'])) : 0;  

            // Permissões de página
            $permisson_operation = (boolval($id)) ? PermissionHelper::UPDATE : PermissionHelper::CREATE;
            // Sai se não tiver permissão
            // Recebe "modo view" se não existir permissão para udpdate 
            $view_mode = PermissionHelper::ValidateRecord(array('ADMINISTRATION', 'SUPPORT', 'GROUP'), $permisson_operation);

            // Inicialização de variáveis 
            $active = 1;
            $name = $description = '';
            $breadcrumb = TH::translate('NOVO GRUPO');

            // Repositório
            $repository = new MainRepository();

            // Carrega (se existir) o registo de grupo
            if ($id > 0) {

                $obj_group = new Group($repository);
                if ($obj_group->load_byID($id)) {
                    if ($view_mode) {
                        $breadcrumb = TH::translate('VER GRUPO');
                    } else {
                        $breadcrumb = TH::translate('EDITAR GRUPO');  
                    }
                    $name = $obj_group->getProperty('name');
                    $description = $obj_group->getProperty('description');
                    $active = $obj_group->getProperty('active');
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

                    <!-- Nome -->
                    <div class="grid-cell-label"><fwk-label value="<?=TH::translate('Nome')?>:"></fwk-label></div>
                    <div class="grid-cell-component">
                        <fwk-input id="group_name" type="text" value="<?=$name?>" mandatory="true" disable="<?=$str_view_mode?>"></fwk-input>
                    </div>

                    <!-- Descrição -->
                    <div class="grid-cell-label"><fwk-label value="<?=TH::translate('Descrição')?>:"></fwk-label></div>
                    <div class="grid-cell-component">
                        <fwk-textarea id="group_description" min-width="400" maxlength="255" value="<?=$description?>" disable="<?=$str_view_mode?>"></fwk-textarea>
                    </div>

                    <!-- Estado -->
                    <div class="grid-cell-label"><fwk-label value="<?=TH::translate('Estado')?>:"></fwk-label></div>
                    <div class="grid-cell-component">
                        <fwk-radiobutton id="group_active" key-value="id" key-text="description" value="<?=$active?>" disable="<?=$str_view_mode?>">
                            <div slot="options">[{"id": 1, "description":"<?=TH::translate('Ativo')?>"},{"id": 0, "description":"<?=TH::translate('Inativo')?>"}]</div>  
                        </fwk-radiobutton>
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
