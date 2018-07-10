import {Selector} from 'testcafe';

const date = new Date().toLocaleString(`en`, {month: 'long', year: 'numeric'}).toUpperCase().replace(' ', ' / ');

fixture `Getting Started`
  .page `https://syarmolenka.github.io/calendar2/#/`;

test('Test a lot of calendars', async t => {
  await t
    .click(Selector('.checkbox').nth(0).find('label'));
  const text1 = await Selector('.code').value;
  await t
    .click(Selector('.checkbox').nth(0).find('label'))
    .click(Selector('.checkbox').nth(1).find('label'))
    .click(Selector('.dropdown').nth(0))
    .click(Selector('.dropdown').nth(0).find('.item').nth(5))
    .click(Selector('.dropdown').nth(2))
    .click(Selector('.dropdown').nth(2).find('.item').nth(30));
  const text2 = await Selector('.code').value;
  await t
    .click(Selector('.checkbox').nth(1).find('label'))
    .click(Selector('.checkbox').nth(2).find('label'))
    .click(Selector('.dropdown').nth(0))
    .click(Selector('.dropdown').nth(0).find('.item').nth(0))
    .click(Selector('.dropdown').nth(2))
    .click(Selector('.dropdown').nth(2).find('.item').nth(40));
  const text3 = await Selector('.code').value;
  await t
    .click(Selector('.checkbox').nth(2).find('label'))
    .click(Selector('.checkbox').nth(3).find('label'))
    .typeText(Selector('.input').find('input'), 'SomethingCSSClass', {paste: true});
  const text4 = await Selector('.code').value;
  await t
    .navigateTo(`https://syarmolenka.github.io/calendar2/#/test`)
    .setNativeDialogHandler(type => {
      if (type === 'prompt') return 'test';
      if (type === 'confirm') return true;
    })
    .typeText(Selector('#testInput'), text1, {paste: true})
    .click(Selector('.test').find('button'))
    .typeText(Selector('#testInput'), text2, {paste: true})
    .click(Selector('.test').find('button'))
    .typeText(Selector('#testInput'), text3, {paste: true})
    .click(Selector('.test').find('button'))
    .typeText(Selector('#testInput'), text4, {paste: true})
    .click(Selector('.test').find('button'));
  await t
    .expect(Selector('.Calendar').nth(0).find('th').nth(0).innerText).eql(date)
    .expect(Selector('.Calendar').nth(0).find('.prev').exists).notOk()
    .expect(Selector('.Calendar').nth(0).find('.next').exists).notOk()
    .doubleClick(Selector('.Calendar').nth(0).find('td').nth(10))
    .expect(Selector('.Calendar').nth(0).find('td').nth(10).find('.task').innerText).eql('test')
    .expect(Selector('.Calendar').nth(3).find('td').nth(10).find('.task').exists).notOk()
    .click(Selector('.Calendar').nth(0).find('td').nth(10).find('.delTask'))
    .expect(Selector('.Calendar').nth(0).find('td').nth(10).find('.task').exists).notOk();
  await t
    .expect(Selector('.Calendar').nth(1).find('th').nth(1).innerText).eql('JUNE / 2000')
    .click(Selector('.Calendar').nth(1).find('.next'))
    .expect(Selector('.Calendar').nth(1).find('th').nth(1).innerText).eql('JULY / 2000')
    .click(Selector('.Calendar').nth(1).find('.prev'))
    .doubleClick(Selector('.Calendar').nth(1).find('td').nth(20))
    .expect(Selector('.Calendar').nth(1).find('td').nth(20).find('.task').exists).notOk();
  await t
    .expect(Selector('.Calendar').nth(2).find('th').nth(1).innerText).eql('JANUARY / 2010')
    .doubleClick(Selector('.Calendar').nth(2).find('td').nth(15))
    .click(Selector('.Calendar').nth(2).find('.next'))
    .expect(Selector('.Calendar').nth(1).find('th').nth(1).innerText).eql('JUNE / 2000')
    .click(Selector('.Calendar').nth(2).find('.prev'))
    .expect(Selector('.Calendar').nth(2).find('td').nth(15).find('.task').innerText).eql('test')
    .expect(Selector('.Calendar').nth(2).find('td').nth(15).find('.delTask').exists).notOk();
  await t
    .expect(Selector('.Calendar').nth(3).find('th').nth(1).innerText).eql('')
    .expect(Selector('.SomethingCSSClass').exists).ok();
});
test('Test a calendar', async t => {
  await t
    .click(Selector('.dropdown').nth(0))
    .click(Selector('.dropdown').nth(0).find('.item').nth(4))
    .click(Selector('.dropdown').nth(2))
    .click(Selector('.dropdown').nth(2).find('.item').nth(48));
  const text = await Selector('.code').value;
  await t
    .navigateTo(`https://syarmolenka.github.io/calendar2/#/test`)
    .typeText(Selector('#testInput'), text, {paste: true})
    .click(Selector('.test').find('button'))
    .expect(Selector('.Calendar').nth(0).find('th').nth(1).innerText).eql('MAY / 2018')
    .expect(Selector('.Calendar').nth(0).find('td').nth(1).innerText).eql('1')
    .click(Selector('.Calendar').nth(0).find('.next'))
    .click(Selector('.Calendar').nth(0).find('.next'))
    .click(Selector('.Calendar').nth(0).find('.next'))
    .expect(Selector('.Calendar').nth(0).find('th').nth(1).innerText).eql('AUGUST / 2018')
    .expect(Selector('.Calendar').nth(0).find('td').nth(2).innerText).eql('1')
    .setNativeDialogHandler(type => {
      if (type === 'prompt') return 'message';
      if (type === 'confirm') return true;
    })
    .doubleClick(Selector('.Calendar').nth(0).find('td').nth(10))
    .expect(Selector('.Calendar').nth(0).find('td').nth(10).find('.task').innerText).eql('message')
    .click(Selector('.Calendar').nth(0).find('.prev'))
    .expect(Selector('.Calendar').nth(0).find('td').nth(10).find('.task').exists).notOk()
    .click(Selector('.Calendar').nth(0).find('.next'))
    .expect(Selector('.Calendar').nth(0).find('td').nth(10).find('.task').innerText).eql('message')
    .click(Selector('.Calendar').nth(0).find('td').nth(10).find('.delTask'))
    .expect(Selector('.Calendar').nth(0).find('td').nth(10).find('.task').exists).notOk();
});
