<?php

namespace FWK\components\test_processors;

use \FWK\proxies\CoreAjax;

class ProcessorSelect implements \FWK\interfaces\AjaxAnswerInterface {

    use \FWK\traits\throwableHandler;

    // Acção a executar
    public ?string $action;

    // Container de resposta
    public ?array $answer;

    // Dados posted
    public ?array $data;

    // Ficheiros posted
    public ?array $files;

    // Tipo de resposta
    public ?string $response_type;
    

    /**
     * Construtor
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function __construct() {
        try {

            $this->action = '';
            $this->answer = array();
            $this->answer['success'] = true;
            $this->answer['content'] = '';
            $this->data = array();
            $this->files = array();
            
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    public function getOptions() {
        try {
            $options = array(
                array('id'=> 1,  'country'=>'Alemanha',        'statistics'=>array('population'=>83019213, 'gnc'=>435990)),
                array('id'=> "Áustria/xpto",  'country'=>'Áustria',         'statistics'=>array('population'=>8858775,  'gnc'=>398522)),
                array('id'=> 3,  'country'=>'Bélgica',         'statistics'=>array('population'=>11455519, 'gnc'=>473639)),
                array('id'=> 4,  'country'=>'Bulgária',        'statistics'=>array('population'=>7000039,  'gnc'=>60675)),
                array('id'=> 5,  'country'=>'Chipre',          'statistics'=>array('population'=>875899,   'gnc'=>21944)),
                array('id'=> 6,  'country'=>'Croácia',         'statistics'=>array('population'=>4076246,  'gnc'=>53937)),
                array('id'=> 7,  'country'=>'Dinamarca',       'statistics'=>array('population'=>5806081,  'gnc'=>310576)),
                array('id'=> 8,  'country'=>'Eslováquia',      'statistics'=>array('population'=>5450421,  'gnc'=>94177)),
                array('id'=> 9,  'country'=>'Eslovénia',       'statistics'=>array('population'=>2080908,  'gnc'=>48007)),
                array('id'=> 10, 'country'=>'Espanha',         'statistics'=>array('population'=>46934632, 'gnc'=>1244757)),
                array('id'=> 11, 'country'=>'Estónia',         'statistics'=>array('population'=>1324820,  'gnc'=>28037)),
                array('id'=> 12, 'country'=>'Finlândia',       'statistics'=>array('population'=>5517919,  'gnc'=>240924)),
                array('id'=> 13, 'country'=>'França',          'statistics'=>array('population'=>67012883, 'gnc'=>2418997)),
                array('id'=> 14, 'country'=>'Grécia',          'statistics'=>array('population'=>10724599, 'gnc'=>187457)),
                array('id'=> 15, 'country'=>'Hungria',         'statistics'=>array('population'=>9772756,  'gnc'=>143826)),
                array('id'=> 16, 'country'=>'Irlanda',         'statistics'=>array('population'=>4904240,  'gnc'=>347215)),
                array('id'=> 17, 'country'=>'Itália',          'statistics'=>array('population'=>60359546, 'gnc'=>1787664)),
                array('id'=> 18, 'country'=>'Letónia',         'statistics'=>array('population'=>1919968,  'gnc'=>30476)),
                array('id'=> 19, 'country'=>'Lituânia',        'statistics'=>array('population'=>2794184,  'gnc'=>48339)),
                array('id'=> 20, 'country'=>'Luxemburgo',      'statistics'=>array('population'=>613894,   'gnc'=>63516)),
                array('id'=> 21, 'country'=>'Malta',           'statistics'=>array('population'=>493559,   'gnc'=>13209)),
                array('id'=> 22, 'country'=>'Países Baixos',   'statistics'=>array('population'=>17282163, 'gnc'=>812051)),
                array('id'=> 23, 'country'=>'Polónia',         'statistics'=>array('population'=>37972812, 'gnc'=>527033)),
                array('id'=> 24, 'country'=>'Portugal',        'statistics'=>array('population'=>10276617, 'gnc'=>212303)),
                array('id'=> 25, 'country'=>'Reino Unido',     'statistics'=>array('population'=>66647112, 'gnc'=>2523314)),
                array('id'=> 26, 'country'=>'República Checa', 'statistics'=>array('population'=>10649800, 'gnc'=>219896)),
                array('id'=> 27, 'country'=>'Roménia',         'statistics'=>array('population'=>19414458, 'gnc'=>222090)),
                array('id'=> 28, 'country'=>'Suécia',          'statistics'=>array('population'=>10230185, 'gnc'=>474683))
            );

            $this->answer['success'] = true;
            $this->answer['content'] = $options;
  
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    public function getOptionsDragDrop() {
        try {

            $options = array(
                array('id'=> 1,  'code'=>'ADMINISTRATION'),
                array('id'=> 2,  'code'=>'MAINTENANCE'),
                array('id'=> 3,  'code'=>'SUPPORT'),
                array('id'=> 101,  'code'=>'MODULE_ADMINISTRATION'),
                array('id'=> 102,  'code'=>'MODULE_MAINTENANCE'),
                array('id'=> 103,  'code'=>'MODULE_SUPORT'),
                array('id'=> 104,  'code'=>'MODULE_ORGANIZATION'),
                array('id'=> 201,  'code'=>'USER'),
                array('id'=> 202,  'code'=>'GROUP'),
                array('id'=> 203,  'code'=>'ROLE'),
                array('id'=> 204,  'code'=>'PERMISSION'),
                array('id'=> 205,  'code'=>'APP_PWA'),
                array('id'=> 206,  'code'=>'MODULE_DELIVERY'),
                array('id'=> 207,  'code'=>'DELIVERY_USER'),
                array('id'=> 208,  'code'=>'DELIVERY_NOTIFICATION')
            );


            $details = array( 
                1 => false,
                2 => false,
                3 => false,
                101 => false,
                102 => false,
                103 => false,
                104 => false,
                201 => array(false,true,false,true),
                202 => array(true,true,true,true),
                203 => true,
                204 => true,
                205 => true,
                206 => false,
                207 => false,
                208 => false
            );

            $this->answer['success'] = true;
            $this->answer['content'] = array('options' => $options, 'details' => $details);
  
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }

    }
 



        /**
         * -----------------------------------------------------------------------------------------
         * Router de acções e respectivas respostas
         * ------------------------------------------------------------------------------------------
         */
        public function run(): void {
            try {
                // Redireccionamento de acções
                switch (strtoupper($this->action)) {
                    case 'GET_OPTIONS':
                        $this->response_type = CoreAjax::OUT_JSON;
                        $this->getOptions();
                        break;
                    case 'GET_OPTIONS_DRAGDROP':
                        $this->response_type = CoreAjax::OUT_JSON;
                        $this->getOptionsDragDrop();
                        break;
                    default:
                        throw new \Exception('ACTION "' . $this->action . '" does not exist in file "'.substr(__FILE__, strlen($_SERVER['DOCUMENT_ROOT'])).'"');
                    break;
                }

            } catch (\Throwable $throwable) {
                $this->response_type = CoreAjax::OUT_JSON;
                $this->answer['success'] = false;
                throw $this->throwableHandle($throwable);
            }
        }
}
// --- END