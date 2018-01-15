import request from '../utils/request';

let GOOGLE_API_KEY = 'AIzaSyB2D-Cmek8ifPd0bHOFzKsdFTofnXBWoIE';

class GoogleMap {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.eventBus.on('map:clicked', (obj) => {

            this.getPlaceName(obj.lat, obj.lng)
                .then(
                    cityName => {
                        this.eventBus.trigger('google:cityFound', cityName, obj)
                    },
                    err => {
                        var cityName = prompt('Unknown place. Enter the name', 'Hollywood');
                        if (cityName) {
                            this.eventBus.trigger('google:cityFound', cityName, obj)
                        }
                    });
        });
        this.getLatLng = (addr) => request(`https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=${GOOGLE_API_KEY}`)
            .then((data) => data.results['0'].geometry.location);

        this.getPlaceName = (lat, lng) => request(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&result_type=locality&language=ru&key=${GOOGLE_API_KEY}`)
            .then((data) => data.results['0'].address_components[0].short_name);
    }
};

export default GoogleMap;