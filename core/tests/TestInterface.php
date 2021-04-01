<?php
 /**
 * TESTES - INTERFACE - GESTÃO DE CLASSES DE TESTE
 * 
 * Garante a integridade dos métodos públicos de classes de teste
 *
 * @pmonteiro (2020-03-20)
 */ 


namespace CORE\tests;

interface TestInterface {
    public function run(): void;
}