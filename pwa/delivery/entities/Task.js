/**
 * ENTITIES - TASK
 * 
 * Disponibiliza métodos que permitem gerir a entidade TASK
 *
 * @pmonteiro (yyyy-mm-dd)
 */ 


class Task {

    constructor() {}


    // --- Getter's & Setter's

    // Id da tarefa
    set id(value) {this._id = value;}
    get id() {return this._id;}

    // Locais para direcções google maps
    set places(value) {this._places = value;}
    get places() {return this._places ? this._places : [];}


    /**
     * Sincroniza SERVER -> DEVICE (promessa)
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    syncFromServer() {
        // Promessa
        return new Promise((resolve, reject) => { 

            // Preparação de dados do pedido
            var obj_form_data = new FormData();	

            // Dados obrigatórios do pedido
            obj_form_data.append('fully_qualified_class_name', '\\CORE\\entities\\delivery_task\\processors\\Mobile'.replace(/\\\\/g, '\\'));
            obj_form_data.append('module', PWA_MODULE);
            obj_form_data.append('action', 'get_list');
            obj_form_data.append('action_data', JSON.stringify({}));
            obj_form_data.append('rid', Math.floor(Math.random() * 1000000000));
            obj_form_data.append('pack_id', 1);

            // Pedido ao servidor
            fetch (PROXY_ADDRESS, {
                method: 'POST',
                headers: {
                    Name: PWA_NAME,
                    Key: PWA_KEY,
                    Authorization: USER.authorization
                },
                body: obj_form_data
            })
            .then(response => response.json())
            .then(response => {
                if (response.success) {
                    this.updateDevice(response.content);
                    resolve();  
                } else {
                    console.error(response.content);
                    reject(response.content);  
                }
            })
            .catch(error => {
                console.warn('Server not available to synchronization', error)
                reject('Servidor indisponível para sincronização.'); 
            });  

        });
    }


    /**
     * Actualiza tarefas na local DB e container (promessa)
     * 
     * @param array content = Conteúdo (array de objectos)
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    async updateDevice(content) {
        // Promessa
        return new Promise((resolve, reject) => {
            DBW.beginTransaction(['tasks'], DBW.WRITE)
            .then(transaction => {
                // Actualiza local DB
                DBW.update(transaction, 'tasks', content);
                // Actualiza container
                this.updateContainer(content);
                console.info('Tasks updated on device')
                resolve();
            }).catch(error => {
                console.error('Error updating tasks on device', error);
            });
        });
    }


    /**
     * Actualiza container de tarefas pela local DB (promessa)
     * 
     * @param array content = Conteúdo (array de objectos)
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    async updateContainerFromLocalDB() {
        try {
            let transaction = await DBW.beginTransaction(['tasks'], DBW.READONLY)
            // lê tarefas de local DB
            let content = await DBW.getList(transaction, 'tasks');
            // Actualiza container
            this.updateContainer(content);
        } catch (error) {
            console.error('Error reading tasks from local DB', error);
        }
    } 

    
   /**
     * Actualiza container de tarefas
     * 
     * @param array content = Conteúdo (array de objectos)
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    async updateContainer(content) {
        try {
            // Container a actualizar
            let container_todo = document.querySelector('.todo-container').querySelector('.body');
            // Template da tarefa no container
            let task_todo_node = HTASK.template_todo;
            let places = [];
            content.forEach(task => {
                // Adiciona o gps da tarefa aos locais (para direcções google maps)
                places.push(JSON.parse(task.gps));
                // Adiciona a tarefa ao container 
                // Leva a função para o evento click do botão more
                container_todo.appendChild(HTASK.createTaskElement(task_todo_node.cloneNode(true), task, function() {
                    TASK.id = task.key;
                    HLAYER.open('task-menu-content');
                }));
                this.places = places;
            });
            console.info('Task updated on container');
        } catch (error) {
            console.error('Error updating tasks on container', error);
        }
    }


    /**
     * Reset da tabela de tarefas
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    async resetLocalDB() {
        let transaction = await DBW.beginTransaction(['tasks'], DBW.WRITE);
        DBW.deleteAll(transaction, 'tasks');
    }


    /**
     * Verifica proximidade a cada uma das tarefas com sinalizador activo
     *  
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    checkProximity() {
        HGPS.proximityPlaces.forEach(id => {
            // Obtém a task cujo id está marcado para aviso de proximidade
            let task = document.getElementById(`task-${id}`);
            // Lê dados da task (pelo interface)
            let proximity = task.querySelector('.proximity');
            let coordinates = JSON.parse(task.getAttribute('data-gps'));
            // Verifica
            if (HGPS.nearDevice(coordinates[0], coordinates[1])) {
                // Activa sinalizador de proximidade
                proximity.classList.add('near');
                HPWA.showMessage(HPWA.SUCCESS, `DESTINO ${id}`);
            } else {
            // Desactiva sinalizador de proximidade
            proximity.classList.remove('near');
            }
        });
    }

}
// --- END