<?php
/**
 * UI - REGISTO DE PERMISSÃO
 *  
 * @pmonteiro (yyyy-mm-dd))
 */

namespace UI\admin\permission;

require_once $_SERVER['DOCUMENT_ROOT'] . '/core/config/autoload.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/core/config/base.php';

use \FWK\helpers\PageHelper;
use \FWK\helpers\TranslationHelper as TH;
use \FWK\helpers\PermissionHelper;
use \FWK\wrappers\repositories\MainRepository;
use \CORE\entities\permission\Permission;

final class _record {

    use \FWK\traits\throwableHandler;

    public function run(): void {
        try {

            // Setup de página
            $obj_page = new PageHelper(PageHelper::FORM);
            $obj_page->setSubTitle('Função');
            $obj_page->setCurrentMenu('adm');
            $obj_page->setCoreModule(MODULE_ADMINISTRATION);
            $obj_page->addScript('record.js');
            $obj_page->addStyleSheet('/framework/css/grid_form_data.css');

            // Define o valor do id pelo parâmetro do url
            $id = isset($_REQUEST['id']) ? intval($_REQUEST['id']) : 0;  

            // Permissões de página
            $permisson_operation = (boolval($id)) ? PermissionHelper::UPDATE : PermissionHelper::CREATE;
            // Sai se não tiver permissão
            // Recebe "modo view" se não existir permissão para udpdate 
            $view_mode = PermissionHelper::ValidateRecord(array('ADMINISTRATION', 'SUPPORT', 'PERMISSION'), $permisson_operation);

            // Inicialização de variáveis 
            $active = 1;
            $name = $description = '';
            $breadcrumb = TH::translate('NOVA PERMISSÃO');

            // Repositório
            $repository = new MainRepository();

            // Carrega (se existir) o registo da permissão
            if ($id > 0) {

                $obj_permission = new Permission($repository);
                if ($obj_permission->load_byID($id)) {
                    if ($view_mode) {
                        $breadcrumb = TH::translate('VER PERMISSÃO');
                    } else {
                        $breadcrumb = TH::translate('EDITAR PERMISSÃO');  
                    }
                    $code = $obj_permission->getProperty('code');
                    $description = $obj_permission->getProperty('description');
                    $type = $obj_permission->getProperty('type');
                } else { // Se não exite, reinicializa o id (=0 para insert)
                    $id = 0;
                }

            }

            // Breadcrump
            $obj_page->setBreadcrumb($breadcrumb);

            // Variáveis View mode (form)
            $str_view_mode = $view_mode ? 'true' : 'false';

            // Inicia e carrega container body do template
            $obj_page->startContent('body');

            ?>
            <!-- baseado em "grid_form_data.css" carregado na página -->
            <div class="grid-structure two-columns">

                <!-- Coluna esquerda -->     
                <div class="grid-column">

                    <!-- Nome -->
                    <div class="grid-cell-label"><fwk-label value="<?=TH::translate('Código')?>:"></fwk-label></div>
                    <div class="grid-cell-component">
                        <fwk-input id="permission_code" type="text" value="<?=$code?>" mandatory="true" disable="<?=$str_view_mode?>"></fwk-input>
                    </div>

                    <!-- Descrição -->
                    <div class="grid-cell-label"><fwk-label value="<?=TH::translate('Descrição')?>:"></fwk-label></div>
                    <div class="grid-cell-component">
                        <fwk-textarea id="permission_description" min-width="400" maxlength="255" value="<?=$description?>" disable="<?=$str_view_mode?>"></fwk-textarea>
                    </div>

                    <!-- Tipo -->
                    <div class="grid-cell-label"><fwk-label value="<?=TH::translate('Tipo')?>:"></fwk-label></div>
                    <div class="grid-cell-component">
                        <fwk-select id="permission_type" key-value="value" key-text="description" placeholder="<?=TH::translate('Selecione')?>" value="<?=$type?>" mandatory="true" width="150" disable="<?=$str_view_mode?>">
                        <span slot="information"><?=TH::translate('CRUD: Definição crud na associação<br>FUNCIONAL: Assume todas as operações<br>MÓDULO: Acesso a módulo<br>SISTEMA: Não descartáveis')?></span>  
                            <div slot="options">[{"value": "c", "description":"<?=TH::translate('CRUD')?>"},{"value": "f", "description":"<?=TH::translate('Completa')?>"},{"value": "m", "description":"<?=TH::translate('Módulo')?>"},{"value": "s", "description":"<?=TH::translate('Sistema')?>"}]</div>  
                        </fwk-select>
                    </div>

                </div>

                <!-- Coluna direita --> 
                <div class="grid-column"></div>

            </div> 
 
            <?php 

            // Inicia e carrega container body-actions do template
            $obj_page->startContent('body-actions'); 
            
            ?>

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