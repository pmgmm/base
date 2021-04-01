<?php
/**
 * UI - LISTA DE FUNÇÕES
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
use \CORE\entities\filter\Filter;


final class _list {

    use \FWK\traits\throwableHandler;

    public function run(): void {
        try {

            // Repositório
            $repository = new MainRepository();

            // Setup de página
            $obj_page = new PageHelper(PageHelper::LIST);
            $obj_page->setSubTitle(TH::translate('Funções'));
            $obj_page->setCurrentMenu('administration');
            $obj_page->setBreadcrumb(TH::translate('ORGANIZAÇÃO'), true);
            $obj_page->setBreadcrumb(TH::translate('FUNÇÕES'));
            $obj_page->setCoreModule(MODULE_ADMINISTRATION);
            $obj_page->addScript('list.js');
            $obj_page->addStyleSheet('/framework/css/grid_form_data.css');

            // Permissões de página
            // Sai se não tiver permissão
            // Recebe permissões  
            $permissions = PermissionHelper::validateList(array('ADMINISTRATION', 'SUPPORT', 'ROLE'));
            $create_disable = $permissions['create'] ? 'false' : 'true';
            $delete_disable = $permissions['delete'] ? 'false' : 'true';

            // Configura lista
            $table_config = array('filter' => true, 'actions' => true, 'bulk' => true, 'row_actions' => true);
            $table_columns = array();
            $table_columns['sr.name'] = array('title' => TH::translate('NOME'), 'width' => 230, 'order' => true);
            $table_columns['sr.description'] = array('title' => TH::translate('DESCRIÇÃO'), 'width' => 400);
            $table_columns['sr.active'] = array('title' => TH::translate('ATIVO'), 'width' => 60,'align' => 'center');
            $table_columns['_actions'] = array('width' => 130);

            // Array de filtros para slot
            $obj_filter = new Filter($repository);
            $db_fields = array('id', 'name', 'public', 'structure'); 
            $db_filter = array('list' => 'roles_list', 'user_id' => array($_SESSION['USER']['id'], null), 'active' => true);
            $db_order = array('name ASC');
            $obj_filter->loadList($db_fields, null, $db_filter, $db_order);
            $arr_filters = $obj_filter->getList();

            // Inicia e carrega container body do template
            $obj_page->startContent('body');
            ?>

            <!-- Modal de adição de filtro -->
            <fwk-modal id="modal_filter_save" title="<?=TH::translate('Gravar filtro')?>" max-height="300" color="blue">    
                <div slot="content" class="grid-structure no-padding">
                    <div class="grid-column one-column">
                        <div class="grid-cell-label"><fwk-label value="<?=TH::translate('Nome')?>:"></fwk-label></fwk-label></div>
                        <div class="grid-cell-component">
                            <fwk-input id="filter_save_name" mandatory="true" placeholder="" width="220" tooltip-position="left"></fwk-input>
                        </div>
                        <div></div>
                        <div class="grid-cell-component">
                        <fwk-radiobutton id="filter_save_action" key-value="value" key-text="description">
                            <div slot="options">[{"value": "insert", "description": "<?=TH::translate('Novo')?>"},{"value": "update", "description": "<?=TH::translate('Atualizar')?>"}]</div>  
                        </fwk-radiobutton>
                    </div>
                        <div class="grid-cell-multi-actions right">
                            <fwk-formbutton value="<?=TH::translate('CANCELAR')?>" color="white" script="FormHelper.getComponent('modal_filter_save').show=false;"></fwk-formbutton>
                            <fwk-formbutton value="<?=TH::translate('GRAVAR')?>" color="gray" function="obj_filter_helper.save"></fwk-formbutton>
                        </div>
                    </div>
                </div>
            </fwk-modal>

            <!-- Componente table -->
            <fwk-table id="roles_list">
                
                <!-- Configuração -->
                <div slot="config"><?=json_encode($table_config)?></div>
                <div slot="columns"><?=json_encode($table_columns)?></div>

                <!-- Botões de topo de tabela -->
                <fwk-button slot="table-top-action" value="<?=TH::translate('Adicionar registo')?>" color="blue" disable="<?=$create_disable?>" function="addRecord">
                    <i slot="icon" class="fas fa-plus-circle fa-lg"></i>
                </fwk-button>

                <!-- Botões para dropdown bulk -->
                <fwk-button slot="table-bulk-action" value="<?=TH::translate('Eliminar Selecionados')?>" disable="<?=$delete_disable?>" color="blue" function="confirmDeleteBulk">
                    <i slot="icon" class="fas fa-trash"></i>
                </fwk-button>

                <!-- Componentes para filtro -->

                <!-- Botões de topo de filtro -->
                <fwk-button id="filter_save" slot="filter-top-action" value="<?=TH::translate('Gravar')?>" color="blue" function="obj_filter_helper.confirmSave">
                    <i slot="icon" class="fas fa-save fa-lg"></i>
                </fwk-button>
                <fwk-button id="filter_delete" slot="filter-top-action" visible="false" value="<?=TH::translate('Eliminar')?>" color="blue" function="obj_filter_helper.confirmDelete">
                    <i slot="icon" class="fas fa-trash"></i>
                </fwk-button>

                <!-- Filtros gravados -->
                <div slot="filter-component">
                    <fwk-label value="<?=TH::translate('Filtro')?>:"></fwk-label>
                    <fwk-select id="filter_id" key-value="id" key-text="name" placeholder="<?=TH::translate('Selecione')?>" width="250" function="obj_filter_helper.applySaved">
                        <div slot="options"><?=json_encode($arr_filters)?></div>
                    </fwk-select>
                </div>

                <!-- Pesquisa livre -->
                <div slot="filter-component" style="padding-right: 10px;">
                    <fwk-label value="<?=TH::translate('Pesquisa livre')?>:"></fwk-label>
                    <fwk-input id="filter_search" type="text" placeholder="> 2 <?=TH::translate('carateres')?>" maxlength="50" tooltip-position="left">
                        <span slot="information"><?=TH::translate('Sobre as colunas:')?><br><?=TH::translate('NOME')?> <?=TH::translate('e')?> <?=TH::translate('DESCRIÇÃO')?></span>
                    </fwk-input>
                </div>

                <!-- Tipo -->
                <div slot="filter-component">
                    <fwk-label value="<?=TH::translate('Tipo')?>:"></fwk-label>
                    <fwk-select id="role_system" key-value="value" key-text="description" placeholder="<?=TH::translate('Todos')?>" width="150">
                        <div slot="options">[{"value": 0, "description":"<?=TH::translate('Definida')?>"},{"value": 1, "description":"<?=TH::translate('Sistema')?>"}]</div>
                    </fwk-select>
                </div>

                <!-- Estado -->
                <div slot="filter-component">
                    <fwk-label value="<?=TH::translate('Estado')?>:"></fwk-label>
                    <fwk-select id="role_active" key-value="value" key-text="description" placeholder="<?=TH::translate('Todos')?>" width="150">
                        <div slot="options">[{"value": 1, "description":"<?=TH::translate('Ativa')?>"},{"value": 0, "description":"<?=TH::translate('Inativa')?>"}]</div>
                    </fwk-select>
                </div>

                <!-- Acções  de filtro -->
                <fwk-formbutton slot="filter-action" value="<?=TH::translate('LIMPAR')?>" color="white" function="resetFilterComponents"></fwk-formbutton>
                <fwk-formbutton slot="filter-action" value="<?=TH::translate('FILTRAR')?>" color="gray" function="applyFilter"></fwk-formbutton>

            </fwk-table>

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
$obj = new _list();
$obj->run();
// --- END