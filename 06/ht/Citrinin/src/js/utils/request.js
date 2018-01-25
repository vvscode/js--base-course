function request(url) {
    return (request.type === 'XHR' ? makeRequestXHR(url) : makeRequestFetch(url))
};

request.type = 'XHR';

function makeRequestFetch(url) {
    return fetch(url)
        .then((req) => req.json())
};

function makeRequestXHR(url) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function() {
            if (this.status >= 200 && this.status < 300) {
                resolve(JSON.parse(xhr.response));
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function() {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}

export default request;