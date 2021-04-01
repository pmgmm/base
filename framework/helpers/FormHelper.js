/**
 * FRAMEWORK - HELPER - FORM
 * 
 * Disponibiliza métodos que permitem gerir a persistência de dados na storage disponibilizada pelo browser
 * Os dados podem ser persistidos em 2 tipos de storage:
 * 		local 	- Não expiram
 * 		session	- Expiram quando expira a sessão
 * Todos os métodos são estáticos pelo que a classe não tem de ser instanciada
 *
 * @pmonteiro (yyyy-mm-dd)
 */ 


class FormHelper {

  	/**
	 * Devolve componente
	 * 
	 * @param string component_identifier = Identificador do componente (id, name, class, tag)
	 * 
	 * @return object|null = Componente
     * 
	 * @pmonteiro (yyyy-mm-dd)
	 */
    static getComponent(component_identifier) {

        // Pelo id
        if (document.getElementById(component_identifier)) {
            return document.getElementById(component_identifier);
        }
        // Pelo name
        else if (document.getElementsByName(component_identifier)[0]) {
            return document.getElementsByName(component_identifier)[0];
        }
        // Pela classe
        else if (document.getElementsByClassName(component_identifier)[0]) {
            return document.getElementsByClassName(component_identifier)[0];
        }
        // Pela tag
        else if (document.getElementsByTagName(component_identifier)[0]) {
            return document.getElementsByTagName(component_identifier)[0];
        }

        return null;
    }


 	/**
	 * Devolve o valor de componente
	 * 
	 * @param string component_identifier = Identificador do componente (id, name, class, tag)
	 * 
	 * @return misc|null = valor do componente
     * 
	 * @pmonteiro (yyyy-mm-dd)
	 */
    static getComponentValue(component_identifier) {

        // Se o componente existe
        let component = this.getComponent(component_identifier);
	    if (component) {

			switch (component.localName) {
                case 'input':
				case 'fwk-input':
                case 'fwk-textarea':
                case 'fwk-select':
                case 'fwk-multiselect':
                case 'fwk-radiobutton':
                case 'fwk-checkbox':
                case 'fwk-upload':
                case 'fwk-datetime':
                    return component.value;
                    break;
                case 'fwk-dragdropselect':
                    return [component.value, component.details];
                    break;

				/* //result = seedo_object_getattribute(object_id, "value").trim();
					if (description || data) {
						if (description) {
							data = false;
						}
						var itemsparts = JSON.parse((object.getAttribute("items")));
						//var itemsparts = JSON.parse((seedo_object_getattribute(object_id, "items")));
						var ids = result.split(',');
						result = '';
						for (var i = 0; i < itemsparts.length; i = i + 4) {
							if (ids.indexOf(itemsparts[i].toString()) > -1) {
								if (result.length > 0) {
									result += ',';
								}
								if (description) {
									result += itemsparts[i + 1].trim();
								}
								if (data) {
									result += itemsparts[i + 2].trim();
								}
							}
						}
					}
					break;
				case 'datepicker':
					result = object.value.trim();
					break;
				case 'uploader':
					var object = seedo_object(object_id + '_file');
					result = object.files;
					break; 
			}
		}
		else {
			switch (object.type) {
				case "text":
				case "textarea":
				case "password":
				case "hidden":
				case "select-one":
					result = object.value.trim();
					break;
				case "checkbox":
					result = object.checked;
					if (description) {
						result = object.getAttribute("text").trim();
					}
					break;
				case "radio":
					var allbuttons = document.getElementsByName(object_id);
					for (var i = 0; i < allbuttons.length; i++) {
						if (allbuttons[i].checked == true) {
							if (!description) {
								result = allbuttons[i].value.trim();
							}
							//else if (allbuttons[i].nextSibling != null && allbuttons[i].nextSibling.textContent != "") {
							//	result = allbuttons[i].nextSibling.textContent;
							//}
							else {
								result = allbuttons[i].getAttribute("text").trim();
							}
							break;
						}
					}
					break;
				default:
					result = object.innerHTML.trim();
					break;
			}*/
            } 
        }

        return null;
    }


 	/**
	 * Atribui valor a componente
	 * 
	 * @param string component_identifier = Identificador do componente (id, name, class, tag)
     * @param misc value = Valor a atribuír (depende do tipo)
	 * 
	 * @return misc|null = Valor do componente
     * 
	 * @pmonteiro (yyyy-mm-dd)
	 */
    static setComponentValue(component_identifier, value) {

        // Se o componente existe
        let component = this.getComponent(component_identifier);
        if (component) {

            switch (component.localName) {
                case 'input':
                case 'fwk-input':
                case 'fwk-textarea':
                case 'fwk-select':
                case 'fwk-multiselect':
                case 'fwk-radiobutton':
                case 'fwk-checkbox':
                case 'fwk-datetime':
                    component.value = value;
                    break;
                case 'fwk-dragdropselect':
                    component.select(value[0], value[1]);
                    break;
            } 
        }
    }


