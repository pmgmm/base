<?php
/**
 * FRAMEWORK - ABSTRACT - WRAPPER SOBRE MYSQL
 * 
 * Disponibiliza métodos que permitem responder a solicitações sobre sobre a DB MySQL
 * Esta classe não pode ser instanciada, tem de ser estendida
 * Sempre que uma extensão desta classe é instanciada, é criada uma ligação à DB
 *
 * Métodos Públicos: 
 * 
 * - reconnect : Recria conexão à Base de Dados
 * - checkHeartBeat : valia disponibilidade da conexão à Base de Dados
 * - ensureHeartBeat : Assegura disponibilidade da conexão à Base de Dados (sempre que db esteja disponível)
 * - close : Fecha conexão à Base de Dados
 *
 * - beginTransaction : Inicia uma transação
 * - rollbackTransaction : Rollback de transação
 * - commitTransaction : Commit de transação
 * 
 * - read : Obtém registos
 * - loadNextRecord : Carrega o registo seguinte do result set
 * - getRecord : Devolve o registo atualmente carregado
 * - getRecords : Devolve todo o result set
 * - getLastGeneratedID ; Devolve o id gerado na última inserção
 * - getNextID : Devolve e "queima" o id passível de ser utilizado na próxima inserção
 *
 * - insert : Insere registo
 * - update : Altera registo(s)
 * - delete : Elimina registo(s)
 * - execute : Executa instruções (CRUD) em formato livre com passagem de parâmetros
 * 
 * @pmonteiro (2019-11-20)
 */

namespace FWK\abstracts;

abstract class MySQLAbstract {

    // Work + Const
    protected ?\PDO $connection;            // Objecto de conexão à base de dados
    protected bool $transaction_started;    // Flag de indicação se existe uma transação iniciada
    protected ?\PDOStatement $result_set;   // Container de result set
    protected ?int $result_set_count;       // Container de número de registos do result set
    protected ?int $last_generated_id;      // Container de último id gerado na inserção
    protected ?array $record;               // Container de registo carregado
    protected string $host;                 // Container de host de base de dados
    protected string $port;                 // Container de porta de base de dados
    protected string $name;                 // Container de nome de base de dados
    protected string $user;                 // Container de utilizador de base de dados
    protected string $password;             // Container de password de base de dados    

