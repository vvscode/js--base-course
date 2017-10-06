const questions = `
Что такое переменная?
как объявить переменную? как инициализировать переменную?
виды циклов ( 3 вида ) ?
сколько и какие типы данных в javascript?
Как узнать тип переменной?
что такое область видимости?
каким образом можно реализовать условное выполнение кода ?
условные операторы в javascript - какие?
что такое тернарный оператор?
Как обойтись без условных операторов если нужно сделать условное выполнение кода?
что такое функция? 
какими характеристиками можно описать функцию?
Как можно создать функцию? 3 способа.
Что такое объект? Как создать объект? ( 3 способа )
Что такое передача по ссылке / передача по значению?
Что такое минификация и зачем она нужна?
Как можно добавить javascript код в html страницу? 2 способа
Что такое массив?
Как создать массив? ( 3 способа ) 
Как запросить данные у пользователя?
Что такое замыкание?
Как узнать сколько параметров принимает функция?
Как узнать есть ли у объекта свойство x ?
Как сделать ревес строки?
Как удалить предпоследний элемент в массиве?
Как заменить в строке "papa roach" все буквы a на A ?
Сколькими способами ( с примерами кода ) можно найти на странице div с id someId ?
Как устроен событийный цикл в js?
Что такое API? Примеры?
Как в js реализовать многопоточность?
Как в js реализовать наследование одного "класса" от другого?
Сколькими способами можно проитерироваться по всем полям объекта?
Что такое callback ? Зачем ?
Почему 1 + '2' ? и 1 - '2' ?
Как и когда работает преобразование типов?
Что такое HTTP ? 
Из чего состоит HTTP протокол?
Какие есть методы HTTP запросов? Для чего каждый?
Что такое REST ? RPC ?
Что такое "линтер" (linter) ? Зачем они нужны? Какие линтеры есть для javascript?
Что такое "jsdoc" ? Найдите его в своем домашнем задании. Зачем он нужен? Объясните использовнные теги.
Что такое пакетный менеджер? 
Какие пакетные менеджеры есть для js?
Что делают системы сборки? 
Какие системы сборки есть для js?

Как изменить "this" внутри функции? (5 способов)
чем различаются ".call" / ".apply" / ".bind"
Что такое контекст вызова функции? Чем определяется?
Что такое сигнатура функции?
Чем характеризуется функция?
Что такое прототип?
Как работает конструктор? Что происходит при вызове со словом "new" ?
Как происходит чтение свойств из объекта?
Как происходит запись свойств в объект?
Как проверить на принадлежность классу?
Как работает "instanceof" ?
4е принципа ООП
виды полиморфизма. И их объяснение
событийный цикл в javascript
что такое фаза захвата / capturing ?
что такое фаза всплытия / bubbling ?
как подписаться на событие документа / html элемента?
что такое "Функция высшего порядка"?
что такое синхронный / асинхронный код?
что такое "каррирование" ?
в чем разница объявления методов в конструкторе и на .prototype" ?
что такое 'полифилл'?
`
  .trim()
  .split("\n")
  .map(i => i.trim())
  .filter(Boolean);

const shuffleList = list => {
  for (let i = 0; i < list.length; i++) {
    let rand = Math.floor(Math.random() * list.length);
    let tmp = list[rand];
    list[rand] = list[list.length - 1];
    list[list.length - 1] = tmp;
  }
  return list;
};

const $$ = document.querySelector.bind(document);

const roundQuestions = shuffleList([...questions]);

let i = 0;
const drawNextQuestion = () => {
  if (!roundQuestions.length) {
    return;
  }
  i++;
  let question = roundQuestions.pop();
  $$(
    ".question"
  ).innerHTML = `<sup>${i}</sup>/<sub>${questions.length}</sub> > ${question}`;
};

$$(".question").addEventListener("click", drawNextQuestion);
document.body.addEventListener("keyup", ev => {
  var SPACE_KEY_CODE = 32;
  if (ev.key === " " || ev.keyCode === SPACE_KEY_CODE) {
    drawNextQuestion();
  }
});
