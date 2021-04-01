<?php
/**
 * FRAMEWORK - MOTOR AUTÓNOMO TEMPLATE
 * 
 * @pmonteiro (2020-02-26)
 */ 

namespace FWK\engines;


final class EngineTemplate extends \FWK\abstracts\TemplateAbstract implements \FWK\interfaces\TemplateInterface {
    public function __construct() {
        $this->folder = __DIR__ . DIRECTORY_SEPARATOR . 'templates' . DIRECTORY_SEPARATOR;
    }
}
// --- END