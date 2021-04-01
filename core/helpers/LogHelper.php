<?php
/**
 * NAVIA CORE - HELPER - PROCESSAMENTO DE LOG //TODO: INACABADO
 * 
 * Disponibiliza métodos que permitem efectuar Log
 * 
 * @pmonteiro (2019-11-14)
 */ 

namespace CORE\helpers;

use \FWK\wrappers\repositories as repositories;
use \FWK\helpers\DateTimeHelper;


final class LogHelper {

    // Trait que formata os parâmetros/argumentos para Log
    use \FWK\traits\formatLogArguments;

    // Work + Const
    private const ERROR = 'error';
    private const WARNING = 'warning';
    private const NOTICE = 'notice';
    private const OTHER = 'other';
    private const EMERGENCY = 'emergency';
    private const ALERT = 'alert';
    private const CRITICAL = 'critical';
    private const DEBUG = 'debug';
    private const OPERATION = 'operation';
    private const INTEGRATION = 'integration';
    private const LOG = 'log';
    private const MAIN = 'main';

    private static $obj_main_repository;
    private static $obj_log_repository;
    

    // ----------------------------------------------------------------------------------- CONFIG

    // Usa constante array 'DEVELOPMENT': ('status' => boolean, 'log_filesystem' => boolean)
    // status => true se está em ambiente de desenvolvimento (false => produção)
    // log_filesystem => true para persistir o log também em filesystem (false => apenas repositório)

    // EMERGENCY
    private static $emergency_repository = array('type' => self::LOG, 'target' => array('log_error', 'le'));

    // ALERT
    private static $alert_repository = array('type' => self::LOG, 'target' => array('log_error', 'le'));

    // CRITICAL
    private static $critical_repository = array('type' => self::LOG, 'target' => array('log_error', 'le'));

    // DEBUG
    private static $debug_repository = array('type' => self::LOG, 'target' => array('log_debug', 'ld'));

    // LOG FILESYSTEM
    private static $log_filesystem = array('filename' => 'offline');

    // ERROR & WARNING & NOTICE & OTHER
    private static $error_repository = array('type' => self::LOG, 'target' => array('log_error', 'le'));
    private static $warning_repository = array('type' => self::LOG, 'target' => array('log_error', 'le'));
    private static $notice_repository = array('type' => self::LOG, 'target' => array('log_debug', 'ld'));
    private static $other_repository = array('type' => self::LOG, 'target' => array('log_debug', 'ld'));

    // OPERATION
    private static $operation_repository = array('type' => self::MAIN, 'target' => array('logs_operation', 'lo'));

    // INTEGRATION 
    // ATENÇÂO: 1 propriedade para cada tipo de integração. Necessita complementar método "persist"
    private static $integration_default_repository = array('type' => self::LOG, 'target' => array('log_integration_default', 'lid'));
  


    // ----------------------------------------------------------------------------------- EVENTOS AUTOMÁTICOS


     /** ATENÇÃO: UTILIZAÇÃO EXCLUSIVA PARA EXCEPÇÕES E ERROS CAPTURADOS AUTOMÁTICAMENTE
     * Erros de execução (PSR-3 : Runtime errors)
     * Log controlado pelo php_ini e excepções
     *
     * @param \FWK\classes\ExErr $exerr = Extensão de Throwable
     * 
     * @return void
     * @pmonteiro (2019-11-14)
     */
    public static function error(\FWK\classes\ExErr $exerr): void {
        try {
            // Mensagem
            $message = $exerr->getGeneratedMessage();
            // Formata trace
            $formated_trace = self::formatTrace($exerr->getGeneratedTrace());
            // Persiste
            self::persist(self::ERROR, $message, array('trace' => $formated_trace, 'context'=>''));
            // Behaviour
            self::behaviour(self::ERROR, $message, array('trace' => $formated_trace, 'context'=>''));
            // Considera processado
            $exerr->setProcessed();
        } catch (\Throwable $throwable){
            self::critical('log', array($throwable->getMessage()), array($throwable->getTrace()));
        }
    }


