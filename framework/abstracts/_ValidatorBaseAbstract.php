<?php
/**
 * FRAMEWORK - ABSTRACT - GESTÃO DE VALIDADOR BASE
 * 
 * Disponibiliza métodos que permitem gerir um validador
 * Esta classe não pode ser instanciada, têm de ser estendida
 * 
 * Características diferenciadoras:
 *      - Não recebe instância de repositório
 *      - Permite validação de dados para inserção (total)
 *      - Permite validação de dados para updates (parcial)      
 * 
 * @pmonteiro (2020-03-11)
 */

namespace FWK\abstracts;

use \FWK\helpers\ValidateHelper;


abstract class ValidatorBaseAbstract {

    use \FWK\traits\throwableHandler;

    // Constantes
    protected const DEFAULT_MESSAGE = 'Inconsistência de dados';
    
    // Tipo de operação 
    protected string $operation;

    /**
     * Construtor
     *
     * @param string $operation = Operação (constantes INSERT, UPDATE)
     * 
     * @return void
     * 
     * @pmonteiro (2020-03-11)
     */
    public function __construct(string $operation)  {
        try {     

            // Informa o validador qual é o tipo de operação
            $this->operation = $operation;  

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Valida propriedades pelo seu tipo, conteúdo e formato
     *
     * @param array validations = Propriedades a validar : 
     *                            array('propriedade' => array('mandatory' => boolean,
     *                                                         'value'     => valor ou null,
     *                                                         'type'      => ValidateHelper::TYPE_...,
     *                  (para TYPE_INTEGER ou TYPE_FLOAT)      'zero'      => boolean ou null, 
     *                  (para TYPE_INTEGER ou TYPE_FLOAT)      'negative'  =>  boolean ou null  
     *                                                         ), ...  
     *                                  )        
      * @return array
     * 
     * @pmonteiro (2020-03-11)
     */
    final public function baseValidate(array $validations): array {
        try {    
            $result = true;

            foreach ($validations as $validation) {
                $result = true;
                switch ($validation['type']) {
                    // Integer, Float, Decimal, Numeric
                    case ValidateHelper::TYPE_INTEGER:
                    case ValidateHelper::TYPE_FLOAT:
                        $mandatory = $validation['mandatory'];
                        $value = $validation['value'];
                        $zero = $validation['zero'] ?? true;
                        $negative = $validation['negative'] ?? false;
                        $result = ValidateHelper::{$validation['type']}($mandatory, $value, $zero, $negative);
                    break;
                    // Outros
                    default:
                        $mandatory = $validation['mandatory'];
                        $value = $validation['value'];
                        $result = ValidateHelper::{$validation['type']}($mandatory, $value);
                        break;
                }
                if (!$result) {
                    break;
                }
            }
 
            return array('success' => $result, 'content' => $result ? array() : array(self::DEFAULT_MESSAGE));
        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        } 
    }

}
// --- END