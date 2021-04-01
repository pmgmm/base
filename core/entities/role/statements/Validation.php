<?php
/**
 * ENTITIES - ROLE - STATEMENT - VALIDATION
 * 
 * Disponibiliza métodos = statements que gerem validações de função
 *  
 * @pmonteiro (yyyy-mm-dd)
 */

namespace CORE\entities\role\statements;


class Validation implements \FWK\interfaces\StatementInterface {
    
    use \FWK\traits\throwableHandler;

    public const UNIQUE_NAME = 'un';
    
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
                case self::UNIQUE_NAME:
                    $statement = $this->uniqueName();
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
              
            $statement = 'SELECT id FROM sys_groups WHERE (name = :name) AND id != :id LIMIT 1';

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