    /** ATENÇÃO: UTILIZAÇÃO EXCLUSIVA PARA AVISOS CAPTURADOS AUTOMÁTICAMENTE
     * Eventos excepcionais que não são erros (PSR-3 : Exceptional occurrences that are not errors)
     * Log controlado pelo php_ini
     *
     * @param array $evt = Informação do evento 
     * 
     * @return void
     * @pmonteiro (2019-11-14)
     */
    public static function warning(array $evt): void {
        try {
            // Mensagem
            $message = $evt['message'];
            // Formata trace
            $formated_trace = self::formatTrace($evt['trace']);
            // Persiste
            self::persist(self::WARNING, $message, array('trace' => $formated_trace, 'context'=>''));
        } catch (\Throwable $throwable){
            self::critical('log', array($throwable->getMessage()), array($throwable->getTrace()));
        }
    }


    /** ATENÇÃO: UTILIZAÇÃO EXCLUSIVA PARA AVISOS PRÉVIOS CAPTURADOS AUTOMÁTICAMENTE
     * Eventos comuns mas significantes (PSR-3 : Normal but significant events)
     * Log controlado pelo php_ini
     *
     * @param array $evt = Informação do evento 
     * 
     * @return void
     * @pmonteiro (2019-11-14)
     */
    public static function notice(array $evt): void {
        try {
            // Mensagem
            $message = $evt['message'];
            // Formata trace
            $formated_trace = self::formatTrace($evt['trace']);
            // Persiste
            self::persist(self::NOTICE, $message, array('trace' => $formated_trace, 'context'=>''));
        } catch (\Throwable $throwable){
            self::critical('log', array($throwable->getMessage()), array($throwable->getTrace()));
        }
    }


    /** ATENÇÃO: UTILIZAÇÃO EXCLUSIVA PARA EVENTOS DE ERRO INDEFINIDOS CAPTURADOS AUTOMÁTICAMENTE
     * Eventos indefinidos (PSR-3 : ---)
     * Log controlado pelo php_ini
     *
     * @param array $evt = Informação do evento 
     * 
     * @return void
     * @pmonteiro (2019-11-14)
     */
    public static function other(array $evt): void {
        try {
            // Mensagem
            $message = $evt['message'];
            // Formata trace
            $formated_trace = self::formatTrace($evt['trace']);
            // Persiste
            self::persist(self::OTHER, $message, array('trace' => $formated_trace, 'context'=>''));
        } catch (\Throwable $throwable){
            self::critical('log', array($throwable->getMessage()), array($throwable->getTrace()));
        }
    }
    

    // ----------------------------------------------------------------------------------- EVENTOS "MANUAIS"


    /**
     * Sistema DOWN (PSR-3 : System is unusable) 
     * Log controlado pelo programador 
     *
     * @param string $message = Mensagem ou Key de mensagem a incluir no log
     * @param array $message_parameters = Parâmetros para substituição na mensagem a incluir no log
     * @param array $context = Variáveis de contexto a incluir no log
     * 
     * @return void
     * @pmonteiro (2019-11-14)
     */
    public static function emergency(string $message, ?array $message_parameters=null, ?array $context=null): void {
        try {
            // Gera mensagem considerando o array externo de tipificação
            $message = self::generateMessage($message, $message_parameters, 'emergency.php');
            // Formata trace
            $formated_trace = self::formatTrace(debug_backtrace());
            // Formata context
            if ($context) {
                $context = self::formatContext($context);
            }
            // Persiste
            self::persist(self::EMERGENCY, $message, array('trace' => $formated_trace, 'context' => $context));
            // Behaviour
            self::behaviour(self::EMERGENCY, $message, array('trace' => $formated_trace, 'context' => $context));
        } catch (\Throwable $throwable){
            self::critical('log', array($throwable->getMessage()), array($throwable->getTrace()));
        }
    }


