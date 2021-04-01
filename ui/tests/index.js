obj_ajax_helper = new AjaxHelper({
	proxy_address: '/framework/proxies/CoreAjax.php'
}); 

function testUser(){
	obj_ajax_helper.call({
		fully_qualified_class_name: '\\CORE\\tests\\sets\\entities\\User',
		action: 'test_entity', 
		action_data: {
		}, 
		before: function() {
			$('#result').html('');
		}, 
		success: function(content) {
			console.log(content);
		}, 
		failure: function(message) {
			console.log(message);
		   $('#result').html(message);
		}, 
		exception: function(message) {
			console.log(message);
			$('#result').html(message);
		}
	})
}



function testEngine(class_name){
    alert(class_name);
    return;
	var action_parameters = {};

	if (class_name != undefined){
		action_parameters['class'] = class_name;
	}

	obj_ajax_helper.call({
		fully_qualified_class_name: '',
		action: 'test', 
		action_data: action_parameters, 
		before: function() {
			$('#result').html('');
		}, 
		success: function(content) {
			$('#result').html(content);
		}, 
		failure: function(message) {
			console.log(message);
		   $('#result').html(message);
		}, 
		exception: function(message) {
			console.log(message);
			$('#result').html(message);
		}
	})
}


function testAll(){
	var action_parameters = {};
	action_parameters['test_classes'] = ['entities/User.php']; //
	//action_parameters['test_classes'] = null; // Todas ...

	obj_ajax_helper.call({
		fully_qualified_class_name: '\\CORE\\tests\\sets\\Base',
		action: 'test', 
		action_data: action_parameters, 
		before: function() {
			$('#result').html('');
		}, 
		success: function(content) {
			if(confirm("Pretende abrir o relatório de testes?")) {
				window.open('/base/core/tests/viewer/?id='+content, 'test_report');
			}
			$('#result').html('');
		}, 
		failure: function(message) {
		    alert(message);
		}, 
		exception: function(message) {
			$('#result').html(message);
		}
	})
}