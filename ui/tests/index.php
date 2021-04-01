<?php
require_once '../../core/config/autoload.php';
require_once '../../core/config/base.php';

use \FWK\helpers\PageHelper;

$obj_page = new PageHelper(PageHelper::FREE);
$obj_page->setSubTitle('Testes de desenvolvimento');
$obj_page->setCoreModule(MODULE_TEST);
$obj_page->addStyleSheet('/ui/menu/test.css');
$obj_page->addScript('index.js');         
$obj_page->startContent('body');
?>

<input value="Entidade USER" type="button" onclick="testUser();"></input>

<input value="Classe ???" type="button" onclick="testEngine('???');"></input>
<br><br>
<input value="FULL TEST" type="button" onclick="testAll();"></input>
<a href="/core/tests/viewer/" target="test_report">Lista de testes em linha</input>
<div id="result"></div>

<?php $obj_page->render(); 

?>
