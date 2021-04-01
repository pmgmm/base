<?php
 /**
 * FRAMEWORK - INTERFACE - GESTÃO DE COLEÇÃO
 * 
 * Garante a integridade dos métodos públicos de classes de Coleção
 * 
 * @pmonteiro (2019-11-20)
 */ 

namespace FWK\interfaces;

interface CollectionInterface {
    public function load(int $owner_key_value): array;
    public function get(): array;
    public function set(int $owner_key_value, array $collection): void ;
    public function save(?int $owner_key_value=null, array $collection=null): void;
    public function delete(?int $owner_key_value=null): void;
    public function reset(): void;
}
// --- END