/**
 * Makes calculations according to given attributes.
 * All attributes should be given in separated parenthesis, e.g.:
 * calc(3)('+')(2)
 * @param {Number} a - First number for calculation
 * @param {String} b - Arithmetic operator, possible values: '+' / '-' / '/' / '*'
 * @param {Number} c - Second number for calculation
 * @return {Number} - Result of calculation
 */
var operate = {
    '+' : function(x, y) {
        return x + y;
    },
    '-' : function(x, y) {
        return x - y;
    },
    '*' : function(x, y) {
        return x * y;
    },
    '/' : function(x, y) {
        return x / y;
	}
};

function calc(a) {
  return operate[b](toNum(a), toNum(c); 
}

/** Checks if given attribute is a number. */
function toNum(num) {
  if (isNaN(num)) {	
    console.log(num + ' is not a number!'); 
  } else {
    return +num;
  }
}

