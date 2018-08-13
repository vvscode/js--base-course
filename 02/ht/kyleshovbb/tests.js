/* global mocha, chai, describe, it  */
/* global beforeEach, afterEach */

describe('curry', () => {
    it('Функция', () => {
        assert.isOk(curry instanceof Function)
    })
    it('Карирует функцию', () => {
        function sum2(x, y) {
            return x + y
        }
        
        function sum4(a, b, c, d) {
            return a + b + c + d
        }
        assert.isOk(curry(sum2)(1)(2) === 3)
        assert.isOk(curry(sum4)(2)(3)(4)(5) === 14)
    })
})

describe('функция, которая не может работать как конструктор', () => {
    it('это функция', () => {
        assert.isOk(NonСonstructor instanceof Function)
    })
    it('вызывает метод', () => {
        let notObject = new NonСonstructor()
        assert.isOk(notObject instanceof NonСonstructor)
    })
})

describe('.myCall', () => {
    beforeEach(() => {
        func = function() {}
    })
    it('это метод', () => {
        assert.isOk(func.myCall instanceof Function)
    })
    it('вызывает метод', () => {
        let a = 0
        func = function() { a++ }
        assert.isOk(a === 0)
        func.myCall()
        assert.isOk(a === 1)
    })
    it('вызывает с заданным контекстом', () => {
        let self = null
        let o = { name: 'Bob' }
        func = function() { self = 'this' }
        func.myCall(o)
        assert.isOk(self === 'this')
    })
})