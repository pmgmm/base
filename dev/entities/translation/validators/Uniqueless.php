<?php
/**
 * ENTITIES - TRANSLATION - VALIDATOR - UNIQUELESS
 * 
 * Disponibiliza métodos que permitem validar se o layer + source são únicos
 * 
 * @pmonteiro (yyyy-mm-dd)
 */

namespace DEV\entities\translation\validators;

use \DEV\entities\translation\statements as statements;
use \FWK\helpers\TranslationHelper as TH;


class Uniqueless extends \FWK\abstracts\ValidatorAbstract implements \FWK\interfaces\ValidatorInterface {
    
    use \FWK\traits\throwableHandler;

    /**
     * Verifica se já existe pelo menos 1 registo com o layer e source submetido
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

            // Source
            $db_parameters = array(':source' => $data['source'],':id' => $data['id'] ?? 0);
            $statement = $statements->getStatement(statements\Validation::UNIQUE_SOURCE);
            if ((bool) $this->repository->execute($statement, $db_parameters)) {
                $result['success'] = false;
                $result['content'][] = TH::translate('Source já existe.');
            }

            return $result;
        } catch(\Throwable $throwable){
            throw $this->throwableHandle($throwable);
        }

    }
}
// --- END