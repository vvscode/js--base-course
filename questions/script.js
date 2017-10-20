/* eslint max-len: ["warn", { "ignoreStrings": true }]*/

const questions1 = `
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
Какие системы сборки есть для js?`;

const questions2 = `Как изменить "this" внутри функции? (5 способов)
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
что такое 'полифилл'?`;

const questions3 = `Что такое "стрелочная" ("arrow function") функция? Чем она отличается от обычной?
Что такое Promise? Какой стандарт отписывает поведение Promise? Основные пункты стандарта?
Чем куки (cookie) отличаются от localStorage ?
Что такое CORS?
Что такое и какие есть коды ответов HTTP?
Что такое jsonp-запрос?
Как код, написанный на ES6 (ES2015-2017) превратить в код, который поддерживается IE10?
Как реализовать простейший модуль на js?
Что такое и зачем нужен паттерн модуль? Какие модули существуют в JS?
Как реализовать подписку на клик по кнопке, которая отработает только один раз? ( с примером кода )
Какие события не "всплывают" ?
Что такое делегирование?
Преимущества и особенности работы с делегированием?
Какие вспомогательные методы есть для работы с промисами?
в чем разница между следующими кусками кода?<br /><pre>promise.then(onSuccess, onError);</pre><br />promise.then(onSuccess).catch(onError);
в чем разница между следующими кусками кода?<br><pre>doSomething().then(function () { return doSomethingElse(); });</pre><br /><pre>doSomething().then(function () { doSomethingElse(); });</pre><br /><pre>doSomething().then(doSomethingElse());</pre><br /><pre>doSomething().then(doSomethingElse);</pre>
`;

const questions4 = `
SOLID
KISS
DRY
YAGNI
MVC
Паттерны проектирования ( Что это? Какие есть группы? )
Антипаттерны проектирования
Модульные системы (CommonJS/ ES6 modules/ AMD)
requirejs
`;

const shuffleList = (list) => {
  for (let i = 0; i < list.length; i++) {
    let rand = Math.floor(Math.random() * list.length);
    let tmp = list[rand];
    list[rand] = list[list.length - 1];
    list[list.length - 1] = tmp;
  }
  return list;
};

const $$ = document.querySelector.bind(document);
let questionsStrings = [questions1, questions2, questions3, questions4];
let roundQuestionsNumber = 0;
let i = 0;

let getQuestions = (() => {
  let questions = [];
  let generateQuestions = () => {
    let level = +$$('#levelSelector').value;

    questions = questionsStrings
      .filter((_, index) => index < level)
      .join('\n')
      .trim()
      .split('\n')
      .map((i) => i.trim())
      .filter(Boolean);
    shuffleList(questions);
    shuffleList(questions);
    roundQuestionsNumber = questions.length;
    i = 0;
  };

  return () => {
    if (!questions.length) {
      generateQuestions();
    }
    return questions;
  };
})();

const drawNextQuestion = () => {
  let questions = getQuestions();
  i++;
  let question = questions.pop();
  $$('.question').innerHTML = `<sup>${i}</sup>/<sub>${roundQuestionsNumber}</sub> > ${question}`;
};

$$('.question').addEventListener('click', drawNextQuestion);
document.body.addEventListener('keyup', (ev) => {
  let SPACE_KEY_CODE = 32;
  if (ev.key === ' ' || ev.keyCode === SPACE_KEY_CODE) {
    drawNextQuestion();
  }
});
