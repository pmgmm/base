/**
 * FRAMEWORK - HELPER - AJAX
 * 
 * AjaxHelper
 * ==========
 * Permite a criar e submeter pedido Ajax
 * Permite a injeção dos "callback's" de resultados
 * Pode utilizar um proxy, no servidor, de reencaminhamento de pedidos para um ficheiro de processamento de resposta 
 * Pode utilizar 3 tipos de resposta: Sucesso e respectivos dados
 * 									  Erro e respectiva mensagem
 * 									  Excepção e respeciva mensagem
 *
 * AjaxReaderHelper
 * ================
 * Permite a criar filtro uniformizado para submeter em pedido Ajax
 * 
 * @pmonteiro (yyyy-mm-dd)
 */ 


 /**
 * AjaxHelper
 * 
 * @pmonteiro (yyyy-mm-dd)
 */
class AjaxHelper {

    /**
     * Construtor
	 * @param object settings = Para redefinição dos valores default dos settings
	 * 		
	 * 		@param string settings['proxy_address'] = Redefine o proxy do pedido default da instância (se '', não utiliza proxy e usa directamente o 'phpFile')
	 * 		@param string settings['http_verb'] = Redefine o tipo do pedido http default da instância: 'POST', 'GET', ...
	 * 		@param int settings['action_timeout'] = Redefine o tempo útil para processamento do pedido default da instância (milisegundos)
	 * 
	 * @return object
	 *
     * @pmonteiro (yyyy-mm-dd)
     */
	constructor(settings) {

        // Default settings
        // Proxy de pedido
        this.proxy_address = '/framework/proxies/CoreAjax.php';
        // Tipo de pedido http 
        this.http_verb = 'POST';
        // Timeout para pedido (milisegundos)
        this.action_timeout = 30000;
        // Token de autorização de pedido
        this.autorization_token = '';
        // Objecto XMLHttpRequest
        this.connection = null;

		if (typeof settings != 'undefined') {
			// proxy_address pode ser = ''
			if (typeof settings['proxy_address'] != 'undefined') {this.proxy_address = settings['proxy_address'];}
			if (settings['http_verb']) {this.http_verb = settings['http_verb'];}
			if (settings['action_timeout']) {this.action_timeout = settings['action_timeout'];}
        }
        if (typeof(parent.authorization) !== 'undefined') {
            this.authorization = parent.authorization;
        }
	}