 	/**
	 * Valida componentes
	 * 
	 * @param array component_identifiers = Identificadores dos componentes a validar
	 * 
	 * @return bool = ? Validados
     * 
	 * @pmonteiro (yyyy-mm-dd)
	 */
    static validateComponents(component_identifiers) {
        var result = true;

        // Esconder os tootips de erro que estejam activos
        this.resetComponentsError(component_identifiers);

        // Para cada componente a validar
        component_identifiers.forEach(id => {
            let component_result = true;
            let component = this.getComponent(id);
            // Se é obrigatório
            if (component.mandatory) {
                // Vários tipos de conteúdo
                if (Array.isArray(component.value)) {
                    if (component.value.length == 0) {
                        component_result = false;
                    }
                } else if (typeof component.value === 'object') {
                    if (Object.entries(component.value).length == 0) {
                        component_result = false;
                    }
                } else if (component.value == '') {
                    component_result = false;
                }
                // Se não está preenchido
                if (!component_result) {
                    result = false;
                    switch (component.localName) {
                        case 'fwk-input':
                        case 'fwk-textarea':
                            component.error = TranslationHelper.translate('Preenchimento obrigatório');
                            break;
                        case 'fwk-select':
                        case 'fwk-multiselect':
                        case 'fwk-dragdropselect':
                        case 'fwk-upload':
                        case 'fwk-datetime':
                            component.error = TranslationHelper.translate('Seleção obrigatória');
                            break;
                        default:
                            component.error = TranslationHelper.translate('Obrigatório');
                            break;
                    }
                }
            }
            // Se passou o teste de obrigatoriedade
            // Verifica o formato
            if (component_result) {
                switch (component.localName) {
                    case 'fwk-input':
                        if (component.value != '') {
                            switch (component.type) {
                                case 'integer':
                                    if (!this.isInteger(component.value)) {
                                        component_result = false;
                                    }
                                break;
                                case 'decimal':
                                    if (!this.isDecimal(component.value)) {
                                        component_result = false;
                                    }
                                break;
                                case 'email':
                                    if (!this.isEmail(component.value)) {
                                        component_result = false;
                                    }
                                break;
                                case 'datetime':
                                    if (!this.isDatetime(component.value)) {
                                        component_result = false;
                                    }
                                break;
                                case 'date':
                                    if (!this.isDate(component.value)) {
                                        component_result = false;
                                    }
                                break;
                                case 'time':
                                    if (!this.isTime(component.value)) {
                                        component_result = false;
                                    }
                                break;
                            }
                        }
                    
                    break;
                }
                // Se tem erro de formato
                if (!component_result) {
                    result = false;
                    component.error = TranslationHelper.translate('Formato inválido');
                }
            }
        });

        return result;

    }


 	/**
	 * Esconder os tootips de erro dos componentes
	 * 
	 * @param array component_identifiers = Identificadores do componentes a considerar
	 * 
	 * @return void
     * 
	 * @pmonteiro (yyyy-mm-dd)
	 */
    static resetComponentsError(component_identifiers) {
        component_identifiers.forEach(id => {
            this.getComponent(id).error = false;
        });
    }


	/**
	 * Valida formato Email
	 * 
	 * @param string value = Valor a validar
	 * 
	 * @return bool = ? Validado
     * 
	 * @pmonteiro (yyyy-mm-dd)
	 */
    static isEmail(value) {
		var regexp = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
		return regexp.test(value);
    }


    /**
	 * Valida formato integer (com +/-)
	 * 
	 * @param string value = Valor a validar
	 * 
	 * @return bool = ? Validado
     * 
	 * @pmonteiro (yyyy-mm-dd)
	 */
    static isInteger(value) {
		var regexp = /^[+\-0-9]+$/;
		return regexp.test(value);
    }


    /**
	 * Valida formato decimal (com +/-)
	 * 
	 * @param string value = Valor a validar
	 * 
	 * @return bool = ? Validado
     * 
	 * @pmonteiro (yyyy-mm-dd)
	 */
    static isDecimal(value) {
		var regexp = /^\s*[+-]?(\d+|[\.\,]\d+|\d+[\.\,]\d+|\d+[\.\,])(e[+-]?\d+)?\s*$/;
		return regexp.test(value);
    }


    /**
	 * Valida formato datetime (yyyy-mm-dd hh:mm)
	 * 
	 * @param string value = Valor a validar
	 * 
	 * @return bool = ? Validado
     * 
	 * @pmonteiro (yyyy-mm-dd)
	 */
    static isDatetime(value) {
        var regexp = /^((((19|[2-9]\d)\d{2})\-(0[13578]|1[02])\-(0[1-9]|[12]\d|3[01]))|(((19|[2-9]\d)\d{2})\-(0[13456789]|1[012])\-(0[1-9]|[12]\d|30))|(((19|[2-9]\d)\d{2})\-02\-(0[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))\-02\-29)) ([0-1]?[0-9]|[2][0-3])(:([0-5]?[0-9])(:([0-5]?[0-9]))?)?$/;
        return regexp.test(value);
    }


    /**
	 * Valida formato date (yyyy-mm-dd)
	 * 
	 * @param string value = Valor a validar
	 * 
	 * @return bool = ? Validado
     * 
	 * @pmonteiro (yyyy-mm-dd)
	 */
    static isDate(value) {
        var regexp = /^((((19|[2-9]\d)\d{2})\-(0[13578]|1[02])\-(0[1-9]|[12]\d|3[01]))|(((19|[2-9]\d)\d{2})\-(0[13456789]|1[012])\-(0[1-9]|[12]\d|30))|(((19|[2-9]\d)\d{2})\-02\-(0[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))\-02\-29))$/;
        return regexp.test(value);
    }


    /**
	 * Valida formato time (hh:mm)
	 * 
	 * @param string value = Valor a validar
	 * 
	 * @return bool = ? Validado
     * 
	 * @pmonteiro (yyyy-mm-dd)
	 */
    static isTime(value) {
		var regexp = /^([0-1]?[0-9]|[2][0-3])(:([0-5]?[0-9])(:([0-5]?[0-9]))?)?$/;
        return regexp.test(value);
    }

}
// --- END