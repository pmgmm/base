<?php
/**
* ENTITIES - DELIVERY TASK - PROCESSORS - MOBILE
*
* Disponibiliza métodos consumidos por pedidos FETCH sobre entidade Delivery Task
* 
* @pmonteiro (yyyy-mm-dd)
*/

namespace CORE\entities\delivery_task\processors;

use \FWK\proxies\MobileFetch;
use \FWK\wrappers\repositories\MainRepository;
use \FWK\helpers\TranslationHelper as TH;
use \CORE\entities\app\App;
use \FWK\helpers\DateTimeHelper;
use \CORE\entities\delivery_task\Task;
use \CORE\entities\delivery_task\statements as statements;
use \CORE\entities\delivery_user\User;


final class Mobile implements \FWK\interfaces\FetchAnswerInterface {

    use \FWK\traits\throwableHandler;

    // Nome da APP
    public ?string $app_name;

    // Key da APP
    public ?string $app_key;

    // Token de autorização
    public ?string $authorization;

    // Acção a executar
    public ?string $action;

    // Container de resposta
    public ?array $answer;

    // Dados posted
    public ?array $data;

   // Ficheiros posted
   public ?array $files;

    // Tipo de resposta
    public ?string $response_type;

    // Repositório
    public ?MainRepository $repository;
    

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
            $obj_task = new Task($this->repository);

            // Obtém statement de lista
            $statements = new statements\ComposedList();
            $statement = $statements->getStatement(statements\ComposedList::MOBILE);

            // Obtém lista
            $arr_records = array();
            $db_parameters = array(':id' => $this->data['pack_id']);
            if ($this->repository->execute($statement, $db_parameters)) {
                
                // Itera registos e carrega array de resposta
                while ($this->repository->loadNextRecord()) {

                    $arr_record = array();
    
                    // Colunas
                    $record = $this->repository->getRecord();
                    $arr_record['key'] = $record['id'];
                    $arr_record['name'] = $record['name'];
                    $arr_record['address'] = $record['address'] . PHP_EOL . $record['postal_code'] . ' ' . $record['city'];
                    $arr_record['landmark'] = $record['landmark'];
                    $arr_record['gps'] = $record['gps'];
                    $arr_record['phone'] = $record['phone'];
                    $arr_record['estimated_time'] = DateTimeHelper::datetimeToLocal($record['estimated_time']);
                    $arr_record['request'] = json_decode($record['request']);
                    $arr_record['price'] = $record['price'];    
                    $arr_record['notes'] = $record['notes'];   
                    $arr_record['alerts'] = $record['alerts'];

                    $arr_records[] = $arr_record;

                }
            }

            

/*             // Parâmetros recebidos
            //$db_search = $this->data['filter']['search'] ?? null;
            $db_filter = $this->data['filter']['fields'];
            $db_order = array('estimated_time ASC');

            // Carrega registos na entidade
            $obj_task->loadList(null, null, $db_filter, $db_order);

            // Itera registos e carrega array de resposta
            $arr_records = array();
            while ($obj_task->loadNextRecord()) {
        
                $arr_record = array();

                // Key
                $id = $obj_task->getProperty('id');
                $arr_record['key'] = $id;

                // Colunas
                $arr_record['name'] = $obj_task->getProperty('name');
                $arr_record['address'] = $obj_task->getProperty('address');
                $arr_record['phone'] = $obj_task->getProperty('phone');
                $arr_record['email'] = $obj_task->getProperty('email');
                $arr_record['estimated_time'] = $obj_task->getProperty('estimated_time');
                $arr_record['request'] = json_decode($obj_task->getProperty('request'));
                $arr_record['price'] = $obj_task->getProperty('price');

                $arr_records[] = $arr_record;

            } */

            $this->answer['success'] = true;
            $this->answer['content'] = $arr_records;

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

            // Verifica se o pedido e a autorização são válidas
            $this->obj_app = new App($this->repository);
            if ($this->obj_app->validate($this->app_name, $this->app_key)) {
                $obj_user = new User($this->repository);
                if ($obj_user->validateAuthorization($this->authorization)) {

                    // Redireccionamento de acções
                    switch (strtoupper($this->action)) {
                        case 'GET_LIST':
                            $this->response_type = MobileFetch::OUT_JSON;
                            $this->getList();
                        break;
                        default:
                            throw new \Exception('ACTION "' . $this->action . '" does not exist in file "'.substr(__FILE__, strlen($_SERVER['DOCUMENT_ROOT'])).'"');
                        break;
                    }
                } else {

                    $this->response_type = MobileFetch::OUT_JSON;
                    $this->answer['success'] = false;
                    $this->answer['content'] = TH::translate('Autorização inválida.');

                }

            } else {
            
                $this->response_type = MobileFetch::OUT_JSON;
                $this->answer['success'] = false;
                $this->answer['content'] = TH::translate('Key inválida.');

            }
        } catch (\Throwable $throwable) {
            $this->response_type = MobileFetch::OUT_JSON;
            $this->answer['success'] = false;
            throw $this->throwableHandle($throwable);
        }
    }

}
// --- END