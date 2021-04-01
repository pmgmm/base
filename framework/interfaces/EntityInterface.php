<?php
 /**
 * FRAMEWORK - INTERFACE - GESTÃO DE ENTIDADE
 * 
 * Garante a integridade dos métodos públicos de classes de Entidade
 *
 * @pmonteiro (yyyy-mm-dd)
 */ 
namespace FWK\interfaces;

interface EntityInterface {
    // Carrega propriedades de registo pelo ID (primary key)
    public function load_byId(int $value): bool;
    // Carrega lista de registos
    public function loadList(?array $fields = null, ?string $search = null, ?array $filter = null, ?array $order = null, ?int $limit = null, ?int $offset = null): int;
    // Carrega nas propriedades o próximo registo do recordset (se existir)
    public function loadNextRecord(): bool;
    // Devolve lista de registos préviamente carregada
    public function getList(): array;
    // Insere registo pelas propriedades préviamente carregadas
    public function insert(): bool;
    // Actualiza registo pelas propriedades préviamente carregadas (incluindo ID (primary key))
    public function update(): bool;
    // Elimina registos por condição
    public function delete(string $conditions, ?array $parameters=null): bool;
    // Elimina registo pelo ID (primary key)
    public function delete_byId(int $value): bool;
    // Reset de classe
    public function reset(): void;
    // Devolve array de propriedades (trait)
    public function getProperties(): array;
    // Devolve o valor da propriedade pelo seu nome (trait)
    public function getProperty(string $property_name);
    // Carrega propriedades através de array (trait)
    public function setProperties(array $properties, bool $is_update): void;
    // Carrega propriedade (trait)
    public function setProperty(string $property_name, $property_value): void;
    // Snapshot das propriedades para array público (trait)
    public function snapshotProperties(): void;      
}
// --- END