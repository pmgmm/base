<?php
/**
 * FRAMEWORK - WRAPPER - CLASS EXTENSION - MAIN REPOSITORY
 * 
 * ATENÇÃO: Utiliza a constante global: REPOSITORY_MAIN
 * 
 * @pmonteiro (yyyy-mm-dd)
 */ 

namespace FWK\wrappers\repositories;

final class MainRepository extends  \FWK\abstracts\MariaDbAbstract {

    /**
     * Contructor
     * Associa as credenciais responsáveis pela conexão ao repositório 
     *
     * @param string|null $target = Switch para repositórios secundários
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    final public function __construct(?string $target=null) {
        try {
            $this->host = REPOSITORY_MAIN['host'];
            $this->port = REPOSITORY_MAIN['port'];
            $this->name = REPOSITORY_MAIN['name'];
            $this->user = REPOSITORY_MAIN['user'];
            $this->password = REPOSITORY_MAIN['password'];
            parent::__construct();
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }
     
}
// --- END