    /**
     * Suportes sistema DOWN (PSR-3 : Action must be taken immediately) 
     * Log controlado pelo programador 
     *
     * @param string $message = Mensagem ou Key de mensagem a incluir no log
     * @param array $message_parameters = Parâmetros para substituição na mensagem a incluir no log
     * @param array $context = Variáveis de contexto a incluir no log
     * 
     * @return void
     * @pmonteiro (2019-11-14)
     */
    public static function alert($message, array $message_parameters, array $context = null): void {
        try {
            // Gera mensagem considerando o array externo de tipificação
            $message = self::generateMessage($message, $message_parameters, 'alert.php');
            // Formata trace
            $formated_trace = self::formatTrace(debug_backtrace());
            // Formata context
            if ($context) {
                $context = self::formatContext($context);
            }
            // Persiste
            self::persist(self::ALERT, $message, array('trace' => $formated_trace, 'context' => $context));
            // Behaviour
            self::behaviour(self::ALERT, $message, array('trace' => $formated_trace, 'context' => $context));
        } catch (\Throwable $throwable){
            self::critical('log', array($throwable->getMessage()), array($throwable->getTrace()));
        }
    }


    /**
     * Módulos ou componentes DOWN (PSR-3 : Critical conditions) 
     * Log controlado pelo programador 
     *
     * @param string $message = Mensagem ou Key de mensagem a incluir no log
     * @param array $message_parameters = Parâmetros para substituição na mensagem a incluir no log
     * @param array $context = Variáveis de contexto a incluir no log
     * 
     * @return void
     * @pmonteiro (2019-11-14)
     */
    public static function critical(string $message, array $message_parameters, ?array $context = null) {
        try {
            // Gera mensagem considerando o array externo de tipificação
            $message = self::generateMessage($message, $message_parameters, 'critical.php');
            // Formata trace
            $formated_trace = self::formatTrace(debug_backtrace());
            // Formata context
            if ($context) {
                $context = self::formatContext($context);
            }
            // Persiste
            self::persist(self::CRITICAL, $message, array('trace' => $formated_trace, 'context' => $context));
            // Behaviour
            self::behaviour(self::CRITICAL, $message, array('trace' => $formated_trace, 'context' => $context));
        } catch (\Throwable $throwable){
            self::logDown();
        }
    }


    /**
     * Debug (PSR-3 : Detailed debug information) 
     * Log controlado pelo programador 
     * 
     * @param string $message = Mensagem a incluir no log
     * @param array $context = Variáveis de contexto a incluir no log
     * @param bool $production = ? Persiste log em produção
     *      
     * @return void
     * @pmonteiro (2019-11-14)
     */
    public static function debug(string $message, array $context = null, bool $production = false): void {
        try {
            $development_status = DEVELOPMENT['status'] ?? false;
            $development_log_filesystem = DEVELOPMENT['log_filesystem'] ?? false;
            // Formata trace
            $formated_trace = self::formatTrace(debug_backtrace());

            // Em desenvolvimento persiste todos os eventos de log em repositório
            // Em Produção persiste apenas os eventos de log de produção em repositório
           if (($development_status) || ($production && !$development_status)) { 
                // Formata context
                if ($context) {
                    $context = self::formatContext($context);
                }
                // Persiste
                self::persist(self::DEBUG, $message,  array('trace' => $formated_trace, 'context' => $context));
            }
        } catch (\Throwable $throwable){
            self::critical('log', array($throwable->getMessage()), array($throwable->getTrace()));
        }
    }


    /** 
     * Eventos de operação (PSR-3 : INFO - Interesting events) 
     * Log controlado pelo programador 
     *
     * @param string $message = Mensagem ou Key de mensagem a incluir no log
     * @param array $message_parameters = Parâmetros para substituição na mensagem a incluir no log
     * @param array $context = Variáveis de contexto a incluir no log
     * @return void
     * @pmonteiro (2019-11-14)
     */
    public static function operation(string $message, array $message_parameters, array $context = null): void {
        try {
            $operation = $message;
            // Gera mensagem considerando o array externo de tipificação
            $message = self::generateMessage($message, $message_parameters, 'operation.php');
            // Formata context
            if ($context) {
                $context = self::formatContext($context);
            }
            // Persiste
            self::persist(self::OPERATION, $message, array('operation' => $operation, 'context' => $context));
        } catch (\Throwable $throwable){
            self::critical('log', array($throwable->getMessage()), array($throwable->getTrace()));
        }
    }
    

