<?php
/**
 * ENTITIES - TRANSLATION - TRADUÇÕES
 * 
 * Disponibiliza métodos que permitem gerir a entidade TRANSLATION
 *  
 * @pmonteiro (yyyy-mm-dd))
 */

namespace DEV\entities\translation;


class Translation extends \FWK\abstracts\EntityAbstract implements \FWK\interfaces\EntityInterface {

    // Tabela da entidade
    protected array $base_table = array('sys_translations','st');

    // Colunas target de pesquisa por texto livre
    protected array $search_columns = array('lower(st.source)', 'lower(st.en_us)', 'lower(st.fr_fr)', 'lower(st.es_es)');

    
    /** OVERRIDE
     * Actualiza registo pelas propriedades préviamente carregadas (incluindo ID (primary key))
     *
     * @return bool = ? Sucesso
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public function update(): bool {
        try {

            $this->setProperty('source', str_replace(PHP_EOL, '<br>', $this->getProperty('source')));
            $this->setProperty('en_us', str_replace(PHP_EOL, '<br>', $this->getProperty('en_us')));
            $this->setProperty('fr_fr', str_replace(PHP_EOL, '<br>', $this->getProperty('fr_fr')));
            $this->setProperty('es_es', str_replace(PHP_EOL, '<br>', $this->getProperty('es_es')));

            return parent::update();
        } catch(\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }

    /**
     * Carrega propriedades de registo pela source (unique key)
     *
     * @param int $value = Valor da source
     * 
     * @return bool = ? Sucesso
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    final public function load_bySource(string $value): bool {
        try {
            $result = false;

            // Reset da classe
            $this->reset();

            // Condições e parâmetros para statement
            $db_conditions = '(source = :source)';
            $db_parameters = array();
            $db_parameters[':source'] = $value;
        
            // Lê registo
            if ($this->repository->read($this->base_table, null, $db_conditions, $db_parameters)) {
                $this->repository->loadNextRecord();
                // Set de propriedades
                $this->setProperties($this->repository->getRecord(),false);
                $result = true;
            }

            return $result;
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }

}
// --- END