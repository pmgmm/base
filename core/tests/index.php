<?php
 /**
 * TESTES - UI - GERADOR DE RELATÓRIOS + LISTA DE RELATÓRIOS
 *
 * @pmonteiro (2020-03-20)
 */ 

require_once '../config/autoload.php';
require_once '../config/base.php';

use \FWK\helpers\PageHelper;

$obj_page = new PageHelper(PageHelper::FREE);
$obj_page->setSubTitle('TESTES');
$obj_page->setCoreModule(0, 'Testes');
$obj_page->addScript('index.js');
$obj_page->addStyleSheet('tests.css');
$obj_page->renderTop();
?>
<table class="tests">
    <tr>
        <td> 
            <button class="button blue" onclick="testAll(this);"><i class="fas fa-spinner fa-spin"></i>FULL TEST</button>
        </td>
    </tr>
<table>
<table class="reports">
    <tr class="title">
        <td>Relatório de testes</td>
        <td>Data</td>
    </tr>
<?php
$arr_files = scandir('reports/');
$arr_files = array_diff($arr_files, array('.', '..'));
rsort($arr_files);
$html = '';
foreach ($arr_files as $filename){
    $file_datetime = date('Y-m-d H:i:s', explode('_', $filename)[1]);
    $file_code = substr($filename, 0, -5);
    $fail_css = '';
    if ((bool)substr($file_code, -1)) {
        $fail_css = ' fail';
    }
    $html .= '    <tr class="line'.$fail_css.'">' . PHP_EOL;
    $html .= '        <td><a href="viewer.php?id='.$file_code.'">'.$file_code.'</td>' . PHP_EOL;
    $html .= "        <td>$file_datetime</td>" . PHP_EOL;
    $html .= '    </tr>' . PHP_EOL;   
}
$html .= '</table>' . PHP_EOL;
echo $html;

$obj_page->renderBottom();

// --- END