<?php
/**
 * UI - HOME
 *  
 * @pmonteiro (yyyy-mm-dd))
 */

require_once $_SERVER['DOCUMENT_ROOT'] . '/core/config/autoload.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/core/config/base.php';

use \FWK\helpers\PageHelper;
use \FWK\helpers\TranslationHelper as TH;


final class _home {

    use \FWK\traits\throwableHandler;

    public function run(): void {
        try {

            // Setup de página
            $obj_page = new PageHelper(PageHelper::PAGE);
            $obj_page->setSubTitle('HOME');
            $obj_page->setBreadcrumb(TH::translate('HOME'), true);
            $obj_page->setCoreModule(MODULE_BASE);
            $obj_page->addScript('home.js');

            // Render de página
            $obj_page->render();
            
        } catch (\Throwable $throwable) {
            $this->throwableHandle($throwable);
        }   
    }

}

// Instancia e processa
$obj = new _home();
$obj->run();
// --- END