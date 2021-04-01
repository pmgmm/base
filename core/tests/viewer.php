<?php
/**
 * TESTES - VISUALIZADOR DE RELATÓRIOS DE ERROS
 * 
 * @pmonteiro (2020-03-20)
 */  

require_once '../config/autoload.php';
require_once '../config/base.php';

use \FWK\helpers\PageHelper;

$obj_page = new PageHelper(PageHelper::FREE);
$obj_page->setTitle('TESTES');
$obj_page->setCoreModule(0, 'Testes');
$obj_page->addScript('viewer.js');
$obj_page->addStyleSheet('tests.css');
$obj_page->renderTop();
?>
<button id="hideSuccesses" class="button blue" onclick="hideSuccesses();"><i class="fas fa-spinner fa-spin"></i>Mostrar apenas as falhas</button>
<button id="gotolist"class="button blue" onclick="window.open('index.php', '_self');">Lista de relatórios em linha</button>
<my-element></my-element>
<?php
    include('reports/'.$_GET['id'].'.html');
    $obj_page->renderBottom();
?>