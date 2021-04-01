<?php
/**
 * ENTITIES - DELIVERY TASK - TAREFA DE ENTREGA
 * 
 * Disponibiliza métodos que permitem gerir a entidade TAREFA DE ENTREGA
 *  
 * @pmonteiro (yyyy-mm-dd)
 */

namespace CORE\entities\delivery_task;


class Task extends \FWK\abstracts\EntityAbstract implements \FWK\interfaces\EntityInterface {

    // Tabela da entidade
    protected array $base_table = array('delivery_tasks','dt');

    // Colunas target de pesquisa por texto livre
    protected array $search_columns = array();

}
// --- END