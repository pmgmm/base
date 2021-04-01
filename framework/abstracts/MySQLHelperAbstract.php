<?php
/**
 * FRAMEWORK - ABSTRACT - HELPER MA
 * 
 * Disponibiliza métodos de suporte a operações com MySQL
 *
 * @pmonteiro (yyyy-mm-dd)
 */ 
namespace FWK\abstracts;

abstract class MySQLHelperAbstract {

    use \FWK\traits\throwableHandler;

    /**
     * Cria condição com termos de pesquisa sobre colunas de tabela
     * 
     * Condição: Todos os termos na coluna1 ou todos os termos na coluna2, ...
     *
     * @param array|null $search_columns = Colunas sujeitas a pesquisa : array('coluna1', ...)
     * @param string|null $search = Conteúdo a submeter a pesquisa > 2 caracteres
     * 
     * @return array = Condição isolada + parametros
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public static function multiWordSearch(?array $search_columns = null, ?string $search = ''): array {
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
                            $conditions .= "$column RLIKE :search_$index AND ";
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


    /**
     * Cria condição com lista de valores possíveis para coluna
     *
     * @param string $column = Coluna a sujeitar a lista de valores possíveis
     * @param array|null $value = Valores possíveis
     * 
     * @return string = Condição isolada
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    public static function whereInCondition(string $column, ?array $value = null): string {
        try {
            $result = '';

            if (isset($value) && count($value) > 0) {

                // Verifica se existe um valor "null" na lista de valores possíveis
                $has_null = in_array(null, $value);
                
                // Retira valor null da lista
                if ($has_null) {$value = array_filter($value); }
                
                // Cria a instrução "where IN"
                $result = "($column in (".implode(',',$value) . ')';

                // Consire o valor possível "null" como um alternativa (OR) à lista
                if ($has_null) {
                    $result .= " OR $column IS NULL)";
                } else {
                    $result .= ')';
                }

            }

        return $result;
    } catch (\Throwable $throwable) {
        throw self::throwableHandle($throwable);
        }
    }

}
// --- END    
