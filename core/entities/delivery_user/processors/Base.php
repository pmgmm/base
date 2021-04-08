<?php
/**
* ENTITIES - USER - PROCESSORS - BASE
*
* Disponibiliza métodos consumidos por pedidos AJAX sobre entidade DELIVERY USER
* 
* @pmonteiro (yyyy-mm-dd)
*/

namespace CORE\entities\delivery_user\processors;

require_once '../../framework/3rdparty/push_notifications/vendor/autoload.php';

use \FWK\proxies\CoreAjax;
use \FWK\wrappers\repositories\MainRepository;
use \FWK\helpers\TranslationHelper as TH;
use \FWK\helpers\PermissionHelper;
use \CORE\entities\app\App;
use \CORE\entities\delivery_user\User;
use \CORE\entities\delivery_user\validators;

use \Minishlink\WebPush\WebPush;
use \Minishlink\WebPush\Subscription;


class Base implements \FWK\interfaces\AjaxAnswerInterface {

    use \FWK\traits\throwableHandler;

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
            $permissions = PermissionHelper::getCrudPermissions(array('ADMINISTRATION', 'SUPPORT', 'DELIVERY_USER'));
            $permission_notification = PermissionHelper::Validate(array('ADMINISTRATION', 'SUPPORT', 'DELIVERY_NOTIFICATION'));

            // Carrega registos na entidade
            $obj_user->loadList(null, $db_search, $db_filter, $db_order, $db_limit, $db_offset);

            // Botões para lista
            $view_button_value = TH::translate('Ver');
            $update_button_value = TH::translate('Editar');
            $delete_button_value = TH::translate('Eliminar');
            $notify_button_value = TH::translate('Notificar');

            // Itera registos e carrega array de resposta
            $arr_records = array();
            while ($obj_user->loadNextRecord()) {
                
                $arr_record = array();

                // Key
                $id = $obj_user->getProperty('id');
                $arr_record['key'] = $id;

                // Colunas
                $arr_record['values']['du.user'] = $obj_user->getProperty('user');
                $arr_record['values']['du.name'] = $obj_user->getProperty('name');
                $arr_record['values']['du.email'] = $obj_user->getProperty('email');
                $arr_record['values']['du.active'] = boolval($obj_user->getProperty('active'));

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
                $arr_record['_actions'][] = '<fwk-button value="'.$show_button_value.'" color="blue" function=\'{"showRecord":[' . $id . ']}\'></fwk-button>';
                if ($row_delete) {
                    $arr_record['_actions'][] = '<fwk-button value="'.$delete_button_value.'" color="blue" function=\'{"confirmDeleteRecord":[' . $id . ', "' . $arr_record['values']['du.name'] . '"]}\'></fwk-button>';
                }
                if ($permission_notification && $obj_user->getProperty('notification_endpoint')) {
                    $arr_record['_actions'][] = '<fwk-button value="'.$notify_button_value.'" color="blue" function=\'{"notify":[' . $id . ']}\'></fwk-button>';
                }

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

            // Carrega propriedades da entidade pelos parâmetros recebidos
            foreach ($this->data as $key => $value) {
                $obj_user->setProperty($key, $value);
            }

            // Avatar
            if (count($this->files['avatar'])) {
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

                $result = $obj_user->insert();

                // Devolve array com id gerado e mensagem de sucesso
                $this->answer['success'] = $result;
                $this->answer['content'] = array('id' => $obj_user->getProperty('id'), 'message' => TH::translate('Registo adicionado com sucesso.'));


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
            $obj_user = new User($this->repository);

            // Retira a password da lista de parâmetros se vazia
            if ($this->data['password'] == '') {
                unset($this->data['password']);
            }

            // Carrega propriedades da entidade pelos parâmetros recebidos
            foreach ($this->data as $key => $value) {
                $obj_user->setProperty($key, $value);
            }

            // Avatar
            if (count($this->files['avatar'])) {
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

                $obj_user->update();

                // Devolve array com id e mensagem de sucesso
                $this->answer['success'] = true;
                $this->answer['content'] = array('id' => $obj_user->getProperty('id'), 'message' => TH::translate('Registo alterado com sucesso.'));

            } else {

                // Devolve mensagem de erro recebida do validador
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
     * Notificar
     *
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function notify() {
        try {

            // Entidade
            $obj_user = new User($this->repository);

            // Entidade
            $obj_app = new App($this->repository);

            if($obj_app->load_byName('DELIVERY') && $obj_user->load_byID($this->data['id'])) {

                $authentication = [
                    'VAPID' => [
                        'subject' => $obj_app->getProperty('vapid_subject'),
                        'publicKey' => $obj_app->getProperty('vapid_public_key'),
                        'privateKey' => $obj_app->getProperty('vapid_private_key')],
                ];

                $options = [
                    'TTL' => 300, // mensagem retida no serviço durante (segundos)
                    'urgency' => 'normal', // protocol defaults to "normal"
                    'topic' => 'new_event', // not defined by default,
                    'batchSize' => 200, // defaults to 1000
                ];

                $subscription = Subscription::create([
                    'endpoint' => $obj_user->getProperty('notification_endpoint'),
                    'keys' => ['p256dh' => $obj_user->getProperty('notification_p256dh'), 'auth' => $obj_user->getProperty('notification_auth')]
                ]);    
               

            
                // for every notifications
                $webPush = new WebPush();
                
                $content = '{"body":"BODY", "title":"TITLE"}';
                
                // or for one notification
                $webPush->sendOneNotification($subscription, $content, $options, $authentication);




                $notifications = [
                    [
                        'subscription' => Subscription::create([ // this is the structure for the working draft from october 2018 (https://www.w3.org/TR/2018/WD-push-api-20181026/) 
                            "endpoint" => $obj_user->getProperty('notification_endpoint'),
                            "keys" => [
                                'p256dh' => $obj_user->getProperty('notification_p256dh'),
                                'auth' => $obj_user->getProperty('notification_auth')
                            ],
                        ]),
                        'content' => $content,
                        ],
                    ];
                    

                // send multiple notifications with payload
        /*         $webPush = new WebPush($authentication);
                foreach ($notifications as $notification) {
                    $webPush->queueNotification($notification['subscription'], $notification['content'] // optional (defaults null)
                    );
                } */

                /**
                 * Check sent results
                 * @var MessageSentReport $report
                 */
     /*            foreach ($webPush->flush() as $report) {
                    $endpoint = $report->getRequest()->getUri()->__toString();

                    if ($report->isSuccess()) {
                        echo "[v] Message sent successfully for subscription {$endpoint}.";
                    } else {
                        echo "[x] Message failed to sent for subscription {$endpoint}: {$report->getReason()}";
                    }
                }
 */




                $this->answer['success'] = true;
                $this->answer['content'] = array('message' => TH::translate('Notificação enviada com sucesso.'));

            } else {

             $this->answer['success'] = false;
             $this->answer['content'] = TH::translate('Erro no envio de notificação.');


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
                case 'NOTIFY':
                    $this->response_type = CoreAjax::OUT_JSON;
                    $this->notify();
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