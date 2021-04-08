<?php
/**
* ENTITIES - USER - PROCESSORS - BASE
*
* Disponibiliza métodos consumidos por pedidos AJAX sobre entidade USER
* 
* @pmonteiro (yyyy-mm-dd)
*/

namespace CORE\entities\user\processors;

use \FWK\proxies\CoreAjax;
use \FWK\wrappers\repositories\MainRepository;
use \FWK\helpers\TranslationHelper as TH;
use \FWK\helpers\PermissionHelper;
use \CORE\entities\user\User;
use \CORE\entities\user\validators;
use \CORE\entities\group;
use \CORE\entities\role;


class Base implements \FWK\interfaces\AjaxAnswerInterface {

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
            $this->files = array();
            
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
            $obj_user = new User($this->repository);

            // Parâmetros recebidos
            $db_search = $this->data['filter']['search'] ?? null;
            $db_filter = $this->data['filter']['fields'];
            $db_order = $this->data['filter']['order'];
            $db_limit = $this->data['filter']['limit'];
            $db_offset = $this->data['filter']['offset'];

            // Permissões
            $permissions = PermissionHelper::getCrudPermissions(array('ADMINISTRATION', 'SUPPORT', 'USER'));

            // Carrega registos na entidade
            $obj_user->loadList(null, $db_search, $db_filter, $db_order, $db_limit, $db_offset);

            // Botões para lista
            $view_button_value = TH::translate('Ver');
            $update_button_value = TH::translate('Editar');
            $delete_button_value = TH::translate('Eliminar');

