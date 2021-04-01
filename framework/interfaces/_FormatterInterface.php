<?php
/**
 * FRAMEWORK - INTERFACE - FORMATADOR DE DADOS
 * 
 * Garante a integridade dos métodos públicos de classes de formatação
 * 
 * @pmonteiro (2019-11-20)
 */ 

namespace FWK\interfaces;

interface FormatterInterface {
    public function format(array $data): array;
}
// --- END