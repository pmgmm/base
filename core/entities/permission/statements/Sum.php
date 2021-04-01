<?php
/**
 * ENTITIES - PERMISSION - STATEMENT - SUM
 * 
 * Disponibiliza métodos = statements que gerem o somatório de permissções por grupo de funções
 *  
 * @pmonteiro (yyyy-mm-dd)
 */

namespace CORE\entities\permission\statements;


class Sum implements \FWK\interfaces\StatementInterface {
    
    use \FWK\traits\throwableHandler;

    public const PERMISSIONS = 'p';
    public const MODULES = 'm';
    
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
                case self::PERMISSIONS:
                    $statement = $this->permissions($parameters);
                    break;
                case self::MODULES:
                    $statement = $this->modules($parameters);
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
     * Somatório das permissões para um conjunto de roles
     * Uma permissão que esteja associada a várias roles com detalhes diferentes, é devolvida com o seu somatório (bitwise)
     * Ex: 1+1+3+2+4 = 7
     * Considera as permissões sem detalhe e as permissões com detalhe que tenham valor
     * 
     * @param array|null $roles = Roles a considerar
     * 
     * @return string = Statement
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    private function permissions(array $roles): string {
        try {
            $statement = "SELECT sp.code, sp.type, BIT_OR(srp.value) value FROM sys_role_permissions srp
                            LEFT OUTER JOIN sys_permissions sp ON srp.permission_id = sp.id
                            WHERE srp.role_id IN (".implode(',', $roles).") AND sp.type IN ('c','f','s')
                            GROUP BY srp.permission_id";

            return $statement;
        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Somatório das permissões em módulos para um conjunto de roles
     * 
     * @param array|null $roles = Roles a considerar
     * 
     * @return string = Statement
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    private function modules(array $roles): string {
        try {
            $statement = "SELECT DISTINCT(sp.code) value FROM sys_role_permissions srp
                            LEFT OUTER JOIN sys_permissions sp ON srp.permission_id = sp.id
                            WHERE srp.role_id IN (" . implode(',', $roles) . ") AND sp.type = 'm'";

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