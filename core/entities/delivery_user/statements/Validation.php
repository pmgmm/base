<?php
/**
 * ENTITIES - DELIVERY USER - STATEMENT - VALIDATION
 * 
 * Disponibiliza métodos = statements que gerem validações de entidade DELIVERY USER
 *  
 * @pmonteiro (yyyy-mm-dd)
 */

namespace CORE\entities\delivery_user\statements;


class Validation implements \FWK\interfaces\StatementInterface {
    
    use \FWK\traits\throwableHandler;

    public const UNIQUE_USER = 'uu';
    public const UNIQUE_NAME = 'un';
    public const UNIQUE_EMAIL = 'ue';
    
    /**
     * Construtor
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function __construct() {}


    /**
     * Devolve statement
     *
     * @param string $key = Identificador do statement (constante)
     * @param array|null $parameters = Parâmetros para construção de statement
     * 
     * @return string = Statement
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function getStatement(string $key, ?array $parameters = null): string {
        try{
            $this->resetStatement();

            switch ($key) {
                case self::UNIQUE_USER:
                    $statement = $this->uniqueUser();
                    break;
                case self::UNIQUE_NAME:
                    $statement = $this->uniqueName();
                    break;
                case self::UNIQUE_EMAIL:
                    $statement = $this->uniqueEmail();
                    break;
                default:
                    $statement = '';
                    break;
            }

            return $statement;
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }

    /**
     * Verifica se já existe pelo menos 1 registo com o user submetido
     * 
     * Parâmetros necessários:
     *      :id = Id para update; 0 para insert
     *      :user = User a verificar
     * 
     * @return string = Statement
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    private function uniqueUser(): string {
        try {
              
            $statement = 'SELECT id FROM delivery_users WHERE (user = :user) AND id != :id LIMIT 1';

            return $statement;
        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }

     /**
     * Verifica se já existe pelo menos 1 registo com o nome submetido
     * 
     * Parâmetros necessários:
     *      :id = Id para update; 0 para insert
     *      :name = Nome a verificar
     * 
     * @return string = Statement
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    private function uniqueName(): string {
        try {
              
            $statement = 'SELECT id FROM delivery_users WHERE (name = :name) AND id != :id LIMIT 1';

            return $statement;
        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }

    /**
     * Verifica se já existe pelo menos 1 registo com o email submetido
     * 
     * Parâmetros necessários:
     *      :id = Id para update; 0 para insert
     *      :name = Email a verificar
     * 
     * @return string = Statement
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    private function uniqueEmail(): string {
        try {
              
            $statement = 'SELECT id FROM delivery_users WHERE (email = :email) AND id != :id LIMIT 1';

            return $statement;
        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Reset da classe
     *
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    private function resetStatement(): void {
        try {

        } catch (\Throwable $throwable){
            throw $this->throwableHandle($throwable);
        }
    }

}
// --- END