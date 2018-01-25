function DAO(storage){

    this.storage = storage;

    this.getStoredArray = function(cityStorageId){
        return JSON.parse(this.storage.getItem(cityStorageId))
    }

    this.saveNote = function(cityStorageId, city, maxStorageSize){

        // get cell note list
        var cities = this.getStoredArray(cityStorageId);

        // initialize if necessary
        if(cities === null) {
            cities = [];
        }

        // add city to the beginning
        cities.unshift(city);
        // delete last city if size > 5
        if(maxStorageSize && cities.length > maxStorageSize){
            cities.pop();
        }
        // save updated list and return note index at list
        this.storage.setItem(cityStorageId, JSON.stringify(cities));
        return city;
    }

    this.deleteFirstNote = function(cityStorageId) {
        var cities = this.getStoredArray(cityStorageId);
        cities.shift();
        this.storage.setItem(cityStorageId, JSON.stringify(cities));
    }

    this.deleteNote = function(cityStorageId, city) {

        var cities = this.getStoredArray(cityStorageId);
        for(var i=0 ; i < cities.length ; i++){
            var sameElement = cities[i].lat === +city.lat && cities[i].lng === +city.lng;

            if(sameElement){
                cities.splice(i, 1);
                break;
            }
        }
        this.storage.setItem(cityStorageId, JSON.stringify(cities));

    }
}