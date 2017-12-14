Array.prototype.myFilter = function ( cb, thisArg ) {
  if ( typeof cb !== 'function'){
    return cb();
  }
  var newArr = [];
  var until = this.length;
  for( var i = 0; i < until; i++) {
    if ( this[i] !== undefined) {
      if (thisArg) {
        if (cb.call(thisArg, this[i], i, this)) {
          newArr.push(this[i])
        }
      } else {
        if (cb(this[i], i, this)) {
          newArr.push(this[i])
        }
      }
    }
  }
  return newArr;
}
