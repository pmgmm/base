<?php
/**
 * FRAMEWORK - INTERFACE - EXPORTADOR DE DADOS
 *
 * Garante a integridade dos métodos públicos de classes de Exportação 
 * 
 * @pmonteiro (2019-11-20)
 */ 

namespace FWK\interfaces;

interface ExporterInterface {
    public function export(array $data): array;
}
// --- END