<?php
/**
 * ENTITIES - USER - UTILIZADORES
 * 
 * Disponibiliza métodos que permitem gerir a entidade USER
 *  
 * @pmonteiro (yyyy-mm-dd))
 */

namespace CORE\entities\user;

use \FWK\helpers\MiscHelper;


class User extends \FWK\abstracts\EntityAbstract implements \FWK\interfaces\EntityInterface {

    // Tabela da entidade
    protected array $base_table = array('sys_users','su');

    // Colunas target de pesquisa por texto livre
    protected array $search_columns = array('su.user', 'su.name', 'su.email');


    /** OVERRIDE
     * Insere registo pelas propriedades préviamente carregadas
     *
     * @return bool = ? Sucesso
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function insert(): bool {
        try {

            // Gera account baseado no nome
            if ($this->getProperty('user') == '') {
                $aux_name = trim(strtolower(str_replace(' ','', $this->getProperty('name'))));
                $login_name = substr($aux_name, 0, 2) .date('yn');
                $login_name .= substr($aux_name, strlen($aux_name)-3, 2) . rand(0, 99);
                $this->setProperty('user', $login_name);
            }

            // Avatar
            if ($this->getProperty('avatar') == '') {
                $this->setProperty('avatar', MiscHelper::createAvatar($this->getProperty('name')));
            }

            // Encripta password
            $this->setProperty('password', password_hash($this->getProperty('password'),PASSWORD_DEFAULT));

            // Nenhum utilizador inserido é de sistema
            $this->setProperty('_system', false);

            return parent::insert();
        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /** OVERRIDE
     * Actualiza registo pelas propriedades préviamente carregadas (incluindo ID (primary key))
     *
     * @return bool = ? Sucesso
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function update(): bool {
        try {

            // Retira a password da lista de update se vazia
            if ($this->getProperty('password') == '') {
                $index = array_search('password', $this->properties_updated);
                unset($this->properties_updated[$index]);
            }

            // Encripta password
            if (in_array('password', $this->properties_updated)) {
                $this->setProperty('password', password_hash($this->getProperty('password'), PASSWORD_DEFAULT));
            }

            return parent::update();
        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /** 
     * Login (pelo user ou email)
     *
     * @return bool = ? Sucesso
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function login($user_or_email, $password): array {
        try {
            $result = array('success' => false);

            $db_fields = array('id', 'name', 'password', 'timezone', 'language', 'date_format', 'avatar');
            $db_conditions = '(user=:user_or_email OR email=:user_or_email) AND active=:active';
            $db_parameters = array(':user_or_email' => $user_or_email, ':active' => true);

            // Verifica se existe registo
            if ($this->repository->read($this->base_table,  $db_fields, $db_conditions, $db_parameters, null, 1)) {
                $this->repository->loadNextRecord();
                // Set de propriedades
                $this->setProperties($this->repository->getRecord(),false);
             
                // Verifica se password é válida
                if (password_verify($password, $this->getProperty('password'))) {

                    // Carrega informação dependente de login
                    // Utilizador
                    $_SESSION['ACTIVE'] = true;
                    $_SESSION['USER']['id'] = intval($this->getProperty('id'));
                    $_SESSION['USER']['name'] = $this->getProperty('name');
                    $_SESSION['USER']['avatar'] = $this->getProperty('avatar');
                    $_SESSION['USER']['menus'] = null;
                    // Idioma
                    $_SESSION['LANGUAGE']['current'] = $this->getProperty('language');
                    $_SESSION['LANGUAGE']['translation'] = array();
                    // Timezone
                    $_SESSION['TIMEZONE'] = $this->getProperty('timezone');
                    // Formato data
                    $_SESSION['FORMAT']['date'] = $this->getProperty('date_format');

                    // Funções atribuídas ao utilizador
                    $obj_rolesByUser = new \CORE\entities\role\collections\RolesByUser($this->repository);
                    $obj_rolesByUser->load($this->getProperty('id'));
                    $arr_roles_ids = $obj_rolesByUser->getRelationKeys();

                    // Carrega as permissões atribuídas ao utilizador em variáveis de sessão
                    $obj_permissionsByRole = new \CORE\entities\permission\relations\PermissionsByRole($this->repository);
                    $_SESSION['USER']['permissions']['aggregated'] = $obj_permissionsByRole->getSumPermissionsByRoles($arr_roles_ids);
                    $_SESSION['USER']['permissions']['modules'] = $obj_permissionsByRole->getSumModulePermissionsByRoles($arr_roles_ids);

                    $result = array('success' => true, 'storage' => array(
                        'language' => $_SESSION['LANGUAGE']['current'],
                        'date_format' => $_SESSION['FORMAT']['date']
                        )
                    );

                }

            }

            return $result;
        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /** 
     * Logout
     *
     * @return bool = ? Sucesso
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function logout(): bool {
        try {
            $result = false;

            // Reset de informação dependente de login
            // Utilizador
            $_SESSION['ACTIVE'] = false;
            unset($_SESSION['USER']);

            $result = true;

            return $result;
        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


}
// --- END