    /**
     * Eventos de integração (PSR-3 : INFO - Interesting events) 
     * Log controlado pelo programador 
     *
     * @param string $type = Tipo de integração
     * @param \DateTime $request_date = Data/hora do pedido
     * @param string $request_data = Dados do pedido
     * @param \DateTime $answer_date = Data/hora da resposta
     * @param string $answer_data = Dados da resposta
     * @param array|null $keys = Chaves para indíces
     * 
     * @return void
     * @pmonteiro (2019-11-18)
     */
    public static function integration(string $type, \DateTime $request_date, string $request_data, \DateTime $answer_date, string $answer_data, ?array $keys=null): void {
        try {
            $array_repository_fields = array('event_date', 'event_category', 'request_date', 'request_data', 'answer_date', 'answer_data', 'key1');
            $evt_date = $request_date;
            if ($evt_date > $answer_date) {
                $evt_date = $request_date;
            }
            $array_repository_parameters = array(
                ':event_date' => $evt_date->format('Y-m-d H:i:s'),
                ':event_category' => 'info',
                ':request_date' => $request_date->format('Y-m-d H:i:s'),
                ':request_data' => $request_data,
                ':answer_date' => $answer_date->format('Y-m-d H:i:s'),
                ':answer_data' =>  $answer_data);
            if ($keys) {
                foreach ($keys as $key => $value) {
                    $array_repository_parameters[":$key"] = $value;
                }
            }
             // Persiste
            self::persist(self::INTEGRATION . "_$type", null, array('fields' => $array_repository_fields, 'parameters' => $array_repository_parameters));
            //TODO: filesystem

        } catch (\Throwable $throwable){
            self::critical('log', array($throwable->getMessage()), array($throwable->getTrace()));
        }
    }


    /**
     * Eventos de comunicação mobile (PSR-3 : INFO - Interesting events)
     * Log controlado pelo programador 
     *
     * @return void
     * @pmonteiro (2019-11-18)
     */
    public static function mobileComm() { //TODO:
        try {

        } catch (\Throwable $throwable){
            self::critical('log', array($throwable->getMessage()), array($throwable->getTrace()));
        }
    }

    /**
     * Gerar mensagem de Log considerando o array externo de tipificação
     *
     * @param string $message = Mensagem ou Key de mensagem a incluir no log
     * @param array|null $message_parameters = Parâmetros para substituição na mensagem a incluir no log
     * @param string $filename = Ficheiro externo com array de tipificação
     * 
     * @return string = Mensagem gerada
     * @pmonteiro (2019-11-26) 
     */
    private static function generateMessage(string $message, ?array $message_parameters=null, string $filename): string {
        try {
            // Verificar se $message corresponde a uma key de mensagem tipificada
            // Inclui o ficheiro externo
            if(include("config/log/$filename")) {
                // Tenta ler a tipificação
                $typed_message = $typed_messages[$message] ?? null;
                // Se encontrou tipificação
                if (isset($typed_message)) {
                    $message = $typed_message;
                    // Se exitem parâmetros
                    if (isset($message_parameters)) {
                        // Se consegue substituir os parâmetros
                        if ($generated_message = vsprintf($typed_message, $message_parameters)) {
                            $message = $generated_message;
                        }
                    }
                }
             }
            return $message;
        } catch (\Throwable $throwable) {
            throw new \FWK\classes\ExErr($throwable);      
        }
    }


