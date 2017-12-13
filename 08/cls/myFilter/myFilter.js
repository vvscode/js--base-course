Array.prototype.myFilter = function ( cb, thisArg ) {
  if ( typeof cb !== 'function'){
    return cb();
  }
  var newArr = [];
  for( var i = 0; i < this.length; i++ ) {
    if( this[i] === undefined ) continue;
    if( cb(this[i], i, this) ){
      newArr.push( this[i] );
    }
  }
  return newArr;
}

