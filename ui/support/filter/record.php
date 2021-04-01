<?php
/**
 * UI - REGISTO DE FILTRO
 *  
 * @pmonteiro (yyyy-mm-dd))
 */

namespace UI\support\filter;

require_once $_SERVER['DOCUMENT_ROOT'] . '/core/config/autoload.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/core/config/base.php';

use \FWK\helpers\PageHelper;
use \FWK\helpers\TranslationHelper as TH;
use \FWK\helpers\PermissionHelper;
use \FWK\wrappers\repositories\MainRepository;
use \CORE\entities\filter\Filter;
use \CORE\entities\user\User;


final class _record {

    use \FWK\traits\throwableHandler;

    public function run(): void {
        try {
            
            // Setup de página
            $obj_page = new PageHelper(PageHelper::FORM);
            $obj_page->setSubTitle('Filtro');
            $obj_page->setCurrentMenu('support');
            $obj_page->setCoreModule(MODULE_SUPPORT);
            $obj_page->addScript('record.js');
            $obj_page->addStyleSheet('/framework/css/grid_form_data.css');

            // Define o valor do id pelo parâmetro do url
            $id = isset($_REQUEST['id']) ? intval($_REQUEST['id']) : 0;  

            // Permissões de página
            $permisson_operation = (boolval($id)) ? PermissionHelper::UPDATE : PermissionHelper::CREATE;
            // Sai se não tiver permissão
            // Recebe "modo view" se não existir permissão para udpdate 
            $view_mode = PermissionHelper::ValidateRecord(array('ADMINISTRATION', 'SUPPORT', 'FILTER'), $permisson_operation);

            // Inicialização de variáveis
            $active = 1;
            $system = false;
            $list = $user_id = $name = $description = $structure = '';
            $public = 1;
            $breadcrumb = TH::translate('NOVO FILTRO');

            // Repositório
            $repository = new MainRepository();

            // Carrega (se existir) o registo do filtro
            if ($id > 0) {

                $obj_filter = new Filter($repository);
                if ($obj_filter->load_byID($id)) {
                    if ($view_mode) {
                        $breadcrumb = TH::translate('VER FILTRO');
                    } else {
                        $breadcrumb = TH::translate('EDITAR FILTRO');  
                    }
                    $list = $obj_filter->getProperty('list');
                    $user_id = $obj_filter->getProperty('user_id');
                    $name = $obj_filter->getProperty('name');
                    $description = $obj_filter->getProperty('description');
                    $structure = $obj_filter->getProperty('structure');
                    $public = $obj_filter->getProperty('public');
                    $active = $obj_filter->getProperty('active');

                } else { // Se não exite, reinicializa o id (=0 para insert)
                    $id = 0;
                }

            }

            // Breadcrump
            $obj_page->setBreadcrumb($breadcrumb);

            // Variáveis View mode (campos ou form)
            $str_view_mode = $view_mode ? 'true' : 'false';

            // Array de utilizadores para slot
            $obj_user = new User($repository);
            $db_fields = array('id', 'name');
            $db_filter = array('active' => true);
            $obj_order = array('name ASC');
            $obj_user->loadList($db_fields, null, $db_filter, $obj_order);
            $arr_users = $obj_user->getList();

            // Inicia e carrega container body do template
            $obj_page->startContent('body');

            ?>

            <!-- baseado em "grid_form_data.css" carregado na página -->
            <div class="grid-structure two-columns">

                <!-- Coluna esquerda -->     
                <div class="grid-column">

                    <!-- Lista -->
                    <div class="grid-cell-label"><fwk-label value="<?=TH::translate('Lista')?>:"></fwk-label></div>
                    <div class="grid-cell-component">
                        <fwk-input id="filter_list" type="text" width="200" maxlength="100" value="<?=$list?>" mandatory="true" disable="<?=$str_view_mode?>">
                            <span slot="information"><?=TH::translate('ID do componente onde vai ser disponibilizado o filtro.')?></span>
                        </fwk-input>
                    </div>

                    <!-- Utilizador -->
                    <div class="grid-cell-label"><fwk-label value="<?=TH::translate('Utilizador')?>:"></fwk-label></div>
                    <div slot="grid-cell-component">
                        <fwk-select id="filter_user_id" key-value="id" key-text="name" placeholder="<?=TH::translate('Selecione')?>" value="<?=$user_id?>" width="200" rows="12" filter="true" mandatory="true" disable="<?=$str_view_mode?>">
                            <span slot="information"><?=TH::translate('Utilizador proprietário do filtro.')?></span>
                            <div slot="options"><?=json_encode($arr_users)?></div>   
                        </fwk-select>
                    </div>

                    <!-- Nome -->
                    <div class="grid-cell-label"><fwk-label value="<?=TH::translate('Nome')?>:"></fwk-label></div>
                    <div class="grid-cell-component">
                        <fwk-input id="filter_name" type="text" width="200" value="<?=$name?>" mandatory="true" disable="<?=$str_view_mode?>"></fwk-input>
                    </div>

                    <!-- Descrição -->
                    <div class="grid-cell-label"><fwk-label value="<?=TH::translate('Descrição')?>:"></fwk-label></div>
                    <div class="grid-cell-component">
                        <fwk-textarea id="filter_description" min-width="400" maxlength="255" value="<?=$description?>" disable="<?=$str_view_mode?>"></fwk-textarea>
                    </div>

                   <!-- Estrutura -->
                   <div class="grid-cell-label"><fwk-label value="<?=TH::translate('Estrutura')?>:"></fwk-label></div>
                    <div class="grid-cell-component">
                        <fwk-textarea id="filter_structure" value='<?=$structure?>' mandatory="true" disable="<?=$str_view_mode?>" min-width="800"></fwk-textarea>
                    </div>  

                    <!-- Âmbito -->
                    <div class="grid-cell-label"><fwk-label value="<?=TH::translate('Âmbito')?>:"></fwk-label></div>
                    <div class="grid-cell-component">
                        <fwk-radiobutton id="filter_public" key-value="value" key-text="description" value="<?=$public?>" disable="<?=$str_view_mode?>">
                            <div slot="options">[{"value": 0, "description": "<?=TH::translate('Privado')?>"},{"value": 1, "description": "<?=TH::translate('Público')?>"}]</div>
                        </fwk-radiobutton>
                    </div>

                    <!-- Estado -->
                    <div class="grid-cell-label"><fwk-label value="<?=TH::translate('Estado')?>:"></fwk-label></div>
                    <div class="grid-cell-component">
                        <fwk-radiobutton id="filter_active" key-value="value" key-text="description" value="<?=$active?>" disable="<?=$str_view_mode?>">
                            <div slot="options">[{"value": 1, "description": "<?=TH::translate('Ativo')?>"},{"value": 0, "description": "<?=TH::translate('Inativo')?>"}]</div>  
                        </fwk-radiobutton>
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