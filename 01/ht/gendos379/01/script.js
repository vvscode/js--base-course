/**
 * Makes calculations according to given attributes.
 * All attributes should be given in separated parenthesis, e.g.:
 * calc(3)('+')(2)
 * @param {Number} a - First number for calculation
 * @param {String} b - Arithmetic operator, possible values: '+' / '-' / '/' / '*'
 * @param {Number} c - Second number for calculation
 * @return {Number} - Result of calculation
 */
function calc(a) {
  return function operate(b) {
    if (b === '+') {
      return function sum(c) {
        return isNum(a) + isNum(c);
      }
    } else if (b === '-') {
      return function subst(c) {
        return isNum(a) - isNum(c);
      }
    } else if (b === '*') {
      return function mult(c) {
        return isNum(a) * isNum(c);
      }
    } else if (b === '/') {
      return function div(c) {
        return isNum(a) / isNum(c);
      }
    } else {
      console.log('Wrong operator!');
    }
  }
}

/** Checks if given attribute is a number. */
function isNum(num) {
  if (isNaN(num)) {	
    console.log(num + ' is not a number!'); 
  } else {
    return +num;
  }
}
