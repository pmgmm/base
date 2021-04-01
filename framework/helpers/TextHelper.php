<?php
/**
 * FRAMEWORK - HELPER - TEXT
 * 
 * Disponibiliza métodos que permitem manusear texto
 *
 * @pmonteiro (yyyy-mm-dd)
 */ 
namespace FWK\helpers;

final class TextHelper {

    use \FWK\traits\throwableHandler;


    /**
     * Converte string para minúsculas
     * 
     * @param string $value = String a converter
     * 
     * @return string = String convertida
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    static function lowercase(string $value): string {
        try {
            return mb_convert_case($value, MB_CASE_LOWER);
        } catch (\Throwable $throwable) {
            throw self::throwableHandle($throwable);
        }
    }


    /**
     * Converte string para maiúsculas
     * 
     * @param string $value = String a converter
     * 
     * @return string = String convertida
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    static function uppercase($value) {
        try {
            return mb_convert_case($value, MB_CASE_UPPER);
        } catch (\Throwable $throwable) {
            throw self::throwableHandle($throwable);
        }
    }


    /**
     * Converte primeiro caracter para maiuscula
     * 
     * @param string $value = String a converter
     * 
     * @return string = String convertida
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    static function uppercasefirst($value) {
        try {
            $value = mb_convert_case($value, MB_CASE_LOWER);
            return mb_strtoupper(mb_substr($value, 0, 1)).mb_substr($value, 1);
        } catch (\Throwable $throwable) {
            throw self::throwableHandle($throwable);
        }
    }

    
    /**
     * Converte primeiro caracter de cada palavra para maiuscula
     * 
     * @param string $value = String a converter
     * 
     * @return string = String convertida
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    static function uppercasewords($value) {
        try {
            return mb_convert_case($value, MB_CASE_TITLE);
        } catch (\Throwable $throwable) {
            throw self::throwableHandle($throwable);
        }
    }

//$value = strtr($value, 'ÇÀÁÂÃÄÅÒÓÔÕÖÉÈÊËÌÍÎÏÑÚÙÜÛÝŸ', 'çàáâãäåòóôõöéèêëìíîïñúùüûýÿ');

}
// --- END    