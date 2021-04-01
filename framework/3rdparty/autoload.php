<?php
/**
 * FRAMEWORK - REGISTER - AUTOLOADER
 * 
 * Função responsável pelo carregamento de classes de 3rdparty com base no seu FQN
 *
 * @pmonteiro (2020-03-06)
 */ 


spl_autoload_register(function (string $object): void {

     // Prefixos de Namespaces e respectivos directórios base
    $arr_prefixes = array();
    $arr_prefixes['PhpOffice'] = FRAMEWORK_PATH . '3rdparty/PhpOffice';
    $arr_prefixes['Psr'] = FRAMEWORK_PATH . '3rdparty/Psr';
    $arr_prefixes['WebPush'] = FRAMEWORK_PATH . '3rdparty/WebPush';

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
    //  Se está nos prefixos de namspace definidos
    if (isset($file)) {
        if (file_exists($file)) {
            require $file;
        }
    } else { // Se não, verifica se consta na lista de 3rdparty (sem namespace)
        $arr_3rdparty = array();
        $arr_3rdparty['TCPDF'] = FRAMEWORK_PATH . '3rdparty/tcpdf/tcpdf.php';

        if (array_key_exists($object, $arr_3rdparty)) {
            $file = $arr_3rdparty [$object];
            if (file_exists($file)) {
                require $file;
            }
        }
    }

  });
// --- END