/**
 * FRAMEWORK - HELPER - FILTER
 * 
 * Disponibiliza métodos que permitem gerir filtros gravados associados às listas
 *
 * @pmonteiro (yyyy-mm-dd)
 */


class FilterHelper {

    /**
     * Constructor
     */
    constructor(config) {

        // Inicialização de propriedades / objectos
        this.config = config;
        if (!config.list_id) {this.config.list_id = list_id;}
        if (!config.my_name) {this.config.my_name = 'obj_filter_helper';}
        if (!config.obj_reader_helper) {this.config.obj_reader_helper = obj_reader_helper;}
        if (!config.obj_ajax_helper) {this.config.obj_ajax_helper = obj_ajax_helper;}
        if (!config.obj_shield) {this.config.obj_shield = obj_shield;}
        if (!config.obj_askbox) {this.config.obj_askbox = obj_askbox;}
        if (!config.obj_messagebox) {this.config.obj_messagebox = obj_messagebox;}
        if (!config.obj_component) {this.config.obj_component = FormHelper.getComponent('filter_id');}
        if (!config.obj_delete) {this.config.obj_delete = FormHelper.getComponent('filter_delete');}
        if (!config.obj_modal_filter_save) {this.config.obj_modal_filter_save = FormHelper.getComponent('modal_filter_save');}
        if (!config.obj_filter_save_action) {this.config.obj_filter_save_action = FormHelper.getComponent('filter_save_action');}
        if (!config.obj_filter_save_name) {this.config.obj_filter_save_name = FormHelper.getComponent('filter_save_name');}
        if (!config.func_resetFilterComponents) {this.config.func_resetFilterComponents = resetFilterComponents;}
        if (!config.func_populateComponents) {this.config.func_populateComponents = populateComponents;}
        if (!config.func_setFilter) {this.config.func_setFilter = setFilter;}
        if (!config.func_applyFilter) {this.config.func_applyFilter = applyFilter;}

    }


