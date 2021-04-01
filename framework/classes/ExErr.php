<?php
/**
 * FRAMEWORK - CLASS - EXTENSÂO DE THROWABLE PARA GESTÃO DE ERROS E EXCEÇÕES
 *
 * Receber, uniformizar e disponibilizar métodos suplementares para gerir throwables
 * 
 * Métodos Públicos: 
 * 
 * - __construct : Migra o "throwable" original
 * - setProcessed : Considera como processado
 * - isProcessed : Devolve estado do processamento
 * - getGeneratedMessage : Devolve mensagem final
 * - getGeneratedTrace : Devolve trace final
 * - setFriendlyMessage : Atribui mensagem "friendly" para utilização pré-definida 
 * - getFriendlyMessage : Devolve mensagem "friendly"
 * - addPDOInformation : Adiciona informação PDO
 * 
 * @pmonteiro (2019-11-14)
 */ 

namespace FWK\classes;

final class ExErr extends \Exception implements \FWK\interfaces\ThrowableInterface {

    // Trait que formata os parâmetros/argumentos para Log
    use \FWK\traits\formatLogArguments;

    // Work + Const
    private string $generated_message;      // Container de mensagem final
    private array $generated_trace;         // Container de trace final
    private bool $processed;                // Flag de indicação se foi processada (Log + Comportamento)
    private ?string $friendly_message;      // Container de mensagem a utilizar fora de Log (Ex: output controlado para inteface)
  

    /**
     * Contructor
     *
     * @param \Throwable $previous = "Throwable" original
     * @pmonteiro (2019-11-14)
     */
    final public function __construct(\Throwable $previous) {
        parent::__construct($previous->getMessage(), 0, $previous);

        $this->processed = false;
        $this->friendly_message = '';

        // Pré-preenchimento de mensagem final com a mensagem do "Throwable" original
        $this->generated_message = (string)$this->getMessage();
        // Pré-preenchimento de trace final com  das 2 primeiras linhas (ExErr e migração de throwable para ExErr)
        $this->generated_trace = array_slice(debug_backtrace(), 2);

        // Adição, na 1ª posição do trace, da informação do ficheiro e linha onde o evento ocorreu
        array_unshift($this->generated_trace, array('file' =>  $previous->getFile(), 'line' => $previous->getLine()));
    }


    /**
     * Considera evento como processado
     * Este método deve ser consumido após o Log e/ou comportamento
     *
     * @return void
     * @pmonteiro (2019-11-14)
     */
    final public function setProcessed(): void {
            $this->processed = true;
     }

    
    /**
     * Devolve estado de processamento do evento
     * O estado é mudado apenas com setProcessed
     * 
     *  @return boolean = ? Está processado
     * @pmonteiro (2019-11-14)
     */
    final public function isProcessed(): bool {
        return $this->processed;
    }


    /**
     * Devolve mensagem final
     *
     * @return string = Mensagem
     * @pmonteiro (2019-11-14)
     */
    final public function getGeneratedMessage(): string{
        return $this->generated_message;
    }

   
    /**
     * Devolve trace final
     *
     * @return array = Trace
     * @pmonteiro (2019-11-14)
     */
    final public function getGeneratedTrace(): array {
        return $this->generated_trace;
    }


    /**
     * Atribui mensagem "friendly" para utilização pré-definida 
     *
     * @param string|null $message = Mensagem "friendly"
     * 
     * @return void
     * @pmonteiro (2019-11-14)
     */
    final public function setFriendlyMessage(?string $message=null): void {
        $this->friendly_message = $message;
    }


    /**
     * Devolve mensagem "friendly"
     *
     * @return string|null = Mensagem
     * @pmonteiro (2019-11-14)
     */
    final public function getFriendlyMessage(): ?string {
        return $this->friendly_message;
    }

    
    /**
     * Adiciona informação de evento PDO
     *
     * @param string $statement : Instrução SQL
     * @param array|null $parameters : Parâmetros associados à instrução SQL
     * 
     * @return void
     * @pmonteiro (2019-11-14)
     */
    final public function addPDOInformation(string $statement, ?array $parameters=null): void {
        if(isset($statement)) {
            $this->generated_message .= PHP_EOL . 'STATEMENT: ' . $statement;
            if (isset($parameters)) {
                $this->generated_message .= PHP_EOL . 'PARAMETERS: ' .  $this->formatLogArguments($parameters, true);
            }
        }
    }

}
// --- END