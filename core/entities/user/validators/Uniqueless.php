<?php
/**
 * ENTITIES - USER - VALIDATOR - UNIQUELESS
 * 
 * Disponibiliza métodos que permitem validar se o UTILZADOR, NOME, e EMAIL são únicos
 * 
 * @pmonteiro (yyyy-mm-dd)
 */

namespace CORE\entities\user\validators;

use \CORE\entities\user\statements as statements;
use \FWK\helpers\TranslationHelper as TH;


class Uniqueless extends \FWK\abstracts\ValidatorAbstract implements \FWK\interfaces\ValidatorInterface {

    use \FWK\traits\throwableHandler;
    
    /**
     * Valida se já existe pelo menos 1 registo com o utilizador, nome ou email submetidos
     *
     * @param array $data = Propriedades a validar
     * 
     * @return array = Standard result : array('success' => false, 'content' => array());
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function validate(array $data) : array {
        try {
            $result = array ("success" => true, "content" => array());
            
            // Obtém statement de validação
            $statements = new statements\Validation();

            // Utilizador
            $db_parameters = array(':user' => $data['user'],':id' => $data['id'] ?? 0);
            $statement = $statements->getStatement(statements\Validation::UNIQUE_USER);
            if ((bool) $this->repository->execute($statement, $db_parameters)) {
                $result['success'] = false;
                $result['content'][] = TH::translate('Utilizador já existe.');
            }

            // Nome
            $db_parameters = array(':name' => $data['name'],':id' => $data['id'] ?? 0);
            $statement = $statements->getStatement(statements\Validation::UNIQUE_NAME);
            if ((bool) $this->repository->execute($statement, $db_parameters)) {
                $result['success'] = false;
                $result['content'][] = TH::translate('Nome já existe.');
            }

            // Email
            $db_parameters = array(':email' => $data['email'],':id' => $data['id'] ?? 0);
            $statement = $statements->getStatement(statements\Validation::UNIQUE_EMAIL);
            if ((bool) $this->repository->execute($statement, $db_parameters)) {
                $result['success'] = false;
                $result['content'][] = TH::translate('Email já existe.');
            }

            return $result;
        } catch(\Throwable $throwable){
            throw $this->throwableHandle($throwable);
        }

    }
}
// --- END