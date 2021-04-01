<?php
/**
 * FRAMEWORK - INTERFACE - EXTENSÃO DE THROWABLE
 * 
 * Garante a integridade dos métodos públicos de classes de processamento de Throwable
 * 
 * @pmonteiro (yyyy-mm-dd)
 */ 

namespace FWK\interfaces;

interface ThrowableInterface {
    // Considera evento como processado
    public function setProcessed(): void;
    // Devolve estado de processamento do evento
    public function isProcessed(): bool;
    // Devolve mensagem final
    public function getGeneratedMessage(): string;
    // Devolve trace final
    public function getGeneratedTrace(): array;
    // Atribui mensagem "friendly" para utilização pré-definida 
    public function setFriendlyMessage(?string $message=null): void;
    // Devolve mensagem "friendly"
    public function getFriendlyMessage(): ?string;
    // Adiciona informação de evento PDO
    public function addPDOInformation(string $statement, ?array $parameters=null): void;
}
// --- END