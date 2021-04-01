<?php
/**
* TESTES - PROCESSORS - BASE
*
* Disponibiliza métodos consumidos por pedidos AJAX de processamento de testes
*
* @pmonteiro (2020-03-16)
*/

namespace CORE\tests\processors;

use \FWK\proxies\Ajax;
use \CORE\tests\TestEngine;


class Base implements \FWK\interfaces\AjaxAnswerInterface {

    use \FWK\traits\throwableHandler;

    // Action to execute
    public ?string $action;

    // Answer container
    public ?array $ajax_data;

    // Posted parameters
    public ?array $input_parameters;

    // Answer Type
    public ?string $response_type;


    /**
     * Testes
     *
     * @return void
     * 
     * @pmonteiro (2020-03-16)
     */
    public function test() {
        try {

            // Prefixo para nome de relatório
            $report_suffix = $this->input_parameters['report_prefix'] ?? '';

            // Flag
            $test = false;

            // Sets de classes para test
            $sets = $this->input_parameters['sets'];

            // Classes individuais para teste
            $classes = $this->input_parameters['classes'];

            // Cria instância de motor
            $obj_testEngine = new TestEngine();

            
            // Adiciona os sets (se existirem) ao motor
            if (isset($sets)) {
                if (count($sets)) {
                    foreach ($sets as $set) {
                        $obj_testEngine->addTestSet($set);
                    }
                $test = true;
                }
            }

            // Adiciona as classes individuais (se existirem) ao motor
            if (isset($classes)) {
                foreach ($classes as $class) {
                    if (file_exists(CORE_TESTS_PATH . 'sets/' . $class)) {
                        $obj_testEngine->addTestClass($class);
                        $test = true;
                    }
                }
            }

            if ($test) {

                $test_results = $obj_testEngine->run();

                // Nome de relatório a gerar (baseado na data/hora de escrita)
                $report_name = $report_suffix . '_' . time() . '_' . uniqid() . (int)$test_results['has_fails'];

                $file_pathname = CORE_TESTS_PATH . "reports/$report_name.html";

                file_put_contents($file_pathname, $test_results['html']);

                $this->ajax_data['content'] = $report_name;

            } else {

                $this->ajax_data['success'] = false;
                $this->ajax_data['content'] = 'Nada a testar ...';

            }


        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
    * Inicialização de propriedades associadas ao funcionamento da class
    */
    public function init() {
        $this->action = '';
        $this->ajax_data = array();
        $this->ajax_data['success'] = true;
        $this->ajax_data['content'] = '';
        $this->input_parameters = array();
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
                case 'TEST':
                    $this->response_type = Ajax::OUT_JSON;
                    $this->test();
                break;   
                default:
                    throw new \Exception('ACTION "' . $this->action . '" does not exist in file "'.substr(__FILE__, strlen($_SERVER['DOCUMENT_ROOT'])).'"');
                break;
            }

        } catch (\Throwable $throwable) {
            $this->response_type = Ajax::OUT_JSON;
            $this->ajax_data['success'] = false;
            throw $this->throwableHandle($throwable);
        }
    }
}
// --- END