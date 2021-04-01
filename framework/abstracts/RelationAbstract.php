<?php
/**
 * FRAMEWORK - ABSTRACT - GESTÃO DE RELAÇÃO
 * 
 * Disponibiliza métodos que permitem gerir uma relação
 * Esta classe não pode ser instanciada, têm de ser estendida
 * 
 * @pmonteiro (yyyy-mm-dd)
 */

namespace FWK\abstracts;

use \FWK\wrappers\repositories\MainRepository;
use \FWK\traits as traits;
use \FWK\helpers\DateTimeHelper;
use \FWK\helpers\SQLHelper;


abstract class RelationAbstract {

    use traits\throwableHandler;
    use traits\propertiesHandler;

    // Instância de repositório
    protected ?MainRepository $repository;


    /**
     * Construtor
     * 
     * @param MainRepository $repository = Instância de repositório
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
     * Carrega propriedades do registo pela primary key
     *
     * @param array $primary_key_value = Valor da primary key : array('value1', 'value2')
     * 
     * @return bool = ? Sucesso
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    final public function load(array $primary_key_value): bool {
        try {
            $result = false;

            // Reset da classe
            $this->reset();

            // Condições e parâmetros para statement
            $db_conditions = array();
            $db_parameters = array();
            foreach($primary_key_value as $key => $value) {
                $db_conditions[] = $this->base_table[1].".$key=:$key";
                $db_parameters[":$key"] = $value;
            }
         
            // Lê registo
            if ($this->repository->read($this->base_table, null, implode(' AND ', $db_conditions), $db_parameters)) {
                $this->repository->loadNextRecord();
                // Set de propriedades
                $this->setProperties($this->repository->getRecord());
                $result = true;
            }

            return $result;
        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Carrega lista de registos
     *
     * @param array|null $fields = Campos a ler (null=todos)
     * @param string|null $search = Texto para pesquisa livre
     * @param array|null $filter = Valores de filtro : array('field1' => 'value1', ...)
     * @param array|null $order = Ordem dos registos : array(field1 ASC, ...)
     * @param int|null $limit = Número máximo de registos a devolver
     * @param int|null $offset = Número de registos a ignorar
     * 
     * @return int = Número de registos abrangidos
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    final public function loadList(?array $fields = null, ?string $search = null, ?array $filter = null, ?array $order = null, ?int $limit = null, ?int $offset = null): int {
        try {

            // Reset da classe
            $this->reset();

            // Condições e parâmetros para statemen
            $db_conditions = array();
            $db_parameters = array();
            if (isset($filter)) {
                foreach($filter as $key => $value) {
                    $db_conditions[] = $this->base_table[1].".$key=:$key";
                    $db_parameters[":$key"] = $value;
                }
             }
             
            // Filtro de pesquisa livre
            if (isset($search) && isset($this->search_columns)) {
                $search_statement = SQLHelper::multiWordSearch($this->search_columns, $search);
                $db_conditions .= $search_statement['conditions'];
                $db_parameters = array_merge($db_parameters, $search_statement['parameters']);
            }

            // Lê registos
            $result = $this->repository->read($this->base_table, $fields, implode(' AND ', $db_conditions), $db_parameters, $order, $limit, $offset);

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
    final public function getList(): array {
        try {

            // Devolve registos
            return $this->repository->getRecords();

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
    final public function insert(): bool {
        try {
            $result = false;

            // Propriedades comuns obrigatórias
            $this->setProperty('_by', $_SESSION['USER']['name']);
            $this->setProperty('_on', DateTimeHelper::datetimeToUtc(date('Y-m-d H:i:s')));

            // Percorre as propriedades e constrói array de parâmetros
            $db_fields = array_keys($this->getProperties());
            $db_parameters = array();
            foreach ($this->getProperties() as $key => $value){
                $db_parameters[":$key"] = $value;
            }

            // Insert
            if ($result = $this->repository->insert($this->base_table, $db_fields, $db_parameters)) {
                
                // Reset de propriedades marcadas para update
                $this->properties_updated = array();
            }

            return $result;
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Actualiza registo pelas propriedades préviamente carregadas
     *
     * @return bool: ? Actualizou
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    final public function update(): bool {
        try {
            $result = false;

            // Se existirem propriedades marcadas para update
            if (count($this->properties_updated)) {

                // Propriedades comuns obrigatórias
                $this->setProperty('_by', $_SESSION['USER']['name']);
                $this->setProperty('_on', DateTimeHelper::datetimeToUtc(date('Y-m-d H:i:s')));

                // Percorre as propriedades marcadas para update e constrói array de parâmetros
                $db_parameters = array();
                foreach ($this->properties_updated as $key){
                    $db_parameters[":$key"] = $this->getProperty($key);
                }
                
                // Condições de update
                $arr_conditions = array();
                foreach($this->primary_key as $key){
                    // Condições e parâmetros para statement
                    $arr_conditions[] = $this->base_table[1] . ".$key=:$key";
                    $db_parameters[":$key"] = $this->getProperty($key);
                }

                // Update
                if ($result = (bool)$this->repository->update($this->base_table, $this->properties_updated, implode(' AND ', $arr_conditions), $db_parameters)){

                    // Reset de propriedades marcadas para update
                    $this->properties_updated = array();

                }
            }

            return $result;
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Elimina registo pela primary key ou pelas propriedades préviamente carregadas
     * Se um registo está instânciado na classe, o método pode utilizar as propriedades para construir a delete key
     * 
     * @param array|null $primary_key_value = Valor da primary key : array('value1', 'value2') 
     * 
     * @return bool = ? Sucesso
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    final public function delete(?array $primary_key_value = null): bool {
        try {
            $result = true;

            // Se a delete key não é passada como argumento, calcula-a com base nas propriedades
            if (!isset($delete_key)) {
                $delete_key = array();
                foreach($this->primary_key as $key) {
                    $delete_key[$key] = $this->getProperty($key);
                }
            }

            // Condições de delete = Primary key
            $arr_conditions = array();
            $db_parameters = array();
            foreach ($delete_key as $key => $value) {
                $arr_conditions[] = $this->base_table[1] . ".$key=:$key";
                $db_parameters[":$key"] = $value;
            }
               
            // Delete
            $result = (bool)$this->repository->delete($this->base_table, implode(' AND ', $arr_conditions), $db_parameters);
            
            $this->reset();

            return $result;
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Reset de relação
     *
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    final public function reset(): void {
        try {

            $this->properties = array();
            $this->properties_updated  = array();

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }

}
// --- END