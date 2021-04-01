<?php
/**
 * FRAMEWORK - ABSTRACT - GESTÃO DE TEMPLATE
 * 
 * Disponibiliza métodos que permitem gerir um template
 * Esta classe não pode ser instanciada, têm de ser estendida
 *
 * Métodos Públicos: 
 * 
 * - startEngine : Verifica se existe e carrega o ficheiro de template a ser processado
 * - process : Processa o template
 * 
 * @pmonteiro (2019-11-22)
 */

namespace FWK\abstracts;

abstract class TemplateAbstract {

    use \FWK\traits\throwableHandler;

    // Work + Const
    protected $folder;  // Directório onde se encontra o template a processar
    private $template;  // Conteúdo do template a processar
    private $isDefault = false; // Flag indicadora se vai ser procesado o template default


    /**
     * Verifica se existe e carrega o ficheiro de template a ser processado
     * O directório do ficheiro ($folder) é atribuído na extensão desta classe
     * Se o ficheiro não for passado como argumento do método "startEngine", ou  não existir, será utilizado o ficheiro default.
     *
     * @param string|null $filename = Nome do ficheiro template
     * 
     * @return void
     * @pmonteiro (2019-11-22)
     */
    final public function startEngine(?string $filename=null): void {
        try {
            // Se o ficheiro não for passado como argumento ou  não existir
            if (!isset($filename) || !file_exists($this->folder.$filename)) {
                $this->folder = FRAMEWORK_RESOURCES_PATH  . 'templates' . DIRECTORY_SEPARATOR;
                $filename = 'default.html';
                $this->isDefault = true;
            }
            // Carrega o ficheiro
            $this->template = file_get_contents($this->folder.$filename);
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable, "Erro no Motor de processamento de templates");
        }
    }

    
    /**
     * Processa o template
     *
     * @param array|null $variables = Variáveis a carregar no template "{name}"
     * 
     * @return string = Template processado
     * @pmonteiro (2019-11-22)
     */
    final public function process(?array $variables=null): string {
        try {
            $processed = $this->template;
            if ($this->isDefault) {
                $content = '';
                foreach ($variables as $variable=>$value) {
                    $content .= '<tr><td valign="top"><b>'.$variable.':&nbsp;</b></td><td valign="top">'.$value.'</td></tr>';
                }
                $processed = str_replace("{content}", $content, $processed);
            } else {
                foreach ($variables as $variable=>$value) {
                    $processed = str_replace('{'.$variable.'}', $value, $processed);
                }
            }
            return $processed;
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable, "Erro no processamento do template");
        }
    }

}
// --- END