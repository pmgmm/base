<?php
/**
 * FRAMEWORK - HELPER - VALIDATE
 * 
 * Disponibiliza métodos que permitem validar conteúdos por tipo 
 *
 * @pmonteiro (2020-03-12)
 */ 
namespace FWK\helpers;

final class ValidateHelper {

    use \FWK\traits\throwableHandler;

    // Constants
    public const TYPE_STRING = 'string';
    public const TYPE_INTEGER = 'integer';
    public const TYPE_FLOAT = 'float';
    public const TYPE_BOOLEAN = 'boolean';
    public const TYPE_DATE = 'date';
    public const TYPE_TIME = 'time';
    public const TYPE_DATETIME = 'datetime';
    public const TYPE_EMAIL = 'email';
    public const TYPE_URL = 'url';


    /**
     * Valida obrigatoriedade de exitência de conteúdo (por tipo)
     * 
     * @param string $type = Tipo de validação (constant) : TYPE_???
     * @param [type] $value = Conteúdo a validar
     * 
     * @return bool = ? Sucesso
     * 
     * @pmonteiro (2020-03-12)
     */
	public static function mandatory(string $type, $value): bool {
        try {
            $result = true;

            if (!isset($value)) {
                $result = false;
            } else {
                switch ($type) {
                    case self::TYPE_STRING:
                    case self::TYPE_INTEGER:
                    case self::TYPE_FLOAT:
                    case self::TYPE_DATE:
                    case self::TYPE_TIME:
                    case self::TYPE_DATETIME:
                    case self::TYPE_EMAIL:
                    case self::TYPE_URL:
                        if (strval($value) == '') {
                            $result = false;
                        }
                        break;
                    case self::TYPE_BOOLEAN:
                        if (!is_bool($value)) {
                            $result = false;
                        }
                }
            }

            return $result;
        } catch (\Throwable $throwable) {
            throw self::throwableHandle($throwable);
        }
    }


    /**
     * Valida conteúdo do tipo string
     * 
     * @param bool $mandatory = ? Obrigatório
     * @param [type] $value = Conteúdo a validar
     * 
     * @return bool = ? Sucesso
     * 
     * @pmonteiro (2020-03-09)
     */
    public static function string(bool $mandatory, $value): bool {
        try {

            $result = true;

            // Valida obrigatoriedade por tipo
            if ($mandatory) {
                $result = self::mandatory(self::TYPE_STRING, $value);
            }

            return $result;
        } catch (\Throwable $throwable) {
            throw self::throwableHandle($throwable);
        }
    }


    /**
     * Valida conteúdo do tipo integer
     * 
     * @param bool $mandatory = ? Obrigatório
     * @param [type] $value = Conteúdo a validar
     * @param bool $zero = ? Admite 0 (zero)
     * @param bool $negative = ? Admite negativos 
     * 
     * @return bool = ? Sucesso
     * 
     * @pmonteiro (2020-03-09)
     */
    public static function integer(bool $mandatory, $value, bool $zero=true, bool $negative=false): bool {
        try {
            $result = true;
            
            // Valida obrigatoriedade por tipo
            if ($mandatory) {
                $result = self::mandatory(self::TYPE_INTEGER, $value);
            }
            
            // Se não validou obrigatoriedade ou validou positivamente, 
            //      valida integer (incluíndo 0 e -) se existe conteúdo
            if ($result && isset($value) && $value != '') {
                $regex = "/^-?[0-9]+$/";
                // Se validou positivamente e não tem espacos antes ou depois
                if (preg_match($regex, $value) && strlen($value) == strlen(trim($value))) {
                    // Se é 0 e não é permitido
                    if (!$zero && intval($value) == 0) {
                        $result = false;
                    }
                    // Se é negativo e não é permitido
                    if (!$negative && $value[0] == '-') {
                        $result = false;
                    }
                } else {
                    $result = false;
                }
            }

            return $result;
        } catch (\Throwable $throwable) {
            throw self::throwableHandle($throwable);
        }
    }


