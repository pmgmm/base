<?php
/**
* ENTITIES - USER - TEST
*
* @pmonteiro (2020-04-17)
*/

namespace CORE\tests\sets\entities;

use \CORE\entities\user as entity;
use \CORE\tests\TestAbstract;
use \CORE\tests\TestInterface;


class User extends TestAbstract implements TestInterface {

    use \FWK\traits\throwableHandler;


    /**
     * Processa Testes
     *
     * @return void
     * 
     * @pmonteiro (2020-04-17)
     */
    public function run(): void {
        try {

            // Testa Entidade
            $this->testEntity();

            // Testa Processadores
            $this->testProcessorBase();

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Testa Wntidade 
     *
     * @return void
     * 
     * @pmonteiro (2020-04-17)
     */
    private function testEntity() {
        try {
            
            //$test_id = uniqid();
            //$test_entity = new entity\Equipamento($this->repository);
            
        } catch (\Throwable $throwable) {
                throw $this->throwableHandle($throwable);
            }
        }


    /**
     * Testa Processador Base
     *
     * @return void
     * 
     * @pmonteiro (2020-04-17)
     */
    private function testProcessorBase() {
        try {

            $search = uniqid();
            $test_processor_base = new entity\processors\Base();
            $test_properties = array (
                    'account' => null,
                    'name' => 'Test User',
                    'password' => '12345',
                    'email' => 'pmgmm@hotmail.com',
                    'active' => false
                    );  
            $test_filter = array(
                    //'search' => $search,
                    'fields' => array('active' => true),
                    'order' => array('name DESC'),
                    'limit' => 10,
                    'offset' => 0);     
            $test_abort = false;
            
            // Insert de Utilizador
            try {
                $this->test_name = 'Insert';
                $test_processor_base->action = 'insert';
                $test_properties_insert = $test_properties;
                $test_processor_base->input_parameters = $test_properties_insert;
                $test_processor_base->run();
                $result = $test_processor_base->ajax_data['success'];
                $this->setAssert(self::ASSERT_INSERT, $result);
                if ($result) {
                    $test_properties['id'] = $test_processor_base->ajax_data['content']['id'];
                } else { // Não tem a informação de insert para prosseguir, aborta
                    $test_abort = true;
                }
            } catch (\Throwable $throwable) {
                $this->throwableHandle($throwable);
                $this->setAssert(self::ASSERT_EXCEPTION, false);
                // Não tem a informação de insert para prosseguir, aborta
                $test_abort = true;
            }


            // Não tem a informação de insert para prosseguir, aborta
            if (!$test_abort) {

                // Update
                try {
                    $this->test_name = 'Update';
                    $test_processor_base->action = 'update';
                    $test_properties_update = array_merge($test_properties, array(
                        'account' => 'tu1234',
                        'name' => 'Test User',
                        'active' => true
                    ));
                    $test_processor_base->input_parameters = $test_properties_update;
                    $test_processor_base->run();
                    $result = $test_processor_base->ajax_data['success'];
                    $this->setAssert(self::ASSERT_UPDATE, $result);
                } catch (\Throwable $throwable) {
                    $this->throwableHandle($throwable);
                    $this->setAssert(self::ASSERT_EXCEPTION, false);
                }

                // Get Record
                try {
                    $this->test_name = 'Get Record';
                    $test_processor_base->action = 'get_record';
                    $test_processor_base->input_parameters = array('id' => $test_properties['id']);
                    $test_processor_base->run();
                    $result = $test_processor_base->ajax_data['success'];
                    $content = $test_processor_base->ajax_data['content'];
                    if (!count($content)) {$result = false;}
                    $this->setAssert(self::ASSERT_READ, $result);
                } catch (\Throwable $throwable) {
                    $this->throwableHandle($throwable);
                    $this->setAssert(self::ASSERT_EXCEPTION, false);
                }

                // Get List
                try {
                    $this->test_name = 'Get List';
                    $test_processor_base->action = 'get_list';
                    $test_processor_base->input_parameters = array('filter' => $test_filter);
                    $test_processor_base->run();
                    $result = $test_processor_base->ajax_data['success'];
                    $content = $test_processor_base->ajax_data['content'];
                    if (!count($content)) {$result = false;}
                    $this->setAssert(self::ASSERT_READ_LIST, $result);
                } catch (\Throwable $throwable) {
                    $this->throwableHandle($throwable);
                    $this->setAssert(self::ASSERT_EXCEPTION, false);
                }

                // Delete
                try {
                    $this->test_name = 'Delete';
                    $test_processor_base->action = 'delete';
                    $test_processor_base->input_parameters = array('id' => $test_properties['id']);
                    $test_processor_base->run();
                    $result = $test_processor_base->ajax_data['success'];
                    $this->setAssert(self::ASSERT_DELETE, $result);
                } catch (\Throwable $throwable) {
                    $this->throwableHandle($throwable);
                    $this->setAssert(self::ASSERT_EXCEPTION, false);
                }

            } else { // Não tem a informação de insert para prosseguir, aborta

                $this->test_name = 'Engine (Insert)';
                $this->setAssert(self::ASSERT_TEST_ABORT, false);

            }
            
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }
  
}
// --- END