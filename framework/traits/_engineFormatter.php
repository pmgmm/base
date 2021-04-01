<?php
/**
 * FRAMEWORK - TRAIT - MOTOR DE FORMATADORES DE DADOS
 * 
 * Disponibiliza métodos que permitem gerir e processar formatadores de dados
 *
 * @pmonteiro (2019-11-21)
 */  

namespace FWK\traits;

use \FWK\interfaces\FormatterInterface;

trait engineFormatter {

    use  \FWK\traits\throwableHandler;

    // Work + Const
    private $engineFormatters = array();
    

    /**
     * Adiciona uma instancia de formatador
     * Os formatadores são acumulados em sequência por ordem de entrada
     *
     * @param FormatterInterface $instance = Instância de formatador
     * 
     * @return void
     * 
     * @pmonteiro (2019-11-21)
     */
    final public function addFormatter(FormatterInterface $instance): void {
        try {
            if (!in_array($instance, $this->engineFormatters)) {
                $this->engineFormatters[] = $instance;
            }
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        } 
    }
 

    /**
     * Processa um ou vários formatadores de dados em sequência
     * 
     * Se, como parâmetro, for passado array de dados, são esses dados que serão processados. Caso contrário, 
     *      pressupõe-se que se pretendem formatar as propriedades de uma classe/entidade
     * 
     * Se, como parâmetro, for passado uma instância de validador, apenas esse validador é processado. Caso contrário, 
     *     pressupõe-se que se pretendem processar todos os formatadores adicionados
     *
     * Ao encontrar um erro num formatador, termina imediatamente o processo, 
     *      não processando os formatadores seguintes 
     * 
     * @param array|null $data = Dados a formatar
     * @param FormatterInterface|null $instance = Instância de formatador 
     * 
     * @return array = Dados formatados : array('success' => boolean, , 'content' => array)
     * 
     * @pmonteiro (2020-02-11)
     */
    final public function format(?array $data = null, ?FormatterInterface $instance = null): array {
        try {

            $data = $data ?? $this->getProperties();
            if ($instance) {
                $data = $instance->format($data);
            } else {
                foreach ($this->engineFormatters as $formatter) {
                    $data = $formatter->format($data);
                }
            }

            return $data;
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }
    
 
    /**
     * Reset de instâncias de formatadores acumuladas
     *
     * @return void
     * 
     * @pmonteiro (2019-11-21)
     */
    final public function resetEngineFormatter(): void {
        try {

            $this->engineFormatters = array();
            
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }

}
// --- END