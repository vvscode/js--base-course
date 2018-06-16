const assert = require('chai').assert;
const sinon = require('sinon');

const Parallel = require('./parallel');

describe('Parallel', () => {
  it('is a function', () => assert.isFunction(Parallel));
  it('is a constructor', () => assert.instanceOf(new Parallel(), Parallel));
  it('has public interface', () => {
    let p = new Parallel();
    assert.isFunction(p.job);
    assert.isFunction(p.done);
  });
  it('.job is chainable', () => {
    const p = new Parallel();
    assert.equal(p, p.job());
  });
  it('calls done if no jobs asynchroniosly', (done) => {
    const cb = sinon.spy();
    const p = new Parallel();
    p.done(cb);
    assert.isNotOk(cb.called);
    setTimeout(() => {
      assert.isOk(cb.called);
      done();
    });
  });
  it("doesn't call jobs with no .done call", (done) => {
    const p = new Parallel();
    const cb = sinon.spy();
    p.job(cb);
    assert.isNotOk(cb.called);
    setTimeout(() => {
      assert.isNotOk(cb.called);
      done();
    }, 100);
  });
  it('calls jobs with .done call', (done) => {
    const p = new Parallel();
    const cb = sinon.spy();
    p.job(cb).done(() => null);
    setTimeout(() => {
      assert.isOk(cb.called);
      done();
    }, 100);
  });
  it('calls .done cb with results of jobs', function(done) {
    this.timeout(10000 + 500);
    const runner = new Parallel(2);
    let result = 'before/';

    runner
      .job(step0)
      .job(step1)
      .job(step2)
      .job(step3)
      .job(step4)
      .done(onDone);

    result += 'after/';

    function step0(done) {
      result += 'step0/';

      done('step0');
    }

    function step1(done) {
      result += 'step1/';

      setTimeout(done, 3000, 'step1');
    }

    function step2(done) {
      result += 'step2/';

      setTimeout(done, 1500, 'step2');
    }

    function step3(done) {
      result += 'step3/';

      setTimeout(done, 2000, 'step3');
    }

    function step4(done) {
      result += 'step4/';

      setTimeout(done, 500, 'step4');
    }

    let isPassed = false;
    function onDone(results) {
      assert.isArray(results);
      assert.deepEqual(results, ['step0', 'step1', 'step2', 'step3', 'step4']);
      // assert.equal(result, "before/after/step0/step1/step2/step3/step4/");
      isPassed = true;
    }

    setTimeout(() => done(isPassed ? null : 'not passed'), 8000);
  });

  for (let i = 1; i <= 6; i++) {
    let PARALLEL_LIMIT = i;
    it(`calls jobs in ${PARALLEL_LIMIT} parallel`, function(done) {
      this.timeout(PARALLEL_LIMIT * 500);
      const runner = new Parallel(PARALLEL_LIMIT);
      let currentTasks = 0;
      let maxNumOfParallelTasks = 0;
      const getTask = (delay) => (done) => {
        currentTasks += 1;
        maxNumOfParallelTasks = Math.max(maxNumOfParallelTasks, currentTasks);
        setTimeout(() => {
          maxNumOfParallelTasks = Math.max(maxNumOfParallelTasks, currentTasks);
          currentTasks -= 1;
          done(`task`);
        }, delay);
      };

      for (let j = 0; j <= PARALLEL_LIMIT * 5; j++) {
        runner.job(getTask(20));
      }
      runner.done(() => {
        assert.equal(maxNumOfParallelTasks, PARALLEL_LIMIT);
        done();
      });
    });
  }
});