    /**
     * Valida conteúdo do tipo numeric/decimal/float
     * 
     * @param bool $mandatory = ? Obrigatório
     * @param [type] $value = Conteúdo a validar
     * @param bool $zero = ? Admite 0 (zero)
     * @param bool $negative = ? Admite negativos 
     * 
     * @return bool = ? Sucesso
     * 
     * @pmonteiro (2020-03-09)
     */
    public static function float(bool $mandatory, $value, bool $zero=false, bool $negative=false): bool {
        try {
            $result = true;

            // Valida obrigatoriedade por tipo
            if ($mandatory) {
                $result = self::mandatory(self::TYPE_FLOAT, $value);
            }
            
            // Se não validou obrigatoriedade ou validou positivamente, 
            //      valida numeric/decimal/float (incluíndo 0 e -) se existe conteúdo
            if ($result && isset($value) && $value != '') {
                $regex = "/^-?\d+(?:\.\d+)?$/";
                // Se validou positivamente e não tem espacos antes ou depois
                if (preg_match($regex, $value) && strlen($value) == strlen(trim($value))) {
                    // Se é 0 e não é permitido
                    if (!$zero && floatval($value) == 0) {
                        $result = false;
                    }
                    // Se é negativo e não é permitido
                    if (!$negative && $value[0] == '-') {
                        $result = false;
                    }
                } else {
                    $result = false;
                }
            }

            return $result;
        } catch (\Throwable $throwable) {
            throw self::throwableHandle($throwable);
        }
    }


    /**
     * Valida conteúdo do tipo Boolean
     * 
     * @param bool $mandatory = ? Obrigatório
     * @param [type] $value = Conteúdo a validar
     * 
     * @return bool = ? Sucesso
     * 
     * @pmonteiro (2020-03-09)
     */
    public static function boolean(bool $mandatory, $value): bool {
        try {
            $result = true;

            // Valida obrigatoriedade por tipo
            if ($mandatory) {
                $result = self::mandatory(self::TYPE_BOOLEAN, $value);
            }
            
            // Se não validou obrigatoriedade ou validou positivamente, 
            //      valida boolean (incluíndo 0 e -)
            if ($result && isset($value) && !is_bool($value)) {
                $result = false;
            }

            return $result;
        } catch (\Throwable $throwable) {
            throw self::throwableHandle($throwable);
        }
    }


    /**
     * Valida conteúdo do tipo Date + Time
     * 
     * @param bool $mandatory = ? Obrigatório
     * @param [type] $value = Conteúdo a validar
     * 
     * @return bool = ? Sucesso
     * 
     * @pmonteiro (2020-03-09)
     */
    public static function datetime(bool $mandatory, $value): bool {
        try {
            $result = true;

            // Valida obrigatoriedade por tipo
            if ($mandatory) {
                $result = self::mandatory(self::TYPE_DATETIME, $value);
            }
            
            // Se não validou obrigatoriedade ou validou positivamente, 
            //      valida datetime se existe conteúdo
            if ($result && isset($value) && $value != '') {
                $regex = "/(?:\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[1-2][0-9]|3[01])|(?:0[469]|11)-(?:0[1-9]|[1-2][0-9]|30)|02-(?:0[1-9]|1[0-9]|2[0-8]))|\d{2}(?:[02468][048]|[13579][26])-02-29) (2[0-3]|[01][0-9])(:([0-5][0-9]))?(:([0-5][0-9]))?$/";
                 // Se não validou positivamente ou tem espacos antes ou depois
                if (!preg_match($regex, $value) || strlen($value) != strlen(trim($value))) {
                    $result = false;
                }
            }

            return $result;
        } catch (\Throwable $throwable) {
            throw self::throwableHandle($throwable);
        }
    }


