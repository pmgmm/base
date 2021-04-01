<?php
/**
 * ENTITIES - APP - APPS / PWAS
 * 
 * Disponibiliza métodos que permitem gerir a entidade APP / PWA
 * 
 * VAPID KEY criada em https://vapidkeys.com/ ou https://tools.reactpwa.com/vapid
 * ou, não testado:
 * const vapidKeys = webpush.generateVAPIDKeys(); (deve utilizar o domínio corrente)
 *  
 * @pmonteiro (yyyy-mm-dd)
 */

namespace CORE\entities\app;


class App extends \FWK\abstracts\EntityAbstract implements \FWK\interfaces\EntityInterface {

    // Tabela da entidade
    protected array $base_table = array('sys_apps','sa');

    // Colunas target de pesquisa por texto livre
    protected array $search_columns = array('sa.name', 'sa.description');


    /**
     * Carrega propriedades de registo pela KEY (key da app)
     *
     * @param int $value = KEY
     * 
     * @return bool = ? Sucesso
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    final public function load_byKey(string $value): bool {
        try {
            $result = false;

            // Reset da classe
            $this->reset();

            // Condições e parâmetros para statement
            $db_conditions = '(_key = :_key)';
            $db_parameters = array();
            $db_parameters[':_key'] = $value;
        
            // Lê registo
            if ($this->repository->read($this->base_table, null, $db_conditions, $db_parameters)) {
                $this->repository->loadNextRecord();
                // Set de propriedades
                $this->setProperties($this->repository->getRecord(),false);
                $result = true;
            }

            return $result;
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Carrega propriedades de registo pelo NOME (nome da app)
     *
     * @param int $value = Nome
     * 
     * @return bool = ? Sucesso
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    final public function load_byName(string $value): bool {
        try {
            $result = false;

            // Reset da classe
            $this->reset();

            // Condições e parâmetros para statement
            $db_conditions = '(name = :name)';
            $db_parameters = array();
            $db_parameters[':name'] = $value;
        
            // Lê registo
            if ($this->repository->read($this->base_table, null, $db_conditions, $db_parameters)) {
                $this->repository->loadNextRecord();
                // Set de propriedades
                $this->setProperties($this->repository->getRecord(),false);
                $result = true;
            }

            return $result;
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


     /** OVERRIDE
     * Insere registo pelas propriedades préviamente carregadas
     *
     * @return bool = ? Sucesso
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function insert(): bool {
        try {

            // Gera Key
            $this->setProperty('_key', uniqid(rand(1,999).'.',true));

            return parent::insert();
        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Valida a app pelo nome e respectiva key
     *
     * @param string $name = Nome da app
     * @param string $key = Key da app
     * 
     * @return bool = ? Sucesso
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    final public function validate(string $name, string $key): bool {
        try {
            $result = true;

            // Reset da classe
            $this->reset();

            // Condições e parâmetros para statement
            $db_conditions = '(name=:name AND _key=:key AND active=:active)';
            $db_parameters = array();
            $db_parameters[':name'] = $name;
            $db_parameters[':key'] = $key;
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