<?php
/**
 * FRAMEWORK - INTERFACE - VALIDADOR DE DADOS
 * 
 * Garante a integridade dos métodos públicos de classes de Validação
 * 
 * @pmonteiro (yyyy-mm-dd)
 */ 

namespace FWK\interfaces;

interface ValidatorInterface {
    // Valida condições para um conjunto de dados
    public function validate(array $data): array;
}
// --- END