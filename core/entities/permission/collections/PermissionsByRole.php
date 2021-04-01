<?php
/**
 * ENTITIES - ROLE - COLLECTION - PERMISSÕES POR FUNÇÃO
 * 
 * Disponibiliza métodos que permitem gerir a relação Função->Permissões 
 * 
 * @pmonteiro (yyyy-mm-dd)
 */

namespace CORE\entities\permission\collections;


final class PermissionsByRole extends \FWK\abstracts\CollectionAbstract implements \FWK\interfaces\CollectionInterface {
    
    // Entity table
    protected array $base_table = array('sys_role_permissions','srp');

    // Primary key
    protected array $primary_key = array('role_id', 'permission_id');

 }
 // --- END