'use strict';

//tests

describe('template', function() {
    it('is function', function() {
        assert.isFunction(compileTemplate);
    });

    it('returning function', function() {
        assert.isFunction(compileTemplate("some {{template}}"));
    });

    it('generates expected output', function() {
        var el = document.createElement('div');
        var template = compileTemplate('Hello, {{name}}, your age is {{age}}?');
        template(el, { name: "Bob", age: 15 });
        assert.strictEqual(el.innerHTML, 'Hello, Bob, your age is 15?');
        template(el, { name: "Alice", age: 3 });
        assert.strictEqual(el.innerHTML, 'Hello, Alice, your age is 3?');
    });

    it('generates expected output #2', function() {
        var el = document.createElement('div');
        var template = compileTemplate('Dear {{user}}, you have no space left on disk {{disk}}!');
        template(el, { user: 'Bill', disk: 'C' });
        assert.strictEqual(el.innerHTML, 'Dear Bill, you have no space left on disk C!');
    });

    it('throw exception if template is wrong', function() {
        var el = document.createElement('div');
        var template = compileTemplate('Dear {{user}}, you have no space left on disk {{disk!');
        assert.throws(function() { template(el, { user: 'Bill', disk: 'C' }); }, Error, 'Error! Where is no "}}"');
    });
});

//code

function compileTemplate(tpl) {
    
    return function(el, data) {
        var target1 = '{{';
        var target2 = '}}';
        
        var textPos = 0;
        var foundPos1 = 0;
        var foundPos2;
        var str = '';
        while (true) {
            foundPos1 = tpl.indexOf(target1, textPos);
            if (foundPos1 != -1) {
                foundPos2 = tpl.indexOf(target2, foundPos1 + 2);
                if (foundPos2 != -1) {
                    var key = tpl.slice(foundPos1 + 2, foundPos2);
                    str += tpl.slice(textPos, foundPos1);
                    str += data[key];
                    textPos = foundPos2 + 2;
                } else {
                    throw new Error('Error! Where is no "}}"');
                }
            } else {
                str += tpl.slice(textPos);
                break;
            }
        }
        el.innerHTML = str;
    }
}


