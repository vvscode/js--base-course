/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */

/**
 * Написать функцию `isDeepEqual`
 * которая принимает на вход двe переменных
 * и проверяет идентичны ли они по содержимому. Например
 * @param {*} objA
 * @param {*} objB
 * @return {boolean} идентичны ли параметры по содержимому
 */

function isDeepEqual(objA, objB) {
  var argsPair = '' + arguments[0] + arguments[1];
  if (isDeepEqual[argsPair]) {
    isDeepEqual[argsPair] += 1;
  } else {
    isDeepEqual[argsPair] = 1;
  }
  if (objA !== objA && objB !== objB) {
    //comparing NaN
    return true;
  }
  if (objA.length !== objB.length) {
    return false;
  }

  if (typeof objA !== 'object') {
    return objA === objB;
  }

  if (Object.keys(objA).length !== Object.keys(objB).length) {
    return false;
  }

  for (var i in objA) {
    if (isDeepEqual[argsPair] > 1) {
      isDeepEqual[argsPair] = 0;
      break;
    }
    if (!isDeepEqual(objA[i], objB[i])) {
      return false;
    }
  }
  return true;
}

/**
 * Функция фиксации контекста
 * @param {*} func Функция для которой нужно зафиксировать контекст
 * @param {*} context значение для this
 * @return {function} функция с зафиксированным контекстом
 */
function bind(func, context) {
  return function() {
    return func.apply(context, arguments);
  };
}

/**
 * Реализовать метод .myBind для всех функций,
 * который работает так же как оригинальный .bind но не использует его внутри
 * (можно использовать фукнцию выше)
 */

Function.prototype.myBind = function(context) {
  return bind(this, context);
};
/**
 * создать объект с волшебным свойством,
 * чтобы при присвоении ему значения, в консоль выводилась текущая дата и значение, которое присваиваем.
 * А при чтении всегда выводилось число на 1 больше предыдущего
 * o.magicProperty = 5; // 'Sat Mar 24 2018 13:48:47 GMT+0300 (+03) -- 5'
 * console.log(o.magicProperty); // 6
 * console.log(o.magicProperty); // 7
 * console.log(o.magicProperty); // 8
 */

var objectWithMagicProperty = {
  magicProp: undefined,
  get magicProperty() {
    this.magicProp++;
    return this.magicProp;
  },
  
  set magicProperty(value) {
    this.magicProp = value;
    console.log(new Date() + ' ' + '-- ' + value);
  }
}

/**
 * Создать конструктор с методами, так,
 * чтобы следующий код работал и делал соответствующие вещи
 * те запуск кода ниже должен делать то, что говорят методы
 * u.askName().askAge().showAgeInConsole().showNameInAlert();
 */
function User() {}

User.prototype.askName = function() {
  this.name = window.prompt('enter your name');
  return this;
};

User.prototype.askAge = function() {
  this.age = window.prompt('enter your age');
  return this;
};

User.prototype.showAgeInConsole = function() {
  console.log(this.age);
  return this;
};

User.prototype.showNameInAlert = function() {
  window.alert(this.name);
  return this;
};

/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */
function calculate(sign) {
  this.sign = sign;
  this.arg1;
  return function(arg) {
    this.arg1 = arg;
    return function(arg) {
      switch (this.sign) {
        case '+':
          return this.arg1 + arg;
        case '*':
          return this.arg1 * arg;
        case '-':
          return this.arg1 - arg;
        case '/':
          return this.arg1 / arg;
      }
    };
  };
}

/**
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */

var Singleton = (function() {
  var SingletonInstance;
  return (function() {
    if (!SingletonInstance) {
      SingletonInstance = this;
    }
    return SingletonInstance;
  });
})()
/**
 * Создайте функцию ForceConstructor
 * которая работает как конструктор независимо от того,
 * вызвана она с new или без
 * и сохраняет параметры в создаваемый объект с именами параметров
 */
function ForceContructor(a, b, c) {
  if (!new.target) {
    return new ForceContructor(a, b, c);
  }
  this.a = a;
  this.b = b;
  this.c = c;
}

/**
 * Написать фукнцию сумматор, которая будет работать
 * var s = sum();
 * log(s); // 0
 * log(s(1)); // 1
 * log(s(1)(2)); //3
 * log(s(3)(4)(5)); // 12
 * Число вызовов может быть неограниченым
 */
function sum(arg) {
  var innerArg = arguments[0] || 0;
  innerSum.valueOf = function() {
    return innerArg;
  };
  function innerSum(a) {
    return sum((a || 0) + innerSum);
  }
  return innerSum;
}

function log(x) {
  console.log(+x);
}

/**
 * Написать каррирующую функцию и покрыть ее тестами
 * Функция должна поддерживать каррирование функций с 2,3,4,5 параметрами
 * пример работы  функции
 *
 * function target1(a,b,c,d) { return a + b + c + d }
 * function target2(a,b) { return a + b }
 * curry(target1)(1)(2)(3)(4) // 10
 * curry(target2)(5)(8) // 13
 *
 * Примеры тестов смотреть в файле тестов
 *
 * Читать
 * http://prgssr.ru/development/vvedenie-v-karrirovanie-v-javascript.html
 * @param {*} func
 */

