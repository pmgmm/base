<?php
/**
 * FRAMEWORK - HELPER - PERMISSION
 * 
 * Disponibiliza métodos que permitem manusear permissões
 *
 * @pmonteiro (yyyy-mm-dd)
 */
namespace FWK\helpers;


final class PermissionHelper {

    use \FWK\traits\throwableHandler;


    const CREATE = '1';
    const READ = '2';
    const UPDATE = '4';
    const DELETE = '8';


	/**
	 * Valida permissão do módulo
	 * 
	 * @param string permission = Permissão do módulo
	 * 
	 * @return void
     * 
	 * @pmonteiro (yyyy-mm-dd)
	 */
    public static function validateModule(string $permission): bool {
        try {

            return in_array($permission, $_SESSION['USER']['permissions']['modules']);

        } catch (\Throwable $throwable) {
            throw self::throwableHandle($throwable);
        }
    }


    /**
	 * Valida permissão "completa" ou crud
     * Basta que uma permissão de sistema ou funcionalidade ou crud seja validada
	 * 
	 * @param array permission = Permissões a validar 
     * @param string|null operation = Operação crud a validar 
	 * 
	 * @return void
     * 
	 * @pmonteiro (yyyy-mm-dd)
	 */
    public static function validate(array $permissions, ?string $operation=null): bool {
        try {
             
            $permissions = array_intersect_key($_SESSION['USER']['permissions']['aggregated'], array_flip($permissions));
            foreach($permissions as $key => $data) {
                if (isset($operation)) { // Se é uma permissão crud, verifica se a operação (crud) solicitada é válida
                    if ($data['type'] == 'c' && $operation & intval($data['value']))  {
                        return true;
                    }
                } else { // Se é uma permissão de sistema ou completa (sem crud) fica imediatamente validada
                    return true;
                }
            }

            return false;

        } catch (\Throwable $throwable) {
            throw self::throwableHandle($throwable);
        }
    }
    

    /**
	 * Transforma uma permissão em formato inteiro (bitwise) num array de permissões crud
	 * 
	 * @param int value = Valor (bitwise) da permissão
	 * 
	 * @return array = Permissões crud
     * 
	 * @pmonteiro (yyyy-mm-dd)
	 */
    public static function toCrudPermissions(int $value): array {
        try {

            return array($value & self::CREATE ? true : false,
                        $value & self::READ ? true : false,
                        $value & self::UPDATE ? true : false,
                        $value & self::DELETE ? true : false);

        } catch (\Throwable $throwable) {
            throw self::throwableHandle($throwable);
        }
    }


    /**
	 * Transforma permissões crud em formato array num inteiro (bitwise) de permissão
	 * 
	 * @param array value = Valor da permissão em formato array
	 * 
	 * @return int = Permissões crud
     * 
	 * @pmonteiro (yyyy-mm-dd)
	 */
    public static function toCrudBitWise(array $crud): int {
        try {

            $bitwise = 0;
            foreach($crud as $key => $value) {
                if ($value) {$bitwise += intval($key);}
            }   

            return $bitwise;

        } catch (\Throwable $throwable) {
            throw self::throwableHandle($throwable);
        }
    }


    /**
	 * Calcula e devolve as permissões crud agregadas 
     * Basta validar uma permissão de sistema ou de funcionalidade
	 * 
	 * @param array permissions = Permissões a agregar
	 * 
	 * @return array = Permissões crud
     * 
	 * @pmonteiro (yyyy-mm-dd)
	 */
    public static function getCrudPermissions(array $permissions): array {
        try {

            $result = array('create' => false, 'read' => false, 'update' => false, 'delete' => false);
            foreach($permissions as $key) {

                if (null !== ($data = $_SESSION['USER']['permissions']['aggregated'][$key])) {

                    if ($data['type'] == 'c') { // Se é uma permissão crud, verifica a validade de cada uma das permissões para as autorizar
                        $value = intval($data['value']);
                        if ($value & self::CREATE) {$result['create'] = true;}
                        if ($value & self::READ) {$result['read'] = true;}
                        if ($value & self::UPDATE) {$result['update'] = true;}
                        if ($value & self::DELETE) {$result['delete'] = true;}
                        if ($result['create'] && $result['read'] && $result['update'] && $result['delete']) {
                            break;
                        }
                        break;
                    } else { // Se é uma permissão de sistema ou de funcionalidade (sem crud) a autorização é total (todas permissões válidas)
                        $result = array('create' => true, 'read' => true, 'update' => true, 'delete' => true);
                        break;
                    }
                }

            }

            return $result;
            
        } catch (\Throwable $throwable) {
            throw self::throwableHandle($throwable);
        }
    }


    /**
	 * Valida a apresentação de uma lista
     * Se não valida permissão r=read, vai para login
	 * 
	 * @param array permissions = Permissões a validar
	 * 
	 * @return array = Permissões crud
     * 
	 * @pmonteiro (yyyy-mm-dd)
	 */
    public static function validateList(array $permissions): array {
        try {

            $permissions = self::getCrudPermissions($permissions);

            if (!$permissions['read']) {
                header('location:' . BASE_URI);
            } 

            return $permissions;

        } catch (\Throwable $throwable) {
            throw self::throwableHandle($throwable);
        }
    }


    /**
	 * Valida a apresentação de um registo
     * Se não valida nenhuma permissão ou operação, vai para login
	 * 
	 * @param array permissions = Permissões a validar
     * @param string|null operation = Operação crud a validar 
     *     
	 * @return bool = ? Modo de vista
     * 
	 * @pmonteiro (yyyy-mm-dd)
	 */
    public static function validateRecord(array $permissions, string $operation): bool {
        try {

            $view_mode = false;
            $permissions = self::getCrudPermissions($permissions);

            if ((!$permissions['create'] && !$permissions['read'] && !$permissions['update']) ||
                ($operation == self::CREATE && !$permissions['create']) || 
                ($operation == self::UPDATE && !$permissions['update'] && !$permissions['read'])) {
                header('location:' . BASE_URI);
            } 
            if ($operation == self::UPDATE && !$permissions['update']) {
                $view_mode = true;
            }

            return $view_mode;

        } catch (\Throwable $throwable) {
            throw self::throwableHandle($throwable);
        }
    }

}
// --- END    