    /**
     * Persiste o evento de log no repositório correspondente
     * No caso do repositório não estar disponível, formata a informação e persiste no filesystem
     * No caso das flags de desenvolvimento para filesystem estarem ativas, formata a informação e persiste no filesystem
     * 
     *
     * @param string $type = Tipo de evento
     * @param string|null $message = Mensagem do evento
     * @param array $contents = Informação do evento
     * 
     * @return void
     * @pmonteiro (2019-11-18)
     */
    private static function persist(string $type, ?string $message, array $contents): void {
        try {
            
            // Módulo e utilizador
            $module_name = $GLOBALS['MODULE'] ?? '?';
            // Se tem origem em "mobile" o utilizador é a autorização (que inicia com o id do mesmo)
            if (substr($module_name, 0, 3) == 'APP' || substr($module_name, 0, 3) == 'PWA') {
                $user_name = $_SESSION['MOBILE']['authorization'] ?? '?';
            } else {
                $user_name = $_SESSION['USER']['name'] ?? '?';
            }
               
            // Flags de desenvolvimento
            $development_status = DEVELOPMENT['status'] ?? false;
            $development_log_filesystem = DEVELOPMENT['log_filesystem'] ?? false;

            // Valida se consegue ligar ao repositório
            $heartbeat = self::repositoryCheckHeartBeat($type);
            if ($heartbeat) {

                $context = $contents['context'] ?? null;
                if (isset($context)) {
                    $context = rtrim($context, PHP_EOL);
                }   

                switch ($type) {
                    case self::ERROR:
                    case self::WARNING:
                    case self::NOTICE:
                    case self::OTHER:    
                    case self::EMERGENCY:
                    case self::ALERT:
                    case self::CRITICAL:
                    case self::DEBUG:
                        $array_repository_fields = array('event_date', 'event_category', 'module', 'message', 'trace', 'context', 'user_name');
                        $array_repository_parameters = array(
                            ':event_date' => DateTimeHelper::datetimeToUtc(date("Y-m-d H:i:s")),
                            ':event_category' => $type,
                            ':module' => $module_name,
                            ':message' => $message,
                            ':trace' =>  $contents['trace'],
                            ':context' => $context, 
                            ':user_name' => $user_name);
                        break;
                    case self::OPERATION:
                        $array_repository_fields = array('event_date', 'event_category', 'module', 'operation', 'message', 'context', 'user_name');
                        $array_repository_parameters = array(
                            ':event_date' => DateTimeHelper::datetimeToUtc(date("Y-m-d H:i:s")),
                            ':event_category' => $type,
                            ':module' => $module_name,
                            ':operation' => $contents['operation'],
                            ':message' => $message,
                            ':context' => $context,
                            ':user_name' => $user_name);
                        break;
                    // ATENÇÂO: 1 case para cada tipo de integração               
                    case self::INTEGRATION . '_default':
                    //case self::INTEGRATION . '_1':
                    //case self::INTEGRATION . '_2':
                        $array_repository_fields = $contents['fields'];
                        $array_repository_parameters = $contents['parameters'];
                        break;
                    }
                $repository = 'obj_'.self::${$type.'_repository'}['type'].'_repository';
                self::${$repository}->insert(self::${$type.'_repository'}['target'], $array_repository_fields, $array_repository_parameters);
            }

            if (!$heartbeat || ($development_status && $development_log_filesystem)){
                switch ($type) {
                    case self::ERROR:
                    case self::WARNING:
                    case self::NOTICE:
                    case self::OTHER:  
                    case self::EMERGENCY:
                    case self::ALERT:
                    case self::CRITICAL:
                    case self::DEBUG:
                        $log = str_repeat('=', 125) . PHP_EOL;
                        $log .= $type . '   |   ' .  DateTimeHelper::datetimeToUtc(date("Y-m-d H:i:s")) . '   |   ' .  $module_name . '   |   ' . $user_name . PHP_EOL;
                        $log .= str_repeat('-', 117) . ' MESSAGE' . PHP_EOL;
                        $log .= $message . PHP_EOL;
                        $log .= str_repeat('-', 119) . ' TRACE' . PHP_EOL;
                        $log .=  $contents['trace'] . PHP_EOL;
                        if (isset($contents['context'])) {
                            $log .= str_repeat('-', 117) . ' CONTEXT' . PHP_EOL;
                            $log .= $contents['context'] . PHP_EOL;
                        }
                        $log .= PHP_EOL;
                        // Persiste
                        file_put_contents(LOG_PATH . self::$log_filesystem['filename']. '_' . date("Ym") . '.log', $log, FILE_APPEND | LOCK_EX);
                        break;
                    case self::OPERATION:
                        $log = str_repeat('=', 125) . PHP_EOL;
                        $log .= $type . '   |   ' .  DateTimeHelper::datetimeToUtc(date("Y-m-d H:i:s")) . '   |   ' .  $module_name . '   |   ' . $user_name . PHP_EOL;
                        $log .= str_repeat('-', 117) . ' MESSAGE' . PHP_EOL;
                        $log .= 'Operation:  ' . $contents['operation'] . PHP_EOL;
                        $log .= $message . PHP_EOL;
                        if (isset($contents['context'])) {
                            $log .= str_repeat('-', 117) . ' CONTEXT' . PHP_EOL;
                            $log .= $contents['context']. PHP_EOL;
                        }
                        $log .= PHP_EOL;
                        // Persiste
                        file_put_contents(LOG_PATH . self::$log_filesystem['filename']. '_' . date("Ym") . '.log', $log, FILE_APPEND | LOCK_EX);
                        break;
                    // ATENÇÂO: 1 case para cada tipo de integração
                    case self::INTEGRATION . '_default':
                    //case self::INTEGRATION . '_1':
                    //case self::INTEGRATION . '_2':
                        $log = str_repeat('=', 125) . PHP_EOL;
                        $log .= $type  . '   |   ' .  date("Y-m-d H:i:s") . '   |   ' .  $module_name . PHP_EOL;
                        $log .= str_repeat('-', 117) . ' REQUEST' . PHP_EOL;
                        $log .= 'Date:  ' . $contents['parameters'][':request_date']. PHP_EOL;
                        $log .= $contents['parameters'][':request_data'] . PHP_EOL;
                        $log .= str_repeat('-', 118) . ' ANSWER' . PHP_EOL;
                        $log .= 'Date:  ' .  $contents['parameters'][':answer_date'] . PHP_EOL;
                        $log .= $contents['parameters'][':answer_data'] . PHP_EOL;
                        $log .= PHP_EOL;
                        // Persiste
                        file_put_contents(LOG_PATH . self::$log_filesystem['filename']. '_' . date("Ym") . '.log', $log, FILE_APPEND | LOCK_EX);
                        break;
                }
            }
        } catch (\Throwable $throwable) {
            if ($type != self::CRITICAL) {
                throw new \FWK\classes\ExErr($throwable);    
            } else {
                self::logDown();
            }
        }
    }


