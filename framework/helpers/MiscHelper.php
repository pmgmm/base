<?php
/**
 * FRAMEWORK - HELPER - MISC
 * 
 * Disponibiliza métodos diversos
 *
 * @pmonteiro (yyyy-mm-dd)
 */ 
namespace FWK\helpers;

final class MiscHelper {

    use \FWK\traits\throwableHandler;

    /**
     * Cria e devolve Avatar (baseado nas iniciais das primeiras 2 palavras do nome)
     *
     * @param string name = Nome do utilizador
     * 
     * @return string = Imagem base64 encoded
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public static function createAvatar(string $name): string {
        try {
    
            // Captura as iniciais 
            $words = explode(' ', $name);
            $chars = $words[0][0] . $words[1][0] ?? '';

            // Cria imagem base
            $avatar = imagecreate(100, 100);
            
            // Gera o fundo da imagem (cor aleatória)
            imagecolorallocate($avatar, rand(1, 200), rand(1, 200), rand(1, 200));

            // Gera a cor das letras (branco)
            $text_color = imagecolorallocate($avatar, 255, 255, 255);

            // Gera imagem (resource)
            if (strlen($chars) == 2) { // Se 2 caracteres
                imagettftext($avatar, 40, 0, 21, 68, $text_color, FRAMEWORK_RESOURCES_PATH .'ttf/consola.ttf', strtoupper($chars));
            } else { // Se 1 caracter
                imagettftext($avatar, 40, 0, 36, 68, $text_color, FRAMEWORK_RESOURCES_PATH .'ttf/consola.ttf', strtoupper($chars));
            }

            // Captura output
            ob_start();

            // Output da imagem em formato png
            imagepng($avatar);
            
            return 'data:image/png;base64,' . base64_encode(ob_get_clean());

        } catch (\Throwable $throwable) {
            throw self::throwableHandle($throwable);
        }
    }

    
    public static function isJson(string $value): bool {
        try {

            $decoded = json_decode($value);
            if (!is_object($decoded) && !is_array($decoded) ) {
                return false;
            }
            return true;
   
        } catch (\Throwable $throwable) {
            throw self::throwableHandle($throwable);
        }
    }


}
// --- END    