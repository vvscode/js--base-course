function calc(x) {
  return function calculate(z) {
    if (z==='+') {
      return function sum(y) {
        return checkIfNumber(x) + checkIfNumber(y);
      }
    } else if (z==='-') {
      return function subtract(y) {
        return checkIfNumber(x) - checkIfNumber(y);
      }
    } else if (z==='*') {
      return function multiply(y) {
        return checkIfNumber(x) * checkIfNumber(y);
      }
    } else if (z==='/') {
      return function divide(y) {
        return checkIfNumber(x) / checkIfNumber(y);
      }
   } else {
      alert (' Not an operator! ');
    }
  }
}

function checkIfNumber(number) {
  if (isNaN(number)) {	
    alert (' It is not a number! '); 
  } else {
    return number;
  }
}