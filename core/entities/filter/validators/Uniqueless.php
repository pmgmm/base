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

            // Lista + Utilizador + Nome
            $db_parameters = array(':list' => $data['list'],':user_id' => $data['user_id'],':name' => $data['name'],':id' => $data['id'] ?? 0);
            $statement = $statements->getStatement(statements\Validation::UNIQUE_LIST_USER_NAME);
            if ((bool) $this->repository->execute($statement, $db_parameters)) {
                $result['success'] = false;
                $result['content'][] = TH::translate('(Utilizador / Lista / Nome) já existe.');
            }

            return $result;
        } catch(\Throwable $throwable){
            throw $this->throwableHandle($throwable);
        }

    }
}
// --- END