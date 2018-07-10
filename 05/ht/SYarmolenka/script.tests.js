describe(`Compile Template`, () => {
  it(`This is function`, () => {
    assert.isTrue(typeof compileTemplate === `function`);
  });
  it(`Return function`, () => {
    assert.isTrue(typeof compileTemplate() === `function`);
  });
  it(`Insert result in a pointing DOM element`, () => {
    const str = `12345`;
    const p = document.createElement(`p`);
    compileTemplate(str)(p, {});
    assert.isTrue(p.innerHTML === str);
  });
  it(`Insert words according to template`, () => {
    const tpl = `Hi! I am {{name}}. I am {{age}} years old. I am from {{city}}.`
    const data = {name: `Sergey`, age: 1, city: 'City'}
    const p = document.createElement(`p`);
    compileTemplate(tpl)(p, data);
    assert.isTrue(p.innerHTML === `Hi! I am Sergey. I am 1 years old. I am from City.`);
  });
});

describe(`Observer`, () => {
  const eb = new EventBus();
  it(`.on, .off, .once, .trigger are functions`, () => {
    assert.equal(typeof eb.on, `function`);
    assert.equal(typeof eb.off, `function`);
    assert.equal(typeof eb.trigger, `function`);
    assert.equal(typeof eb.once, `function`);
  });

  it(`Accept and call callback`, () => {
    let a;
    const func = _ => a = 5;
    eb.on(`test1`, func);
    eb.trigger(`test1`);
    assert.equal(a, 5);
  });

  it(`Transfer parameters for callback`, () => {
    let a;
    const func = (x, y) => a = x + y;
    eb.on(`test2`, func);
    eb.trigger(`test2`, 5, 6);
    assert.equal(a, 11);
    eb.trigger(`test2`, 4, 0);
    assert.equal(a, 4);
  });
  it(`Transfer any quantity parameters for callback`, () => {
    const args = `transfer any quantity parameters for callback`.split(``);
    let str;
    eb.on(`test3`, (...args) => str = args.join(''));
    eb.trigger(`test3`, ...args);
    assert.equal(str, `transfer any quantity parameters for callback`);
  });
  it(`Write events with same names`, () => {
    let a, b;
    eb.on(`test4`, _ => a = 2);
    eb.on(`test4`, _ => b = 3);
    eb.trigger(`test4`);
    assert.equal(a + b, 5);
  });
  it(`.once works one time`, () => {
    let a, b;
    eb.on(`test5`, x => a = x);
    eb.once(`test5`, x => b = x);
    eb.trigger(`test5`, 5);
    assert.equal(a, 5);
    assert.equal(b, 5);
    eb.trigger(`test5`, 8);
    assert.equal(a, 8);
    assert.equal(b, 5);
  });
  it(`.off without second parameter deletes events with same name`, () => {
    let a, b;
    eb.on(`test6`, x => a = x);
    eb.on(`test6`, x => b = x);
    eb.trigger(`test6`, 5);
    assert.equal(a, 5);
    assert.equal(b, 5);
    eb.off(`test6`);
    eb.trigger(`test6`, 7);
    assert.equal(a, 5);
    assert.equal(b, 5);
  });
  it(`.off with second parameter deletes only an event is equal callback`, () => {
    let a, b;
    const func1 = x => a = x;
    const func2 = x => b = x;
    eb.on(`test7`, func1);
    eb.on(`test7`, func2);
    eb.trigger(`test7`, 4);
    assert.equal(a, 4);
    assert.equal(b, 4);
    eb.off(`test7`, func1);
    eb.trigger(`test7`, 8);
    assert.equal(a, 4);
    assert.equal(b, 8);
  });
  it(`How many events - so many function calls`, () => {
    const eb = new EventBus();
    let i = 0;
    const func = _ => i++;
    eb.on(`s1`, func);
    eb.on(`s1`, func);
    eb.once(`s2`, func);
    eb.trigger(`s1`);
    assert.equal(i, 2);
    eb.trigger(`s2`);
    assert.equal(i, 3);
  });
});

describe(`Router`, () => {
  const test = [];
  new Router([
    {
      name: `index`,
      match: ``,
      onBeforeEnter () {test.push(`oBE-index`)},
      onEnter () {test.push(`oE-index`)},
      onLeave () {test.push(`oL-index`)}
    },
    {
      name: `string`,
      match: `string`,
      onBeforeEnter () {test.push(`oBE-string`)},
      onEnter () {test.push(`oE-string`)},
      onLeave () {test.push(`oL-string`)}
    },
    {
      name: `RegExp`,
      match: /regexp=(.+)/,
      onBeforeEnter (text) {test.push(`oBE-${text}`)},
      onEnter (text) {test.push(`oE-${text}`)},
      onLeave (text) {test.push(`oL-${text}`)}
    },
    {
      name: `function`,
      match: text => text === `function` ? `func` : 0,
      onBeforeEnter (res) {test.push(`oBE-${res}`)},
      onEnter (res) {test.push(`oE-${res}`)},
      onLeave (res) {test.push(`oL-${res}`)}
    }
  ]);
    window.location.hash = 'string';
    window.location.hash = 'regexp=testRegExp';
    window.location.hash = 'function';
    window.location.hash = '123';
  it(`If receive a new hash then call onBeforeEnter and onEnter for the new hash`, done => {
    setTimeout(_ => {
      window.location.hash = '';
      (test[0] === 'oBE-index' && test[1] === 'oE-index') ? done() : 0;
    }, 0);
  });
  it(`If receive a new hash then call onLeave for the old hash`, done => {
    setTimeout(_ => {
      test[2] === 'oL-index' ? done() : 0;
    }, 0);
  });
  it(`Handle a string`, done => {
    setTimeout(_ => {
      (test[3] === 'oBE-string' && test[4] === 'oE-string' && test[5] === 'oL-string') ? done() : 0;
    }, 0);
  });
  it(`Handle a RegExp and transfer result in callbacks`, done => {
    setTimeout(_ => {
      (test[6] === 'oBE-testRegExp' && test[7] === 'oE-testRegExp' && test[8] === 'oL-testRegExp') ? done() : 0;
    }, 0);
  });
  it(`Handle a function and transfer result the function in callbacks`, done => {
    setTimeout(_ => {
      (test[9] === 'oBE-func' && test[10] === 'oE-func' && test[11] === 'oL-func') ? done() : 0;
    }, 0);
  });
  it(`Come back if unknown hash`, done => {
    setTimeout(_ => {
      (test[12] === 'oBE-func' && test[13] === 'oE-func' && test[14] === 'oL-func') ? done() : 0;
    }, 0);
  });
});
