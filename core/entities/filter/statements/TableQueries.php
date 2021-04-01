<?php
/**
 * ENTITIES - TRANSLATION - STATEMENT - VALIDATION
 * 
 * Disponibiliza métodos = statements que gerem validações da entidade TRANSLATION
 *  
 * @pmonteiro (yyyy-mm-dd)
 */

namespace CORE\entities\filter\statements;


class TableQueries implements \FWK\interfaces\StatementInterface {
    
    use \FWK\traits\throwableHandler;

    public const BASE = 'ba';
    
    
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
                case self::BASE:
                    $statement = $this->base($parameters);
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
    private function base($parameters): string {
        try {
            
             // default order
            $db_order = '';
            
            // Alterar order para lower porque a tabela é colate utf8_bin (ex: lower(source) DESC)
            if (isset($parameters['order'])) {
                $db_order = implode(',', $parameters['order']);
            }

            if ($parameters['conditions'] != '') {$parameters['conditions'] = 'WHERE '. $parameters['conditions'];}
            $db_order = $db_order ? ' ORDER BY ' . $db_order : '';
            $db_limit = $parameters['limit'] ? ' LIMIT ' . $parameters['limit'] : '';
            $db_offset = ($parameters['offset'] || $parameters['offset'] == 0) ? ' OFFSET ' . $parameters['offset'] : '';

            $statement = 'SELECT sf.*, su.name as su_name FROM sys_filters sf LEFT JOIN sys_users su ON su.id = sf.user_id ' . $parameters['conditions'] . $db_order . $db_limit . $db_offset;

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