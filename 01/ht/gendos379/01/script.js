/**
 * Makes calculations according to given attributes.
 * All attributes should be given in separated parenthesis, e.g.:
 * calc(3)('+')(2)
 * @param {Number} firstOperand - First number for calculation
 * @param {String} operator - Arithmetic operator, possible values: '+' / '-' / '/' / '*'
 * @param {Number} secondOperand - Second number for calculation
 * @return {Number} - Result of calculation
 */
function calc(firstOperand) {
    return function(operator) {
        return function(secondOperand) {
            if (operations[operator]) {
                return operations[operator](toNum(firstOperand), toNum(secondOperand));
            } else {
                console.log('Wrong operator: ' + operator);
                return NaN;
            }
        }
    }
}

/** Possible operations for calc function */
var operations = {
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

/** Converts given attribute to a number if possible or returns NaN */
function toNum(num) {
    if (isNaN(num)) {
        console.log(num + ' is not a number!');
    }
    return +num;
}
