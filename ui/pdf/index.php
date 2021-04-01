<?php

require_once '../../core/config/autoload.php';
require_once '../../core/config/base.php';


use \FWK\wrappers\repositories\main\Repository;
use \CORE\entities\tarefa as tarefa;
use \FWK\engines\EngineExporter;

use  \FWK\templates as templates;


$obj_repository = new Repository();
$obj_tarefa = new tarefa\Tarefa($obj_repository);



$obj_template = new templates\pdf\A0();
$obj_exporter = new tarefa\exporters\Intervencao($obj_template, $obj_repository);


/* $obj_tarefa->setExporter($obj_exporter);
$file = $obj_tarefa->export();*/


$obj_engine_exporter = new EngineExporter();
$obj_engine_exporter->setExporter($obj_exporter);
$file = $obj_engine_exporter->export(array(1)); 

$r=1;

/* 



$instancia = 'pdf';
$fqcn = ' \FWK\templates\\'.$instancia.'\A0';

$exporter = new \CORE\entities\tarefa\exporters\Intervencao(new $fqcn());


$exporter->export(); */

