<?php
/**
 * FRAMEWORK - MOTOR VALIDADOR
 * 
 * Disponibiliza métodos que permitem gerir e processar validadores de dados
 * 
 * @pmonteiro (yyyy-mm-dd)
 */ 

namespace FWK\engines;

use \FWK\interfaces\ValidatorInterface;


final class EngineValidator implements \FWK\interfaces\EngineValidatorInterface {

    use  \FWK\traits\throwableHandler;

    // Variáveis e constantes
    protected $validators = array();


    /**
     * Adiciona uma instancia de validador
     * Os validadores são acumulados em sequência por ordem de entrada
     *
     * @param ValidatorInterface $instance = Instância de validador
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    final public function addValidator(ValidatorInterface $instance): void {
        try {

            if (!in_array($instance, $this->engineValidators)) {
                $this->validators[] = $instance;
            }
            
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }
    

    /**
     * Processa um ou vários validadores de dados em sequência
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
     * @pmonteiro (yyyy-mm-dd)
     */
    final public function validate($data, ?ValidatorInterface $instance = null): array {
        try {
            $result = array('success' => true, 'content' => array());

            if ($instance) {
                $result = $instance->validate($data);
            } else {
                foreach ($this->validators as $validator) {
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
     * @pmonteiro (yyyy-mm-dd)
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