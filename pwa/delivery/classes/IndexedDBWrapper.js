/**
 * WRAPPER - INDEXEDDB
 * 
 * Disponibiliza métodos que permitem gerir a base de dados do Browser
 *
 * @pmonteiro (yyyy-mm-dd)
 */ 

// IndexedBD versões sobre sistema operativo
window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.OIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;


class IndexedDBWrapper {

   // Modos de transacção
   get WRITE() {return 'readwrite';}
   get READONLY() {return 'readonly';}


    /**
     * Constructor
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    constructor() {
        if (window.indexedDB) {
            console.info('IndexedDB supported');
        } else {
            console.error('IndexedDB not supported');
        }
    }


    /**
     * Cria conexão à DB e coloca-a na propriedade "repository" (promessa)
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    connect() {
        // Promessa
        return new Promise((resolve, reject) => {

            // Pedido de conexão
            const request = window.indexedDB.open(BD_NAME, DB_VERSION);
            
            // Conexão criada com sucesso
            request.onsuccess = (evt) => {
                console.info('IndexedDB successfully connected');
                this.repository = evt.target.result;
                resolve();
            }
            // Erro
            request.onerror = (evt) => {reject(evt.target.error);}

            // Cria e realiza update (se necessário) da BD
            request.onupgradeneeded = (evt) => {
                this.repository = evt.target.result;
                this.upgrade(evt.oldVersion);
                evt.target.transaction.oncomplete = (evt) => {
                    console.info('IndexedDB created/updated');
                    resolve();
                }
                // Erro
                request.onerror = (evt) => {reject(evt.target.error);}
            }

        })
    }


    /**
     * Cria ou altera DB pela versão
     * Para cada um das versões anteriores é realizado um upgrade específico até à versão actual
     * 
     * @param int old_version = Versão anterior da DB
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    upgrade(old_version) {

        switch (old_version) {
            case 0:
            case 1:
                let obj_store;
                let records;

                // Cria tabela CONFIG
                console.info('Create CONFIG store');
                obj_store = this.repository.createObjectStore("config", { keyPath: "key" });;
                
                // Adiciona registos
                records =   [{'key':'language','value': DEFAULT_LANGUAGE}]
                // Keys dinâmicas:
                //      vapid_public_key                
                records.forEach(record => {
                    obj_store.add(record);
                });

                 // Cria tabela USER
                console.info('Create USER store');
                obj_store = this.repository.createObjectStore("user", { keyPath: "key" });
                
                // Adiciona registos
                records =   [{'key':'logged_in','value':false}];
                // Keys dinâmicas:
                //      authorization
                //      name
                records.forEach(record => {
                    obj_store.add(record);
                });

                // Cria tabela TASKS
                console.info('Create TASKS store');
                obj_store = this.repository.createObjectStore("tasks", { keyPath: "key" });
                // Cria indices para tabela TASKS
                console.info('Create TASKS indexes');
                obj_store.createIndex("estimated_time", "estimated_time", { unique: false });
                obj_store.createIndex("status", "status",{ unique: false });
                obj_store.createIndex("synchronized", "synchronized", { unique: false });

                // Cria tabela RUNTIME
                console.info('Create RUNTIME store');
                obj_store = this.repository.createObjectStore("runtime", { keyPath: "key" });
              break;
            case 2:
                break;
        
          }
        }

    
    /**
     * Cria e devolve transacção sobre tabela(s) (promessa)
     * 
     * @param array stores = Tabelas a utilizar na transacção
     * @param string stores = Modos de transacção (constante = propriedade)
     * 
     * @return transaction
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    beginTransaction(stores, mode) {
        // Promessa
        return new Promise((resolve) => {
            let transaction = this.repository.transaction(stores, mode);
            resolve(transaction);
            });
    }


    /**
     * Devolve lista de todos os registos de tabela (promessa)
     * 
     * @param transaction transaction = Transacção
     * @param string store = Tabela
     * 
     * @return array = Lista (array de objectos)
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    getList(transaction, store) {
        // Promessa
        return new Promise((resolve, reject) => { 
            let obj_transaction_store = transaction.objectStore(store);
            let request = obj_transaction_store.getAll();

            request.onsuccess = (evt) => {resolve(request.result);}
            request.onerror = (evt) => {reject(evt.target.error);} 
        });
    }


    //TODO:
    async getListByIndex(transaction, store, index, range) {
        return new Promise((resolve, reject) => { 
            let obj_transaction_store = transaction.objectStore(store);
            index = obj_transaction_store.index(index); 
            
            let fromDate = "2020-10-05 15:00:02";
            let toDate ="2020-10-06 15:00:00"
            
            if(fromDate != "" && toDate != "") {
                range = IDBKeyRange.bound(fromDate, toDate);
            } else if(fromDate == "") {
                range = IDBKeyRange.upperBound(toDate);
            } else {
                range = IDBKeyRange.lowerBound(fromDate);
            }

            let request = index.getAll(range);
            
            request.onsuccess = (evt) => {resolve(request.result);}
            request.onerror = (evt) => {reject(evt.target.error);} 
        });
    }

    
    /**
     * Devolve registo de tabela pela key (promessa)
     * 
     * @param transaction transaction = Transacção
     * @param string store = Tabela
     * @param string key = Key do registo
     * 
     * @return object = Registo
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    async getRecordByKey(transaction, store, key) {
        // Promessa
        return new Promise((resolve, reject) => { 
            let obj_transaction_store = transaction.objectStore(store);
            let request = obj_transaction_store.get(key);

            request.onsuccess = (evt) => {resolve(request.result);}
            request.onerror = (evt) => {reject(evt.target.error);} 
        });
    }


   /**
     * Insere registo(s) em tabela (promessa)
     * 
     * @param transaction transaction = Transacção
     * @param string store = Tabela
     * @param array records = Registos (array de objectos)
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    async insert(transaction, store, records) {
        // Promessa
        return new Promise((resolve, reject) => { 
            let obj_transaction_store = transaction.objectStore(store);
            records.forEach(record => {obj_transaction_store.add(record);});

            transaction.onsuccess = (evt) => {resolve();}
            transaction.onerror = (evt) => {reject(evt.target.error);}
        });
    }


   /**
     * Insere ou altera registo(s) em tabela (promessa)
     * Se não existe, insere. Se existe, altera.
     * 
     * @param transaction transaction = Transacção
     * @param string store = Tabela
     * @param array records = Registos (array de objectos)
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    async update(transaction, store, records) {
        // Promessa
        return new Promise((resolve, reject) => { 
            let obj_transaction_store = transaction.objectStore(store);
            records.forEach(record => {obj_transaction_store.put(record);});

            transaction.onsuccess = (evt) => {resolve();}
            transaction.onerror = (evt) => {reject(evt.target.error);}
        });
    }


   /**
     * Elimina registo(s) de tabela pela(s) key(s) (promessa)
     * 
     * @param transaction transaction = Transacção
     * @param string store = Tabela
     * @param array keys = Keys
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    async delete(transaction, store, keys) {
        // Promessa
        return new Promise((resolve, reject) => { 
            let obj_transaction_store = transaction.objectStore(store);
            keys.forEach(key => {obj_transaction_store.delete(key);});

            transaction.onsuccess = (evt) => {resolve();}
            transaction.onerror = (evt) => {reject(evt.target.error);}
        });
    }


    /**
     * Elimina todos os registos de tabela (promessa)
     * 
     * @param transaction transaction = Transacção
     * @param string store = Tabela
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
     async deleteAll(transaction, store) {
        // Promessa
        return new Promise((resolve, reject) => { 
            let obj_transaction_store = transaction.objectStore(store);
            obj_transaction_store.clear();

            transaction.onsuccess = (evt) => {resolve();}
            transaction.onerror = (evt) => {reject(evt.target.error);}
        });
    }


    /**
     * Devolve todas as keys de tabela (promessa)
     * 
     * @param transaction transaction = Transacção
     * @param string store = Tabela
     * 
     * @return array = Keys
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    async getAllKeys(transaction, store) {
        // Promessa
        return new Promise((resolve, reject) => { 
            let obj_transaction_store = transaction.objectStore(store);
            let request = obj_transaction_store.getAllKeys();

            transaction.onsuccess = (evt) => {resolve();}
            transaction.onerror = (evt) => {reject(evt.target.error);}
        });
    }

}
// --- END