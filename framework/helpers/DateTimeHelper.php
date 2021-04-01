<?php
/**
 * FRAMEWORK - HELPER - DATETIME
 * 
 * Disponibiliza métodos que permitem manusear datas e horas
 *
 * @pmonteiro (yyyy-mm-dd)
 */
namespace FWK\helpers;


final class DateTimeHelper {

    use \FWK\traits\throwableHandler;


    /**
     * Devolve data em formato UTC
     * Utiliza a timezone do utilizador
     * 
     * @param string $value = Data a converter
     * 
     * @return string = Data convertida para UTC
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
	public static function datetimeToUtc(string $value): string {
        try {

            $local_timezone = new \DateTimeZone(date_default_timezone_get());
            $utc_timezone = new \DateTimeZone('UTC');
            $converted_value = new \DateTime($value, $local_timezone);
            $converted_value->setTimezone($utc_timezone);
            return $converted_value->format('Y-m-d H:i:s');

        } catch (\Throwable $throwable) {
            throw self::throwableHandle($throwable);
        }
    }
   

    /**
     * Devolve data em formato local
     * Utiliza a timezone do utilizador
     * 
     * @param string $value = Data a converter
     * 
     * @return string = Data convertida para local
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
	public static function datetimeToLocal(string $value): string {
        try {

            $local_timezone = new \DateTimeZone(date_default_timezone_get());
            $utc_timezone = new \DateTimeZone('UTC');
            $converted_value = new \DateTime($value, $utc_timezone);
            $converted_value->setTimezone($local_timezone);
            return $converted_value->format('Y-m-d H:i:s');
          
        } catch (\Throwable $throwable) {
            throw self::throwableHandle($throwable);
        }
    }

	public static function isDate(string $value): bool {
        try {

            $regexp = "/^((((19|[2-9]\d)\d{2})\-(0[13578]|1[02])\-(0[1-9]|[12]\d|3[01]))|(((19|[2-9]\d)\d{2})\-(0[13456789]|1[012])\-(0[1-9]|[12]\d|30))|(((19|[2-9]\d)\d{2})\-02\-(0[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))\-02\-29))$/";
            return preg_match($regexp, $value);
          
        } catch (\Throwable $throwable) {
            throw self::throwableHandle($throwable);
        }
    }

}




// --- END    







/* 
input.addEventListener('change', evt => {

    let datetime = component.input.value.replaceAll('-', '/').split(' ');
    if (datetime[0]) {
        let date = datetime[0].split('/');
        
        let day = '';
        let month = '';
        let year = '';
        switch (component.format) {
            case "d/m/y":
            case "d-m-y":
                day = date[0] ? date[0].padStart(2,'0') : null;
                month = date[1] ? date[1].padStart(2,'0') : null;
                year = date[2] ? date[2] : null;
                break;
            case "y/m/d":    
            case "y-m-d":
                year = date[0] ? date[0] : null;
                month = date[1] ? date[1].padStart(2,'0') : null;
                day = date[2] ? date[0].padStart(2,'0') : null;
                break;
        }

        date = `${year}-${month}-${day}`;

        let time =['',''];
        if (datetime[2]) {
            time = datetime[1].split(':');
        }
        let hour = time[0] ? time[0].padStart(2,'0') : null;
        let minute = time[1] ? time[1].padStart(2,'0') : null;

        let sep = '-';

        var regexp = "^((((19|[2-9]\\d)\\d{2})" + sep + "(0[13578]|1[02])" + sep + "(0[1-9]|[12]\\d|3[01]))|(((19|[2-9]\\d)\\d{2})" + sep + "(0[13456789]|1[012])" + sep + "(0[1-9]|[12]\\d|30))|(((19|[2-9]\\d)\\d{2})" + sep + "02" + sep + "(0[1-9]|1\\d|2[0-8]))|(((1[6-9]|[2-9]\\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))" + sep + "02" + sep + "29))$";
        regexp = new RegExp(regexp, "g");
        if (regexp.test(date)) {
            if (component.has_time) {
                regexp = "^([0-1]?[0-9]|[2][0-3])(:([0-5]?[0-9])(:([0-5]?[0-9]))?)?$";
                regexp = new RegExp(regexp, "g");
                if (regexp.test(`${hour}:${minute}`)) {
                    component.selected_hour = component.candidate_hour = parseInt(hour);
                    component.selected_minute = component.candidate_minute = parseInt(minute);
                } else {
                    
                }

            } 
            component.selected_year = component.candidate_year = parseInt(year); 
            component.selected_month = component.candidate_month = parseInt(month)-1;
            component.selected_day = component.candidate_day = parseInt(day);

// Fecha (eventualmente) algum componente aberto
fwkCloseComponent(component);

// Abre a área de selecção
container.classList.add('open');
body.classList.remove('hide');
// Roda o icone
bodyhandle.classList.add('rotate');

// Mostra vista de calendário
component.showView('MD');

// Atribui o componente à variável global que controla os componentes abertos
fwk_components_control.open = component;

     
    } else {


    }

    }

    
}); */