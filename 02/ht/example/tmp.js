var oA = {
    a: 1,
    b: 3
};

var oB = {
    a: 1,
    b: 3
};

// oA == oB
// oA.a == oB.a
// oA.b == oB.b
// и нет других свойств

// all props  of oA

function isEqual(oA, oB) {
    var aKeys = Object.keys(oA);

    for(var i = 0; i < aKeys.length; i++) {
        var propKey = aKeys[i];
        var propValA = oA[propKey];
        var propValB = oB[propKey];
        if (typeof propValA === 'object' && typeof propValB === 'object') {
            if (!isEqual(propValA, propValB)) {
                return false;
            }
        } else {
            if (propValA !== propValB) {
                return false;
            }
        }
    }

    var bKeys = Object.keys(oB);
    for(var i = 0; i < bKeys.length;i++) {
        var propKey = bKeys[i];
        var propValA = oA[propKey];
        var propValB = oB[propKey];
        if (typeof propValA === 'object' && typeof propValB === 'object') {
            if (!isEqual(propValA, propValB)) {
                return false;
            }
        } else {
            if (propValA !== propValB) {
                return false;
            }
        }
    }

    return true;
}