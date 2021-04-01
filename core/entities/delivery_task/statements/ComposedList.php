<?php
/**
 * ENTITIES - DELVERY TASK - STATEMENT - COMPOSED LIST
 * 
 * Disponibiliza métodos = statements que devolvem listas compostas de tarefas de delivery
 *  
 * @pmonteiro (yyyy-mm-dd)
 */

namespace CORE\entities\delivery_task\statements;


class ComposedList implements \FWK\interfaces\StatementInterface {
    
    use \FWK\traits\throwableHandler;

    public const MOBILE = 'mb';
    
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
                case self::MOBILE:
                    $statement = $this->mobile();
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
     * Lista de todas as tasks de delivery por utilizador de delivery
     * + Dados de cliente
     * 
     * Parâmetros necessários:
     *      :id = Id do utilizador de delivery
     * 
     * @return string = Statement
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    private function mobile(): string {
        try {
              
            $statement = 'SELECT
                            dt.id, dt.request, dt.price, dt.estimated_time, dt.notes, dt.alerts,
                            c.name, c.address, c.postal_code, c.city, c.landmark, c.gps, c.phone      
                            FROM delivery_tasks dt 
                            LEFT JOIN customers c ON dt.customer_id = c.id
                            WHERE (dt.pack_id=:id) ORDER BY dt.estimated_time ASC';

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