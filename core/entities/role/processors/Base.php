<?php
/**
* ENTITIES - ROLE - PROCESSORS - BASE
*
* Disponibiliza métodos consumidos por pedidos AJAX sobre entidade Role
* 
* @pmonteiro (yyyy-mm-dd)
*/

namespace CORE\entities\role\processors;

use \FWK\proxies\CoreAjax;
use \FWK\wrappers\repositories\MainRepository;
use \FWK\helpers\TranslationHelper as TH;
use \FWK\helpers\PermissionHelper;
use \CORE\entities\role\Role;
use \CORE\entities\role\validators;
use \CORE\entities\permission\collections\PermissionsByRole;


final class Base implements \FWK\interfaces\AjaxAnswerInterface {

    use \FWK\traits\throwableHandler;

    // Acção a executar
    public ?string $action;

    // Container de resposta
    public ?array $answer;

    // Dados posted
    public ?array $data;

    // Tipo de resposta
    public ?string $response_type;

    // Repositório
    public ?\FWK\wrappers\repositories\MainRepository $repository;


    /**
     * Construtor
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function __construct() {
        try {

            $this->action = '';
            $this->answer = array();
            $this->answer['success'] = true;
            $this->answer['content'] = '';
            $this->data = array();

            // Repositório
            $this->repository = new MainRepository();
            
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }
    

    /**
     * Devolve lista
     *
     * @return array
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function getList() {
        try {

            // Entidade
            $obj_role = new Role($this->repository);

            // Parâmetros recebidos
            $db_search = $this->data['filter']['search'] ?? null;
            $db_filter = $this->data['filter']['fields'];
            $db_order = $this->data['filter']['order'];
            $db_limit = $this->data['filter']['limit'];
            $db_offset = $this->data['filter']['offset'];

            // Permissões
            $permissions = PermissionHelper::getCrudPermissions(array('ADMINISTRATION', 'SUPPORT', 'ROLE'));

            // Carrega registos na entidade
            $obj_role->loadList(null, $db_search, $db_filter, $db_order , $db_limit, $db_offset);

            // Botões para lista
            $view_button_value = TH::translate('Ver');
            $update_button_value = TH::translate('Editar');
            $delete_button_value = TH::translate('Eliminar');

            // Itera registos e carrega array de resposta
            $arr_records = array();
            while ($obj_role->loadNextRecord()) {
                
                $arr_record = array();

                // Key
                $id = $obj_role->getProperty('id');
                $arr_record['key'] = $id;

                // Colunas
                $arr_record['values']['sr.name'] = $name = $obj_role->getProperty('name');
                $arr_record['values']['sr.description'] = $obj_role->getProperty('description');
                $arr_record['values']['sr.active'] = boolval($obj_role->getProperty('active'));

                // Dados
                $arr_record['_data'] = array();

                // Permissões 
                $row_update = $permissions['update'];
                $row_delete = $permissions['delete'];

                // Registos de sistema não podem ser eliminados
                if (boolval($obj_role->getProperty('_system'))) {$row_delete = false;}
                
                // Permissões Bulk 
                $arr_record['_permissions'] = array();
                if ($row_update) {$arr_record['_permissions'][] = 'u';}
                if ($row_delete) {$arr_record['_permissions'][] = 'd';}
                
                 // Acções
                 $arr_record['_actions'] = array();
                 if ($row_update) {
                     $show_button_value = $update_button_value;
                 } else {
                     $show_button_value = $view_button_value;
                 }
                $arr_record['_actions'][] = '<fwk-button value="'.$show_button_value.'" color="blue" function=\'{"showRecord":['.$id.']}\'></fwk-button>';
                $arr_record['_actions'][] = '<fwk-button value="'.$delete_button_value.'" color="blue" disable="'.($row_delete?'false':'true').'" function=\'{"confirmDeleteRecord":['.$id.', "'.$name.'"]}\'></fwk-button>';

                $arr_records[] = $arr_record;

            }

            $this->answer['success'] = true;
            $this->answer['content'] = $arr_records;

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Insere registo
     *
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function insert() {
        try {

            // Entidade
            $obj_role = new Role($this->repository);

            // Isola os parâmetro referente à relação role->permissions
            $permissions = $this->data['permissions'];
            unset($this->data['permissions']);

            // Carrega propriedades da entidade pelos parâmetros recebidos
            foreach ($this->data as $key => $value) {
                $obj_role->setProperty($key, $value);
            }

            // Usa um validador para garantir a unicidade de name
            $obj_validator = new validators\Uniqueless($this->repository);
            $result = $obj_validator->validate($this->data);

            
            if ($result['success']) { // Insere registo

                $this->repository->beginTransaction(); 

                $result = $obj_role->insert();

                // Adiciona o id gerado à lista de parâmetros (para savePermissions)
                $this->data['id'] = $obj_role->getProperty('id');

                // Relação role->permissões
                $this->savePermissions($permissions);

                $this->repository->commitTransaction();

                // Devolve array com id gerado e mensagem de sucesso
                $this->answer['success'] = $result;
                $this->answer['content'] = array('id' => $obj_role->getProperty('id'), 'message' => TH::translate('Registo adicionado com sucesso.'));


            } else { // Erro de validação

                // Devolve array mensagem de erro recebida do validador
                $this->answer['success'] = false;
                $this->answer['content'] = $result['content'];

            }

        } catch (\Throwable $throwable) {
            $this->repository->rollbackTransaction(); 
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Altera registo
     *
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function update() {
        try {

            // Entidade
            $obj_role = new Role($this->repository);

            // Isola os parâmetro referente à relação role->permissions
            $permissions = $this->data['permissions'];
            unset($this->data['permissions']);

            // Carrega propriedades da entidade pelos parâmetros recebidos
            foreach ($this->data as $key => $value) {
                $obj_role->setProperty($key, $value);
            }

            // Usa um validador para garantir a unicidade do nome
            $obj_validator = new validators\Uniqueless($this->repository);
            $result = $obj_validator->validate($this->data);

            if ($result['success']) { // Altera registo

                $this->repository->beginTransaction(); 

                $result = $obj_role->update();

                // Relação role->permissões
                $this->savePermissions($permissions);

                $this->repository->commitTransaction();

                // Devolve array com id e mensagem de sucesso
                $this->answer['success'] = $result;
                $this->answer['content'] = array('id' => $obj_role->getProperty('id'), 'message' => TH::translate('Registo alterado com sucesso.'));

            } else {

                // Devolve array mensagem de erro recebida do validador
                $this->answer['success'] = false;
                $this->answer['content'] = $result['content'];

            }

        } catch (\Throwable $throwable) {
            $this->repository->rollbackTransaction(); 
            throw $this->throwableHandle($throwable);
        }

    }

    /**
     * Grava colecção de permissões
     *
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    private function savePermissions(array $permissions) {
        try {

            // Relação role->permissões
            $obj_role_permissions = new PermissionsByRole($this->repository);

            // Coleção de permissões 
            $collection = array();
            foreach($permissions[0] as $permission) {
                if (isset($permissions[1])) {
                    // Cálculo CRUD
                    if (count($crud_operations = $permissions[1][$permission])) {
                        $bitwise = PermissionHelper::toCrudBitWise($crud_operations);
                    } else {
                        // Permissão sem detalhes
                        $bitwise = null;
                    }
                } 
                $collection[] = array('permission_id' => $permission, 'value' => $bitwise);
            }

            // Grava colecção de permissões pelos parâmetros recebidos
            $obj_role_permissions->save($this->data['id'], $collection);

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }

    }


    /**
     * Elimina registo
     *
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function delete() {
        try {

            // Entidade
            $obj_role = new Role($this->repository);

            $result = $obj_role->delete_byId($this->data['id']);

            $this->answer['success'] = true;
            $this->answer['content'] = array('message' => TH::translate('Registo eliminado com sucesso.'));

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }

    }


    /**
     * Elimina registos bulk
     *
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function deleteBulk() {
        try {

            // Entidade
            $obj_role = new Role($this->repository);

            $db_conditions = '(id IN('.implode(',',$this->data['ids']).'))';
            $result = $obj_role->delete($db_conditions); 

            $this->answer['success'] = true;
            $this->answer['content'] = array('message' => TH::translate('Registos eliminados com sucesso.'));
  

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }

    }


    /**
     * Router de acções e respectivas respostas
     *
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function run(): void {
        try {
            // Redireccionamento de acções
            switch (strtoupper($this->action)) {
                case 'GET_LIST':
                    $this->response_type = CoreAjax::OUT_JSON;
                    $this->getList();
                break;
                case 'INSERT':
                    $this->response_type = CoreAjax::OUT_JSON;
                    $this->insert();
                break;
                case 'UPDATE':
                    $this->response_type = CoreAjax::OUT_JSON;
                    $this->update();
                break;
                case 'DELETE':
                    $this->response_type = CoreAjax::OUT_JSON;
                    $this->delete();
                break;   
                case 'DELETE_BULK':
                    $this->response_type = CoreAjax::OUT_JSON;
                    $this->deleteBulk();
                break;   
                default:
                    throw new \Exception('ACTION "' . $this->action . '" does not exist in file "'.substr(__FILE__, strlen($_SERVER['DOCUMENT_ROOT'])).'"');
                break;
            }

        } catch (\Throwable $throwable) {
            $this->response_type = CoreAjax::OUT_JSON;
            $this->answer['success'] = false;
            throw $this->throwableHandle($throwable);
        }
    }

}
// --- END