    /**
     * Lê e aplica o último filtro utilizado na sessão (se exitir)
     *
     * @return bool = ? Carregou filtro
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    applyStored() {
        let result = false;

        // Lê filtro da storage
        let storage_filter = StorageHelper.getFromSession(this.config.list_id);

        // Se existe
        if (storage_filter) {
            // Preenche os componentes
            this.config.func_populateComponents(storage_filter);
            // Remove o valor do componente de filtros quando o filtro 
            // da store é diferente do valor do filtro referenciado
            if (storage_filter.id != '') {
                // Adiciona o id ao filtro para fazer comparação coerente
                let structure = this.config.obj_component.data.structure;
                structure = Object.assign({id: this.config.obj_component.value}, structure);
                // Compara
                if (JSON.stringify(storage_filter) != JSON.stringify(structure)) {
                    this.config.obj_component.value = '';
                } else { // Se o filtro fica activo
                    // Adiciona o id ao filtro
                    structure.id = this.config.obj_component.value;
                    // Mostra ou escode o botão para eliminar dependendo do âmbito (público ou privado) 
                    if (this.config.obj_component.data.public) {
                        this.config.obj_delete.hide = true;
                    } else {
                        this.config.obj_delete.hide = false;
                    }
                }
            }
            // Adiciona a ordenação ao reader
            if (storage_filter.order) {
                this.config.obj_reader_helper.order = storage_filter.order;
            }
            // Aplica o filtro
            this.config.func_applyFilter();
            result = true;
        }

        return result;
    }


    /**
     * Lê e aplica o filtro seleccionado no componente
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    applySaved() {
        // Se existe filtro seleccionado
        if (this.config.obj_component.value != '') {

            // Lê o filtro residente no componente
            let filter = this.config.obj_component.data;
            // Adiciona o id ao filtro
            filter.structure.id = this.config.obj_component.value;
            // Mostra ou escode o botão para eliminar dependendo do âmbito (público ou privado) 
            if (filter.public) {
                this.config.obj_delete.hide = true;
            } else {
                this.config.obj_delete.hide = false;
            }
            // Preenche os componentes
            this.config.func_populateComponents(filter.structure);
            // Adiciona a ordenação ao reader
            if (filter.structure.order) {
                this.config.obj_reader_helper.order = filter.structure.order;
            }
            this.config.func_applyFilter();

        } else { // Sem filtro seleccionado, esconde o botão para eliminar

            this.config.obj_delete.hide = true;
        }
    }


    /**
     * Pedido de confirmação e nome para gravar filtro
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    confirmSave() {
        // Filtro privado novo
        if (this.config.obj_component.value == '') {
            // Acção
            this.config.obj_filter_save_action.value = 'insert';
            // Inibe a escolha entre novo e actualizar
            this.config.obj_filter_save_action.disable = true; 
            // Limpa o componente de nome  
            this.config.obj_filter_save_name.value = ''; 
        } else if (this.config.obj_component.data.public) { // Filtro privado (com outro nome) baseado em filtro público
            // Acção
            this.config.obj_filter_save_action.value = 'insert';
            //Inibe a escolha entre novo e actualizar
            this.config.obj_filter_save_action.disable = true;   
            // Limpa o componente de nome  
            this.config.obj_filter_save_name.value = '';
        } else { // Actualização de filtro privado
            // Acção
            this.config.obj_filter_save_action.value = 'update';
            // Permite actualizar ou duplicar (com outro nome)
            this.config.obj_filter_save_action.disable = false;   
            // Coloca o nome do filtro actual
            this.config.obj_filter_save_name.value = this.config.obj_component.selection;
        }

        // Elimina erro de validação anterior
        this.config.obj_filter_save_name.error = false;;
        // Mostra modal
        this.config.obj_modal_filter_save.show = true;
        // Coloca focus no componente de nome
        this.config.obj_filter_save_name.focus()

    }
    

    /**
     * Grava filtro
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    save() {

        // Valida a existência de nome
        var name = this.config.obj_filter_save_name.value.trim();
        if (name != '') {

            // Acção            
            let action = this.config.obj_filter_save_action.value;
            if (action != '') {

                // Activa shield com progress bar
                this.config.obj_shield.progress = true;

                // Coloca os valores dos componentes no reader
                // Função residente na lista
                this.config.func_setFilter();

                // Recordar objecto para callback's
                var obj_me = this;
                this.config.obj_ajax_helper.call({
                    fully_qualified_class_name: '\\CORE\\entities\\filter\\processors\\Component',
                    action: action, 
                    action_data: {
                        id: this.config.obj_component.value,
                        list: this.config.list_id,
                        name: this.config.obj_filter_save_name.value,
                        structure: {
                            search: this.config.obj_reader_helper.search,
                            fields: this.config.obj_reader_helper.fields,
                            order: this.config.obj_reader_helper.order
                        }
                    },
                    success: function(content) {
                        // Termina shield com progress bar
                        obj_me.config.obj_shield.progress = false;
                        obj_me.config.obj_modal_filter_save.show = false;
                        // Mostra mensagem
                        obj_me.config.obj_messagebox.success = content.message;
                        // Actualiza o componente de filtros
                        obj_me.fillComponent(content.id);
                        obj_me.config.obj_delete.hide = false;
                    }, 
                    failure: function(message) {
                        // Termina shield com progress bar
                        obj_me.config.obj_shield.progress = false;
                        // Mostra mensagem
                        obj_me.config.obj_messagebox.error = message;
                    }, 
                    exception: function(message) {
                        // Termina shield com progress bar
                        obj_me.config.obj_shield.progress = false;
                        // Mostra mensagem
                        obj_me.config.obj_messagebox.error = message;
                    }
                })
            }
        }
    
    }
    

    /**
     * Pedido de confirmação de eliminação
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    confirmDelete() {
        // Se filtro seleccionado
        if (this.config.obj_component.value != '') {
            let name = this.config.obj_component.selection;
            // Mostra a pergunta
            this.config.obj_askbox.show = {
                color: 'blue',
                title: TranslationHelper.translate('Eliminar filtro'),
                question: TranslationHelper.translate('Confirma a eliminação do filtro:') + '<br><b>' + name + '</b>',
                actions: [
                    {caption: TranslationHelper.translate('Não'), color: "white"},
                    {caption: TranslationHelper.translate('Sim'), color: "gray", function: `${this.config.my_name}.delete`}
                ]
            };
        }
    }

    
    /**
     * Elimina filtro
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    delete() {

        // Fecha janela de confirmação
        this.config.obj_askbox.show = false;

        // Activa shield com progress bar
        this.config.obj_shield.progress = true;

        // Recordar objecto para callback's
        var obj_me = this;
        obj_ajax_helper.call({
            fully_qualified_class_name: '\\CORE\\entities\\filter\\processors\\Component',
            action: 'delete',
            action_data: {id: this.config.obj_component.value},
            success: function (content) {
                // Termina shield com progress bar
                obj_me.config.obj_shield.progress = false;
                // Mostra mensagem
                obj_me.config.obj_messagebox.success = content.message;
                // Actualiza o componente de filtros
                obj_me.fillComponent();
                // Limpa os componentes
                // Função residente na lista
                obj_me.config.func_resetFilterComponents();
            },
            failure: function (message) {
                // Termina shield com progress bar
                obj_me.config.obj_shield.progress = false;
                // Mostra mensagem
                obj_me.config.obj_messagebox.error = message;
            },
            exception: function (message) {
                // Termina shield com progress bar
                obj_me.config.obj_shield.progress = false;
                // Mostra mensagem
                obj_me.config.obj_messagebox.error = message;
            }
        })
    }


    /**
     * Carrega componente de filtros
     * Carrega os filtros públicos e os privados do utilizador 
     * Utilizado para refresh pois o primeiro carregamento tem de estar na página
     * 
     * @param int|null id = Id do filtro a seleccionar
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    fillComponent(id = null) {
        var reader = {ajax: this.config.obj_ajax_helper, filter: {list: this.config.list_id, INCLUDE: "OR sf.public IS TRUE"}, fully_qualified_class_name: '\\CORE\\entities\\filter\\processors\\Component', action: 'get_list'};
        this.config.obj_component.fill({
            reader: reader,
            value: id
        });
    }

}
// --- END