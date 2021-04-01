<?php
/**
 * FRAMEWORK - CLASS - GESTÃO DE EVENTOS DE SISTEMA
 * Funcionalidades: 
 *      1. Apanha os eventos de sistema:
 *              E_NOTICE;
 *              E_USER_NOTICE;
 *              E_DEPRECATED;
 *              E_USER_DEPRECATED;
 *              E_STRICT;
 *              E_WARNING;
 *              E_USER_WARNING;
 *      2. Processa Log e Behaviour dos eventos
 * 
 * Métodos Públicos: 
 * 
 * - catch : "Apanha" os eventos lançados pelo sistema
 * 
 * ATENÇÃO: Utiliza a constante global: CORE_LOG_HELPER (ex: '\\CORE\\helpers\\LogHelper')
 * 
 * @pmonteiro (yyyy-mm-dd)
 */ 

namespace FWK\classes;

final class SystemEventHandler {

    /**
     * Captura eventos
     *
     * @param int $error_number = Tipo do evento (system constant)
     * @param string $message = Mensagem do evento  
     * @param string $errfile = Ficheiro onde ocorreu o evento
     * @param int $errline = Linha onde ocorreu o evento
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    final public static function catch(int $error_number, string $message, string $errfile, int $errline): void {
       
        $core_loghelper = CORE_LOG_HELPER; 
       
        switch ($error_number) {
            case E_NOTICE:
            case E_USER_NOTICE:
            case E_DEPRECATED:
            case E_USER_DEPRECATED:
            case E_STRICT:
                // Categoria de Evento: NOTICE
                $event = array();
                $event['message'] = $message;
                $event['code'] = $error_number;
                $event['file'] = $errfile;
                $event['line'] = $errline;
                $event['trace'] = debug_backtrace();
                $core_loghelper::notice($event);
                break;
            case E_WARNING:
            case E_USER_WARNING:
                // Categoria de Evento: WARNING
                $event = array();
                $event['message'] = $message;
                $event['code'] = $error_number;
                $event['file'] = $errfile;
                $event['line'] = $errline;
                $event['trace'] = debug_backtrace();
                $core_loghelper::warning($event);
                break;
        }
    }

}
// --- END