    /**
     * Processar comportamentos pós-log
     *
     * @param string $type = Tipo de evento
     * @param string|null $message = Mensagem do evento
     * @param array $contents = Informação do evento
     * 
     * @return void
     * @pmonteiro (2019-11-26)
     */
    static private function behaviour(string $type, ?string $message, array $contents): void { //TODO:
        try {
            switch ($type) {
                case self::ERROR:
                break;
                case self::EMERGENCY:
                break;
                case self::ALERT:
                break;
                case self::CRITICAL:
                break;
                default:
            break;
            }
        } catch (\Throwable $throwable) {
            throw new \FWK\classes\ExErr($throwable);      
        }
    }


    /**
     * Verifica disponibilidade da conexão a repositório
     * Se estive indisponível, tenta reativá-la
        *
     * @param string $type = Tipo de repositório a verificar
     * 
     * @return boolean = ? Disponível
     * @pmonteiro (2019-11-18)
     */
    private static function repositoryCheckHeartBeat(string $type): bool {
        try{
            $flag_connection = true;
            switch (self::${$type.'_repository'}['type']) {
                case self::MAIN:
                    if (!self::$obj_main_repository || !self::$obj_main_repository->checkHeartBeat()) {
                        self::$obj_main_repository = new repositories\MainRepository();
                    }
                    break;
                case self::LOG:
                    if (!self::$obj_log_repository || !self::$obj_log_repository->checkHeartBeat()) {
                        self::$obj_log_repository = new repositories\LogRepository();
                    }
                    break;
                default:
                    $flag_connection = false;
                    break;
            }
            return $flag_connection;
        } catch(\Throwable $throwable) {
            return false;
        }
    }


