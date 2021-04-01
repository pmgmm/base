<?php
/**
 * UI - REGISTO DE FUNÇÃO
 *  
 * @pmonteiro (yyyy-mm-dd))
 */

namespace UI\admin\role;

require_once $_SERVER['DOCUMENT_ROOT'] . '/core/config/autoload.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/core/config/base.php';

use \FWK\helpers\PageHelper;
use \FWK\helpers\TranslationHelper as TH;
use \FWK\helpers\PermissionHelper;
use \FWK\wrappers\repositories\MainRepository;
use \CORE\entities\role\Role;
use \CORE\entities\permission\Permission;
use \CORE\entities\permission\collections\PermissionsByRole;


final class _record {

    use \FWK\traits\throwableHandler;

    public function run(): void {
        try {

            // Setup de página
            $obj_page = new PageHelper(PageHelper::FORM);
            $obj_page->setSubTitle('Funções');
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
            $view_mode = PermissionHelper::ValidateRecord(array('ADMINISTRATION', 'SUPPORT', 'ROLE'), $permisson_operation);

            // Inicialização de variáveis 
            $system = false;
            $active = 1;
            $name = $description = '';
            $breadcrumb = TH::translate('NOVA FUNÇÃO');

            // Repositório
            $repository = new MainRepository();

            // Array de permissões para slot
            $obj_permission = new Permission($repository);
            $db_fields = array('id', 'code', 'type');
            $arr_role_permissions = array();
            $arr_permissions = array();
            $arr_crud = array();
            if ($obj_permission->loadList($db_fields,null, null, array('code ASC'))) {
                while ($obj_permission->loadNextRecord()) {
                    $arr_permission = $obj_permission->getProperties();
                    // Apenas permissões tipo "c" têm crud
                    $arr_crud[$obj_permission->getProperty('id')] = ($obj_permission->getProperty('type') == 'c');
                    unset($arr_permission['type']);
                    $arr_permissions[] = $arr_permission;
                }
            }

            // Carrega (se existir) o registo da função
            if ($id > 0) {

                $obj_role = new Role($repository);
                if ($obj_role->load_byID($id)) {
                    if ($view_mode) {
                        $breadcrumb = TH::translate('VER FUNÇÃO');
                    } else {
                        $breadcrumb = TH::translate('EDITAR FUNÇÃO');  
                    }
                    $name = $obj_role->getProperty('name');
                    $description = $obj_role->getProperty('description');
                    $system = boolval($obj_role->getProperty('_system'));

                    // Permissões associadas ao role
                    $obj_permissionsByRole = new PermissionsByRole($repository);
                    $arr_permissions_collection = $obj_permissionsByRole->load($id);

                    // Detalhes crud de cada permissão
                    foreach ($arr_permissions_collection as $permission) {
                        $arr_role_permissions[] = $permission['permission_id'];
                        if ($arr_crud[$permission['permission_id']]) {
                            $arr_crud[$permission['permission_id']] = PermissionHelper::toCrudPermissions($permission['value']);
                        }
                    }  
                    
                } else { // Se não exite, reinicializa o id (=0 para insert)
                    $id = 0;
                }

            }

            // Breadcrump
            $obj_page->setBreadcrumb($breadcrumb);

            // Variáveis View mode (campos ou form)
            $str_view_mode_or_system = ($view_mode || $system) ? 'true' : 'false';
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
                        <fwk-input id="role_name" type="text" value="<?=$name?>" mandatory="true" disable="<?=$str_view_mode_or_system?>"></fwk-input>
                    </div>

                    <!-- Descrição -->
                    <div class="grid-cell-label"><fwk-label value="<?=TH::translate('Descrição')?>:"></fwk-label></div>
                    <div class="grid-cell-component">
                        <fwk-textarea id="role_description" min-width="400" maxlength="255" value="<?=$description?>" disable="<?=$str_view_mode?>"></fwk-textarea>
                    </div>

                    <!-- Estado -->
                    <div class="grid-cell-label"><fwk-label value="<?=TH::translate('Estado')?>:"></fwk-label></div>
                    <div class="grid-cell-component">
                        <fwk-radiobutton id="role_active" key-value="id" key-text="description" value="<?=$active?>" disable="<?=$str_view_mode_or_system?>">
                            <div slot="options">[{"id": 1, "description":"<?=TH::translate('Ativa')?>"},{"id": 0, "description":"<?=TH::translate('Inativa')?>"}]</div>  
                        </fwk-radiobutton>
                    </div>

                </div>

                <!-- Coluna direita --> 
                <div class="grid-column">
                
                    <div class="grid-row">
                        <fwk-dragdropselect id="role_permissions" key-value="id" key-text="code"
                                value='<?=json_encode($arr_role_permissions)?>' 
                                width-selected="375" 
                                title-available = "<?=TH::translate('DISPONÍVEIS')?>" title-selected = "<?=TH::translate('PERMISSÕES SELECIONADAS')?>"
                                rows="12" filter="true" mandatory="true" disable="<?=$str_view_mode_or_system?>" color="blue">
                            <span slot="information"><?=TH::translate('C - Adicionar<br>R - Ver<br>U - Editar<br>D - Eliminar')?></span>  
                            <div slot="template_details">
                                <fwk-checkbox id="1" label="C" value="true" color="blue"></fwk-checkbox>
                                <fwk-checkbox id="2" label="R" value="true" color="blue"></fwk-checkbox>
                                <fwk-checkbox id="4" label="U" value="true" color="blue"></fwk-checkbox>
                                <fwk-checkbox id="8" label="D" value="true" color="blue"></fwk-checkbox> 
                            </div>
                            <div slot="details"><?=json_encode($arr_crud)?></div>
                            <div slot="options"><?=json_encode($arr_permissions)?></div>
                        </fwk-dragdropselect>
                    </div>
                
                </div>

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