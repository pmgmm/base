<?php
/**
 * ENTITIES - ROLE - RELATION - PERMISSÕES POR FUNÇÃO
 * 
 * Disponibiliza métodos que permitem gerir a relação Função->Permissões 
 * 
 * @pmonteiro (yyyy-mm-dd)
 */

namespace CORE\entities\permission\relations;

use \CORE\entities\permission\statements as statements;


final class PermissionsByRole extends \FWK\abstracts\RelationAbstract implements \FWK\interfaces\RelationInterface {
    
    // Entity table
    protected array $base_table = array('sys_role_permissions','srp');

    // Primary key
    protected array $primary_key = array('role_id', 'permission_id');


     /**
     * Somatório das permissões para um conjunto de roles
     * Uma permissão que esteja associada a várias roles com detalhes diferentes, é devolvida com o seu somatório (bitwise)
     * Ex: 1+1+3+2+4 = 7
     * Considera as permissões sem detalhe e as permissões com detalhe que tenham valor
     * 
     * @param array|null $roles = Roles a considerar
     * 
     * @return array = Permissões : ['permissions' => ['type' => ?, 'value' => ?], ...]
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    final function getSumPermissionsByRoles(array $roles): array {
        try {
            $result = array();

            if (count($roles)) { 

                // Obtém statement de somatório
                $statements = new statements\Sum();
                $statement = $statements->getStatement(statements\Sum::PERMISSIONS, $roles);
                // Executa statement
                $this->repository->execute($statement);
                // Processa resultado
                $permissions =  $this->repository->getRecords(false, true);
                foreach ($permissions AS $key => $value) {
                    $result[$key] = $value[0];
                }

            }

            return $result;
        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Somatório das permissões em módulos para um conjunto de roles
     * 
     * @param array|null $roles = Roles a considerar
     * 
     * @return array = Módulos : ['module?', ...]
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    final function getSumModulePermissionsByRoles(array $roles): array {
        try {
            $result = array();

            if (count($roles)) { 

                // Obtém statement de agregação
                $statements = new statements\Sum();
                // Executa statement
                $statement = $statements->getStatement(statements\Sum::MODULES, $roles);
                $this->repository->execute($statement);
                $result =  $this->repository->getRecords();

            }

            return array_column($result, 'value');
        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


 }
 // --- END