function curry(target) {
  var counter = target.length;
  var args = [];
  return function innerFunction(a) {
    args.push(a);
    counter--;
    if (counter === 0) {
      return target.apply(this, args);
    }
    return innerFunction.bind(this);
  };
}
/*
Написать код, который для объекта созданного с помощью конструктора будет показывать, 
что объект является экземпляром двух классов
*/
// User === PreUser; // false
// u instanceof User; // true
// u instanceof Array; // true
// u instanceof PreUser; // true

function PreUser() {}
PreUser.prototype = Object.create(Array.prototype);
User.prototype = Object.create(PreUser.prototype);
/*
Создать веб страницу. Добавить на нее форму с полями 
- имя (строкое поле), 
- родной город (Выпадающий список), 
- Комментарий (многострочное поле), пол (radiobutton). 
При нажатии на кнопку - нужно собрать данные введенные в поля и вывести их в блоке под формой, 
после чего поля очистить.
*/

/* 
Используя функцию drawCalendar из прошлого урока
создать функцию drawInteractiveCalendar(el)
Которая выводит календарь, в шапке которого отображается
[<] месяц / год [>]
При клике по кнопкам [<] / [>] нужно реализовать листание календаря
Добавть на страницу index.html вызов календаря
*/

function drawCalendar(year, month, htmlEl) {
  //using linux 'cal' as an example
  var table =
    '<table><tr><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th><th>Su</th></tr>';

  var date = new Date(year, month - 1);

  if (date.getDay() !== 1 && date.getDay()) {
    table += '<tr>';
    for (var i = 1; i < date.getDay(); i++) {
      table += '<td></td>';
    }
  }
  if (date.getDay() === 0) {
    table += '<tr>';
    for (var i = 6; i > date.getDay(); i--) {
      table += '<td></td>';
    }
  }

  while (date.getMonth() == month - 1) {
    //starting a row before monday
    if (date.getDay() == 1) {
      table += '<tr>';
    }
    table += '<td>' + date.getDate() + '</td>';
    //closing a row after sunday
    if (date.getDay() === 0) {
      table += '</tr>'; //
    }
    date.setDate(date.getDate() + 1);
  }

  //closing last row if last day wasn't monday
  if (date.getDay() != 1) {
    table += '</tr>';
  }

  htmlEl.innerHTML = table + '</table>';
}

function drawInteractiveCalendar(year, month, el) {
  var currentMonth = month;
  var currentDate = new Date(year, month);
  var innerEl = document.createElement('div');
  var header = document.createElement('h');
  var d = document.createTextNode(' ' + currentDate.getFullYear() + ', ' + (currentDate.getMonth() + 1) + ' ');
  header.appendChild(d);

  //creating buttons
  var leftButton = document.createElement('button');
  var rightButton = document.createElement('button');
  var r = document.createTextNode('>');
  var l = document.createTextNode('<');
  rightButton.appendChild(r);
  leftButton.appendChild(l);
  rightButton.addEventListener('click', function() {
    redrawCalendar('+');
  });
  leftButton.addEventListener('click', function() {
    redrawCalendar('-');
  });
  el.appendChild(leftButton);
  el.appendChild(header);
  el.appendChild(rightButton);

  drawCalendar(currentDate.getFullYear(), currentDate.getMonth(), innerEl);
  el.appendChild(innerEl);

  function changeDate(direction) {
    if (direction === '+') {
      currentMonth++;
      currentDate.setMonth(currentMonth);
      currentMonth = currentDate.getMonth();
    }
    if (direction === '-') {
      currentMonth--;
      currentDate.setMonth(currentMonth);
      currentMonth = currentDate.getMonth();
    }
  }

  function redrawCalendar(direction) {
    changeDate(direction);
    drawCalendar(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      innerEl
    );
    header.removeChild(header.firstChild);
    //adding 1 to month because now working with js date representation
    d = document.createTextNode(
        ' ' +
        currentDate.getFullYear() +
        ', ' +
        (currentDate.getMonth() + 1) +
        ' '
    );
    header.appendChild(d);
  }
}

function debounce(func, delay) {
  var counter = null; 
  return function() {
    var args = arguments;
    clearTimeout(counter);
    counter = setTimeout(function() {
      func.apply(null, args);
    }, delay)
  }
}

function throttle(func, delay, options) {
  var firstCall = true
  var secondCall = true
  var queued = 0;
  var innerDelay = delay
  return function() {
    var args = arguments;
    var leading;
    var trailing;
    if(!!options) {
      leading = options.leading;
      trailing = options.trailing;
    }
    if(firstCall && leading) {
      firstCall = false
      return
    }
     
    queued++;
    setTimeout(function() {
      if(trailing && queued === 1 && !secondCall) {
        return;
      }
      func.apply(null, args);
      queued--;
    }, innerDelay)
    innerDelay += delay;
    secondCall = false;
  }
}

function sleep(time) {
  var wakeUpTime = new Date().getTime() + time * 1000;
  while(new Date() <= wakeUpTime) {}
}

function notConstructor() {
  if(new.target) {
    throw new Error('this function is not a constructor');
  }
}

function getCounter(count) {
  return {
    log: function() {
      console.log(count)
      return this;
    },
    add: function(sum) {
      count += sum;
      return this;
    },
    reset: function() {
      count = 0;
      return this;
    },
    valueOf: function() {
      return count;
    }
  }
}
