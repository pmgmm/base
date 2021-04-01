<?php
/**
 * FRAMEWORK - TRAIT - EXPORTADOR DE DADOS
 * 
 * Disponibiliza métodos que permitem processar um exportador de dados
 *
 * @pmonteiro (2019-11-21)
 * @pmonteiro (2020-03-03)
 */  

namespace FWK\traits;

use \FWK\interfaces\ExporterInterface;
 
trait engineExporter {

    use  \FWK\traits\throwableHandler;

    private $exporter = null;
   
    
    /**
     * Atribui uma instancia de exportador
     *
     * @param ExporterInterface $instance = Instância de exportador
     * 
     * @return void
     *
     * @pmonteiro (2019-11-21)
     * @pmonteiro (2020-03-03)
     */
    final public function setExporter(ExporterInterface $instance): void {
        try {

            $this->exporter = $instance;

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        } 
    }


    /**
     * Processa um exportador de dados
     * 
     * Se, como parâmetro, for passado array de dados, são esses dados que serão utilizados para o exportador 
     *      recolher toda a informação a exportar
     * 
     * Se, como parâmetro, for passado uma instância de exportador, é esse exportador que é processado. Caso contrário, 
     *      pressupõe-se que se pretende processar o exportador atribuído
     * 
     * @param array|null $data = Dados base para recolha de informação
     * @param ExporterInterface|null $instance = Instância de exportador 
     * 
     * @return array = File paths dos ficheiros exportados
     * 
     * @pmonteiro (2019-11-21)
     * @pmonteiro (2020-03-03)
     */
    final public function export(?array $data = null, ?ExporterInterface $instance = null): array {
        try {
            $result = array();

            $data = $data ?? $this->getProperties();
            if ($instance) {
                $result = $instance->export($data);
            } elseif (isset($this->exporter)) {
                $result = $this->exporter->export($data);
            }

            return $result;
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        } 
    }

            
    /**
     * Reset de exportador atribuído
     *
     * @return void
     * @pmonteiro (2019-11-21)
     */
    final public function resetEngineExporter(): void {
        try {
            $this->exporter = null;
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }

}
// --- END