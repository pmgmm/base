<?php
/**
* ENTITIES - TRANSLATION - PROCESSORS - BASE
*
* Disponibiliza métodos consumidos por pedidos AJAX sobre entidade Translation
* 
* @pmonteiro (yyyy-mm-dd)
*/

namespace DEV\entities\translation\processors;

use \FWK\proxies\CoreAjax;
use \FWK\wrappers\repositories\MainRepository;
use \FWK\helpers\TranslationHelper as TH;
use \FWK\helpers\PermissionHelper;
use \DEV\entities\translation\Translation;
use \DEV\entities\translation\validators;
use \DEV\entities\translation\statements;


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
    public function getList() {
        try {

            // Entidade
            $obj_translation = new Translation($this->repository);

            // Parâmetros recebidos
            $db_search = $this->data['filter']['search'] ?? null;
            $db_filter = $this->data['filter']['fields'];
            $db_order = $this->data['filter']['order'];
            // Alterar order para lower porque a tabela é colate utf8_bin (ex: lower(source) DESC)
            for ($i = 0; $i < count($db_order); $i++) {
                $parts = explode(' ', $db_order[$i]);
                $db_order[$i] = "lower($parts[0]) $parts[1]"; 
            }
            $db_limit = $this->data['filter']['limit'];
            $db_offset = $this->data['filter']['offset'];

            // Permissões
            $permissions = PermissionHelper::getCrudPermissions(array('ADMINISTRATION', 'DEVELOPMENT', 'TRANSLATION'));

            // Carrega registos na entidade
            $obj_translation->loadList(null, $db_search, $db_filter, $db_order , $db_limit, $db_offset);

            // Descrições fixas
            $layers = array('be' => TH::translate('Backend'), 'fe' => TH::translate('Frontend'));

            // Itera registos e carrega array de resposta
            $arr_records = array();
            while ($obj_translation->loadNextRecord()) {

                $arr_record = array();

                // Key
                $id = $obj_translation->getProperty('id');
                $arr_record['key'] = $id;

                // Colunas
                $arr_record['values']['st.source'] = $name = $obj_translation->getProperty('source');
                $arr_record['values']['st.layer'] = $layers[$obj_translation->getProperty('layer')];
                $arr_record['values']['st.en_US'] = $obj_translation->getProperty('en_us');
                $arr_record['values']['st.fr_FR'] = $obj_translation->getProperty('fr_fr');
                $arr_record['values']['st.es_ES'] = $obj_translation->getProperty('es_es');

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
    public function insert() {
        try {

            // Entidade
            $obj_translation = new Translation($this->repository);

            // Carrega propriedades da entidade pelos parâmetros recebidos
            foreach ($this->data as $key => $value) {
                $obj_translation->setProperty($key, $value);
            }

            // Usa um validador para garantir a unicidade de name
            $obj_validator = new validators\Uniqueless($this->repository);
            $result = $obj_validator->validate($this->data);
            
            if ($result['success']) { // Insere registo

                $result = $obj_translation->insert();

                // Devolve array com id gerado e mensagem de sucesso
                $this->answer['success'] = $result;
                $this->answer['content'] = array('id' => $obj_translation->getProperty('id'), 'message' => TH::translate('Registo adicionado com sucesso.'));


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
    public function update() {
        try {

            // Entidade
            $obj_translation = new Translation($this->repository);

            // Carrega propriedades da entidade pelos parâmetros recebidos
            foreach ($this->data as $key => $value) {
                $obj_translation->setProperty($key, $value);
            }

            // Usa um validador para garantir a unicidade de name
            $obj_validator = new validators\Uniqueless($this->repository);
            $result = $obj_validator->validate($this->data);

            if ($result['success']) { // Altera registo

                $result = $obj_translation->update();

                // Devolve array com id e mensagem de sucesso
                $this->answer['success'] = $result;
                $this->answer['content'] = array('id' => $obj_translation->getProperty('id'), 'message' => TH::translate('Registo alterado com sucesso.'));

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
    public function delete() {
        try {

            // Entidade
            $obj_translation = new Translation($this->repository);

            $result = $obj_translation->delete_byId($this->data['id']);

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
            $obj_translation = new Translation($this->repository);

            $db_conditions = '(id IN('.implode(',',$this->data['ids']).'))';
            $result = $obj_translation->delete($db_conditions); 

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