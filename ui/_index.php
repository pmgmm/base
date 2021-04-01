<?php
 /**
 * TESTES - UI - GERADOR DE RELATÓRIOS + LISTA DE RELATÓRIOS
 *
 * @pmonteiro (2020-03-20)
 */ 

require_once '../core/config/autoload.php';
require_once '../core/config/base.php';

use \FWK\wrappers\repositories\main\Repository;
use \FWK\helpers\PageHelper;
use \FWK\helpers\TranslationHelper;
use \FWK\helpers\DateTimeHelper;

$obj_page = new PageHelper();
$obj_page->setSubTitle('TESTES');
$obj_page->setCoreModule(0, 'Testes');
$obj_page->addScript('index.js');
$obj_page->addStyleSheet('tests.css');
$obj_page->renderTop();


$repository = new Repository();

$obj_user = new \CORE\entities\user\User($repository);

$obj_user->load_byID(62);

echo 'DB: ' . $obj_user->getProperty('created_on') . '<br>';
$utc = DateTimeHelper::datetimeToUtc($obj_user->getProperty('created_on'));
echo 'UTC: ' . $utc . '<br>';
$local = DateTimeHelper::datetimeToLocal($utc);
echo 'LOCAL: ' . $local . '<br><br><br><br>';

echo DateTimeHelper::datetimeToUtc(date('Y-m-d'));
echo '<br>';
echo DateTimeHelper::datetimeToUtc(date('H:i:s'));
echo '<br>';
echo DateTimeHelper::datetimeToUtc(date('Y-m-d H:i:s'));

echo TranslationHelper::translate('Olá Mundo!');

$obj_page->renderBottom();

// --- END


