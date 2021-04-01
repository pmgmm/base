<?php
/**
 * ENTITIES - DELIVERY USER - UTILIZADORES
 * 
 * Disponibiliza métodos que permitem gerir a entidade DELIVERY_USER
 *  
 * @pmonteiro (yyyy-mm-dd))
 */

namespace CORE\entities\delivery_user;

use \FWK\helpers\MiscHelper;


class User extends \FWK\abstracts\EntityAbstract implements \FWK\interfaces\EntityInterface {

    // Tabela da entidade
    protected array $base_table = array('delivery_users','du');

    // Colunas target de pesquisa por texto livre
    protected array $search_columns = array('du.user', 'du.name', 'du.email');


    /** OVERRIDE
     * Insere registo pelas propriedades préviamente carregadas
     *
     * @return bool = ? Sucesso
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function insert(): bool {
        try {

            // Retira a flag de renovação da lista de parâmetros
            unset($this->properties['renew_authorization']);

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
            
            // Autorização
            $this->setProperty('authorization', uniqid('',true));

            $this->repository->beginTransaction();

            $id = parent::insert();

            // Gera autorização
            $this->setProperty('authorization', uniqid($this->getProperty('id').'.',true));

            $this->update();

            $this->repository->commitTransaction();

            return $id;
        } catch(\Throwable $throwable) {
            $this->repository->rollbackTransaction();
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

            // Renova a autorização
            if ($this->getProperty('renew_authorization')) {
                $this->setProperty('authorization', uniqid($this->getProperty('id').'.',true));
            }

            // Retira a flag de renovação de autorização
            if ($index = array_search('renew_authorization', $this->properties_updated)) {
                unset($this->properties_updated[$index]);
            }
            
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
    public function login($user_or_email, $password): bool {
        try {
            $result = false;

            $db_fields = array('id', 'name', 'password', 'timezone', 'authorization', 'avatar');
            $db_conditions = '(user=:user_or_email OR email=:user_or_email) AND active=:active';
            $db_parameters = array(':user_or_email' => $user_or_email, ':active' => true);

            // Verifica se existe registo
            if ($this->repository->read($this->base_table,  $db_fields, $db_conditions, $db_parameters, null, 1)) {
                $this->repository->loadNextRecord();
                // Set de propriedades
                $this->setProperties($this->repository->getRecord(),false);
             
                // Verifica se password é válida
                if (password_verify($password, $this->getProperty('password'))) {
                    $result = true;
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

    /**
     * Valida a autorização
     *
     * @param string $autorization = Autorização
     * 
     * @return bool = ? Sucesso
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    final public function validateAuthorization(string $authorization): bool {
        try {
            $result = true;

            // Reset da classe
            $this->reset();

            // Extrai id do utilizador embebido na autorização
            $user_id = strtok($authorization, '.');

            // Condições e parâmetros para statement
            $db_conditions = '(id=:id AND authorization=:authorization AND active=:active)';
            $db_parameters = array();
            $db_parameters[':id'] = $user_id;
            $db_parameters[':authorization'] = $authorization;
            $db_parameters[':active'] = true;
            
            // Se não existe registo
            if (!$this->repository->read($this->base_table, null, $db_conditions, $db_parameters)) {
                 $result = false;
            }

            return $result;
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


}
// --- END