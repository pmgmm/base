2/**
 * FRAMEWORK - HELPER - FORM
 * 
 * Disponibiliza métodos que permitem manusear as traduções para os vários idiomas
 *
 * ATENÇÃO: Utiliza a variável de sessionStorage: language (ex: 'en_US')
 *
 * @pmonteiro (yyyy-mm-dd)
 */ 


class TranslationHelper {

     /**
     * Devolve tradução do texto 
     * 
     * @param string $value = Texto a traduzir
     * 
     * @return string = Texto traduzido
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
	static translate(value) {

        if (DEVELOPMENT && translation_content[value] == null) {

            translation_content[value] = '';

            obj_ajax_helper = new AjaxHelper(); 

            obj_ajax_helper.call({
                fully_qualified_class_name: '\\DEV\\entities\\translation\\processors\\Base',
                action: 'insert', 
                action_data: {
                    source: value,
                    layer: 'fe'
                }, 
                before: function() {
                }, 
                success: function(content) {
                }, 
                failure: function(message) {
                }, 
                exception: function(message) {
                }
            });

        }

        let translated = value;
        if (translation_content && translation_content[value] && translation_content[value] != '') {
            translated = translation_content[value];
        }

        if (DEVELOPMENT) {
            translated = '_' + translated;
        }

        return translated;

    }

}
// --- END