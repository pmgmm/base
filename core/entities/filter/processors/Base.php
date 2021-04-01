<?php
/**
* ENTITIES - FILTER - PROCESSORS - BASE
*
* Disponibiliza métodos consumidos por pedidos AJAX sobre entidade Filter
* 
* @pmonteiro (yyyy-mm-dd)
*/

namespace CORE\entities\filter\processors;

use \FWK\proxies\CoreAjax;
use \FWK\wrappers\repositories\MainRepository;
use \FWK\helpers\TranslationHelper as TH;
use \FWK\helpers\PermissionHelper;
use \CORE\entities\filter\Filter;
use \CORE\entities\filter\validators;
use \CORE\entities\filter\statements;


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
    public function getList(): void {
        try {

            // Entidade
            $obj_filter = new Filter($this->repository);
            
            // Parâmetros recebidos
            $db_filter_id = $this->data['filter']['filter_id'] ?? null;
            $db_search = $this->data['filter']['search'] ? strtolower($this->data['filter']['search']) : null;
            $db_fields = $this->data['filter']['fields'];
            $db_order = $this->data['filter']['order'];
            $db_limit = $this->data['filter']['limit'];
            $db_offset = $this->data['filter']['offset'];

            // Permissões
            $permissions = PermissionHelper::getCrudPermissions(array('ADMINISTRATION', 'DEVELOPMENT', 'TRANSLATION'));

            if (isset($db_filter['sf.user_id'])) {
                $db_filter['sf.user_id'] = json_decode($db_filter['sf.user_id']);
            }

             if (isset($db_filter['sf._on'])) {
                $db_filter['sf._on'] = json_decode($db_filter['sf._on'], true);
            } 
            
            // Carrega registos 
            $options = array('search' => $db_search, 'fields' => $db_fields, 'order' => $db_order, 'limit' => $db_limit, 'offset' => $db_offset);
            $obj_filter->loadList_byStatement(new statements\TableQueries(), statements\TableQueries::BASE, $options);

            // Itera registos e carrega array de resposta
            $arr_records = array();
            while ($obj_filter->loadNextRecord()) {

                $arr_record = array();

                // Key
                $id = $obj_filter->getProperty('id');
                $arr_record['key'] = $id;

                // Colunas
                $arr_record['values']['sf.list'] = $name = $obj_filter->getProperty('list');
                $arr_record['values']['sf.name'] = $obj_filter->getProperty('name');
                $arr_record['values']['su.name'] = $obj_filter->getProperty('su_name');
                $arr_record['values']['sf.description'] = $obj_filter->getProperty('description');
                $arr_record['values']['sf.public'] = boolval($obj_filter->getProperty('public'));
                $arr_record['values']['sf.active'] = boolval($obj_filter->getProperty('active'));

                // Dados
                $arr_record['_data'] = array();

                // Permissões 
                $row_update = $permissions['update'];
                $row_delete = $permissions['delete'];

                // Permissões Bulk 
                $arr_record['_permissions'] = array();
                if ($row_update) {$arr_record['_permissions'][] = 'u';}
                if ($row_delete) {$arr_record['_permissions'][] = 'd';}

                // Acções
                $arr_record['_actions'] = array();
                if ($row_update) {
                    $arr_record['_actions'][] = '<fwk-button value="'.TH::translate('Editar').'" color="blue" function=\'{"editRecord":['.$id.']}\'></fwk-button>';
                } else {
                    $arr_record['_actions'][] = '<fwk-button value="'.TH::translate('Ver').'" color="blue" function=\'{"viewRecord":['.$id.']}\'></fwk-button>';
                }
                $arr_record['_actions'][] = '<fwk-button value="'.TH::translate('Eliminar').'" color="blue" disable="'.($row_delete?'false':'true').'" function=\'{"confirmDeleteRecord":['.$id.', "'.$name.'"]}\'></fwk-button>';

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
    public function insert(): void {
        try {

            // Entidade
            $obj_filter = new Filter($this->repository);

            // Carrega propriedades da entidade pelos parâmetros recebidos
            foreach ($this->data as $key => $value) {
                $obj_filter->setProperty($key, $value);
            }

            // Usa um validador para garantir a unicidade de name
            $obj_validator = new validators\Uniqueless($this->repository);
            $result = $obj_validator->validate($this->data);
            
            if ($result['success']) { // Insere registo

                $result = $obj_filter->insert();

                // Devolve array com id gerado e mensagem de sucesso
                $this->answer['success'] = $result;
                $this->answer['content'] = array('id' => $obj_filter->getProperty('id'), 'message' => TH::translate('Registo adicionado com sucesso.'));


            } else { // Erro de validação

                // Devolve array mensagem de erro recebida do validador
                $this->answer['success'] = false;
                $this->answer['content'] = $result['content'];

            }

        } catch (\Throwable $throwable) {
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
    public function update(): void {
        try {

            // Entidade
            $obj_filter = new Filter($this->repository);

            // Carrega propriedades da entidade pelos parâmetros recebidos
            foreach ($this->data as $key => $value) {
                $obj_filter->setProperty($key, $value);
            }

            // Usa um validador para garantir a unicidade de list user e name
            $obj_validator = new validators\Uniqueless($this->repository);
            $result = $obj_validator->validate($this->data);

            if ($result['success']) { // Altera registo

                $result = $obj_filter->update();

                // Devolve array com id e mensagem de sucesso
                $this->answer['success'] = $result;
                $this->answer['content'] = array('id' => $obj_filter->getProperty('id'), 'message' => TH::translate('Registo alterado com sucesso.'));

            } else {

                // Devolve array mensagem de erro recebida do validador
                $this->answer['success'] = false;
                $this->answer['content'] = $result['content'];

            }

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
    public function delete(): void {
        try {

            // Entidade
            $obj_filter = new Filter($this->repository);

            $result = $obj_filter->delete_byId($this->data['id']);

            // Devolve array com mensagem de sucesso
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
    public function deleteBulk(): void {
        try {

            // Entidade
            $obj_filter = new Filter($this->repository);

            $db_conditions = '(id IN('.implode(',',$this->data['ids']).'))';
            $result = $obj_filter->delete($db_conditions); 

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