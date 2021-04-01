/**
 * HELPERS - GEOLOCATION
 * 
 * Disponibiliza métodos que permitem gerir geolocalização e google maps
 *
 * @pmonteiro (yyyy-mm-dd)
 */ 

 
class GpsHelper {

    constructor() {

        if (navigator.geolocation) {
            this._supported = true;
            this._allow = true;
            console.info('Geolocation supported');
        } else {
            this._supported = false;
            this._allow = false;
            console.error('Geolocation not supported');
        }
    }


    // --- Getter's & Setter's

    // Motor de vigilância de movimento
    set engine(value) {this._engine = value;}
    get engine() {return this._engine;}

    // Suporta geolocalização
    set supported(value) {this._supported = value;}
    get supported() {return this._supported;}

    // Permite geolocalização
    set allow(value) {this._allow = value;}
    get allow() {return this._allow;} 

    // Coordenadas do dispositivo
    set latitude(value) {this._latitude = value;}
    get latitude() {return this._latitude;}
    set longitude(value) {this._longitude = value;}
    get longitude() {return this._longitude;}

    // Locais de proximidade
    set proximityPlaces(value) {this._proximityPlaces = value;}
    get proximityPlaces() {return this._proximityPlaces ? this._proximityPlaces : [];}

    // Coordenadas em formato Google Maps
    get googleDeviceCoordinates() {
        if (this.latitude && this.longitude) {
            return `${this.latitude},${this.longitude}`;
        } 
        return false;
    }


    /**
     * Activa geolocalização
     * Pede permissão se necessário
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    async activateGeoLocation() {
        // Pedido de permissão
        navigator.geolocation.getCurrentPosition(this.allowPermission, this.denyPermission);        
    }
    allowPermission() {
        let options = {
            enableHighAccuracy: true,
            maximumAge: 5000
        };
        // Iniciar vigilância de movimento
        HGPS.engine = navigator.geolocation.watchPosition(HGPS.setDeviceCoordinates, null, options);
        HGPS.allow = true;
        console.info("GeoLocation allowed");
    }
    denyPermission() {
        HGPS.allow = false;
        console.info("GeoLocation denied");
    }


    /**
     * Desactiva geolocalização
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    deactivateGeoLocation() {
        navigator.geolocation.clearWatch(this.engine);
    }


    /**
     * Recolhe coordenadas actuais do dispositivo
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    setDeviceCoordinates(position) {
        HGPS.latitude = position.coords.latitude;
        HGPS.longitude = position.coords.longitude;
        // Executa métodos dependentes da actualização das coordenadas do dispisitivo
        // Tarefas - Proximidade
        TASK.checkProximity();
    }
    
    
    /**
     * Verifica proximidade a um local
     * 
     * @param float latitude = Latitude do local 
     * @param float longitude = Longitude do local 
     * 
     * @return bool = ? Próximo
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    nearDevice(latitude, longitude) {
        if (latitude.toFixed(3) === HGPS.latitude.toFixed(3) && longitude.toFixed(3) === HGPS.longitude.toFixed(3)) {
            return true;
        } else {
            return false;
        } 
    }


    /**
     * Devolve URL de Google Maps com indentificação de local
     * 
     * @param float latitude = Latitude do local 
     * @param float longitude = Longitude do local
     * 
     * @return string Url = URL de Google Maps com identificação de local
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    getGoogleMapsUrlPlace(latitude, longitude) {
        return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    }

    /**
     * Devolve URL de Google Maps com indicações até a um local
     * //&travelmode=bicycling, walking, driving
     * 
     * @param float latitude = Latitude do local 
     * @param float longitude = Longitude do local
     * 
     * @return string Url = URL de Google Maps com indicações até local
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    getGoogleMapsUrlDirectionTo(latitude, longitude) {
        let start_coordinates = this.googleDeviceCoordinates;
        if(start_coordinates) {
            return `https://www.google.com/maps/dir/?api=1&origin=${this.googleDeviceCoordinates}&destination=${latitude},${longitude}`;
        }
        return false;
    }


    /**
     * Devolve URL de Google Maps com indicações até vários locais
     * //&travelmode=bicycling, walking, driving
     * 
     * @param string places = Coordenadas dos locais (json array de coordenadas [latitude, longitude])
     * 
     * @return string Url = URL de Google Maps com indicações até vários locais
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    getGoogleMapsUrlMultipleDirectionTo(places) { // Só as 10 primeiros
        places = TASK.places.slice(0,10);
        let start_coordinates = this.googleDeviceCoordinates;
        let waypoints_coordinates = '';
        let end_coordinates = places[places.length-1];
        for(var i=0; i<places.length-1; i++) {
            waypoints_coordinates += `${places[i][0]},${places[i][1]}|`;
        }
        waypoints_coordinates =waypoints_coordinates.slice(0, -1);
        if(start_coordinates) {
            return `https://www.google.com/maps/dir/?api=1&origin=${this.googleDeviceCoordinates}&waypoints=${waypoints_coordinates}&destination=${end_coordinates[0]},${end_coordinates[1]}`;
        } 
        return false;
    }


    /**
     * Activar aviso de proximidade para local
     * 
     * @param int id = Identificador do local
     * 
     * @return void
     * 
     * @pmonteiro (yyyy-mm-dd)
     */
    activateProximity(id) {
        // Se ainda não estiver nos locais em vigilância
        var index = this.proximityPlaces.indexOf(id);
        if (index === -1) {
            // Adicionaraos locais em vigilância
            let proximityPlaces = this.proximityPlaces;
            proximityPlaces.push(id);
            this.proximityPlaces = proximityPlaces;
        }
    }

    deactivateProximity(id) {
        // Se estiver nos locais em vigilância
        var index = this.proximityPlaces.indexOf(id);
        if (index !== -1) {
            // Elimina dos locais em vigilância
            let proximityPlaces = this.proximityPlaces;
            proximityPlaces.splice(index, 1);
            this.proximityPlaces = proximityPlaces;
        }
    }

}
// --- END