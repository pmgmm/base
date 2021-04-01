var object_datetime;

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    object_ajax_helper = new AjaxHelper(); 
    object_datetime = document.getElementById('fwk_datetime_1');
  }


function dttm_hide() {
    object_datetime.hide = true;
}

function dttm_show() {
    object_datetime.hide = false;
}

function dttm_isHide() {
    alert(object_datetime.hide);
}

function dttm_disable() {
    object_datetime.disable = true;
}

function dttm_enable() {
    object_datetime.disable = false;
}

function dttm_isDisable() {
    alert(object_datetime.disable);
}

 function dttm_select() {
    object_datetime.value = '2020-02-29 15:43';
}

function dttm_unselect() {
    object_datetime.value = '';
}

function dttm_value() {
    let result = object_datetime.value;
    if (result) {
        alert(result);
    }
} 

function dttm_datetime() {
    let result = object_datetime.datetime;
    if (result) {
        alert(result);
    }
} 

function dttm_date() {
    let result = object_datetime.date;
    if (result) {
        alert(result);
    }
} 

function dttm_year() {
    let result = object_datetime.year;
    if (result) {
        alert(result);
    }
} 

function dttm_month() {
    let result = object_datetime.month;
    if (result) {
        alert(result);
    }
} 

function dttm_week() {
    let result = object_datetime.week;
    if (result) {
        alert(result);
    }
} 

function dttm_day() {
    let result = object_datetime.day;
    if (result) {
        alert(result);
    }
} 

function dttm_time() {
    let result = object_datetime.time;
    if (result) {
        alert(result);
    }
} 

function dttm_hour() {
    let result = object_datetime.hour;
    if (result) {
        alert(result);
    }
} 

function dttm_minute() {
    let result = object_datetime.minute;
    if (result) {
        alert(result);
    }
} 

function dttm_mandatory() {
    object_datetime.mandatory = true;
}

function dttm_free() {
    object_datetime.mandatory = false;
}

function dttm_isMandatory() {
    alert(object_datetime.mandatory);
}

function dttm_validate() {
    FormHelper.validateComponents(['fwk_datetime_1']);
}

function dttm_error() {
    object_datetime.error = true;
}

function dttm_errorText() {
    object_datetime.error = 'Texto de erro \n linha 2';
}

function dttm_noError() {
    object_datetime.error = false;
}

function dttm_hasError() {
    alert(object_datetime.error);
}