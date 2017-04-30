function calc(x) {
  return function calculate(z) {
    if (z==='+') {
      return function sum(y) {
        return checkDataType(x) + checkDataType(y);
      }
    } else if (z==='-') {
      return function subtract(y) {
        return checkDataType(x) - checkDataType(y);
      }
    } else if (z==='*') {
      return function multiply(y) {
        return checkDataType(x) * checkDataType(y);
      }
    } else if (z==='/') {
      return function divide(y) {
        return checkDataType(x) / checkDataType(y);
      }
   } else {
      alert (' Not an operator! ');
    }
  }
}

function checkDataType(number) {
  if (isNaN(number)) {	
    alert (' It is not a number! '); 
  } else {
    return number;
  }
}