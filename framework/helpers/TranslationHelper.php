<?php
/**
 * FRAMEWORK - HELPER - TRANSLATION
 * 
 * Disponibiliza métodos que permitem manusear as traduções para os vários idiomas
 *
 * define('CORE_TRANSLATIONS_PATH', CORE_PATH . 'translations/');
 *
 * ATENÇÃO: Utiliza a constante global: CORE_TRANSLATIONS_PATH
 *
 * ATENÇÃO: Utiliza a variável de sessão: ['LANGUAGE']['current'] (ex: 'pt_PT')
 *
 * @pmonteiro (yyyy-mm-dd)
 */ 
namespace FWK\helpers;

use \DEV\entities\translation\Translation;
use \FWK\wrappers\repositories\MainRepository;

final class TranslationHelper {

    use \FWK\traits\throwableHandler;


    /**
     * Devolve tradução do texto 
     * 
     * @param string $value = Texto a traduzir
     * 
     * @return string = Texto traduzido
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
	public static function translate(string $value): string {
        try {

            if (DEVELOPMENT['status'] && !isset($_SESSION['LANGUAGE']['translation'][$value])) {

                // Repositório
                $repository = new MainRepository();

                // Entidade
                $obj_translation = new Translation($repository);

                if (!$obj_translation->load_bySource($value)) {
                    $obj_translation->setProperty('source', $value);
                    $obj_translation->setProperty('layer', 'be');
                    $obj_translation->insert();
                    $_SESSION['LANGUAGE']['translation'][$value] = '';
                }

                $repository->close();

            }

            $translated = $_SESSION['LANGUAGE']['translation'][$value] ?? $value;
            if ($translated == '') {$translated = $value;}
            
            if(DEVELOPMENT['status']) {
                $translated = '_' . $translated;
            }

            return $translated;
        } catch (\Throwable $throwable) {
            throw self::throwableHandle($throwable);
        }
    }


    /**
     * Devolve tradução do texto
     *      depende de setlocale(LC_MESSAGES, ....);
     * 
     * @param string $text = Texto a traduzir
     * 
     * @return string = Texto traduzido
     * 
     * @pmonteiro (2020-03-23)
     */
/* 	public static function translate(string $text): string {
        try {

            $text = gettext($text);
            $text = preg_quote($text, '/');

            return $text;
        } catch (\Throwable $throwable) {
            throw self::throwableHandle($throwable);
        }
    } */
   
}
// --- END    