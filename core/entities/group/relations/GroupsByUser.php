<?php
/**
 * ENTITIES - GROUP - RELATION - GRUPOS POR UTILIZADOR
 * 
 * Disponibiliza métodos que permitem gerir a relação Utilizador->Grupos 
 * 
 * @pmonteiro (yyyy-mm-dd)
 */

namespace CORE\entities\group\relations;


final class GroupsByUser extends \FWK\abstracts\RelationAbstract implements \FWK\interfaces\RelationInterface {
    
    // Entity table
    protected array $base_table = array('sys_user_groups','sug');

    // Primary key
    protected array $primary_key = array('user_id', 'group_id');

    // Collection Owner key
    protected string $owner_key = 'user_id';

    // Collection Relation key
    protected string $relation_key = 'group_id';
    
 }
 // --- END