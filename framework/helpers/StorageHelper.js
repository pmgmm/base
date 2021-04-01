/**
 * FRAMEWORK - HELPER - STORAGE
 * 
 * Disponibiliza métodos que permitem gerir a persistência de dados na storage disponibilizada pelo browser
 * Os dados podem ser persistidos em 2 tipos de storage:
 * 		local 	- Não expiram
 * 		session	- Expiram quando expira a sessão
 * Todos os métodos são estáticos pelo que a classe não tem de ser instanciada
 *
 * @pmonteiro (yyyy-mm-dd)
 */ 


class StorageHelper {

	/**
	 * Persiste dados na SessionStorage
	 * 
	 * @param string key = Chave do conteúdo a persistir
	 * @param {*} content = Conteúdo a persistir
	 * 
	 * @return void
     * 
	 * @pmonteiro (yyyy-mm-dd)
	 */
	static addToSession(key, content) {
        if (typeof content === 'object') {
            content = JSON.stringify(content);
        }
		sessionStorage.setItem(key, content);
	}


	/**
	 * Devolve dados da SessionStorage pela sua key
	 * 
	 * @param string key = Chave do conteúdo a devolver
	 * 
	 * @return {*}
     * 
	 * @pmonteiro (yyyy-mm-dd)
	 */
	static getFromSession(key) {
		var content = sessionStorage.getItem(key);
		if (content != null) {
            try {
                return JSON.parse(content);
            } catch (error) {
                return content;
            }
		} else {
			return '';
		}
	}


	/**
	 * Elimina dados da SessionStorage pela sua key
	 * 
	 * @param string key = Chave do conteúdo a eliminar
	 * 
	 * @return void
     * 
	 * @pmonteiro (yyyy-mm-dd)
	 */
	static removeFromSession(key) {
		sessionStorage.removeItem(key);
	}


	/**
	 * Elimina todos os dados da SessionStorage
	 * 
	 * @return void
     * 
	 * @pmonteiro (yyyy-mm-dd)
	 */
	static resetSession() {
		sessionStorage.clear();
    }
    

	/**
	 * Persiste dados na LocalStorage
	 * 
	 * @param string key = Chave do conteúdo a persistir
	 * @param {*} content = Conteúdo a persistir
	 * 
	 * @return void
     * 
	 * @pmonteiro (yyyy-mm-dd)
	 */
	static addToLocal(key, content) {
        if (typeof content === 'object') {
            content = JSON.stringify(content);
        }
		localStorage.setItem(key, content);
	}


	/**
	 * Devolve dados da LocalStorage pela sua key
	 * 
	 * @param string key = Chave do conteúdo a devolver
	 * 
	 * @return {*}
     * 
	 * @pmonteiro (yyyy-mm-dd)
	 */
	static getFromLocal(key) {
		var content = localStorage.getItem(key);
		if (content != null) {
            try {
                return JSON.parse(content);
            } catch (error) {
                return content;
            }
		} else {
			return '';
		}
	}


	/**
	 * Elimina dados da LocalStorage pela sua key
	 * 
	 * @param string key = Chave do conteúdo a eliminar
	 * 
	 * @return void
     * 
	 * @pmonteiro (yyyy-mm-dd)
	 */
	static removeFromLocal(key) {
		localStorage.removeItem(key);
	}


	/**
	 * Elimina todos os dados da LocalStorage
	 * 
	 * @return void
     * 
	 * @pmonteiro (yyyy-mm-dd)
	 */
	static resetLocal() {
		localStorage.clear();
	}

}
// --- END