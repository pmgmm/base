<?php
/**
 * FRAMEWORK - TRAIT - GESTÃO DE PROPRIEDADES
 * 
 * Disponibiliza métodos que permitem alterar e obter propriedades de um objeto
 * 
 * @pmonteiro (yyyy-mm-dd)
 */  

namespace FWK\traits;


trait propertiesHandler {

    use  \FWK\traits\throwableHandler;

    protected array $properties = array();    
    protected array $properties_updated = array();  
    public array $properties_snapshot = array();  


    /**
     * Devolve array de propriedades
     *
     * @return array = Array de propriedades
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    final public function getProperties(): array {
        try {

            return $this->properties;
        }catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }
   

    /**
     * Devolve o valor da propriedade pelo seu nome
     *
     * @param string $property_name = Nome da propriedade
     * 
     * @return string|null = Valor da propriedade
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    final public function getProperty(string $property_name) {
        try {

            if (isset($this->properties[$property_name])) {
                return $this->properties[$property_name];
            } else {
                return '';
            }

        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Carrega propriedades através de array
     *
     * @param array $properties = Propriedades : array('p1'=>'v1', ...)
     * @param bool|null $is_update = ? Marca as propriedades para update
     *
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    final public function setProperties(array $properties, ?bool $is_update = false): void {
        try {

            foreach($properties as $key => $value) {
                $this->setProperty($key, $value);
            }
            if (!$is_update) {
                $this->properties_updated = array();
            }

        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Carrega propriedade
     *
     * @param string $property_name = Nome da propriedade
     * @param [type] $property_value = Valor da propriedade
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    final public function setProperty(string $property_name, $property_value): void {
        try {

            if (!isset($this->properties[$property_name]) || $property_value !== $this->getProperty($property_name)){
                $this->properties_updated[] = $property_name;
            }
            $this->properties[$property_name] = $property_value;

        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Snapshot das propriedades para array público
     *
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    final public function snapshotProperties(): void {
        try {

            $this->properties_snapshot = $this->properties;

        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }

}
// --- END