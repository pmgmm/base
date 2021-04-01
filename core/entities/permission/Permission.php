<?php
/**
 * ENTITIES - ROLE - PERMISSÕES DE FUNÇÕES
 * 
 * Disponibiliza métodos que permitem gerir a entidade PERMISSÃO
 *  
 * @pmonteiro (yyyy-mm-dd)
 */

namespace CORE\entities\permission;


class Permission extends \FWK\abstracts\EntityAbstract implements \FWK\interfaces\EntityInterface {

    // Tabela da entidade
    protected array $base_table = array('sys_permissions','sp');

    // Colunas target de pesquisa por texto livre
    protected array $search_columns = array('sp.code', 'sp.description');

}
// --- END