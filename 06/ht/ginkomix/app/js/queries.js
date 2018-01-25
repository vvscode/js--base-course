export default class  Queries {

    XHR(cord) {
        var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest,
            xhr = new XHR(),
            self = this;
        return new Promise(function(resolve) {
            xhr.open('GET', 'http://cors-proxy.htmldriven.com/?url=https://api.darksky.net/forecast/'+self.key+'/'+cord, true);
            xhr.send();
            xhr.onload = function() {
                var arr = JSON.parse(this.responseText);
                arr = JSON.parse(arr.body);
                var type = [ 
                    arr.currently.precipType,
                    arr.currently.temperature,
                    arr.currently.windSpeed
                ];
                resolve(type);
            }
        });
    } 

    fetch(cord) {
        var self = this;
        return new Promise(function(resolve) {
            fetch('http://cors-proxy.htmldriven.com/?url=https://api.darksky.net/forecast/'+self.key+'/'+cord)
                .then(function(response) {
                return response.json();
            })
                .then(function(wearher) {
                var arr = JSON.parse(wearher.body),
                    type = [ arr.currently.precipType,
                            arr.currently.temperature,
                            arr.currently.windSpeed
                           ];
                resolve(type);
            });
        });
    }
};
