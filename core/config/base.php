<?php 

ini_set('session.cookie_httponly', 1); // VERIFICAR 
//ini_set('session.cookie_secure', 1);

ini_set('display_errors', 1);
error_reporting(E_ALL);
//error_reporting(-1);

// Módulos
require_once 'modules.php';

// Solução
define ('CORE', array('name' => 'BASE', 'version' => '0.0.0.1', 'copyright' => '2020 pmgmm@hotmail.com'));

// Repositórios
define ('REPOSITORY_MAIN', array('host' => 'devpedromonteiro', 'port' => 3306, 'name' => 'base', 'user' => 'serviceuser', 'password' => 'su1234'));
define ('REPOSITORY_LOG', array('host' => 'devpedromonteiro', 'port' => 3306, 'name' => 'base', 'user' => 'serviceuser', 'password' => 'su1234'));

// Segurança
session_start(array('name' => md5('SESSION'.$_SERVER['REMOTE_ADDR'].$_SERVER['HTTP_USER_AGENT'])));
$_SESSION['SECURITY'] = md5('SECURITY'.$_SERVER['REMOTE_ADDR'].$_SERVER['HTTP_USER_AGENT']); 

// Idiomas
$_SESSION['LANGUAGE']['current'] = 'pt_PT';
define('AVAILABLE_LANGUAGES', array(
                            array('code' => 'pt_PT', 'description' => 'Português'), 
                            array('code' => 'es_ES', 'description' => 'Español'),
                            array('code' => 'fr_FR', 'description' => 'Français'),
                            array('code' => 'en_US', 'description' => 'English'))
                            );

// Formatos
$_SESSION['FORMAT']['date'] = 'd-m-y';
define('AVAILABLE_FORMATS_DATE', array(
                            array('code' => 'd/m/y', 'description' => 'D/M/Y'), 
                            array('code' => 'd-m-y', 'description' => 'D-M-Y'),
                            array('code' => 'y/m/d', 'description' => 'Y/M/D'),
                            array('code' => 'y-m-d', 'description' => 'Y-M-D'))
                            );

define('BASE_URI', '/ui/'); 

define('BASE_PATH', $_SERVER['DOCUMENT_ROOT'] . '/'); 
define('LOG_PATH', BASE_PATH . 'log/'); // USER APACHE NA PASTA

// PATH's da framework
define('FRAMEWORK_PATH', BASE_PATH . 'framework/');
define('FRAMEWORK_RESOURCES_PATH', FRAMEWORK_PATH . 'resources/');
define('FRAMEWORK_COMPONENTS_PATH', FRAMEWORK_PATH . 'components/');

// PATH's de desenvolvimento
define('DEV_PATH', BASE_PATH . 'dev/');

// PATH's da solução
define('CORE_PATH', BASE_PATH . 'core/');
define('CORE_TEMPLATES_PATH', CORE_PATH . 'templates/');
define('CORE_TEMPLATES_RPATH', '/core/templates/');
define('CORE_MENUS_PATH', CORE_PATH . 'menus/');
define('CORE_TMP_PATH', CORE_PATH . 'tmp/');
define('CORE_RESOURCES_PATH', CORE_PATH . 'resources/');
define('CORE_TESTS_PATH', CORE_PATH . 'tests/');
define('CORE_TMP_PDF_PATH', CORE_TMP_PATH . 'pdf/');
define('CORE_TRANSLATIONS_PATH', CORE_PATH . 'translations/');



// AVALIAR LOG

// Comportamento de log em desenvolvimento
define('DEVELOPMENT', array('status' => false, 'log_filesystem' => false));

// Define onde são capturados e tratados os erros não apanhados em try/catch
set_error_handler(array('\\FWK\\classes\\SystemEventHandler','catch')); 

// Define helper de processamento de log da solução (usado pela framework)
define('CORE_LOG_HELPER', '\\CORE\\helpers\\LogHelper'); 


// Timezone por defeito
date_default_timezone_set($_SESSION['TIMEZONE'] ?? 'Europe/Lisbon');
//date_default_timezone_set('Europe/Madrid');


define('FRAMEWORK_TRAITS_NAMESPACE', '\\FWK\\traits\\'); // MANTER ??? 


// -------------------------------------

// --- END