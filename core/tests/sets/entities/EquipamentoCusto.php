<?php
/**
* ENTITIES - EQUIPAMENTO CUSTO - TEST
*
* @pmonteiro (2020-03-16)
*/

namespace CORE\tests\sets\entities;

use \CORE\entities\equipamento_custo as entity;
use \CORE\tests\TestAbstract;
use \CORE\tests\TestInterface;


class EquipamentoCusto extends TestAbstract implements TestInterface {

    use \FWK\traits\throwableHandler;

    private int $parent_id;
    
    /**
     * Processa Testes
     *
     * @return void
     * 
     * @pmonteiro (2020-03-16)
     */
    public function run(): void {
        try {

            // Prepare parent structure
            if ($this->getValidParentInfo()) {

                // Testa Relações
                $this->testRelationCustosByEquipamento();

                // Testa Processadores
                $this->testProcessorBase();
            
            } else { // Não tem informação de pai para prosseguir, aborta

                $this->test_name = 'Engine (Parent Info)';
                $this->setAssert(self::ASSERT_TEST_ABORT, false);

            }

            } catch (\Throwable $throwable) {
                throw $this->throwableHandle($throwable);
            }
        }
        

    /**
     * Ler um pai válido para efetuar os teste
     *
     * @return void
     * 
     * @pmonteiro (2020-03-16)
     */
    private function getValidParentInfo() {
        try {
            $result = false;
            
            $this->repository->execute('SELECT MAX(id) AS id FROM equipamentos.equipamentos WHERE apagado IS NOT TRUE');
            if ($result = $this->repository->loadNextRecord()) {
                $this->parent_id = $this->repository->getRecord()['id'];
                $result = true;
            } 

            return $result;
        } catch (\Throwable $throwable) {
            $this->throwableHandle($throwable);
            $this->setAssert(self::ASSERT_EXCEPTION, false);
            return false;
        }

    }


    /**
     * Testa Relação 
     *
     * @return void
     * 
     * @pmonteiro (2020-03-16)
     */
    private function testRelationCustosByEquipamento() {
        try {
            } catch (\Throwable $throwable) {
                throw $this->throwableHandle($throwable);
            }
        }


    /**
     * Testa Processador Base
     *
     * @return void
     * 
     * @pmonteiro (2020-03-18)
     */
    private function testProcessorBase() {
        try {

            $test_id = uniqid();
            $test_entity_processor_base = new entity\processors\Base();
            $test_properties = array (
                    'id_equipamento' => $this->parent_id,
                    'data_inicio' => date('Y-m-d'),
                    'custo' => 1.1
                    );  
            $test_filter = array('fields' => array('id_equipamento' => 0),
                    'order' => array('data_inicio DESC'),
                    'limit' => 10,
                    'offset' => 0);     
            $test_abort = false;
            

            // Insert
            try {
                $this->test_name = 'Insert';
                $test_entity_processor_base->action = 'insert';
                $test_entity_processor_base->input_parameters = $test_properties;
                $test_entity_processor_base->run();
                $result = $test_entity_processor_base->ajax_data['success'];
                $this->setAssert(self::ASSERT_INSERT, $result);
                if ($result) {
                    $test_properties['id'] = $test_entity_processor_base->ajax_data['content']['id'];
                } else {
                    // Não tem informação de insert para prosseguir, aborta
                    $test_abort = true;
                }
            } catch (\Throwable $throwable) {
            $this->throwableHandle($throwable);
            $this->setAssert(self::ASSERT_EXCEPTION, false);
            // Não tem informação de insert para prosseguir, aborta
            $test_abort = true;
            }


            if (!$test_abort) {

                // Update
                try {
                    $this->test_name = 'Update';
                    $test_entity_processor_base->action = 'update';
                    $test_entity_processor_base->input_parameters = $test_properties;
                    $test_entity_processor_base->run();
                    $result = $test_entity_processor_base->ajax_data['success'];
                    $this->setAssert(self::ASSERT_UPDATE, $result);
                } catch (\Throwable $throwable) {
                    $this->throwableHandle($throwable);
                    $this->setAssert(self::ASSERT_EXCEPTION, false);
                }


                // Get Record
                try {
                    $this->test_name = 'Get Record';
                    $test_entity_processor_base->action = 'get_record';
                    $test_entity_processor_base->input_parameters = array('id' => $test_properties['id']);
                    $test_entity_processor_base->run();
                    $result = $test_entity_processor_base->ajax_data['success'];
                    $content = $test_entity_processor_base->ajax_data['content'];
                    if (!count($content)) {$result = false;}
                    $this->setAssert(self::ASSERT_READ, $result);
                } catch (\Throwable $throwable) {
                    $this->throwableHandle($throwable);
                    $this->setAssert(self::ASSERT_EXCEPTION, false);
                }

                // Get List
                try {
                    $this->test_name = 'Get List';
                    $test_entity_processor_base->action = 'get_list';
                    $test_filter['fields']['id_equipamento'] = $this->parent_id;
                    $test_entity_processor_base->input_parameters = array('filter' => $test_filter);
                    $test_entity_processor_base->run();
                    $result = $test_entity_processor_base->ajax_data['success'];
                    $content = $test_entity_processor_base->ajax_data['content'];
                    if (!count($content)) {$result = false;}
                    $this->setAssert(self::ASSERT_READ_LIST, $result);
                } catch (\Throwable $throwable) {
                    $this->throwableHandle($throwable);
                    $this->setAssert(self::ASSERT_EXCEPTION, false);
                }

                // Delete
                try {
                    $this->test_name = 'Delete';
                    $test_entity_processor_base->action = 'delete';
                    $test_entity_processor_base->input_parameters = array('id' => $test_properties['id']);
                    $test_entity_processor_base->run();
                    $result = $test_entity_processor_base->ajax_data['success'];
                    $this->setAssert(self::ASSERT_DELETE, $result);
                } catch (\Throwable $throwable) {
                    $this->throwableHandle($throwable);
                    $this->setAssert(self::ASSERT_EXCEPTION, false);
                }

            } else { // Se não tem informação de insert para prosseguir, aborta

                $this->test_name = 'Engine (Insert)';
                $this->setAssert(self::ASSERT_TEST_ABORT, false);

            }
            
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }
    
}
// --- END