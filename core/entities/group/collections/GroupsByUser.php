<?php
/**
 * ENTITIES - GROUP - COLLECTION - GRUPOS DE UTILIZADOR
 * 
 * Disponibiliza métodos que permitem gerir a colecção Utilizador->Grupos 
 * 
 * @pmonteiro (yyyy-mm-dd)
 */

namespace CORE\entities\group\collections;


final class GroupsByUser extends \FWK\abstracts\CollectionAbstract implements \FWK\interfaces\CollectionInterface {
    
    // Tabela de relação
    protected array $base_table = array('sys_user_groups','sug');

    // Primary key
    protected array $primary_key = array('user_id', 'group_id');
    
 }
 // --- END