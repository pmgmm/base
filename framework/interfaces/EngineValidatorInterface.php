<?php
/**
 * FRAMEWORK - INTERFACE - MOTOR DE VALIDADORES DE DADOS
 * 
 * Garante a integridade dos métodos públicos de classes de Motor de Validação
 * 
 * @pmonteiro (yyyy-mm-dd)
 */ 

namespace FWK\interfaces;

interface EngineValidatorInterface {
    // Processa um ou vários validadores de dados em sequência
    public function addValidator(ValidatorInterface $instance): void;
    // Adiciona uma instancia de validador
    public function validate(array $data, ?ValidatorInterface $instance = null): array;
    // Reset de instâncias de validadores acumuladas
    public function resetEngineValidator(): void;
}
// --- END