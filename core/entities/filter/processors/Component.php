<?php
/**
* ENTITIES - FILTER - PROCESSORS - COMPONENT
*
* Disponibiliza métodos consumidos por pedidos AJAX sobre o componente Filter nas listas
* 
* @pmonteiro (yyyy-mm-dd)
*/

namespace CORE\entities\filter\processors;

use \FWK\proxies\CoreAjax;
use \FWK\wrappers\repositories\MainRepository;
use \FWK\helpers\TranslationHelper as TH;
use \CORE\entities\filter\Filter;
use \CORE\entities\filter\validators;


class Component implements \FWK\interfaces\AjaxAnswerInterface {

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

            $db_fields = array('sf.id', 'sf.name', 'sf.public', 'sf.structure');
            $db_filter = array('sf.list' =>  $this->data['filter']['list'], 'sf.user_id' => array($_SESSION['USER']['id'], null), 'sf.active' => true);
            $db_order = array('sf.name ASC');
            $arr_records = array();
            if ($obj_filter->loadList($db_fields, null, $db_filter, $db_order)) {
               $arr_records = $obj_filter->getList(); 
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
            $obj_filter->setProperty('list', $this->data['list']);
            $obj_filter->setProperty('user_id', $_SESSION['USER']['id']);
            $obj_filter->setProperty('name', $this->data['name']);
            $obj_filter->setProperty('structure', json_encode($this->data['structure']));
            $obj_filter->setProperty('public', false);
            $obj_filter->setProperty('active', true);

            // Usa um validador para garantir a unicidade de list, user  e name
            $obj_validator = new validators\Uniqueless($this->repository);
            // Remove o id pois trata-se de uma tentativa de inserção
            unset($this->data['id']);
            $this->data['user_id'] = $_SESSION['USER']['id'];
            $result = $obj_validator->validate($this->data);
            
            if ($result['success']) { // Insere registo

                $result = $obj_filter->insert();

                // Devolve array com id gerado e mensagem de sucesso
                $this->answer['success'] = $result;
                $this->answer['content'] = array('id' => $obj_filter->getProperty('id'), 'message' => TH::translate('Filtro adicionado com sucesso.'));


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
     * Altera registo (pedido pelo manuseamento de filtros)
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
            $obj_filter->setProperty('id', $this->data['id']);
            $obj_filter->setProperty('name', $this->data['name']);
            $obj_filter->setProperty('structure', json_encode($this->data['structure']));

            // Usa um validador para garantir a unicidade de list, user e name
            $obj_validator = new validators\Uniqueless($this->repository);
            $this->data['user_id'] = $_SESSION['USER']['id'];
            $result = $obj_validator->validate($this->data);

            if ($result['success']) { // Altera registo

                $result = $obj_filter->update();

                // Devolve array com id e mensagem de sucesso
                $this->answer['success'] = $result;
                $this->answer['content'] = array('id' => $obj_filter->getProperty('id'), 'message' => TH::translate('Filtro alterado com sucesso.'));

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
     * Elimina registo (pedido pelo manuseamento de filtros)
     *
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function delete() {
        try {

            // Entidade
            $obj_filter = new Filter($this->repository);

            // Usa um validador para garantir que o filtro é individual
            $obj_validator = new validators\PrivateScope($this->repository);
            $result = $obj_validator->validate($this->data);

            if ($result['success']) { // Elimina registo
         
                $result = $obj_filter->delete_byId($this->data['id']);

                // Devolve array com mensagem de sucesso
                $this->answer['success'] = true;
                $this->answer['content'] = array('message' => TH::translate('Filtro eliminado com sucesso.'));

            } else {

                // Devolve array com mensagem de erro recebida do validador
                $this->answer['success'] = false;
                $this->answer['content'] = $result['content'];

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