/**
 * HELPERS - TASK
 * 
 * Disponibiliza métodos que permitem gerir a criação de tarefas para o interface
 *
 * @pmonteiro (yyyy-mm-dd)
 */ 


class TaskHelper {

    constructor() {}

    // Template Tarefa TODO (destinado a ser clonado)
    get template_todo() {
        
        // Container
        let template = document.createElement('div');
        template.classList.add('task');

        // Identificador da tarefa
        let id = document.createElement('div');
        id.classList.add('id');
        template.appendChild(id);

        // Hora estimada de entrega
        let container_estimated_time = document.createElement('div');
        container_estimated_time.classList.add('estimated-time');
        let icon_estimated_time = document.createElement('i');
        icon_estimated_time.classList.add('icon-estimated-time', 'fas', 'fa-user-clock', 'fa-lg');
        let estimated_time = document.createElement('span');
        estimated_time.classList.add('value-estimated-time');
        container_estimated_time.appendChild(icon_estimated_time);
        container_estimated_time.appendChild(estimated_time);
        template.appendChild(container_estimated_time);

        // Botões de ordenação
        let icon_up = HTASK.createIconButton('up', ['fas','fa-angle-up','fa-2x']);
        template.appendChild(icon_up);
        let icon_down = HTASK.createIconButton('down', ['fas','fa-angle-down','fa-2x']);
        template.appendChild(icon_down);

        // Botões
        let icon_buttons = document.createElement('div');
        icon_buttons.classList.add('icon-buttons');
        icon_buttons.appendChild(HTASK.createIconButton('notes', ['fas','fa-info-circle','fa-lg']));
        icon_buttons.appendChild(HTASK.createIconButton('alerts', ['fas','fa-bell','fa-lg']));
        icon_buttons.appendChild(HTASK.createIconButton('phone', ['fas','fa-phone','fa-lg'], true));
        icon_buttons.appendChild(HTASK.createIconButton('gps', ['fas','fa-map-marked-alt','fa-lg']));
        icon_buttons.appendChild(HTASK.createIconButton('landmark', ['far','fa-dot-circle','fa-lg']));
        icon_buttons.appendChild(HTASK.createIconButton('more', ['fas','fa-ellipsis-h','fa-lg']));
        template.appendChild(icon_buttons);

        // Sinalizador de proximidade
        let icon_proximity = HTASK.createIcon(['proximity','hide','fas','fa-rss','fa-2x'])
        template.appendChild(icon_proximity);

        // Nome
        let name = document.createElement('span');
        name.classList.add('name');
        template.appendChild(name);

        // Morada
        let address = document.createElement('span');
        address.classList.add('address');
        template.appendChild(address);
        
        return template;

    }


    /**
     * Cria um botão (icon) para adicionar à tarefa
     * 
     * @param string id = Identificador do icon
     * @param element css = Classes css do icon
     * @param bool link = ? comporta-se como um link interno
     * 
     * @return element = Icon
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    createIconButton(id, css, link=false) {
        let element;
        if (link) {
            element = document.createElement('a');
        } else {
            element = document.createElement('div');
        }
        element.classList.add(id, 'icon-button');
        let i = document.createElement('i');
        i.classList.add('touch');
        css.forEach(css => {
            i.classList.add(css);
        })
        element.appendChild(i);
        return element;
    }


    /**
     * Cria icon para adicionar à tarefa
     * 
     * @param element css = Classes css do icon
     * 
     * @return element = Icon
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    createIcon(css) {
        let element = document.createElement('i');
        css.forEach(css => {
            element.classList.add(css);
        })
        return element;
    }


    /**
     * Cria uma tarefa para adicionar ao interface, baseado num template, e de acordo com seus dados
     * 
     * @param element template = Template de tarefa
     * @param object task = Dados da tarefa
     * @param function func = Função a associar ao botão "more"
     * 
     * @return element = Tarefa criada
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    createTaskElement(template, task, func) {

        let element = template;
        element.id = `task-${task.key}`;
        element.querySelector('.id').innerText = `ID: ${task.key}`;

        // Hora estimada de entrega
        let estimated_time = new Date(task.estimated_time);
        //estimated_time = `${estimated_time.getDate()}/${estimated_time.getMonth()} ${estimated_time.getHours()}:` + `0${estimated_time.getMinutes()}`.slice(-2);
        estimated_time = `${estimated_time.getHours()}:` + `0${estimated_time.getMinutes()}`.slice(-2);
        element.querySelector('.value-estimated-time').innerText = estimated_time;

        // Notas
        if (task.notes && task.notes != '') {
            let notes = element.querySelector('.notes').firstChild;
            notes.addEventListener('click', (evt)=> {
                evt.stopPropagation();
                HPWA.showMessage('information', task.notes);
            });
        } else {
            let notes = element.querySelector('.notes');
            notes.classList.add('hide');
        }

        // Alertas
        if (task.alerts && task.alerts != '') {
            let alerts = element.querySelector('.alerts').firstChild;
            alerts.addEventListener('click', (evt)=> {
                evt.stopPropagation();
                HPWA.showMessage('error', task.alerts);
            });
        } else {
            let alerts = element.querySelector('.alerts');
            alerts.classList.add('hide');
        }

        // Telefone
        if (task.phone && task.phone != '') {
            element.querySelector('.phone').setAttribute('href', `tel:+${task.phone}`);
        } else  {
            let phone = element.querySelector('.phone');
            phone.classList.add('hide');
        }
    
        // Gps
        if (task.gps && task.gps != '') {
            element.setAttribute('data-gps', task.gps);
            let gps = element.querySelector('.gps').firstChild;
            gps.addEventListener('click', (evt)=> {
                evt.stopPropagation();
                if (navigator.onLine) {
                    let coordinates = JSON.parse(task.gps);
                    let direction_url = HGPS.getGoogleMapsUrlDirectionTo(coordinates[0], coordinates[1]);
                    if (direction_url) {
                        window.open(encodeURI(direction_url), 'map');
                    } else {
                        let place_url = HGPS.getGoogleMapsUrlPlace(coordinates[0], coordinates[1]);
                        window.open(encodeURI(place_url), 'map');
                    }
                } else {
                    HPWA.showMessage(HPWA.ERROR, 'Dispositivo Offline. Google Maps indisponível ...');
                }
            });
        } else {
            let gps = element.querySelector('.gps');
            gps.classList.add('hide');
        }

        // Ponto de referência
        if (task.landmark && task.landmark != '') {
            let landmark = element.querySelector('.landmark').firstChild;
            landmark.addEventListener('click', (evt)=> {
                evt.stopPropagation();
                HPWA.showMessage('information', task.landmark);
            });
        } else {
            let landmark = element.querySelector('.landmark');
            landmark.classList.add('hide');
        }

        // Mais ...
        let more = element.querySelector('.more').firstChild;
        more.addEventListener('click', func);

        // Nome
        element.querySelector('.name').innerText = task.name;
        
        // Morada
        element.querySelector('.address').innerText = task.address;

        return element;
        
    }

}
// --- END