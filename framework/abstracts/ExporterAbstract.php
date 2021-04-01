<?php
/**
 * FRAMEWORK - ABSTRACT - GESTÃO DE EXPORTADOR
 * 
 * Disponibiliza métodos que permitem gerir um exportador
 * Esta classe não pode ser instanciada, têm de ser estendida
 * 
 * @pmonteiro (2020-02-11)
 */

namespace FWK\abstracts;

use \FWK\wrappers\repositories\main\Repository;

abstract class ExporterAbstract {

    use \FWK\traits\throwableHandler;

    // Repositório
    protected ?Repository $repository;

  
    /**
     * Repõe um repositório ativo no exportador
     * Método consumido para repor uma instância de repositório ativa, após o "recoverPersist" de uma entidade titular
     * 
     * ATENÇÃO: INTERNAL
     * 
     * @param Repository $repository = Instância de repositório
     * 
     * @return void
     * 
     * @diogo.ferreira(2020-01-13)
     */
    final public function restoreRepository(Repository $repository): void {
        try {

            if (isset($this->repository)) {
                $this->repository = $repository;
            }

        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        } 
    }

}
// --- END