<?php
/**
 * FRAMEWORK - FORMATAÇÃO DE PARÂMETROS/ARGUMENTOS PARA LOG
 * 
 * Disponibiliza métodos que permitem formatar parâmetros/argumentos de funções para Log (trace)
 * 
 * @pmonteiro (yyyy-mm-dd)
 */ 

namespace FWK\traits;

trait formatLogArguments {

    /**
     * Formata os argumentos das funções para incluir em Log (trace)
     *
     * @param array $arguments = Argumentos a formatar
     * @param bool $include_keys = ? Inclui keys
     * 
     * @return string = Argumentos formatados
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    private static function formatLogArguments(array $arguments, bool $include_keys = false): string {
        try {
            $formated_arguments = '(';

            foreach ($arguments as $key => $argument) {
                $formated_argument = $argument;
                switch (gettype($argument)) {
                    case 'integer':
                    case 'double':
                        // Devolve AsIs
                        $formated_argument = $argument;
                        break;
                    case 'string':
                        // Devolve no máximo 32 caracteres e o restante em '...'
                        $argument = htmlspecialchars(substr($argument, 0, 32)).((strlen($argument) > 34) ? '...' : '');
                        $formated_argument = "\"$argument\"";
                        break;
                    case 'array':
                        // Devolve o número de itens do array
                        $formated_argument = 'Array('.count($argument).')';
                        break;
                    case 'object':
                        // Devolve o nome do objecto
                        $formated_argument = 'Object('.get_class($argument).')';
                        break;
                    case 'resource':
                        // Devolve o resource
                        $formated_argument = 'Resource('. $argument 
                        .')';
                        break;
                    case 'boolean':
                        // Devolve o booleano
                        $formated_argument = $argument? 'true' : 'false';
                        break;
                    case 'NULL':
                        // Devolve null
                        $formated_argument = 'null';
                        break;
                    default:
                        // Desconhecido
                        $formated_argument = 'Unknown';
                        break;
                }

                if ($include_keys) {
                    $formated_arguments .= "$key => $formated_argument, ";
                } else {
                    $formated_arguments .= "$formated_argument, ";
                }
            }

            return rtrim($formated_arguments, ', ') . ')';

        } catch (\Throwable $throwable) {
            throw $throwable;
        }
    }

}
// --- END