/**
 * FRAMEWORK - HELPER - VALIDATE
 *
 * @pmonteiro (2019-11-21)
 */ 


class ValidateHelper {
    'use strict';

    static isEmail(value, keyvalidate) {

		keyvalidate = (typeof keyvalidate === 'undefined' || typeof keyvalidate !== 'boolean') ? false : keyvalidate;
		var regexp = "";
		if (keyvalidate) {
			regexp = "^([a-zA-Z0-9_\\-\.]+)@{0,1}([a-zA-Z0-9_\\-\.]+)*$";
			regexp = new RegExp(regexp, "gm");
			return regexp.test(value);
		}
		regexp = "^([a-zA-Z0-9_\\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$";
		regexp = new RegExp(regexp, "gm");
		return regexp.test(value);
    }

    static validatekey = evt => {
        var object = evt.target;

		var curfirstpos;
		var curlastpos;
		var allowedkeycodes = new Array(8, 9, 13, 27, 37, 38, 39, 40);
		var previousvalue = object.value;

		// -- Check if keycode or character is allowed
		if ((evt.keyCode == null) || allowedkeycodes.inArray(evt.keyCode) || (evt.keyCode == 46 && evt.key != '.')) {
			return true;
		}
		// -- Handle cursor position and selection
		if (document.selection) {
			var range = document.selection.createRange().duplicate();
			curfirstpos = -range.moveStart("character", -previousvalue.length);
			curlastpos = -range.moveEnd("character", -previousvalue.length);
		}
		else {
			curfirstpos = object.selectionStart;
			curlastpos = object.selectionEnd;
		}
		var object_value = previousvalue.substring(0, curfirstpos) + evt.key + previousvalue.substring(curlastpos);
		var object_config = JSON.parse(object.dataset.config)
		switch (object_config['type']) {
			case 'email':
	/* 			if (!this.isEmail(object, object_value, true)) {
                    evt.preventDefault();
                } */
				break;
			case 'numeric':
		/* 		if (!this.isNumeric(object, object_value, true)) {
                    evt.preventDefault();
                } */
				break;
			case 'date':
				
				break;
			case 'time':
				
				break;
			default:
				return false;
		}
		return true;
	}

    static isNumeric(object, value, keyvalidate) {
		var object_config = JSON.parse(object.dataset.config);
	    var decimals = (typeof object_config['decimals'] === 'undefined' || isNaN(parseInt(object_config['decimals']))) ? 0 : parseInt(object_config['decimals']);
        keyvalidate = (typeof keyvalidate === 'undefined' || typeof keyvalidate !== 'boolean') ? false : keyvalidate;
        var regexp = '';
        if (decimals <= 0) {
            regexp = "^\\d+$";
        }
        else {
            regexp = "^((\\d+(\\" + '.' + "\\d{0," + decimals + "})?)|((\\d*(\\" + '.' + "\\d{1," + decimals + "}))))$";
        }
        var regexp = new RegExp(regexp, "gm");
        var result = regexp.test(value);
        return result;
    }

}
// --- END