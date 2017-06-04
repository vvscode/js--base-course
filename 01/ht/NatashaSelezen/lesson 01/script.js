function calculator(a) {
  return function calculate(b) {
     if (b==='+') {
       return function sum(c) {
         return number(a)+number(c);
       }
     } else if (b==='-') {
       return function subtract(c) {
         return number(a)-number(c);
       }
     } else if (b==='*') {
       return function multiply(c) {
         return number(a)*number(c);
       }
     } else if (b==='/') {
       return function divide(c) {
         return number(a)/number(c);
       }
    } else {
       alert ('not operator');
     }
   }
 }
 