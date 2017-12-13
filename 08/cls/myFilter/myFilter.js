Array.prototype.myFilter = function ( cb, thisArg ) {
  if ( typeof cb !== 'function'){
    return cb();
  }
  var newArr = [];
  for( var i = 0; i < this.length; i++ ) {
    if( this[i] === undefined ) continue;
    if(thisArg){
      if( cb.call( thisArg,this[i], i, this) ){
        newArr.push( this[i] );
      }
    }
    if( cb(this[i], i, this) ){
      newArr.push( this[i] );
    }
  }
  return newArr;
}

var that = 1;
[1].myFilter(function() {
  that = this;
  console.log(this);
});


(function(){
  'use strict';
  console.log(this);
  (function() {
    console.log(this);
  }).call(undefined); })()

/*
 */

/*1. функция
 2. cb нуждается в первом параметре
 3. Возвратный список
 4. возвращает пустой список для false cb
 5. возвращает список копий для правды Sat
 6. возвращает список копий для правды Sat
 7. возвращает отфильтрованный лист
 8. звонки проходили
 9. вызовы передаются cb только для существующих valls
 10. вызывает cb с параметрами
 11. использование прошло
 12. используйте `undefined` как thisArgs по умолчанию
 13. вызов cb только при начальном состоянии списка
*
* 1. is function
 2. cb needs as the first param
 3. return list
 4. returns empty list for false cb
 5. returns copy list for truthly Sat
 6. returns copy list for truthly Sat
 7. returns filtered sheet
 8. calls passed sat
 9. calls passed cb only for existing valls
 10. calls cb with params
 11. use passed
 12. use `undefined` as thisArgs by default
 13. call cb only on initial state of list
* */