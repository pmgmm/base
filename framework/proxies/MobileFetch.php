<?php
/**
 * FRAMEWORK - PROXY - FETCH - PEDIDOS MOBILE
 * 
 * Disponibiliza métodos que permitem processar pedidos e respostas fetch
 *
 * @pmonteiro (yyyy-mm-dd)
 */ 

namespace FWK\proxies;

require_once '../../core/config/autoload.php';
require_once '../../core/config/base.php';

use \FWK\helpers\TranslationHelper as TH;

/**
 * Processar pedido e resposta FETCH
 * 
 * 1 - Recebe o pedido fetch;
 * 2 - Valida o token de autorização do pedido;
 * 3 - Valida, inclui e instancia a classe (fully_qualified_class_name) responsável pela resposta;
 * 4 - Faz o parse dos parâmetros, incluindo o método responsável a executar (action), para propriedades da classe de resposta;
 * 5 - Executa o método "run" da classe de resposta;
 * 6 - Processa e devolve a resposta nos formatos:
 *              JSON   - array('success' => boolean, 'content' => string)
 *              STRING - string
 */

final class MobileFetch {

    // Trait que trata os erros capturados nos eventos
    use  \FWK\traits\throwableHandler;

    // Variáveis e constantes
    const OUT_JSON = 'json';
    const OUT_STRING = 'string';


    /**
     * Processa pedido e respectiva resposta
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    final public function run(): void {
        try {
           
            // Recolha de pedido
            $action = $_REQUEST['action'] ?? false;
            $app_name = getallheaders()['Name'] ?? '';
            $app_key = getallheaders()['Key'] ?? '';
            $authorization = getallheaders()['Authorization'] ?? '';
            $fully_qualified_class_name = $_REQUEST['fully_qualified_class_name'] ?? null;
            $arr_unserialized = array();
            if (isset($_REQUEST['serialized'])) {
                parse_str($_REQUEST['serialized'], $arr_unserialized);
            }
            $data = array_merge($_REQUEST, $arr_unserialized);

            // Atribuíção de informação de Módulo a variável global
            $GLOBALS['MODULE'] = $data['module'];

            // Elimina parâmetros não necessários aos passos seguintes
            unset($data['rid']);
            unset($data['serialized']);
            unset($data['fully_qualified_class_name']);
            unset($data['action']);
            unset($data['module']);

            // Procura strings Json e transforma-as em arrays
            if (isset($data['action_data'])) {
                foreach(json_decode($data['action_data'], true) as $key => $value) {
                    $data[$key] = $value;
                }
                unset($data['action_data']);
            }

            // Valida pedido (classe + acção)
            if (isset($action) && isset($fully_qualified_class_name)) {

                $obj_fetch_processor = new $fully_qualified_class_name;

                if (!isset($obj_fetch_processor)) {
                    throw new \Exception('Class \'' . $fully_qualified_class_name . '\' not found');
                }

                // Atribui acção e parâmetros ao processador
                $obj_fetch_processor->action = $action;
                $obj_fetch_processor->app_name = $app_name;
                $obj_fetch_processor->app_key = $app_key;
                $obj_fetch_processor->authorization = $authorization;
                $obj_fetch_processor->data = $data;

                // Atribui acção e parâmetros ao processador
                $obj_fetch_processor->action = $action;
                $obj_fetch_processor->data = $data;

                // Ficheiros do pedido (se existirem)
                // Vêm em grupo =>parse em files->grupo->ficheiros
                if (count($_FILES)) {
                    $files = array();
                    foreach($_FILES as $name => $group) {
                        // Número de ficheiros no grupo
                        $count = count($group['name']);
                        // Para cada ficheiro, ler as propriedades
                        for ($i=0; $i<$count; $i++) {
                            $file = array();
                            $file['name'] = $group['name'][$i];
                            $file['type'] = $group['type'][$i];
                            $file['tmp_name'] = $group['tmp_name'][$i];
                            $file['error'] = $group['error'][$i];
                            $file['size'] = $group['size'][$i];
                            $files[$name][] = $file;
                        }
                    }
                    $obj_fetch_processor->files = $files;
                }

                /// Processa classe de resposta
                $obj_fetch_processor->run();
 
                // Formata resposta de acordo com o definido na classe de rfesposta
                switch ($obj_fetch_processor->response_type) {
                    case self::OUT_JSON:
                        echo json_encode($obj_fetch_processor->answer);
                        break;
                    case self::OUT_STRING:
                        echo $obj_fetch_processor->answer['content'];
                        break;
                    default:
                        echo $obj_fetch_processor->answer['content'];
                        break;
                }

            } else {
                throw new \Exception('Missing required data');
            }

        } catch (\Throwable $throwable) {
              $Exerr = $this->throwableHandle($throwable);
              $friendly_message = $Exerr->getFriendlyMessage ?? TH::translate('A funcionalidade está indisponível de momento.<br>Tente mais tarde por favor.');
              echo json_encode(array('success' => false, 'content' => $friendly_message));
        }    
    }

}

// Instancia e processa proxy
$obj_fetch = new MobileFetch();
$obj_fetch->run();
// --- END