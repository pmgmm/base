<?php 
/**
 * TESTES - MOTOR
 * 
 * Disponibiliza métodos que permitem gerir e processar baterias de testes
 * 
 * @pmonteiro (2019-03-20)
 */ 

namespace CORE\tests;

use \FWK\wrappers\repositories\main\Repository;


class TestEngine {

    use \FWK\traits\throwableHandler;

    // Work
    private array $engine_candidate_test_sets = array();
    private array $engine_candidate_test_classes = array();
    private array $engine_test_classes = array();


    /**
     * Construtor
     * 
     * @pmonteiro (2019-03-20)
     */
    public function __construct() {
        try {
        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Adiciona um set de classes de testes à lista de sets candidatos
     * 
     * @param string $set = Set (pasta) de classes de teste 
     * 
     * @return void
     * 
     * @pmonteiro (2019-03-20)
     */
    public function addTestSet(string $set): void {
        try {
                        
            $this->engine_candidate_test_sets[] = $set;
 
        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Adiciona uma classe de teste (grupo de testes unitários) à lista de classes candidatas
     * 
     * @param string $class = Classe (set/classe.php)
     * 
     * @return void
     * 
     * @pmonteiro (2019-03-20)
     */
    public function addTestClass(string $class): void {
        try {
                        
            $this->engine_candidate_test_classes[] = $class;
 
        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }

 
    /**
     * Adiciona as classes (fqcn) dos sets e/ou classes candidatas
     *
     * @return void
     * 
     * @pmonteiro (2019-03-20)
     */
    private function addTestClassesFromCandidates() {
        try {

            // Sets
            // Para cada set na lista
            foreach($this->engine_candidate_test_sets as $test_set) {
                // Carrega lista de classes
                $arr_files = scandir( __DIR__ . "/sets/$test_set/");
                $arr_files = array_diff($arr_files, array('.', '..'));
                // Para cada classe na lista
                foreach($arr_files as $class_file){
                    // Calcula o fqcn e adiciona-o à lista de classes
                    $class_name = substr($class_file,0,-4);
                    $this->engine_test_classes[] = '\\'.__NAMESPACE__."\\sets\\$test_set\\$class_name";
                }
            }

            // Classes
            // Para cada classe na lista
            foreach ($this->engine_candidate_test_classes as $test_classe) {
                $this->engine_test_classes[] = '\\CORE\\tests\\sets\\'. str_replace('/', '\\', substr($test_classe, 0, -4));
            }

            $this->engine_test_classes = array_unique($this->engine_test_classes);

        }catch(\Throwable $throwable){
            throw $this->throwableHandle($throwable);
        }
    }
    

    /**
     * Executa todos as classes de teste carregadas
     *
     * @return string = Resultados dos testes para relatório : array('has_fails' => bool, 'html' => );
     * 
     * @pmonteiro (2019-03-20)
     */
    public function run(): array {
        try {

            // Converter para classes (fqcn) e transferir para o array de classes de teste a executar
            //  as os sets e classes carregadas
            $this->addTestClassesFromCandidates();

            // Início de testes
            $this->start = time();

            // Cria instância de repositório a partilhar com todas as classes de teste
            $this->repository = new Repository();

            // Para cada uma das classes de teste
            $result = array();
            foreach($this->engine_test_classes as $fully_qualified_class_name) {
                // Executa classe de testes
                $start = microtime(true);
                $instance = new $fully_qualified_class_name($this->repository);
                $instance->run();
                // Adiciona os resultados de teste da classe aos resultados totais
                $instance_results = $instance->getTestResults();
                $instance_results[array_keys($instance_results)[0]]['time'] =  microtime(true) - $start;
                $result = array_merge($result, $instance_results);
            }

            // Fim de testes
            $this->end = time();

            // Formata e devolve resultados para relatório (html)
            return $this->formatResults($result);

        } catch(\Throwable $throwable){
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Formata resultados para relatório (html)
     *
     * @param array $result = Resultados a formatar
     * 
     * @return array = Resultados formatados : array('has_fails' => bool, 'html' => );
     */
    private function formatResults(array $result): array {
        try {
              
            // Calcula tempo gasto
            $time_spent = gmdate("H\h i\m s\s", $this->end - $this->start);
            
            // Contadores totais
            $fails = 0;
            $successes = 0;

            // Para cada bloco de teste (class::block)
            $html_blocks = '';
            foreach ($result as $block_name => $block_results) {

                // Contadores parciais de bloco
                $block_fails = 0;
                $block_successes = 0;

                // Para cada linha de teste
                $html_block_body = '';
                foreach ($block_results['tests'] as $test) {

                    if ($test['success']) { // Teste bem sucedido
                        
                        // Contadores
                        $successes++;
                        $block_successes++;
                        // Html
                        $html_block_body .= '    <tr class="line success">'.PHP_EOL;
                        $html_block_body .= '        <td>'.$test['name'].'</td>'.PHP_EOL;
                        $html_block_body .= '        <td>'.$test['description'].'</td>'.PHP_EOL;
                        $html_block_body .= '        <td>'.$test['location'].'</td>'.PHP_EOL;
                        $html_block_body .= '        <td><i class="fas fa-thumbs-up"></td>'.PHP_EOL;
                        $html_block_body .= '    </tr>'.PHP_EOL;

                    } else {  // Teste falhado
                        
                        // Contadores
                        $fails++;
                        $block_fails++;
                        // Html
                        $html_block_body .= '    <tr class="line fail">'.PHP_EOL;
                        $html_block_body .= '        <td>'.$test['name'].'</td>'.PHP_EOL;
                        $html_block_body .= '        <td>'.$test['description'].'</td>'.PHP_EOL;
                        $html_block_body .= '        <td>'.$test['location'].'</td>'.PHP_EOL;
                        $html_block_body .= '        <td><i class="fas fa-bomb"></td>'.PHP_EOL;
                        $html_block_body .= '    </tr>'.PHP_EOL;

                    }

                }

                // Cabeçaho de bloco (com respetivos resultados)
                $html_block_top  = '<table class="block">'.PHP_EOL;
                $html_block_top .= '    <tr class="title">'.PHP_EOL;
                $html_block_top .= '        <td>'.$block_name.'</td>'.PHP_EOL;
                $html_block_top .= '        <td><span class="label">Tempo gasto:</span><span>'.round($block_results['time'],3).'s</span></td>'.PHP_EOL;
                $html_block_top .= '        <td class="success right"><span class="label"><i class="fas fa-thumbs-up fa-lg"></i></span><span>'.$block_successes.'</span></td>'.PHP_EOL;
                $html_block_top .= '        <td class="fail right"><span class="label"><i class="fas fa-bomb fa-lg"></i></span><span>'.$block_fails.'</span></td>'.PHP_EOL;
                $html_block_top .= '    </tr>'.PHP_EOL;
                $html_block_top .= '</table>'.PHP_EOL;
                $html_block_top .= '<table class="block_table">'.PHP_EOL;
                $html_block_top .= '    <tr class="title">'.PHP_EOL;
                $html_block_top .= '        <td class="title">Nome do teste</td>'.PHP_EOL;
                $html_block_top .= '        <td class="title">Descrição</td>'.PHP_EOL;
                $html_block_top .= '        <td class="title">Local</td>'.PHP_EOL;
                $html_block_top .= '        <td class="title">Resultado</td>'.PHP_EOL;
                $html_block_top .= '    </tr>'.PHP_EOL;

                $html_block_bottom = '</table>'.PHP_EOL;

                $html_blocks .= $html_block_top . $html_block_body . $html_block_bottom;
                    
            }
                 
            // Cabeçaho de relatório (com respetivos resultados)
            $html_head  = '<table class="report_title">'.PHP_EOL;
            $html_head .= '    <tr>'.PHP_EOL;
            $html_head .= '        <td>RELATÓRIO DE TESTES</td>'.PHP_EOL;
            $html_head .= '    </tr>'.PHP_EOL;
            $html_head .= '</table>'.PHP_EOL;
            $html_head .= '<table class="report_sub_title">'.PHP_EOL;
            $html_head .= '    <tr>'.PHP_EOL;
            $html_head .= '        <td><span class="label">Início:</span><span>'.date('Y-m-d H:i:s', $this->start).'</span></td>'.PHP_EOL;
            $html_head .= '        <td><span class="label">Fim:</span><span>'.date('Y-m-d H:i:s', $this->end).'</span></td>'.PHP_EOL;
            $html_head .= '        <td><span class="label">Tempo gasto:</span><span>'.$time_spent.'</span></td>'.PHP_EOL;
            $html_head .= '        <td class="sub_title success right"><span class="label"><i class="fas fa-thumbs-up fa-lg"></i></span><span>'.$successes.'</span></td>'.PHP_EOL;
            $html_head .= '        <td class="sub_title fail right"><span class="label"><i class="fas fa-bomb fa-lg"></i></span><span>'.$fails.'</span></td>'.PHP_EOL;
            $html_head .= '    </tr>'.PHP_EOL;
            $html_head .= '</table>'.PHP_EOL;

            return array('has_fails' => (bool)$fails, 'html' => $html_head . $html_blocks);
        }catch(\Throwable $throwable){
            throw $this->throwableHandle($throwable);
        }
    }

}

