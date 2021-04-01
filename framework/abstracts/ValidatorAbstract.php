<?php
/**
 * FRAMEWORK - ABSTRACT - GESTÃO DE VALIDADOR
 * 
 * Disponibiliza métodos que permitem gerir um validador
 * Esta classe não pode ser instanciada, têm de ser estendida
 * 
 * @pmonteiro (2020-02-11)
 */

namespace FWK\abstracts;

use \FWK\wrappers\repositories\MainRepository;


abstract class ValidatorAbstract {

    use \FWK\traits\throwableHandler;

    // Wrapper Repositório do validador
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
    public function __construct(?MainRepository $repository = null) {
        try {     

            // Atribui repositório ao validador
            $this->repository = $repository;  

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }

}
// --- END