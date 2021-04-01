<?php
/**
 * FRAMEWORK - TRAIT - MOTOR DE VALIDADORES DE DADOS
 * 
 * Disponibiliza métodos que permitem gerir e processar validadores de dados
 *
 * @pmonteiro (2019-11-21)
 */ 

 namespace FWK\traits;

 use \FWK\interfaces\ValidatorInterface;
  
trait engineValidator {

    use  \FWK\traits\throwableHandler;

    // Work + Const
    protected $engineValidators = array();


    /**
     * Adiciona uma instancia de validador
     * Os validadores são acumulados em sequência por ordem de entrada
     *
     * @param ValidatorInterface $instance = Instância de validador
     * 
     * @return void
     * 
     * @pmonteiro (2019-11-21)
     */
    final public function addValidator(ValidatorInterface $instance): void {
        try {

            if (!in_array($instance, $this->engineValidators)) {
                $this->engineValidators[] = $instance;
            }
            
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }
    

    /**
     * Processa um ou vários validadores de dados em sequência
     * 
     * Se, como parâmetro, for passado array de dados, são esses dados que serão processados. Caso contrário, 
     *      pressupõe-se que se pretendem validar as propriedades de uma classe/entidade
     * 
     * Se, como parâmetro, for passado uma instância de validador, apenas esse validador é processado. Caso contrário, 
     *      pressupõe-se que se pretendem processar todos os validadores adicionados
     * 
     * Ao encontrar uma falha devalidação num validador, termina imediatamente o processo, 
     *      não processando os validadores seguintes 
     * 
     * @param array|null $data = Dados a validar
     * @param ValidatorInterface|null $instance = Instância de validador 
     * 
     * @return array = Resultado da validação : array('success' => boolean, 'content' => array)
     * 
     * @pmonteiro (2019-11-21)
     */
    final public function validate(?array $data = null, ?ValidatorInterface $instance = null): array {
        try {
            $result = array('success' => true, 'content' => array());

            $data = $data ?? $this->getProperties();
            if ($instance) {
                $result = $instance->validate($data);
            } else {
                foreach ($this->engineValidators as $validator) {
                    $result_validator = $validator->validate($data);
                    if (!$result_validator['success']) {
                        $result['success'] = false;
                        $result['content'] = $result_validator['content'];
                        break;
                    }
                }
            }

            
            return $result;
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }
        
    
    /**
     * Reset de instâncias de validadores acumuladas
     *
     * @return void
     * 
     * @pmonteiro (2019-11-21)
     */
    final public function resetEngineValidator(): void {
        try {

            foreach($this->engineCollections as $collection){
                unset($this->{$collection});
            }
            $this->engineValidators = array();

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }

}
// --- END