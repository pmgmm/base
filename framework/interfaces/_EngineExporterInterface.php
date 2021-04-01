<?php
/**
 * FRAMEWORK - INTERFACE - MOTOR DE EXPORTADORES DE DADOS
 * 
 * Garante a integridade dos métodos públicos de classes de Motor de Exportação
 * 
 * @pmonteiro (2019-11-21)
 */ 

namespace FWK\interfaces;

interface EngineExporterInterface {
    public function setExporter(ExporterInterface $instance): void;
    public function export(?array $data = null, ?ExporterInterface $instance = null): array;
    public function resetEngineExporter(): void;
}
// --- END