            // Itera registos e carrega array de resposta
            $arr_records = array();
            while ($obj_user->loadNextRecord()) {
                
                $arr_record = array();

                // Key
                $id = $obj_user->getProperty('id');
                $arr_record['key'] = $id;

                // Colunas
                $arr_record['values']['su.user'] = $obj_user->getProperty('user');
                $arr_record['values']['su.name'] = $name = $obj_user->getProperty('name');
                $arr_record['values']['su.email'] = $obj_user->getProperty('email');
                $arr_record['values']['su._system'] = boolval($obj_user->getProperty('_system'));
                $arr_record['values']['su.active'] = boolval($obj_user->getProperty('active'));

                // Dados
                $arr_record['_data'] = array();

                // Permissões 
                $row_update = $permissions['update'];
                $row_delete = $permissions['delete'];

                // Registos de sistema não podem ser eliminados
                if (boolval($obj_user->getProperty('_system'))) {$row_delete = false;}

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
            $obj_user = new User($this->repository);

            // Colecções
            $obj_user_groups = new group\collections\GroupsByUser($this->repository);
            $obj_user_roles = new role\collections\RolesByUser($this->repository);
        
            // Separa os arrays de grupos e funções do grupo de parâmetros
            $arr_groups = $this->data['groups'];
            unset($this->data['groups']);
            $arr_roles = $this->data['roles'];
            unset($this->data['roles']);

            // Carrega propriedades da entidade pelos parâmetros recebidos
            foreach ($this->data as $key => $value) {
                $obj_user->setProperty($key, $value);
            }

            // Avatar
            if ($this->files['avatar']) {
                $file = $this->files['avatar'][0];
                if (is_uploaded_file($file['tmp_name'])) {
                    $tmp_name = $file["tmp_name"];
                    $name = basename($file["name"]);
                    $type = strtolower( end(explode('.',$name)));
                    $data = file_get_contents($tmp_name);
                    $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
                    $obj_user->setProperty('avatar', $base64);
                }
            }

            // Usa um validador para garantir a unicidade de user, name, email
            $obj_validator = new validators\Uniqueless($this->repository);
            $result = $obj_validator->validate($this->data);

            if ($result['success']) { // Insere registo

                $this->repository->beginTransaction(); 

                $result = $obj_user->insert();

                // Grava colecção de grupos pelos parâmetros recebidos
                $obj_user_groups->save($obj_user->getProperty('id'), $arr_groups);

                // Grava colecção de funções pelos parâmetros recebidos
                $obj_user_roles->save($obj_user->getProperty('id'), $arr_roles);

                $this->repository->commitTransaction();

                // Devolve array com id gerado e mensagem de sucesso
                $this->answer['success'] = $result;
                $this->answer['content'] = array('id' => $obj_user->getProperty('id'), 'message' => TH::translate('Registo adicionado com sucesso.'));


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
            $obj_user = new User($this->repository);

            // Colecções
            $obj_user_groups = new group\collections\GroupsByUser($this->repository);
            $obj_user_roles = new role\collections\RolesByUser($this->repository);

            // Separa os arrays de grupos e funções do grupo de parâmetros
            $arr_groups = $this->data['groups'];
            unset($this->data['groups']);
            $arr_roles = $this->data['roles'];
            unset($this->data['roles']);

            // Carrega propriedades da entidade pelos parâmetros recebidos
            foreach ($this->data as $key => $value) {
                $obj_user->setProperty($key, $value);
            }

            // Avatar
            if ($this->files['avatar']) {
                $file = $this->files['avatar'][0];
                if (is_uploaded_file($file['tmp_name'])) {
                    $tmp_name = $file["tmp_name"];
                    $name = basename($file["name"]);
                    $type = strtolower( end(explode('.',$name)));
                    $data = file_get_contents($tmp_name);
                    $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
                    $obj_user->setProperty('avatar', $base64);
                }
            }

            // Usa um validador para garantir a unicidade de user, name, email
            $obj_validator = new validators\Uniqueless($this->repository);
            $result = $obj_validator->validate($this->data);

            if ($result['success']) { // Altera registo

                $this->repository->beginTransaction(); 

                $obj_user->update();

                // Grava colecção de grupos pelos parâmetros recebidos
                $obj_user_groups->save($obj_user->getProperty('id'), $arr_groups);

                // Grava colecção de funções pelos parâmetros recebidos
                $obj_user_roles->save($obj_user->getProperty('id'), $arr_roles);

                $this->repository->commitTransaction();

                // Devolve array com id e mensagem de sucesso
                $this->answer['success'] = true;
                $this->answer['content'] = array('id' => $obj_user->getProperty('id'), 'message' => TH::translate('Registo alterado com sucesso.'));

            } else {

                // Devolve mensagem de erro recebida do validador
                $this->answer['success'] = false;
                $this->answer['content'] = $result['content'];

            }

        } catch (\Throwable $throwable) {
            $this->repository->rollbackTransaction(); 
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
            $obj_user = new User($this->repository);

            $result = $obj_user->delete_byId($this->data['id']); 

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
            $obj_user = new User($this->repository);

            $db_conditions = '(id IN('.implode(',',$this->data['ids']).'))';
            $result = $obj_user->delete($db_conditions); 

            $this->answer['success'] = true;
            $this->answer['content'] = array('message' => TH::translate('Registos eliminados com sucesso.'));
  

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }

    }


    /**
     * Login
     *
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function login() {
        try {

            // Entidade
            $obj_user = new User($this->repository);

            $result = $obj_user->login($this->data['user_or_email'], $this->data['password']);

            if ($result['success']) {
  
                $this->answer['success'] = true;
                $this->answer['content'] = array('message' => TH::translate('Login efectuado com sucesso.'),
                                                 'storage' => $result['storage']);

            } else {
               
                $this->answer['success'] = false;
                $this->answer['content'] = TH::translate('Credenciais inválidas.');
            }

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }

    }


    /**
     * Login
     *
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function logout() {
        try {

            // Entidade
            $obj_user = new User($this->repository);

            if ($obj_user->logout()) {
  
                $this->answer['success'] = true;
                $this->answer['content'] = array('message' => TH::translate('Logout efectuado com sucesso.'));

            }

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
                case 'LOGIN':
                    $this->response_type = CoreAjax::OUT_JSON;
                    $this->login();
                break;  
                case 'LOGOUT':
                    $this->response_type = CoreAjax::OUT_JSON;
                    $this->logout();
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