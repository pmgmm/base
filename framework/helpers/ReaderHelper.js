/**
 * FRAMEWORK - HELPER - READER
 * 
 * Disponibiliza métodos que permitem gerar filtros para listas
 *
 * @pmonteiro (yyyy-mm-dd)
 */


class ReaderHelper {

    /**
     * Constructor
     */
    constructor() {
        // Inicialização de propriedades
        this.reset();
        this.resetOrder();
    }


    /**
      * Adiciona campo à lista de campos de filtro
      * 
      * @param string field = Campo 
      * @param string value = Valor para filtro
      * 
      * @pmonteiro (yyyy-mm-dd)
      */
    addField(field, value) {
        let valid = false;
        if ((value.from !== undefined || value.to !== undefined)) { // Se intervalo de valores
            if (value.from != '' || value.to != '') {
                valid = true;
            }
        } else if (Array.isArray(value)) { // Se array de valores
            if (value.length > 0) {
                valid = true;
            }
        } else if (value.trim().length > 0) { // Se string
            value = value.toString().trim();
            valid = true;
        }
        if (valid) {
            this.fields[field] = value;
        }
    }
    /**
     * Reset de lista de campos filtro
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    resetFields() {
        this.fields = {};
    }


    /**
     * Adiciona ordem à lista de ordenação
     * 
     * @param string field = Campo 
     * @param string direction = Direcção de ordenação
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    addOrder(field, direction) {
        if (['ASC', 'DESC'].includes(direction.toUpperCase())) {
            this.order.push(field + ' ' + direction);
        }
    }
    /**
     * Reset da lista de ordenação
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    resetOrder() {
        this.order = [];
    }


    /**
     * Devolve objecto com os dados do filtro sem limit e offset 
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    getBase() {
        return {id: this.id, search: this.search, fields: this.fields, order: this.order};
    }

    
    /**
     * Reset de classe
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    reset() {
        this.id = '';
        this.search = '';
        this.fields = {};
        this.limit = null;
        this.offset = null;
    }

}
// --- END