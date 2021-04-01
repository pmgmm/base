<?php
/**
 * FRAMEWORK - ABSTRACT - HELPER POSTGRESQL
 * 
 * Disponibiliza métodos de suporte a operações com PostgreSQL
 *
 * @pmonteiro (yyyy-mm-dd)
 */ 
namespace FWK\abstracts;

abstract class PostgreSQLHelperAbstract {

    use \FWK\traits\throwableHandler;

    /**
     * Cria condição com termos de pesquisa sobre colunas de tabela
     * 
     * Condição: Todos os termos na coluna1 ou todos os termos na coluna2, ...
     *
     * @param array|null $search_columns = Colunas sujeitas a pesquisa : array('coluna1', ...)
     * @param string|null $search = Conteúdo a submeter a pesquisa
     * 
     * @return array = Condição isolada + parametros
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public static function multiWordSearch(?array $search_columns = null, ?string $search): array {
        try {
            $search_statement = array('conditions' => '', $parameters = array());

            // Apenas permite pesquisa > 2 caracteres por keyword
            if (isset($search) && strlen($search) > 2 && isset($search_columns)) {

                // Separa os termos
                $keywords = explode(' ', trim($search));
                
                // Concatenação de condição e array de parametros
                $conditions = '(';
                $parameters = array();
                // Para cada uma das colunas a sugeitar a pesquisa
                foreach ($search_columns as $column) {
                    $conditions .= '(';
                    // Para cada um dos termos a pesquisar (em conjunto)
                    $index = 0;
                    foreach ($keywords as $word) {
                        if (strlen($word) > 2) {
                            $index++;
                        /*
                        $conditions .= "unaccent_string($column) ~* ('[[:<:]]' || unaccent_string('" . $word . "')) AND ";
                        */
                        $parameters[":search_$index"] = $word;
                        }
                    }
                    $conditions = rtrim($conditions, ' AND ');
                    $conditions .= ') OR ';
                }
                $conditions = rtrim($conditions, ' OR ');
                $conditions .= ')';

                $search_statement['conditions'] = $conditions;
                $search_statement['parameters'] = $parameters;

            }
            
            return $search_statement;
        } catch (\Throwable $throwable) {
            throw self::throwableHandle($throwable);
        }
    }
}
// --- END    