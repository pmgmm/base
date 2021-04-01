<?php
/**
 * FRAMEWORK - TEMPLATES - EXCEL - EXCEL
 * 
 * 
 * @diogo.ferreira (2020-03-02)
 */ 

namespace FWK\templates\excel;

use  \FWK\traits as traits;
use \PhpOffice\PhpSpreadsheet as spreadsheet;

final class Excel implements  \FWK\interfaces\excel\TemplateInterface {

    use traits\throwableHandler;
    

    protected spreadsheet\Spreadsheet $excel;
    

    /**
     * Contructor
     * Setup de Spreadsheet segundo configuração
     *
     * @pmonteiro (2020-03-02)
     */    
    public function __construct() {
        try {

            $excel = new spreadsheet\Spreadsheet();
            $sheet = $excel->getActiveSheet();
            $sheet->setCellValue('A1', 'Super');

            $writer = new spreadsheet\Writer\Xlsx($excel);
            $writer->save('/opt/navia/files/Temp/hello_world.xlsx');

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable, '');
        }
    }


  
}
// --- END