<?php
/**
* ENTITIES - DELIVERY USER - PROCESSORS - MOBILE
*
* Disponibiliza métodos consumidos por pedidos FETCH sobre entidade DELIVERY USER
* 
* @pmonteiro (yyyy-mm-dd)
*/

namespace CORE\entities\delivery_user\processors;

use \FWK\proxies\MobileFetch;
use \FWK\wrappers\repositories\MainRepository;
use \CORE\entities\delivery_user\User;
use \CORE\entities\app\App;


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
    private ?MainRepository $repository;

    // Entidade base
    private $obj_user;


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
     * Login
     *
     * @return array
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function login() {
        try {

            if ($this->obj_user->login($this->data['user_or_email'], $this->data['password'])) {

                $this->answer['success'] = true;
                $this->answer['content'] = array(
                                            array('key' => 'name', 'value' => $this->obj_user->getProperty('name')),
                                            array('key' => 'avatar', 'value' => $this->obj_user->getProperty('avatar')),
                                            array('key' => 'authorization', 'value' => $this->obj_user->getProperty('authorization')),
                                            array('key' => 'logged_in', 'value' => true)
                                            );

            } else {
               
                $this->answer['success'] = false;
                $this->answer['content'] = 'Credenciais inválidas.';
            }

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


   /**
    * Valida autorização
    *
    * @return array
    * 
    * @pmonteiro (yyyy-mm-dd)
    */
   public function validateAuthorization() {
       try {

           if ($this->obj_user->validateAuthorization($this->authorization)) {

               $this->answer['success'] = true;
               $this->answer['content'] = '';

           } else {
              
               $this->answer['success'] = false;
               $this->answer['content'] = 'Autorização inválida.';

           }

       } catch (\Throwable $throwable) {
           throw $this->throwableHandle($throwable);
       }
    }


     /**
     * Recebe credenciais endpoint para notificações push
     *
     * @return array
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function setPushEndpoint() {
        try {

            $endpoint = json_decode($this->data['endpoint'], true);

            $this->obj_user->setProperty('id', strtok($this->authorization, '.'));
            $this->obj_user->setProperty('notification_endpoint', $endpoint['endpoint']);
            $this->obj_user->setProperty('notification_p256dh', $endpoint['keys']['p256dh']);
            $this->obj_user->setProperty('notification_auth', $endpoint['keys']['auth']);

            $this->obj_user->update();

            $this->answer['success'] = true;
            $this->answer['content'] = '';
            
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

            // Verifica se o pedido é válido
            $obj_app = new App($this->repository);
            if ($obj_app->validate($this->app_name, $this->app_key)) {
                $this->obj_user = new User($this->repository);
                if (strtoupper($this->action) == 'LOGIN' || $this->action == 'VALIDATE_AUTHORIZATION' 
                                                         || $this->obj_user->validateAuthorization($this->authorization)) {
                    $this->obj_user->reset();
                    $_SESSION['MOBILE']['authorization'] = $this->authorization;
                    
                    // Redireccionamento de acções
                    switch (strtoupper($this->action)) {
                        case 'LOGIN':
                            $_SESSION['MOBILE']['authorization'] = 'Mobile unknown';
                            $this->response_type = MobileFetch::OUT_JSON;
                            $this->login();
                        break;
                        case 'VALIDATE_AUTHORIZATION':
                            $this->response_type = MobileFetch::OUT_JSON;
                            $this->validateAuthorization();
                        break;
                        case 'SET_PUSH_ENDPOINT':
                            $this->response_type = MobileFetch::OUT_JSON;
                            $this->setPushEndpoint();
                            break;
                        default:
                            throw new \Exception('ACTION "' . $this->action . '" does not exist in file "'.substr(__FILE__, strlen($_SERVER['DOCUMENT_ROOT'])).'"');
                        break;
                    }

                } else {

                    $this->response_type = MobileFetch::OUT_JSON;
                    $this->answer['success'] = false;
                    $this->answer['content'] = 'Autorização inválida.';

                }

            } else {
                
                $this->response_type = MobileFetch::OUT_JSON;
                $this->answer['success'] = false;
                $this->answer['content'] = 'Key inválida.';

            }
        

        } catch (\Throwable $throwable) {
            $this->response_type = MobileFetch::OUT_JSON;
            $this->answer['success'] = false;
            throw $this->throwableHandle($throwable);
        }
    }

}
// --- END