    /**
     * Valida conteúdo do tipo Date
     * 
     * @param bool $mandatory = ? Obrigatório
     * @param [type] $value = Conteúdo a validar
     * 
     * @return bool = ? Sucesso
     * 
     * @pmonteiro (2020-03-09)
     */
    public static function date(bool $mandatory, $value): bool {
        try {
            $result = true;

            // Valida obrigatoriedade por tipo
            if ($mandatory) {
                $result = self::mandatory(self::TYPE_DATE, $value);
            }
            
            // Se não validou obrigatoriedade ou validou positivamente, 
            //      valida date se existe conteúdo
            if ($result && isset($value) && $value != '') {
                $regex = "/(?:\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[1-2][0-9]|3[01])|(?:0[469]|11)-(?:0[1-9]|[1-2][0-9]|30)|02-(?:0[1-9]|1[0-9]|2[0-8]))|\d{2}(?:[02468][048]|[13579][26])-02-29)/";
                // Se não validou positivamente ou tem espacos antes ou depois
                if (!preg_match($regex, $value) || strlen($value) != strlen(trim($value))) {
                    $result = false;
                }
            }

            return $result;
        } catch (\Throwable $throwable) {
            throw self::throwableHandle($throwable);
        }
    }


    /**
     * Valida conteúdo do tipo Time
     * 
     * @param bool $mandatory = ? Obrigatório
     * @param [type] $value = Conteúdo a validar
     * 
     * @return bool = ? Sucesso
     * 
     * @pmonteiro (2020-03-09)
     */
    public static function time(bool $mandatory, $value): bool {
        try {
            $result = true;

            // Valida obrigatoriedade por tipo
            if ($mandatory) {
                $result = self::mandatory(self::TYPE_TIME, $value);
            }
            
            // Se não validou obrigatoriedade ou validou positivamente, 
            //      valida time se existe conteúdo
            if ($result && isset($value) && $value != '') {
                $regex = "/^(2[0-3]|[01][0-9])(:([0-5][0-9]))?(:([0-5][0-9]))?$/";
                // Se não validou positivamente ou tem espacos antes ou depois
                if (!preg_match($regex, $value) || strlen($value) != strlen(trim($value))) {
                    $result = false;
                }
            }

            return $result;
        } catch (\Throwable $throwable) {
            throw self::throwableHandle($throwable);
        }
    }


    /**
     * Valida conteúdo do tipo email
     * 
     * @param bool $mandatory = ? Obrigatório
     * @param [type] $value = Conteúdo a validar
     * 
     * @return bool = ? Sucesso
     * 
     * @pmonteiro (2020-03-09)
     */
    public static function email(bool $mandatory, $value): bool {
        try {
            $result = true;

            // Valida obrigatoriedade por tipo
            if ($mandatory) {
                $result = self::mandatory(self::TYPE_EMAIL, $value);
            }
            
            // Se não validou obrigatoriedade ou validou positivamente, 
            //      valida email se existe conteúdo
            if ($result && isset($value) && trim($value) != '') {
                $regex = "/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/";
                // Se não validou positivamente ou tem espacos antes ou depois
                if (!preg_match($regex, $value) || strlen($value) != strlen(trim($value))) {
                    $result = false;
                }
            }

            return $result;
        } catch (\Throwable $throwable) {
            throw self::throwableHandle($throwable);
        }
    }


    /**
     * Valida conteúdo do tipo url
     * 
     * @param bool $mandatory = ? Obrigatório
     * @param [type] $value = Conteúdo a validar
     * 
     * @return bool = ? Sucesso
     * 
     * @pmonteiro (2020-03-09)
     */
    public static function url(bool $mandatory, $value): bool {
        try {
            $result = true;

            // Valida obrigatoriedade por tipo
            if ($mandatory) {
                $result = self::mandatory(self::TYPE_URL, $value);
            }
            
            // Se não validou obrigatoriedade ou validou positivamente, 
            //      valida url se existe conteúdo
            if ($result && isset($value) && trim($value) != '') {
                $regex = "/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:\/?#[\]@!\$&\'\(\)\*\+,;=.]+$/";
                // Se não validou positivamente ou tem espacos antes ou depois
                if (!preg_match($regex, $value) || strlen($value) != strlen(trim($value)) ) {
                    $result = false;
                }
            }

            return $result;
        } catch (\Throwable $throwable) {
            throw self::throwableHandle($throwable);
        }
    }
   
}
// --- END    