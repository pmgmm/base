<?php
/**
 * FRAMEWORK - ABSTRACT - GESTÃO DE ENTIDADE
 * 
 * Disponibiliza métodos que permitem gerir uma entidade
 * Esta classe não pode ser instanciada, têm de ser estendida
 * 
 * @pmonteiro (yyyy-mm-dd)
 */

namespace FWK\abstracts;

use \FWK\wrappers\repositories\MainRepository;
use \FWK\traits as traits;
use \FWK\helpers\DateTimeHelper;
use \FWK\helpers\SQLHelper;


abstract class EntityAbstract {

    use traits\throwableHandler;
    use traits\propertiesHandler;
   
    // Instância de repositório
    protected MainRepository $repository;

    
    /**
     * Construtor
     *
     * @param Repository $repository = Instância de repositório
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function __construct(MainRepository $repository) {
        try {

            $this->repository = $repository; 
            
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Carrega propriedades de registo pelo ID (primary key)
     *
     * @param int $value = Valor do ID
     * 
     * @return bool = ? Sucesso
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    final public function load_byID(int $value): bool {
        try {
            $result = false;

            // Reset da classe
            $this->reset();

            // Condições e parâmetros para statement
            $db_conditions = '(id = :id)';
            $db_parameters = array();
            $db_parameters[':id'] = $value;
        
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
     * Carrega lista de registos
     *
     * @param array|null $fields = Campos a ler (null=todos)
     * @param string|null $search = Texto para pesquisa livre
     * @param array|null $filter = Valores de filtro : array('field1' => 'value1', ...)
     *                             Pode incluír o par 'INCLUDE' para adicionar parte de querystring no final das condições
     *                             Ex: array(..., 'INCLUDE' => 'OR id in(1,2,3,...)',...) 
     * @param array|null $order = Ordem dos registos : array(field1 ASC, ...)
     * @param int|null $limit = Número máximo de registos a devolver
     * @param int|null $offset = Número de registos a ignorar
     * 
     * @return int = Número de registos abrangidos
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function loadList(?array $fields = null, ?string $search = null, ?array $filter = null, ?array $order = null, ?int $limit = null, ?int $offset = null): int {
        try {

            // Reset da classe
            $this->reset();

            // Condições e parâmetros para statement
            $db_conditions = '';
            $db_conditions_include = '';
            $db_parameters = array();

            // Filtro de campos
            if (isset($filter)) {
                foreach($filter as $filter_key => $value) {
                    if ($filter_key == 'INCLUDE') {
                        $db_conditions_include = " $value";  
                    } else if (is_array($value)) {
                         // Detecta intervalo
                        if (isset($value['from']) || isset($value['to'])) {
                            $partial_where = SQLHelper::whereIntervalCondition($filter_key, $value);
                            if ($partial_where) {
                                $db_conditions .= $partial_where['condition'] .' AND ';
                                $db_parameters = array_merge($db_parameters, $partial_where['parameters']);
                            }
                        } else { // Detecta IN
                            $condition = SQLHelper::whereInCondition($filter_key, $value);
                            if ($condition != '') {
                                $db_conditions .= "$condition AND "; 
                            }
                        }
                    } else {
                        $db_conditions .= "$filter_key=:".str_replace('.','_',$filter_key) .' AND ';
                        $db_parameters[':'.str_replace('.','_',$filter_key)] = $value;
                    }
                }
            }

            // Filtro de pesquisa livre
            if (isset($search) && isset($this->search_columns)) {
                $search_statement = SQLHelper::multiWordSearch($this->search_columns, $search);
                $db_conditions .= $search_statement['conditions'];
                $db_parameters = array_merge($db_parameters, $search_statement['parameters']);
            }

            $db_conditions = str_replace('()','','(' . rtrim($db_conditions, ' AND ') . ')') . $db_conditions_include;
            
            // Lê registos
            $result = $this->repository->read($this->base_table, $fields, $db_conditions, $db_parameters, $order, $limit, $offset);

            return $result;
        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Carrega lista de registos por statement
     *
     * @param StatementInterface $obj_statement = Instância de statement
     * @param string $key = Identificador do statement
     * @param array|null $parameters = Parâmetros específicos do statement
     *                      Eventualmente inclui:
     *                          string|null $search = Texto para pesquisa livre
     *                          array|null $filter = Valores de filtro : array('field1' => 'value1', ...)
     *                              Pode incluír o par 'INCLUDE' para adicionar parte de querystring no final das condições
     *                              Ex: array(..., 'INCLUDE' => 'OR id in(1,2,3,...)',...) 
     *                          array|null $order = Ordem dos registos : array(field1 ASC, ...)
     *                          int|null $limit = Número máximo de registos a devolver
     *                          int|null $offset = Número de registos a ignorar
     * 
     * @return int = Número de registos abrangidos
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function loadList_byStatement(\FWK\interfaces\StatementInterface $obj_statement, ?string $key = null, ?array $parameters = null): int {
        try {

            $result = false;

            // Reset da classe
            $this->reset();

            // Condições e parâmetros para statement
            $processed_parameters['conditions'] = '';
            $db_parameters = array();
            $db_conditions_include = '';

            // Filtro de campos
            if (isset($parameters['fields'])) {
                foreach($parameters['fields'] as $field_key => $value) {
                    // 
                    if ($field_key == 'INCLUDE') {
                        $db_conditions_include = " $value";  
                    } else if (is_array($value)) {
                        // Detecta intervalo
                        if (isset($value['from']) || isset($value['to'])) {
                            $partial_where = SQLHelper::whereIntervalCondition($field_key, $value);
                            if ($partial_where) {
                                $processed_parameters['conditions'] .= $partial_where['condition'] .' AND ';
                                $db_parameters = array_merge($db_parameters, $partial_where['parameters']);
                            }
                        } else { // Detecta IN
                            $condition = SQLHelper::whereInCondition($field_key, $value);
                            if ($condition != '') {
                                $processed_parameters['conditions'] .= "$condition AND "; 
                            }
                        }
                    } else {
                        $processed_parameters['conditions'] .= "$field_key=:".str_replace('.','_',$field_key) .' AND ';
                        $db_parameters[':'.str_replace('.','_',$field_key)] = $value;
                    }
                }
            }
            // Filtro de pesquisa livre
            $processed_parameters['search_columns'] = $this->search_columns;
            if (isset($parameters['search']) && isset($this->search_columns)) {
                $search_statement = SQLHelper::multiWordSearch($this->search_columns, $parameters['search']);
                $processed_parameters['conditions'] .= $search_statement['conditions'];
                $db_parameters = array_merge($db_parameters, $search_statement['parameters']);
            }

            $processed_parameters['conditions'] = str_replace('()','','(' . rtrim($processed_parameters['conditions'], ' AND ') . ')') . $db_conditions_include;
            $processed_parameters['order'] = $parameters['order'];
            $processed_parameters['limit'] = $parameters['limit'];
            $processed_parameters['offset'] = $parameters['offset'];
    
            // Lê statement
            $db_statement = $obj_statement->getStatement($key, $processed_parameters);

            // Lê registos
            $result = $this->repository->execute($db_statement, $db_parameters);

            return $result;
        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Carrega nas propriedades o próximo registo do recordset (se existir)
     *
     * @return bool = ? Sucesso
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    final public function loadNextRecord(): bool {
        try {
            $result = false;

            if ($this->repository->loadNextRecord()) {
                $this->setProperties($this->repository->getRecord(), false);
                $result = true;
            }
            
            return $result;
        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Devolve lista de registos préviamente carregada
     * 
     * @return array = Registos
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function getList(): array {
        try {

            // Devolve registos
            $result = $this->repository->getRecords();

            return $result;
        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


   /**
     * Insere registo pelas propriedades préviamente carregadas
     *
     * @return bool = ? Sucesso
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function insert(): bool {
        try {
            $result = false;

            // Retira o id da lista de parâmetros
            unset($this->properties['id']);

            // Propriedades comuns obrigatórias
            // Se tem origem em "mobile" o utilizador é a autorização (que inicia com o id do mesmo)
            $module_name = $GLOBALS['MODULE'] ?? '?';
            if (substr($module_name, 0, 3) == 'APP' || substr($module_name, 0, 3)  == 'PWA') {
                $user_name = $_SESSION['MOBILE']['authorization'];
            } else {
                $user_name = $_SESSION['USER']['name'];
            }
            if ($user_name == '') {$user_name = 'NA';}
            $this->setProperty('_by', $user_name);
            $this->setProperty('_on', DateTimeHelper::datetimeToUtc(date('Y-m-d H:i:s')));

            // Percorre as propriedades e constrói array de parâmetros
            $db_fields = array_keys($this->getProperties());
            $db_parameters = array();
            foreach ($this->getProperties() as $key => $value){
                $db_parameters[":$key"] = $value;
            }

            // INSERT
            if ($result = $this->repository->insert($this->base_table, $db_fields, $db_parameters)) {
                
                // Obtém o valor do id gerado
                $this->setProperty('id', $this->repository->getLastGeneratedID());
                
                // Reset de propriedades alteradas
                $this->properties_updated = array();
            }

            return $result;
        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Actualiza registo pelas propriedades préviamente carregadas (incluindo ID (primary key))
     *
     * @return bool = ? Sucesso
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function update(): bool {
        try {
            $result = true;
            
            // Se existirem propriedades marcadas para update
            if (count($this->properties_updated)) {

                $result = false;

                // Propriedades comuns obrigatórias
                // Se tem origem em "mobile" o utilizador é a autorização (que inicia com o id do mesmo)
                $module_name = $GLOBALS['MODULE'] ?? '?';
                if (substr($module_name, 0, 3) == 'APP' || substr($module_name, 0, 3)  == 'PWA') {
                    $user_name = $_SESSION['MOBILE']['authorization'];
                } else {
                    $user_name = $_SESSION['USER']['name'];
                }
                $this->setProperty('_by', $user_name);
                $this->setProperty('_on', DateTimeHelper::datetimeToUtc(date('Y-m-d H:i:s')));

                // Percorre as propriedades marcadas para update e constrói array de parâmetros
                $db_parameters = array();
                foreach ($this->properties_updated as $key){
                    $db_parameters[":$key"] = $this->getProperty($key);
                }
                
                // Condições e parâmetros para statement
                $db_conditions = '(id = :id)';
                $db_parameters[':id'] = $this->getProperty('id');
                
                // UPDATE
                if ($result = (bool)$this->repository->update($this->base_table, $this->properties_updated, $db_conditions, $db_parameters)){
                    // Reset de propriedades marcadas para update
                    $this->properties_updated = array();
                }

            }

            return $result;
        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Elimina registos por condição
     *
     * @param string $conditions = Condições de delete : 'id=:id AND alias.xxxx!=:xxxx, ... OR ...'
     * @param array|null $parameters = Parâmetros a utilizar : array(':id' => 1, ...)
     * 
     * @return bool = ? Eliminou
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function delete(string $conditions, ?array $parameters=null): bool {
        try {
            $result = true;

            // DELETE
            $result = (bool)$this->repository->delete($this->base_table, $conditions, $parameters);

            $this->reset();

            return $result;
        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Elimina registo pelo ID (primary key)
     *
     * @param int $value = Valor do ID
     * 
     * @return bool = ? Eliminou
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function delete_byId(int $value): bool {
        try {
            $result = true;

            // Condições e parâmetros para statement
            $db_conditions = '(id = :id)';
            $db_parameters[':id'] = $value; 

            // DELETE
            $result = (bool)$this->repository->delete($this->base_table, $db_conditions, $db_parameters);

            $this->reset();

            return $result;
        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }
    

    /**
     * Reset de classe
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function reset(): void {
        try {

            $this->properties = array();
            $this->properties_updated  = array();

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }

}
// --- END