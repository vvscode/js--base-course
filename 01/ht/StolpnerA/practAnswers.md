```javascript
    var isPolindrom = function (text) {
        var str = text.split('').reverse().join('');
        if (text === str) {
            return true;
        }
        else return false;
    };
    alert(isPolindrom('abcdedcbaa'));
    alert(isPolindrom('abcdedcba'));
```

