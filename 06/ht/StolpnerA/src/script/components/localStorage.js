/**
 * Created by andre on 29-Jun-17.
 */

export var addScoreLS = function (score,name) {
    var LS = JSON.parse(localStorage.getItem('GameScore')) || {};
    LS[score] = LS[score] || [];
    LS[score].push(name);
    localStorage.setItem('GameScore', JSON.stringify(LS));
};

export var renderScoreFromLS = function () {
    var recObj = JSON.parse(localStorage.getItem('GameScore'));
    var div = document.querySelector('div.main');
    for (var key in recObj) {
        div.innerHTML += `<span>Количесво очкоев ${key} Имя: ${recObj[key]}</span><br>`;
    }
};