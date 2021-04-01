<?php
/**
 * FRAMEWORK - TRAIT - PROCESSAMENTO DE THROWABLE
 * 
 * Disponibiliza métodos que permitem tratar Throwable (Exception ou Error) capturado nos diversos métodos
 *
 * Métodos Públicos: 
 * 
 * - throwableHandle : Trata Throwable (Exception ou Error) capturado nos diversos métodos
 * 
 * ATENÇÃO: Utiliza a constante global: CORE_LOG_HELPER (ex: '\\CORE\\helpers\\LogHelper')
 * 
 * @pmonteiro (yyyy-mm-dd)
 */ 

namespace FWK\traits;

trait throwableHandler {

     /**
     * Trata Throwable (Exception ou Error) capturado nos diversos métodos
     * Se o Throwable for do tipo "FWK\classes\ExErr", indica já foi migrado do tipo origem.
     * Se o Throwable for do tipo "FWK\classes\ExErr" e ainda não tiver sido processado, processa-o.
     * Se o Throwable for de outro tipo, é migrado para o tipo "FWK\classes\ExErr", adicionada a friendly_message e processado.
     * Em ambos os casos, o Throwable é devolvido para ser lançado para o nível anterior (throw)
     *
     * ATENÇÃO: o método throwableHandle não pode ser final
     * 
     * @param object $throwable = \Exception ou \Error
     * @param string|null $friendly_message = Mensagem "friendly"
     * 
     * @return object $throwable = Throwable do tipo "FWK\classes\ExErr"
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    protected static function throwableHandle(\Throwable $throwable, ?string $friendly_message=null):  \FWK\classes\ExErr {
        try {

            $core_loghelper = CORE_LOG_HELPER;

            // Apanha o tipo de classe do Throwable (Error, Exception, ExErr, ...)
            $class = get_class($throwable);
            switch ($class) {
                // Se se trata de uma classes ExErr, indica que já foi capturado anteriormente
                case 'FWK\classes\ExErr':
                    // Se ainda não foi processado, processa-o, fazendo o seu Log
                    if (!$throwable->isProcessed()) {
                        $core_loghelper::error($throwable);
                    }
                    break;
                default:
                    // Se se trata de outra classe que não ExErr, migra-o para ExErr
                    $throwable = new \FWK\classes\ExErr($throwable);
                    // Adiciona uma mensagem "amigável"
                    $throwable->setFriendlyMessage($friendly_message);
                    // Processa-o fazendo o seu Log
                    $core_loghelper::error($throwable);
                    break;
            }

            return $throwable;
        } catch(\Throwable $throwable) {
            return $throwable;
        }
    }
}
// --- END