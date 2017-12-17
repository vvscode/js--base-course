function deleteAreaClickHandler(){

    var target = event.target;
    // цикл двигается вверх от target к родителям до table
    while (target.className && target.className !== 'favouriteDivId') {
        if (target.className === 'deleteAreaClass') {
            var linkWithCoordinates = target.nextSibling;
            var valueWithCoordinates = linkWithCoordinates.innerHTML;
            var arrWithCoordinates = valueWithCoordinates.split(' ');
            var coordinates = {lat:arrWithCoordinates[0] , lng:arrWithCoordinates[1]};
            var cityDao = new DAO(localStorage);
            cityDao.deleteNote('favouriteCityHistoryStorageId',coordinates);
            var hr = new HistoryArea();
            hr.renderCoordinates('favouriteCityHistoryStorageId');
            return;
        }
        target = target.parentNode;
    }
}

function getLatLngXHR(){

    let GOOGLE_API_KEY = 'AIzaSyCToEbN4Wor4usGmdgNy8T96Cuen_vPCmQ';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', `http://cors-proxy.htmldriven.com/?url=https://maps.googleapis.com/maps/api/geocode/json?address=Minsk&key=${GOOGLE_API_KEY}`, false);
    xhr.send();
    if (xhr.status != 200) {
        return 'error';
    } else {
        return xhr.responseText;
    }
}