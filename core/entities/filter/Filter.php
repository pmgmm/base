<?php
/**
 * ENTITIES - FILTER - FILTROS
 * 
 * Disponibiliza métodos que permitem gerir a entidade FILTER
 *  
 * @pmonteiro (yyyy-mm-dd))
 */

namespace CORE\entities\filter;


class Filter extends \FWK\abstracts\EntityAbstract implements \FWK\interfaces\EntityInterface {

    // Tabela da entidade
    protected array $base_table = array('sys_filters','sf');

    // Colunas target de pesquisa por texto livre
    protected array $search_columns = array('sf.list', 'sf.name', 'sf.description');

}
// --- END