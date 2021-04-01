<?php
/**
 * ENTITIES - ROLE - FUNÇÕES DE UTILIZADORES
 * 
 * Disponibiliza métodos que permitem gerir a entidade FUNÇÃO
 *  
 * @pmonteiro (yyyy-mm-dd)
 */

namespace CORE\entities\role;


class Role extends \FWK\abstracts\EntityAbstract implements \FWK\interfaces\EntityInterface {

    // Tabela da entidade
    protected array $base_table = array('sys_roles','sr');

    // Colunas target de pesquisa por texto livre
    protected array $search_columns = array('sr.name', 'sr.description');


    /** OVERRIDE
     * Insere registo pelas propriedades préviamente carregadas
     *
     * @return bool = ? Sucesso
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function insert(): bool {
        try {

            // Nenhum role inserido é de sistema
            $this->setProperty('_system', false);

            return parent::insert();
        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }

}
// --- END