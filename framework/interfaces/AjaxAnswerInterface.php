<?php
/**
 * FRAMEWORK - INTERFACE - AJAX ANSWER
 * 
 * Garante a integridade dos métodos públicos de classes de Respostas Ajax
 * 
 * @pmonteiro (yyyy-mm-dd)
 */ 

namespace FWK\interfaces;

interface AjaxAnswerInterface {     
    // Router de acções e respectivas respostas
    public function run(); 
}
// --- END