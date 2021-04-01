<?php
/**
 * ENTITIES - FILTER - VALIDATOR - UNIQUELESS
 * 
 * Disponibiliza métodos que permitem validar se a list + user + name são únicos
 * 
 * @pmonteiro (yyyy-mm-dd)
 */

namespace CORE\entities\filter\validators;

use \CORE\entities\filter\statements as statements;
use \FWK\helpers\TranslationHelper as TH;


class PrivateScope extends \FWK\abstracts\ValidatorAbstract implements \FWK\interfaces\ValidatorInterface {
    
    use \FWK\traits\throwableHandler;

    /**
     * Verfica se o filtro é privado
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

            // Id
            $db_parameters = array(':id' => $data['id']);
            $statement = $statements->getStatement(statements\Validation::PRIVATE_SCOPE);
            if (!(bool) $this->repository->execute($statement, $db_parameters)) {
                $result['success'] = false;
                $result['content'][] = TH::translate('O filtro não é privado');
            }

            return $result;
        } catch(\Throwable $throwable){
            throw $this->throwableHandle($throwable);
        }

    }
}
// --- END