	/**
	 * Submete o pedido ao servidor
	 * Se settings['proxy_address'] = '', o pedido não utiliza proxy e usa settings['class_file']
	 * Os settings['fully_qualified_class_name'] e settings['class_file'] são mutuamente exclusivos
	 * Em settings['action_data'], a key "serialized", se existir, será "desserializadas" do lado do servidor
	 * 
	 * @param objecto settings = Settings especificos do pedido.
	 * 		 
	 * 		@param string settings['proxy_address'] = Proxy para o pedido
	 * 		@param string settings['http_verb'] = Tipo do pedido: "POST", "GET", ...
	 * 		@param int settings['action_timeout'] = Tempo útil para processamento do pedido (milisegundos)
	 * 
	 * 	  	@param string settings['fully_qualified_class_name'] = (mandatory) Classe responsável pela resposta ao pedido (debaixo de namespace) 
	 *
	 * 		@param string settings['action'] = (mandatory) Ação (Método/Função) responsável pela resposta ao pedido
	 * 		@param object settings['action_data'] = Dados necessários ao processamento do pedido
	 * 		@param object settings['action_files'] = Ficheiros (para upload) necessários ao processamento do pedido
	 *
	 * 		@param object settings['before'] = Função a executar antes de submeter o pedido
	 * 		@param object settings['success'] = Função (callback) a executar ao receber uma resposta de sucesso do servidor
	 * 		@param object settings['failure'] = Função (callback) a executar ao receber uma resposta de falha do servidor
	 * 		@param object settings['exception'] = Função (callback) a executar ao receber uma excepção HTTP ou timeout do servidor
	 *
	 * @pmonteiro (yyyy-mm-dd)
	 */
	call(settings) {

		// Proxy de pedidos
		var proxy_address = this.proxy_address;
		// Tipo de pedido http 
		var http_verb = this.http_verb;
		// Timeout para o pedido (milisegundos)
		var action_timeout = this.action_timeout;
		// Identificação da classe responsável pela resposta ao pedido (debaixo de namespace)
		var fully_qualified_class_name = settings['fully_qualified_class_name'];
		// Ficheiro de classe responsável pela resposta ao pedido
		var class_file = settings['class_file'];
		// Acção (Método/Função) responsável pela resposta ao pedido
		var action = settings['action'];
        // Função before
		var include_function;
		 
		// Se não existe a informação relativa ao ficheiro e/ou acção responsável pela resposta ao pedido, aborta o pedido
		if (!fully_qualified_class_name || !action) {return;}

		// Usa os valores por defeito da instância que não foram passados no pedido corrente
		// proxy_address pode ser = ''
		if (typeof settings['proxy_address'] != 'undefined') {proxy_address=settings['proxy_address'];}
		if (settings['http_verb']) {http_verb=settings['http_verb'];}
		if (settings['action_timeout']) {action_timeout=settings['action_timeout'];}
		
		// Se não existe proxy, é utilizado apenas o ficheiro/script responsável pela resposta ao pedido
		// Neste caso não pode ser utilizado o fully_qualified_class_name
		var final_address = proxy_address;
		if (!proxy_address.length && class_file) {final_address = class_file;}

		// Cria a ligação para o pedido
		this.connection = new XMLHttpRequest();

		// Abre a ligação para o pedido 
        this.connection.open(http_verb, final_address, true);
        // Atribui o token do pedido
        this.connection.setRequestHeader('Authorization', this.authorization);
		// Atribui o timeout para o pedido
		this.connection.timeout = action_timeout;	

		// Preparação de dados e ficheiros para envio
		var obj_form_data = new FormData();	
		
		// Dados obrigatórios do pedido
		obj_form_data.append('fully_qualified_class_name', fully_qualified_class_name.replace(/\\\\/g, '\\'));
        obj_form_data.append('action', action);

		// Se a informação do módulo existe, passa o id e o nome como parâmetros
		var module = sessionStorage.getItem('module');
		if (typeof module !== 'undefined') {
            obj_form_data.append('module', module);
        }
		
		// Se exitirem dados para envio
		if (settings['action_data']) {
			obj_form_data.append('action_data', JSON.stringify(settings['action_data']));
            }
            
		// Se exitirem ficheiros para envio
		if (settings['action_files']) {
            Object.entries(settings['action_files']).forEach(([key, files]) => {
                files.forEach(file => {
                    if (typeof file != 'undefined') {
                        obj_form_data.append(`${key}[]`, file);
                    }
                });
            });
		}

		// Adição de sequência de unicidade ao pedido
		obj_form_data.append('rid', Math.floor(Math.random() * 1000000000));

		// Se existe função a executar antes de enviar o pedido ao servidor
		if (typeof settings['before'] != 'undefined') {
			include_function = settings['before'];
			include_function();
		}

		// Enviar o pedido ao servidor
		this.connection.send(obj_form_data);


		// --------------------------------------------------- CALLBACK'S


		/**
		 *  Método (callback) de resposta do servidor
		 * 
		 * @pmonteiro (yyyy-mm-dd)
		 */
		this.connection.onload = function() {
			var connection = this;
			var success = false;
			var response = '';
			var response_function;
	
			// Se o processo terminou de forma controlada
			if (connection.status == 200)  {
				// Carrega a reposta
				response = JSON.parse(connection.response);
				// Carrega o estado de sucesso da resposta
				success = Boolean(response.success) ;
			
				// Conforme o estado de sucesso da resposta
				switch(success) {
					case true:
						// Se existe função (callback) a executar quando recebe uma resposta de sucesso do servidor
						// Disponibiliza a totalidade da resposta
						if (typeof settings['success'] != 'undefined') {
							response_function = settings['success'];
							response_function(response.content);
						}
						break;
					case false:
						// Se existe função (callback) a executar quando recebe uma resposta de falha do servidor
						// Disponibiliza apenas a mensagem de erro
						if (typeof settings['failure'] != 'undefined') {
							response_function = settings['failure'];
							response_function(response.content);
						}
						break;
					}

			} else {
				// Se existe função a executar quando é recebida uma excepção HTTP
				// Disponibiliza apenas a mensagem de erro
				if (typeof settings['exception'] != 'undefined') {
					response_function = settings['exception'];
					response_function('HTTP Error: ' + connection.status);
				}
			}

			// Se existe função (callback) a executar após todo o processamento, ainda que com erro
			if (typeof settings['after'] != 'undefined') {
				response_function = settings['after'];
				response_function();
			}

		}

		
		/**
		 *  Método (callback) de Timeout
		 * 
		 * @pmonteiro (yyyy-mm-dd)
		 */
		this.connection.ontimeout =  function() {
			// Se existe função a executar quando é recebido um Timeout
			// Disponibiliza apenas a mensagem de erro
			if (typeof settings['exception'] != 'undefined') {
				var response_function = settings['exception'];
				response_function('O tempo limite para a operação foi excedido.<br>Tente mais tarde por favor.');
			}
		}

	}


	// --------------------------------------------------- SUPPORT

	/**
	 * Serialização de Form 
	 * Devolve todos os elementos e seus valores no formato &field1=value1&field2=value2&...
	 * 
	 * @param element form = Objecto form
	 */
	serialize_form(form) {
		var field, l, s = [];
		if (typeof form == 'object' && form.nodeName == "FORM") {
			var len = form.elements.length;
			for (var i = 0; i < len; i++) {
				field = form.elements[i];
				if (field.name && !field.disabled && field.type != 'button' && field.type != 'file' && field.type != 'hidden' && field.type != 'reset' && field.type != 'submit') {
					if (field.type == 'select-multiple') {
						l = form.elements[i].options.length;
						for (var j = 0; j < l; j++) {
							if (field.options[j].selected) {
								s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[j].value);
							}
						}
					}
					else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
						s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value);
					}
				}
			}
		}
		return s.join('&').replace(/%20/g, '+');
	};
	
}
// --- END