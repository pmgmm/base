<?php
/**
 * FRAMEWORK - ABSTRACT - GESTÃO DE COLECÇÃO
 * 
 * Disponibiliza métodos que permitem gerir uma colecção
 * Esta classe não pode ser instanciada, têm de ser estendida
 * 
 * @pmonteiro (yyyy-mm-dd)
 */

namespace FWK\abstracts;

use \FWK\wrappers\repositories\MainRepository;
use \FWK\helpers\DateTimeHelper;


abstract class CollectionAbstract {
    
    use \FWK\traits\throwableHandler;

    // Colecção
    protected ?array $collection;

    // Owner key
    protected ?string $owner_key;

    // Relation key
    protected ?string $relation_key;

    // Valor da owner key 
    protected ?int $owner_key_value;

    // Instância de repositório
    protected ?MainRepository $repository;


    /**
     * Construtor
     *
     * @param Repository $repository = Instância de repositório
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function __construct(MainRepository $repository) {
        try {     

            // Atribui repositório à colecção
            $this->repository = $repository; 

            // Owner key
            $this->owner_key = $this->primary_key[0];
            // Relation key
            $this->relation_key = $this->primary_key[1]; 

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Carrega e devolve colecção do repositório
     * 
     * @param int $owner_key_value = Valor da owner_key 
     * 
     * @return array = Colecção
     *  
     * @pmonteiro (yyyy-mm-dd)
     */
    public function load(int $owner_key_value): array {
        try {
            
            // Reset da classe
            $this->reset();

            // Manter owner key value
            $this->owner_key_value = $owner_key_value;
            
            // Keys e valores de definição da colecção 
            $db_conditions = $this->base_table[1].".$this->owner_key=:$this->owner_key";
            $db_parameters[":$this->owner_key"] = $this->owner_key_value;

            // Colunas a ler da tabela base
            $db_fields = array($this->base_table[1].'.*');

            // Se existem tabelas relacionadas (joins) definidas para utilizar // TODO: Testar joins nas relaçoes/colecções
            $arr_joins = array();
            if (isset($this->joins)) {
                $arr_joins = $this->joins;
                if (isset($this->joins_fields)) {
                    $db_fields = array_merge($db_fields, $this->joins_fields);
                }
            }

            // Load
            if ($this->repository->read($this->base_table, $db_fields, $db_conditions, $db_parameters, null, null, null, null, $arr_joins)) {

                // Carrega as relações em colecção e devolve-as 
                $this->collection = $this->repository->getRecords();

            }

            return $this->collection;
        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Devolve colecção préviamente carregada
     * 
     * @return array = Colecção
     *  
     * @pmonteiro (yyyy-mm-dd)
     */
    public function get(): array {
        try {

            // Devolve colecção
            return $this->collection ?? array();

        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Carrega colecção 
     * 
     * @param int $owner_key_value = Valor da owner_key 
     * @param array collection = Colecção 
     * 
     * @return void
     *  
     * @pmonteiro (yyyy-mm-dd)
     */
    public function set(int $owner_key_value, array $collection): void {
        try {

            // Reset da classe
            $this->reset();

            $this->owner_key_value = $owner_key_value;
            $this->collection = $collection;

        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Carrega e insere colecção pelos parâmetros ou préviamente carregada
     * 
     * @param int|null $owner_key_value = Valor da owner_key 
     * @param array|null collection = Colecção 
     * 
     * @return void
     *  
     * @pmonteiro (yyyy-mm-dd)
     */
    public function save(?int $owner_key_value=null, array $collection=null): void {
        try {

            // Se forem passados como parâmetros
            $owner_key_value = $owner_key_value ?? $this->owner_key_value;
            $collection = $collection ?? $this->collection;
            
            if (isset($owner_key_value) && isset($collection)) {

                // Elimina a colecção a substituír
                $this->delete($owner_key_value);

                $current_datetime = DateTimeHelper::datetimeToUtc(date('Y-m-d H:i:s'));

                if (count($collection)) {
         
                    // Para cada elemento da coleção
                    foreach ($collection as $element) {

                        // Propriedades da owner Key
                        $db_fields = array($this->owner_key);
                        $db_parameters = array();
                        $db_parameters[":$this->owner_key"] = $owner_key_value;

                        // Propriedades
                        if (is_array($element)) {
                            foreach($element as $key => $value) {
                                $db_fields[] = $key;
                                $db_parameters[":$key"] = $value;
                            } 
                        } else {
                            $db_fields[] = $this->relation_key;
                            $db_parameters[":$this->relation_key"] = $element;
                        }

                        // Propriedades comuns obrigatórias
                        $db_fields = array_unique(array_merge($db_fields, array('_by', '_on')));
                        $db_parameters[':_by'] = $_SESSION['USER']['name'];
                        $db_parameters[':_on'] = $current_datetime;

                        $this->repository->insert($this->base_table, $db_fields, $db_parameters);

                    }
                }
            }
            
        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }



    /**
     * Elimina a colecção pela owner key dos parâmetros ou préviamente carregada
     * 
     * @param int|null $owner_key_value = Valor da owner_key 
     * 
     * @return void
     *  
     * @pmonteiro (yyyy-mm-dd)
     */
    public function delete(?int $owner_key_value=null): void {
        try {  

            // Se for passado como parâmetro
            $owner_key_value = $owner_key_value ?? $this->owner_key_value;

            if (isset($owner_key_value)) {

                $db_conditions = $this->base_table[1] . ".$this->owner_key=:$this->owner_key";
                $db_parameters = array();
                $db_parameters[":$this->owner_key"] = $owner_key_value;

                $this->repository->delete($this->base_table, $db_conditions, $db_parameters);
        
            }

        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }

    
    /**
     * Devolve as relation keys da colecção préviamente carregada
     * 
     * @return array = Relation keys
     *  
     * @pmonteiro (yyyy-mm-dd)
     */
    public function getRelationKeys(): array {
        try {
            $arr_relation_keys = array();

            foreach($this->collection as $element) {
                $arr_relation_keys[] = $element[$this->relation_key];
            }

            return $arr_relation_keys;
        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }



    /**
     * Reset de colecção
     *
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function reset(): void {
        try {

            $this->collection = array();

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }

}
// --- END