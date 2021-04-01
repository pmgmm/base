<?php
/**
* ENTITIES - APP - PROCESSORS - MOBILE
*
* Disponibiliza métodos consumidos por pedidos FETCH sobre entidade APP / PWA
* 
* @pmonteiro (yyyy-mm-dd)
*/

namespace CORE\entities\app\processors;

use \FWK\proxies\MobileFetch;
use \FWK\wrappers\repositories\MainRepository;
use \FWK\helpers\TranslationHelper as TH;
use \CORE\entities\app\App;
use \CORE\entities\delivery_user\User;


final class Mobile implements \FWK\interfaces\FetchAnswerInterface {

    use \FWK\traits\throwableHandler;

    // Nome da app
    public ?string $app_name;

    // Key da app
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
     * Devolve Configuração
     *
     * @return array
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function getConfig() {
        try {

            // Obtém registo (existência préviamente validada em run)
            $this->obj_app->load_byKey($this->app_key);

            $this->answer['success'] = true;
            $this->answer['content'] = array(
                array('key' => 'vapid_public_key', 'value' => $this->obj_app->getProperty('vapid_public_key'))
            );
            
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
                        case 'GET_CONFIG':
                            $this->response_type = MobileFetch::OUT_JSON;
                            $this->getConfig();
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