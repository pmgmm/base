<?php
/**
 * ENTITIES - GROUP - COLLECTION - FUNÇÕES DE UTILIZADOR
 * 
 * Disponibiliza métodos que permitem gerir a colecção Utilizador->Funções 
 * 
 * @pmonteiro (yyyy-mm-dd)
 */

namespace CORE\entities\role\collections;


final class RolesByUser extends \FWK\abstracts\CollectionAbstract implements \FWK\interfaces\CollectionInterface {
    
    // Tabela de relação
    protected array $base_table = array('sys_user_roles','sur');

    // Primary key
    protected array $primary_key = array('user_id', 'role_id');
    
 }
 // --- END