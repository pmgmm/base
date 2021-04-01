<?php
/**
 * ENTITIES - GROUP - GRUPOS DE UTILIZADORES
 * 
 * Disponibiliza métodos que permitem gerir a entidade GRUPO
 *  
 * @pmonteiro (yyyy-mm-dd)
 */

namespace CORE\entities\group;


class Group extends \FWK\abstracts\EntityAbstract implements \FWK\interfaces\EntityInterface {

    // Tabela da entidade
    protected array $base_table = array('sys_groups','sg');

    // Colunas target de pesquisa por texto livre
    protected array $search_columns = array('sg.name', 'sg.description');

}
// --- END