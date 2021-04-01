<?php
/**
 * ENTITIES - ROLE - RELATION - FUNÇÕES POR UTILIZADOR
 * 
 * Disponibiliza métodos que permitem gerir a relação Utilizador->Funções 
 * 
 * @pmonteiro (yyyy-mm-dd)
 */

namespace CORE\entities\role\relations;

use \FWK\abstracts\RelationAbstract;
use \FWK\interfaces\RelationInterface;
use \FWK\traits as traits;


final class RolesByUser extends RelationAbstract implements RelationInterface {
    
    // Entity table
    protected array $base_table = array('sys_user_roles','sur');

    // Primary key
    protected array $primary_key = array('user_id', 'role_id');

    // Collection Owner key (titular da colecção)
    protected string $owner_key = 'user_id';

    // Collection Relation key
    protected string $relation_key = 'role_id';
    
 }
 // --- END