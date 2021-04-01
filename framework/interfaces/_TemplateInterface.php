<?php
/**
 * FRAMEWORK - INTERFACE - GESTÂO DE TEMPLATE
 * 
 * Garante a integridade dos métodos públicos de classes de Template
 * 
 * @pmonteiro (2019-11-22)
 */ 

namespace FWK\interfaces;

interface TemplateInterface {
    public function startEngine(?string $filename=null): void; 
    public function process(?array $variables=null): string;
}
// --- END