<?php
/**
 * FRAMEWORK - TRAIT - MOTOR DE GESTÃO DE COLEÇÕES
 * 
 * Disponibiliza métodos que permitem gerir e processar coleções
 * 
 * @diogo.ferreira (2020-01-10)
 */  

namespace FWK\traits;

use \FWK\interfaces\CollectionInterface;


trait engineCollection {

    use  \FWK\traits\throwableHandler;

    // Array de coleções (nomes das instâncias)
    protected $engineCollections = array();
    
    
    /**
     * Adiciona uma instancia de coleção
     *
     * @param CollectionInterface = Instância de coleção 
     * 
     * @return CollectionInterface = Referência da coleção
     * 
     * @pmonteiro(2020-01-10)
     */
    final public function addCollection(CollectionInterface $instance): CollectionInterface {
        try {

            // Captura o nome da classe e adiciona-o à lista de instâncias
            $instance_class_name = explode('\\', get_class($instance));
            $instance_class_name = end($instance_class_name);
            $this->engineCollections[] = $instance_class_name;

            // Adiciona a instância à classe
            $this->{$instance_class_name} = $instance;

            // Devolve a referência da coleção
            return $this->{$instance_class_name};
            
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        } 
    }
    

    /**
     * Devolve uma instancia de coleção
     *
     * @param string $collection = Nome da coleção
     * 
     * @return CollectionInterface|null = Instância de coleção
     * 
     * @pmonteiro(2020-01-10)
     */
    final public function getCollection(string $collection): ?CollectionInterface {
        try {

            // Se existir a coleção na lista de instâncias
            if (in_array($collection, $this->engineCollections)) {
                // Devolve a referência da coleção
                return $this->{$collection};
            }

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        } 
    }
    
    /**
     * Persiste em repositório todas as coleções adicionadas
     *
     * @return void
     * 
     * @pmonteiro(2020-01-10)
     */
    final public function saveCollections(): void {
        try {
            
            // Inicializa coleções
            $this->startCollections();

            // Para cada coleção na lista de instâncias
            foreach($this->engineCollections as $collection) {
                $this->{$collection}->save();
            }

        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        } 
    }


    /**
     * Carrega todas as coleções adicionadas
     *
     * @return void
     */
    final public function loadCollections(): void {
        try {

            // Inicializa coleções
            $this->startCollections();

            // Para cada coleção na lista de instâncias
            foreach($this->engineCollections as $collection) {
                $this->{$collection}->load();
            }

        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        } 
    }

    /**
     * Inicializa coleções
     * Define a key do titular das coleções pela primary key da entidade owner
     *
     * @return void
     */
    final public function startCollections(): void {
        try {

            // Para cada coleção na lista de instâncias
            foreach($this->engineCollections as $collection) {
                // O método "autoSetBaseOwnerValue" valida se a key do titular foi customizada
                $this->{$collection}->autoSetBaseOwnerValue($this->getProperty($this->primary_key[0]));
            }

        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        } 
    }


    /**
     * Reset de todas as coleções adicionadas
     *
     * @return void
     */
    final public function resetCollections():void {
        try {

            // Para cada coleção dentro da entidade
            foreach($this->engineCollections as $collection) {
                $this->{$collection}->reset();
            }

        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        } 
    }
 
}
// --- END