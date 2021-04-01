<?php
/**
 * FRAMEWORK - ABSTRACT - GESTÃO DE RESPONSABILIDADES
 * 
 * Disponibiliza métodos que permitem gerir uma responsabilidade
 * Esta classe não pode ser instanciada, têm de ser estendida
 * 
 * @pmonteiro (2020-02-06)
 */

namespace FWK\abstracts;

use \FWK\traits as traits;
use \FWK\wrappers\repositories\main\Repository;

abstract class BusinessAbstract {

    use traits\throwableHandler;
   
    // Instância de repositório
    protected Repository $repository;
            
    // Entity table
    protected ?array $base_table;
           

}
// --- END