<?php
/**
 * CORE - REGISTER - AUTOLOADER
 * 
 * Função responsável pelo carregamento de classes, interfaces, traits, etc com base no seu FQN
 *
 * @pmonteiro (2019-11-14)
 */ 

namespace CORE\config;

spl_autoload_register(function (string $object): void {

     // Prefixos de Namespaces e respectivos directórios base
    $arr_prefixes = array();
    $arr_prefixes['CORE\\'] = CORE_PATH;
    $arr_prefixes['FWK\\'] = FRAMEWORK_PATH;
    $arr_prefixes['DEV\\'] = DEV_PATH;

    // Verifica se o objecto tem como prefixo algum dos prefixos definidos 
    foreach ($arr_prefixes as $prefix => $base_dir) {
        $len = strlen($prefix);
        // Se sim
        if (strncmp($prefix, $object, $len) === 0) {
            // Captura a parte específica do object (parte a seguir ao ao prefixo)
            $relative_object = substr($object, $len);
            // Calcula a "pathname" do ficheiro, adicionando o directório base
            $file = $base_dir . str_replace('\\', '/', $relative_object) . '.php';
            break;
        }
    }

    //  Se está nos prefixos de namespace definidos
    if (isset($file)) {
        if (file_exists($file)) {
            require $file;
        }
    } else { // Se não, carrega o autoloader de 3rdParty
        $file = FRAMEWORK_PATH . '3rdparty/autoload.php';
        if (file_exists($file)) {
            require $file;
        }
    }

  });
// --- END