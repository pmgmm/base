<?php
 /**
 * FRAMEWORK - INTERFACE - GESTÂO DE RELAÇÃO
 * 
 * Garante a integridade dos métodos públicos de classes de Relação
 * 
 * @pmonteiro (2019-12-12)
 */ 

namespace FWK\interfaces;

interface RelationInterface {
    // Carrega propriedades do registo pela primary key
    public function load(array $primary_key_value): bool;
    // Carrega lista de registos
    public function loadList(?array $fields = null, ?string $search = null, ?array $filter = null, ?array $order = null, ?int $limit = null, ?int $offset = null): int;
    // Devolve lista de registos préviamente carregada
    public function getList(): array;
    // Insere registo pelas propriedades préviamente carregadas
    public function insert(): bool;
    // Actualiza registo pelas propriedades préviamente carregadas
    public function update(): bool;
    // Elimina registo pela primary key ou pelas propriedades préviamente carregadas
    public function delete(?array $primary_key_value = null): bool;
    // Reset da relação
    public function reset();
}
// --- END