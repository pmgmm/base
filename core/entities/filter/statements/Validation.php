<?php
/**
 * ENTITIES - FILTER - STATEMENT - VALIDATION
 * 
 * Disponibiliza métodos = statements que gerem validações da entidade FILTER
 *  
 * @pmonteiro (yyyy-mm-dd)
 */

namespace CORE\entities\filter\statements;


class Validation implements \FWK\interfaces\StatementInterface {
    
    use \FWK\traits\throwableHandler;

    public const UNIQUE_LIST_USER_NAME = 'ulun';
    public const PRIVATE_SCOPE = 'ps';
    
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
                case self::UNIQUE_LIST_USER_NAME:
                    $statement = $this->uniqueListUserName();
                    break;
                case self::PRIVATE_SCOPE:
                    $statement = $this->privateScope();
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
     * Verifica se já existe pelo menos 1 registo com a lista + utilizador + nome submetido
     * 
     * Parâmetros necessários:
     *      :id = Id para update; 0 para insert
     *      :list = Lista a verificar
     *      :user_id = Utilizador a verificar
     *      :name = Nome a verificar
     * 
     * @return string = Statement
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    private function uniqueListUserName(): string {
        try {
              
            $statement = 'SELECT id FROM sys_filters WHERE (list = :list AND user_id = :user_id AND name = :name) AND id != :id LIMIT 1';

            return $statement;
        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }

    
    /**
     * Verfica se o filtro é privado
     * 
     * Parâmetros necessários:
     *      :id = Id para update; 0 para insert
     *      :list = Lista a verificar
     *      :user_id = Utilizador a verificar
     *      :name = Nome a verificar
     * 
     * @return string = Statement
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    private function privateScope(): string {
        try {
              
            $statement = 'SELECT id FROM sys_filters WHERE (id = :id AND public IS false)';

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