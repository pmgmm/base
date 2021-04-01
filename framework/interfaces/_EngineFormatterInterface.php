<?php
/**
 * FRAMEWORK - INTERFACE - MOTOR DE FORMATADORES DE DADOS
 * 
 * Garante a integridade dos métodos públicos de classes de Motor de Formatação
 * 
 * @pmonteiro (2019-11-21)
 */ 

namespace FWK\interfaces;

interface EngineFormatterInterface {
    public function addFormatter(FormatterInterface $instance): void;
    public function format(?array $data = null, FormatterInterface $instance = null): array;
    public function resetEngineFormatter(): void;
}
// --- END