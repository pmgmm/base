<?php
/**
 * FRAMEWORK - INTERFACE - GESTÃO DE INSTRUÇÕES SQL
 * 
 * Garante a integridade dos métodos públicos de classes de Statement
 * 
 * @pmonteiro (yyyy-mm-2dd)
 */ 

namespace FWK\interfaces;

interface StatementInterface {
    // Devolve statement
    public function getStatement(string $key, ?array $options = null): string;
}
// --- END