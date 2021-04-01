<?php
/**
 * ENTITIES - PERMISSION - VALIDATOR - UNIQUELESS
 * 
 * Disponibiliza métodos que permitem validar se o código é único
 * 
 * @pmonteiro (yyyy-mm-dd)
 */

namespace CORE\entities\permission\validators;

use \CORE\entities\permission\statements as statements;
use \FWK\helpers\TranslationHelper as TH;


class Uniqueless extends \FWK\abstracts\ValidatorAbstract implements \FWK\interfaces\ValidatorInterface {
    
    use \FWK\traits\throwableHandler;

    /**
     * Verifica se já existe pelo menos 1 registo com o código submetido
     *
     * @param array $data = Propriedades a validar
     * 
     * @return array = Standard result : array('success' => false, 'content' => array());
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function validate(array $data) : array {
        try{
            $result = array ("success" => true, "content" => array());
            
            // Obtém statement de validação
            $statements = new statements\Validation();

            // Nome
            $db_parameters = array(':code' => $data['code'],':id' => $data['id'] ?? 0);
            $statement = $statements->getStatement(statements\Validation::UNIQUE_CODE);
            if ((bool) $this->repository->execute($statement, $db_parameters)) {
                $result['success'] = false;
                $result['content'][] = TH::translate('Código já existe.');
            }

            return $result;
        } catch(\Throwable $throwable){
            throw $this->throwableHandle($throwable);
        }

    }
}
// --- END