"use strict";
/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */

mocha.setup("bdd");
let assert = chai.assert;



describe("Шаблонизатор", function() {
  let arrCity = [];
/*  let city = 'Анкара';*/
  /*let arrCity = ['Минск','Брест','Гродно', 'Витебск', 'Могилев', 'Гомель', 'Борисов'];
*/

  it('добавляет 1 город', () => {
    let city = 'Анкара';
    let arr = [];
    addArrCity ( city, arr );
    assert.ok( arr.length , 1);
  });

  it('сохраняет верное кол-во городов', () => {
    let city1 = 'Анкара';
    let city2 = 'Минск';
    let city3 = 'Брест';
    let city4 = 'Гродно';
    let city5 = 'Витебск';
    let city6 = 'Могилев';
    let arr = [];
    addArrCity ( city1, arr );
    addArrCity ( city2, arr );
    addArrCity ( city3, arr );
    addArrCity ( city4, arr );
    addArrCity ( city5, arr );
    addArrCity ( city6, arr );
    assert.equal( arr.length , 5);
    assert.equal( arr.toString() , ['Могилев', 'Витебск','Гродно','Брест', 'Минск'].toString());
    assert.equal( arr[0] , 'Могилев');
  });

  it('после добавления городов оставляет только 5', () => {
    let city = 'Анкара';
    let arr = ['Минск','Брест','Гродно', 'Витебск', 'Могилев'];
    addArrCity ( city, arr );
    assert.equal( arr.length , 5);
    assert.equal( arr[0] , 'Анкара');
    assert.equal( arr[4] , 'Витебск');
  });

  it('если городов 4 и ввожу 2 раза один и тот же город ничего не происходит', () => {
    let city = 'Анкара';
    let arr = ['Анкара','Брест','Гродно', 'Витебск', 'Могилев'];
    addArrCity ( city, arr );
    assert.equal( arr[0] , 'Анкара');
    assert.equal( arr[4] , 'Могилев');
  });

  it('2 города одинаковых подряд - остается один', () => {
    let city = 'Анкара';
    let arr = [];
    addArrCity ( city, arr );
    addArrCity ( city, arr );
    assert.equal( arr[0] , 'Анкара');
    assert.equal( arr[1] , undefined);
  });
});



mocha.run();