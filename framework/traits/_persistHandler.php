<?php
/**
 * FRAMEWORK - TRAIT - PERSISTIR CLASSE
 * 
 * Disponibiliza métodos que permitem persistir e recuperar uma classe
 * 
 * @diogo.ferreira(2020-01-10)
 */  

namespace FWK\traits;

use  \FWK\wrappers\repositories\main\Repository;
 

trait persistHandler {

    use  \FWK\traits\throwableHandler;

    /**
     * Serializa e persiste a classe atual (da persistência) e todas as classes dependentes persistidas conjuntamente
     * A persistência é feita em $_SESSION
     * 
     * @return void
     * @pmonteiro(2020-01-10)
     */
    final public function persist(): void {
        try {

            $this->prepareSerialization();
            $_SESSION['persist'][get_class($this)] = serialize($this);

        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }

    
    /**
     * 
     * Repõe um repositório válido na classe atual e em todas as classes dependentes persistidas. 
     * 
     * @param Repository $repository = Instância de repositório
     * @param bool $destroy = ? Destrói a persistência
     * 
     * @return object = Classe instanciada
     * @pmonteiro(2020-01-10)
     */
    final private static function recover(Repository $repository, $destroy): ?object {
        try {

            $obj_classe = unserialize($_SESSION['persist'][get_called_class()]);
            if ($obj_classe) {
                if ($destroy) {
                    unset($_SESSION['persist'][get_called_class()]);
                }
                $obj_classe->repository = $repository;
                // Verifica se o trait de coleções existe na classe owner deste trait
                // Se sim, repõe o repositório nas coleções associadas
                if (in_array(FRAMEWORK_TRAITS_NAMESPACE . 'engineCollection', class_uses($obj_classe))){
                    // Para cada coleção existente, repõe o repositório
                    foreach($obj_classe->engineCollections as $collection){
                        $obj_classe->{$collection}->restoreRepository($repository);
                    }
                }
                // Verifica se o trait de validadores existe na classe owner deste trait
                // Se sim, repõe o repositório nos validadores associados
                if (in_array(FRAMEWORK_TRAITS_NAMESPACE . 'engineValidator', class_uses($obj_classe))){
                    // Para cada validadore existente, repõe o repositório
                    foreach($obj_classe->engineValidators as $validator){
                        if (method_exists($validator, 'restoreRepository')) {
                            $validator->restoreRepository($repository);
                        }
                    }
                }
            }
            else {
                $obj_classe = null;  
            }

            return $obj_classe;
        } catch(\Throwable $throwable) {
            throw self::throwableHandle($throwable);
        }
    }
 

    /**
     * Prepara a serialização da classe atual e de todas as classes dependentes
     * Garante que não existem ligações activas à BD.
     *
     * @return void
     * @pmonteiro(2020-01-10)
     */
    final private function prepareSerialization() :void {
        try {

            $this->repository->close();

        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }

}