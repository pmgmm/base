<?php
/**
 * TESTES - ABSTRACT - GESTÃO DE BATERIA DE TESTES
 * 
 * Disponibiliza métodos que permitem gerir uma bateria de testes
 * Esta classe não pode ser instanciada, têm de ser estendida
 * 
 * @pmonteiro (2020-03-20)
 */
namespace CORE\tests;

use \FWK\wrappers\repositories\main\Repository;


abstract class TestAbstract{
    
    use \FWK\traits\throwableHandler;

    // Nomes de testes
    public const ASSERT_INSERT = 'Inserção de registo';
    public const ASSERT_UPDATE = 'Alteração de registo';
    public const ASSERT_READ = 'Carregamento de registo';
    public const ASSERT_READ_LIST = 'Carregamento de lista de registos';
    public const ASSERT_DELETE = 'Eliminação de registo';
    public const ASSERT_EXCEPTION = 'Erro ou Exceção. Consulte Log.';
    public const ASSERT_TEST_ABORT = 'Não existem dados suficientes prosseguir teste';
 
    // Work
    protected string $test_name = '';

    // Instância de repositório
    protected Repository $repository;

    // Resultados dos testes realizados
    private array $test_results = array(); 


    /**
     * Construtor
     * 
     * @param Repository $repository = Instância de repositório
     * 
     * @pmonteiro (2020-03-20) 
     */
    final public function __construct(Repository $repository) {
        try {

            $this->repository = $repository;

        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Adiciona linha de teste aos resultados da bateria de testes
     *
     * @param string|null $assert = Afirmação de teste
     * @param bool $success = ? Sucesso
     * 
     * @return void
     * 
     * @pmonteiro (2020-03-20) 
     */
    final public function setAssert(string $assert, bool $success): void{
        try {

            // Prepara informação relativa à lnha de teste
            $trace = $this->formatTrace();
            $block_test_name = $trace['class'] . '::' . $trace['method'];
            if (!in_array($block_test_name, array_keys($this->test_results))){
                $this->test_results[$block_test_name]['success'] = true;
            }

            $test = array();
            $test['success'] = $success;   
            $test['name'] = $this->test_name; 
            $test['description'] = $assert; 
            $test['location'] = $trace['file'] . ':' . $trace['line']; 

            // Adiciona aos rsultados
            $this->test_results[$block_test_name]['tests'][] = $test; 

        } catch(\Throwable $throwable){
            throw $this->throwableHandle($throwable);
        }
    }

    /**
     * Formata trace
     *
     * @return string = Trace formatado
     * 
     * @pmonteiro (2020-03-20)
     */
    final private function formatTrace(): array {
        try {

            // Restringe gacktrace às últimas 4 linhas
            $trace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 4);

            // Informação de método e kina
            $method = $trace[count($trace)-2];
            $line = $trace[count($trace)-3];
            $class = explode('\\entities\\', $method['class'])[1];
            $method = substr($method['function'],4);
            $file = $line['file'];
            $line = $line['line'];

            // Trace formatado
            return array(
                'datetime' => date('Y-m-d H:i:s'),
                'class' => $class,
                'method' => $method,
                'test_name' => $this->test_name,
                'file' => $file,
                'line' => $line
            );

        } catch(\Throwable $throwable){
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Devolve resultados da bateria de testes
     *
     * @return array = Resultados
     */
    public function getTestResults(): array{
        try {

            return $this->test_results;

        } catch(\Throwable $throwable){
            throw $this->throwableHandle($throwable);
        }
    }

}