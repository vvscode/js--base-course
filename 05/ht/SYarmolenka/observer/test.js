describe(`observer`, function()
{
  let eb = new EventBus();

  it(`.on, .off, .trigger, .once are functions`, function() {
    assert.equal(typeof eb.on, `function`);
    assert.equal(typeof eb.off, `function`);
    assert.equal(typeof eb.trigger, `function`);
    assert.equal(typeof eb.once, `function`);
  });

  it(`accept callback and call it's`, function() {
    let a = 0;
    function some() {a = 5;};
    eb.on(`some`, some);
    eb.trigger(`some`);
    assert.equal(a, 5);
  });

  it(`transfer parametrs for callback`, function() {
    let a = 0;
    function some(x, y) {a = x + y;};
    eb.on(`some`, some);
    eb.trigger(`some`, 5, 6);
    assert.equal(a, 11);
    eb.trigger(`some`, 4, 0);
    assert.equal(a, 4);
  });

  it(`transfer any quantity parametrs for callback`, function() {
    let a = `js-base-course`;
    let str = ``;
    let arr = a.split(``);
    function some() {
      for (let i = 0; i < arguments.length; i++) {
        str += arguments[i];
      }
    }
    eb.on(`some`, function() {
      some.apply(null, arr);
    });
    eb.trigger(`some`);
    assert.equal(str, a);
  });

  it(`write events with same names`, function() {
    let a, b;
    eb.on(`some`, function() {a = 2;});
    eb.on(`some`, function() {b = 3;});
    eb.trigger(`some`);
    assert.equal(a + b, 5);
  });

  it(`.once will perform once`, function() {
    let a, b;
    eb.on(`some`, function func1(x) {a = x;});
    eb.once(`some`, function func2(x) {b = x;});
    eb.trigger(`some`, 5);
    assert.equal(a, 5);
    assert.equal(b, 5);
    eb.trigger(`some`, 8);
    assert.equal(a, 8);
    assert.equal(b, 5);
  });

  it(`.off without second parameter deletes events with same name`, function() {
    let a, b;
    eb.on(`some`, function func1(x) {a = x;});
    eb.on(`some`, function func2(x) {b = x;});
    eb.trigger(`some`, 5);
    assert.equal(a, 5);
    assert.equal(b, 5);
    eb.off(`some`);
    eb.trigger(`some`, 7);
    assert.equal(a, 5);
    assert.equal(b, 5);
  });

  it(`.off with second parameter deletes only an event is equal callback`, function() {
    let a, b;
    function func1(x) {a = x;};
    function func2(x) {b = x;};
    eb.on(`some`, func1);
    eb.on(`some`, func2);
    eb.trigger(`some`, 4);
    assert.equal(a, 4);
    assert.equal(b, 4);
    eb.off(`some`, func1);
    eb.trigger(`some`, 8);
    assert.equal(a, 4);
    assert.equal(b, 8);
  });

  it(`how many events - so many function calls`, function() {
    let eb = new EventBus();
    let i = 0;
    function func() {i++;};
    eb.on(`s1`, func);
    eb.on(`s1`, func);
    eb.once(`s2`, func);
    eb.trigger(`s1`);
    assert.equal(i, 2);
    eb.trigger(`s2`);
    assert.equal(i, 3);
  });

  it(`a real example`, function() {
    let str = ``;
    let eb = new EventBus();
    let object = {
      set number(x) {
        eb.trigger(`call${x}`, x);
      }
    };
    function Watcher() {};
    Watcher.prototype.change = function(num) {
      str += num;
    };
    let watcher1 = new Watcher();
    eb.on(`call3`, function(x) {watcher1.change(x);});
    let watcher2 = new Watcher();
    eb.on(`call1`, function(x) {watcher2.change(x);});
    let watcher3 = new Watcher();
    eb.on(`call8`, function(x) {watcher3.change(x);});
    let watcher4 = new Watcher();
    eb.on(`call0`, function(x) {watcher4.change(x);});
    for (let i = 0; i < 10; i++) {
      object.number = i;
    }
    assert.equal(str, `0138`);
  });

  it(`a check metod of vvscode`, function() {
    try {
      let eb = new EventBus();
      function cb() {null};
      eb.off(`some`, cb);
    } catch (error) {
      console.log(error);
      assert.equal(1, 0);
    }
    assert.equal(1, 1);
  });
});