    /**
     * Construtor
     *
     * @return void
     * 
     * @pmonteiro (2020-04-17)
     */
    public function __construct() {
        try {
            
            $this->connect();

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    // ----------------------------------------------------------------------------------- CONNECTION


    /**
     * Cria conexão à Base de Dados
     *
     * @return boolean = ? Disponível
     * 
     * @pmonteiro (2020-04-17)
     */
    final private function connect(): bool {
        try {

            $this->reset();
            $host = $this->host;
            $port = $this->port;
            $name = $this->name;
            $user = $this->user;
            $password = $this->password;
            $this->connection = new \PDO ("mysql:host=$host;port=$port;dbname=$name", $user, $password);
            $this->connection->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
            

            return true;
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Recria conexão à Base de Dados
     *
     * @return boolean = ? Disponível
     * 
     * @pmonteiro (2020-04-17)
     */
    final public function reconnect(): bool {
        try {
            return $this->connect();
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /** 
     * Avalia disponibilidade da conexão à Base de Dados
     *
     * @return boolean = ? Disponível
     * 
     * @pmonteiro (2020-04-17)
     */
    final public function checkHeartBeat(): bool {
        try {

             $statement = $this->connection->prepare('SELECT 1');
             $statement->execute();

             return boolval($statement->fetch(\PDO::FETCH_NUM));
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /** 
     * Assegura disponibilidade da conexão à Base de Dados (sempre que db esteja disponível)
     *
     * @return boolean = ? Disponível
     * 
     * @pmonteiro (2020-04-17)
     */
    final public function ensureHeartBeat(): bool {
        try {

            $result = $this->checkHeartBeat();
            if (!$result) {
                $result = $this->reconnect();
            }

            return $result;
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Fecha conexão à Base de Dados
     *
     * @return void
     * 
     * @pmonteiro (2020-04-17)
     */
    final public function close(): void {
        try {

            $this->connection = null;

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    // ----------------------------------------------------------------------------------- TRANSACÇÃO


    /**
     * Inicia uma transação
     *
     * @return boolean = ? Iniciou a transação
     * 
     * @pmonteiro (2020-04-17)
     */
    final public function beginTransaction(): bool {
        try {

            if (!$this->transaction_started) {
                if ($this->connection->beginTransaction()) {
                    $this->transaction_started = true;
                }
            }

            return $this->transaction_started;
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Rollback de transação
     * 
     * @return void
     * 
     * @pmonteiro (2020-04-17)
     */
    final public function rollbackTransaction(): void {
        try {

            if ($this->transaction_started) {
                if ($this->connection->rollBack()) {
                    $this->transaction_started = false;
                }
            }

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Commit de transação
     * 
     * @return void
     * 
     * @pmonteiro (2020-04-17)
     */
    final public function commitTransaction(): void {
        try {

            if ($this->transaction_started) {
                if ($this->connection->commit()) {
                    $this->transaction_started = false;
                }
            }

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    // ----------------------------------------------------------------------------------- READ


    /**
     * Obtém registo(s)
     *
     * @param array $base_table = Informação da tabela principal : array('schema.tablename', 'alias')
     * @param array|null $fields = Campos a ler : array('id', 'description', 'alias.xxxxx', ...). null = devolve todos
     * @param string|null $conditions = Condições de query : 'id=:id AND alias.xxxx!=:xxxx, ... OR ...'
     * @param array|null $parameters = Parâmetros a utilizar : array(':id' => 1, ...)
     * @param array|null $order = Ordenação de registos : array('description ASC, alias.xxxx DESC, ...')
     * @param int|null $limit = Número máximo de registos a devolver
     * @param int|null $offset  = Número de registos a ignorar
     * @param array|null $temporaries = Tabelas temporárias a gerar : array('tmp1' => 'SELECT * FROM logs.error WHERE id < :tmpid')
     * @param array|null $joins = Ligações a outras tabelas : array('LEFT JOIN ... AS ... ON ...', 'INNER JOIN ... AS ... ON ...)
     * 
     * @return integer = Número de registos abrangidos
     * 
     * @pmonteiro (2020-04-17) 
     */
    final public function read(array $base_table, ?array $fields=null, ?string $conditions=null, ?array $parameters=null, ?array $order=null, ?int $limit=null, ?int $offset=null, ?array $temporaries=null, ?array $joins=null): int {
        try {

            $table = $base_table[0];
            $table_alias = $base_table[1];
            if (isset($fields)) {$fields = implode(',', $fields);}
            else {$fields = "$table_alias.*";}
            
            // Concatenar statement
            $statement = '';

            if (isset($temporaries)) {
                $statement = 'WITH ';
                foreach ($temporaries AS $key => $value) {
                    $statement .= " \n$key AS ($value),";
                }
                $statement = rtrim($statement,','). "\n";
            } 

            $statement .= "SELECT $fields \nFROM $table AS $table_alias";

             if (isset($joins)) {
                foreach ($joins as $join) {$statement .= " \n$join";}
            } 

            if (isset($conditions) && !empty($conditions)) {$statement .= " \nWHERE $conditions";}
            
            if (isset($order) && count($order)) {
                $statement .= " \nORDER BY ";
                foreach ($order AS $value) {
                    $statement .= "$value,";
                }
                $statement = rtrim($statement,',');
            } 

            if (isset($limit)) {$statement .= " \nLIMIT $limit";
                if (isset($offset)) {$statement .= " \nOFFSET $offset";} 
            } 

            // Preparar statement 
            $this->result_set = $this->connection->prepare($statement);

            // Adicionar os parâmetros
            $this->result_set = $this->bindParameters($this->result_set, $parameters);
    
            // Executar statement
            $this->result_set->execute();

            // Devolve o número de registos abrangidos
            $this->result_set_count = $this->result_set->rowCount();

            return $this->result_set_count; 
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable, $this->result_set->queryString, $parameters);
        }
    }


    /**
     * Carrega o registo seguinte do result set
     * 
     * @return boolean = ? Sucesso
     * 
     * @pmonteiro (2019-11-19) 
     */
    final public function loadNextRecord(): bool {
        try {

            $record = $this->result_set->fetch(\PDO::FETCH_ASSOC);

            if ((bool)$record) {
                $this->record = $record;
            }

            return ((bool)$record);
         } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Devolve o registo actualmente carregado
     *
     * @return array = Registo
     * 
     * @pmonteiro (2019-11-19) 
     */
    final public function getRecord(): array {
        try {

            $record = array();
            if (isset($this->record)) {
                $record = $this->record;
            }

            return $record;
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }

    
    /**
     * Devolve todo o result set
     * Os parâmetros são mutuamente exclusivos
     * 
     * @param bool $key_pair = Devolve os registos em formato de array(key => value) : array('1'=> 'valor1', '2' => valor2)
     * @param bool $group = Devolve os registos agrupados por id : array('1'=> array(array('name'=>'...', ...)))
     *
     * @return array = Registos
     * 
     * @pmonteiro (2019-11-19) 
     */
    final public function getRecords(bool $key_pair=false, bool $group=false): array {
        try {

            $records = array();
            if ($key_pair && $group) {
                $key_pair=false; 
                $group=false;
            }
            if (!$key_pair && !$group) {
                $records = $this->result_set->fetchAll(\PDO::FETCH_ASSOC);
            } else if ($key_pair) {
                $records = $this->result_set->fetchAll(\PDO::FETCH_KEY_PAIR);
            } else if ($group) {
                $records = $this->result_set->fetchAll(\PDO::FETCH_ASSOC | \PDO::FETCH_GROUP);
            }

            return $records;
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    /**
     * Devolve o id gerado na última inserção
     *
     * @return integer = Último id gerado
     * 
     * @pmonteiro (2019-11-20) 
     */
    final public function getLastGeneratedID(): int {
        try {

            $this->result_set = null;   
            $this->last_generated_id = $this->connection->lastInsertId();

            return $this->last_generated_id;
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    // ----------------------------------------------------------------------------------- WRITE


    /**
     * Insere registo
     *
     * @param array $base_table = Informação da tabela principal : array('schema.tablename', 'alias')
     * @param array $fields = Campos a inserir : array('id', 'description', 'alias.xxxxx', ...)
     * @param array $parameters = Parâmetros a utilizar : array(':id' => 1, ...)
     * 
     * @return boolean = ? Inserido
     * 
     * @pmonteiro (2019-11-20) 
     */
    final public function insert(array $base_table, array $fields, array $parameters): bool {
        try {

            $this->result_set_count = false;
            $this->result_set = null;
            $table = $base_table[0];
            $fields = implode(', ', $fields);

            // Concatenar statement
            $statement = "INSERT INTO $table\n($fields)";

            // Adicionar os parâmetros ao VALUES do statement
            $value_parameters = '';
            foreach (array_keys($parameters) as $key) {
                $value_parameters .= "$key, ";
                }
            $value_parameters = substr_replace($value_parameters, '', -2);
            $statement .= "\nVALUES ($value_parameters)";

            // Preparar statement 
            $statement = $this->connection->prepare($statement);

            // Adicionar os parâmetros
            $statement = $this->bindParameters($statement, $parameters);

            // Executar statement
            $result = $statement->execute();
  
            return $result;
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable, $statement->queryString, $parameters);
        }
    }


    /**
     * Altera registo(s)
     *
     * @param array $base_table = Informação da tabela principal : array('schema.tablename', 'alias')
     * @param array $fields = Campos a alterar : array('id', 'description', 'alias.xxxxx', ...)
     * @param string $conditions = Condições de query : 'id=:id AND alias.xxxx!=:xxxx, ... OR ...'
     * @param array|null $parameters = Parâmetros a utilizar : array(':id' => 1, ...)
     * 
     * @return integer = Número de registos abrangidos
     * 
     * @pmonteiro (2019-11-20) 
     */
    final public function update(array $base_table, array $fields, string $conditions, ?array $parameters=null): int {
        try {

            $table = $base_table[0];
            $table_alias = $base_table[1];
            $fields_values = '';

            // Concatenar campos
            foreach ($fields AS $field) {
                $fields_values .= "$field=:$field, ";
            }
            $fields_values = substr_replace($fields_values, '', -2);

            // Concatenar statement
            $statement = "UPDATE $table AS $table_alias\nSET $fields_values\nWHERE $conditions";

            // Preparar statement 
            $statement = $this->connection->prepare($statement);

            // Adicionar os parâmetros
            $statement = $this->bindParameters($statement, $parameters);

            // Executar statement
            $statement->execute();

            return $statement->rowCount(); 
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable, $statement->queryString, $parameters);
        }
    }

 
    /**
     * Elimina registo(s)
     *
     * @param array $base_table = Informação da tabela principal : array('schema.tablename', 'alias')
     * @param string $conditions = Condições de delete : 'id=:id AND alias.xxxx!=:xxxx, ... OR ...'
     * @param array|null $parameters = Parâmetros a utilizar : array(':id' => 1, ...)
     * 
     * @return integer = Número de registos abrangidos
     * 
     * @pmonteiro (2019-11-20)  
     */
    final public function delete(array $base_table, string $conditions, ?array $parameters=null): int {
        try {

            $table = $base_table[0];
            $table_alias = $base_table[1];

            // Concatenar statement
            $statement = "DELETE FROM $table AS $table_alias\nWHERE $conditions";

            // Preparar statement 
            $statement = $this->connection->prepare($statement);

            // Adicionar os parâmetros
            $statement = $this->bindParameters($statement, $parameters);

            // Executar statement
            $statement->execute();

            return $statement->rowCount();
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable, $statement->queryString, $parameters);
        }
    }

      
    /**
     * Executa instruções (CRUD) em formato livre com passagem de parâmetros
     *
     * @param string $statement = Instrução sql : SELECT ...., DELETE ...
     * @param array|null $parameters = Parâmetros a utilizar : array(':id' => 1, ...)
     * 
     * @return integer = Número de registos abrangidos
     * 
     * @pmonteiro (2019-11-20)   
     */
    final public function execute(string $statement, ?array $parameters=null): int {
        try {
            
            // Preparar statement 
            $statement = $this->connection->prepare($statement);

            // Adicionar os parâmetros
            $statement = $this->bindParameters($statement, $parameters);

            // Executar statement
            $statement->execute();
            $result = $this->result_set_count = $statement->rowCount();
            if ($statement->columnCount()) {
                $this->result_set = $statement;
                $result =  $this->result_set_count = $statement->rowCount();
            }

            return $result;
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable, $statement->queryString, $parameters);
        }
    }


    // ----------------------------------------------------------------------------------- SUPPORT 


    /**
     * Adiciona parâmetros a PDOStatement
     *
     * @param \PDOStatement $statement = PDOStatement
     * @param array|null $parameters = Parâmetros a adicionar : array(':id' => 1, ...)
     * 
     * @return \PDOStatement = PDOStatement com parâmetros adicionados
     * 
     * @pmonteiro (2019-11-20)   
     */
    final private function bindParameters(\PDOStatement $statement, ?array $parameters = null): \PDOStatement {
        try {

            // Adicionar os parâmetros ao PDOStatement
            if($parameters) {
                foreach ($parameters AS $key => $value) {
                    switch (strtolower(gettype($value))) {
                        case 'null':
                            $statement->bindValue("$key", NULL, \PDO::PARAM_NULL);
                            break;
                        case 'boolean':
                            $statement->bindValue("$key", $value, \PDO::PARAM_BOOL);
                            break;
                    case 'boolean':
                            $statement->bindValue("$key", $value, \PDO::PARAM_BOOL);
                            break;
                        default:
                            $statement->bindValue("$key", ($value==='') ? null : $value);
                            break;
                    }
                }
            } 

            return $statement;
        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable, $statement->queryString, $parameters);
        }
    }


    // ----------------------------------------------------------------------------------- RESET


    /**
     * Reset da classe
     * 
     * @return void
     * 
     * @pmonteiro (2019-11-20)   
     */
    final private function reset(): void {
        try {

            $this->connection = null;
            $this->result_set = null;
            $this->last_generated_id = null;
            $this->record = null;
            $this->result_set = null;
            $this->result_set_count = null;
            $this->transaction_started = false;

        } catch (\Throwable $throwable) {
            throw $this->throwableHandle($throwable);
        }
    }


    // ----------------------------------------------------------------------------------- "THROWABLE"
    // Específico desta classe
    
    /** 
     * Faz o rollback da transação se estiver aberta
     * Trata "Throwable" (Exception ou Error) capturado nos diversos métodos
     * Se o "Throwable" for do tipo "FWK\classes\ExErr", indica já foi migrado do tipo origem.
     * Se o "Throwable" for de outro tipo, é migrado para o tipo "FWK\classes\ExErr"
     * Se o "Throwable" for do tipo \PDOException, é adicionada informação suplementar
     * Em todos os casos, o "Throwable" é devolvido para ser lançado para o nível anterior (throw)
     *
     * @param \Throwable $throwable = Exception ou Error
     * @param string|null $statement = Instrução sql que deu origem à exceção (se for o caso)
     * @param array|null $parameters =  Parâmetros associados à instrução sql que deu origem à exceção (se for o caso)
     * 
     * @return object = \Throwable do tipo "FWK\classes\ExErr"
     * @pmonteiro (2019-11-20)   
     */
    final protected function throwableHandle(\Throwable $throwable, ?string $statement=null, ?array $parameters=null): \Throwable {
        try {

            if ($this->transaction_started) {
                $this->rollbackTransaction();
            }

            $class = get_class($throwable);
            
            if ($class != 'FWK\classes\ExErr') {
                $throwable = new \FWK\classes\ExErr($throwable);
                if ($class == 'PDOException' && isset($statement)) {
                    $throwable->addPDOInformation($statement, $parameters);
                }
            }
            
            return $throwable;
        } catch (\Throwable $throwable) {
            return $throwable;
        }
    }

}
// --- END