    /**
     * Formata trace
     *
     * @param array $trace = Trace em bruto
     * 
     * @return string = Trace formatado
     * 
     * @pmonteiro (2019-11-18)
     */
    private static function formatTrace(array $trace): string {
        try {
            $formated_trace = '';
            $formated_trace_lines = array();
            
            $trace_line_number = 0;
            // Popula array com trace final formatado
            foreach ($trace as $trace_line) {
                $trace_line_args_count = 0;

                if (isset($trace_line['args'])) {
                    $trace_line_args_count = count($trace_line['args']);
                }
                // Se tem informação de "file"
                if (isset($trace_line['file'])) {
                    $formated_trace_lines[$trace_line_number]['file'] = $trace_line['file'];
                    $formated_trace_lines[$trace_line_number]['line'] = $trace_line['line'];
                }
                // A 1ª linha é diferente de todas as outras (não tem file nem line)
                // Se não é a primeira linha
                if ($trace_line_number != 0) {
                    // Se tem a informação "class"
                    if (isset($trace_line['class'])) {
                        $formated_trace_lines[$trace_line_number]['class'] = $trace_line['class'];
                        $formated_trace_lines[$trace_line_number]['type'] = $trace_line['type'];
                        $formated_trace_lines[$trace_line_number]['method'] = $trace_line['function'];
                    }
                    // Se tem argumentos
                    if ($trace_line_args_count) {
                        $formated_trace_lines[$trace_line_number]['args'] = self::formatLogArguments($trace_line['args']);
                    }
                }
                $trace_line_number++;
            }
            
            // Com a informação já ordenada, constrói o texto de trace
            foreach ($formated_trace_lines as $key => $formated_trace_line) {
                $file = $formated_trace_line ['file'] ?? '?';
                $line = $formated_trace_line ['line'] ?? 0;
                $formated_trace .= '#'.$key.' ' . $file . '('.$line . ')';
                if ($key != 0) {
                    $formated_trace .= ' : ';
                }
                if (isset($formated_trace_line['class'])) {
                    $formated_trace .= $formated_trace_line['class'];
                    $formated_trace .= $formated_trace_line['type'].$formated_trace_line['method'];
                }
                if (isset($formated_trace_line['args'])) {
                    $formated_trace .= $formated_trace_line['args'];
                }
                $formated_trace .= PHP_EOL;
            }
            $formated_trace .= '#'.($key+1).' {main}';

            return $formated_trace;

        } catch (\Throwable $throwable) {
            throw new \FWK\classes\ExErr($throwable);      
        }
    }


    /**
     * Formata context (variáveis)
     *
     * @param array $context = Variáveis a incluir no log
     * 
     * @return string = Context formatado
     * @pmonteiro (2019-11-18)
     */
    private static function formatContext(array $context, bool $log_filesystem = false): string {
        try{
            $context_final = '';
            foreach ($context as $name => $value) {
                $context_final .= str_repeat('-', 125 - (strlen($name)+1)) . " $name" . PHP_EOL;
                $context_final .=  print_r($value, true) . PHP_EOL;
            }
            return $context_final;
        } catch (\Throwable $throwable) {
            throw new \FWK\classes\ExErr($throwable);      
        }
    }


    /**
     * Fim de trajeto de erro em sistema de log ...
     *
     * @return void
     * @pmonteiro (2019-11-18)
     */
    private static function logDown():void {
        echo 'logDown';
        //header('Location: http://google.com'); //TODO:
    }

}
// --- END