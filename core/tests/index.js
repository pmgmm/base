/**
 * TESTES - GERADOR DE RELATÓRIOS + LISTA DE RFELATÓRIOS
 * 
 * @pmonteiro (2020-04-17)
 */  


obj_ajax_helper = new AjaxHelper({
	proxy_address: '/framework/proxies/Ajax.php'
}); 

function testAll(button) {
	
	var action_parameters = {};
	action_parameters['test_classes'] = ['entities/User.php']; // Todas ...
	action_parameters['test_classes'] = null; // Todas ...

	obj_ajax_helper.call({
		fully_qualified_class_name: 'CORE\\tests\\processors\\Base',
		action: 'test', 
		action_data: {
			report_prefix: 'ALL',
			sets: [],
			classes: ['entities/User.php']
		}, 
		before: function() {
			$('#result').html('');
			button.disabled = true;
			button.classList.add("processing");
		}, 
		success: function(content) {
			if(confirm('Pretende abrir o relatório?')) {
				window.open('viewer.php?id='+content, '_self');
			} else {
				location.reload();
			}
		}, 
		failure: function(message) {
		    alert(message);
		}, 
		exception: function(message) {
			$('#result').html(message);
		},
		after: function() {
 			button.classList.remove("processing");
			button.disabled = false; 
		}

	})
}