/* добавить тесты */
"use strict";

/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */
describe("Hedgehog", function() {
    it("фунция", function() {
        return assert.isOk(typeof Hedgehog === "function");
    });
    it("конструктор", function() {
        assert.isOk(typeof new Hedgehog() === "object");
        assert.isOk(new Hedgehog() instanceof Hedgehog === true);
    });
    it("работает вызов методов по цепочке", function() {
        return assert.isOk(typeof new Hedgehog().showAgeInConsole().showNameInAlert() === 'object');
    });
});




