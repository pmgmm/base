<?php

namespace FWK\components\test_processors;

use \FWK\proxies\CoreAjax;

class ProcessorTable implements \FWK\interfaces\AjaxAnswerInterface {

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
            
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    public function getRows() {
        try {
            $table_rows = array();                                                                                                              
            $table_rows[] = array('_permissions' => array('u','d'), 'key' => '101', 'values' => array('sr.name' => 'TEST-B', 'sr.description' => 'Teste de funcionalidades', 'sr.active' => true), 
                            '_data' => array('last_update' => '2021-01-01'),
                            '_actions' => array('<fwk-button value="Editar" color="blue" function=\'{"editRecord":[101]}\'></fwk-button>',
                                                '<fwk-button value="Eliminar" color="blue" function=\'{"confirmDeleteRecord":[101,"TEXT"]}\'></fwk-button>'));
            $table_rows[] = array('_permissions' => array('u'), 'key' => '3', 'values' => array('sr.name' => 'SUPPORT-B', 'sr.description' => 'Suporte à solução', 'sr.active' => true), 
                            '_data' => array('last_update' => '2021-01-01'),
                            '_actions' => array('<fwk-button value="Editar" color="blue" function=\'{"editRecord":[101]}\'></fwk-button>',
                                                '<fwk-button value="Eliminar" color="blue" function=\'{"confirmDeleteRecord":[101,"TEXT"]}\'></fwk-button>'));
            
            $this->answer['success'] = true;
            $this->answer['content'] = $table_rows;
  
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }

        /**
         * -----------------------------------------------------------------------------------------
         * Router de acções e respectivas respostas
         * ------------------------------------------------------------------------------------------
         */
        public function run(): void {
            try {
                // Redireccionamento de acções
                switch (strtoupper($this->action)) {
                    case 'GET_ROWS':
                        $this->response_type = CoreAjax::OUT_JSON;
                        $this->getRows();
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