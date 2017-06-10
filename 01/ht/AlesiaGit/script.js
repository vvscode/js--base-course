window.onload = function() {


  //-----------------------
  // ФУНКЦИЯ ПОЛИНДРОМ
  //-----------------------

  function isPolindrom(a) {
    var arr = a.split("");
    var arrNew = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] != " ") {
      	arrNew.push(arr[i]);
      }
    }
    var arrNewString = arrNew.join(",");
    console.log(arrNewString);
    var arrReverse = arrNew.reverse();
    var arrReverseString = arrReverse.join(",");
    console.log(arrReverseString);
    if(arrNewString == arrReverseString) {console.log("this is polindrom");} else {console.log("this is not");}
    
  }
  isPolindrom("bob");
  isPolindrom("not bob");



  //-----------------------
  // ПРОВЕРКА ИДЕНТИЧНОСТИ ОБЪЕКТОВ
  //-----------------------

  function isDeepEqual (a, b) {
  	if (typeof(a) !== typeof(b)) return false; 
    if (typeof(a) !== typeof({})) return a === b; 
    if (Array.isArray(a) != Array.isArray(b)) return false; 
    if (Object.keys(a).length !== Object.keys(b).length) return false; 
    for(var key in a) {
      if (!isDeepEqual(a[key], b[key])) return false;
    }
    return true;
  }

  var a = { prop1: 1, list: [1,2,3], o: { x: 2 } };
  var b = { prop1: 1, list: [1,2,5], o: { x: 2 }};

  console.log(isDeepEqual(a, b));



  //-----------------------
  // ОБЪЕКТ ЭКЗЕМПЛЯР ДВУХ КЛАССОВ
  //-----------------------
  window.onresize = function () {
    var timer = setInterval(function() { 
      var time = new Date();
      var clock = time.toLocaleTimeString();
      console.log(clock);
      document.getElementById("new").innerHTML = clock;
    }, 10000);

    setTimeout(function() {
      clearInterval(timer);
    }, 50000);
  };



  //-----------------------
  // ОБЪЕКТ ЭКЗЕМПЛЯР ДВУХ КЛАССОВ
  //-----------------------

  function Person(gender) { //конструктор родителя, которые описывает его свойства кроме методов
    this.gender = gender;
  }

  Person.prototype = Object.create(Array.prototype);
  Person.prototype.born = function() { // методы складываются отдельно в прототип
    console.log("A " + this.gender + " is born!");
  }

  function Woman(gender) { // конструктор потомка, где this = контекст родителя
    Person.apply(this, arguments);
  }

  Woman.prototype = Object.create(Person.prototype); //наследование методов родителя

  Woman.prototype.born = function () { // методы потомка
    Person.prototype.born.apply(this);
    console.log("She is beautiful!");
  };

  var baby = new Woman("girl"); //создание объекта

  if (baby instanceof Person) {console.log('true1');}
  if (baby instanceof Woman) {console.log('true2');}
  if (baby instanceof Array) {console.log('true3');}
  if (Person !== Woman) {console.log('false');}



  //-----------------------
  // MAGIC PROPERTY
  //-----------------------

  var o = {
  	set magicProperty (value) {
      console.log("magicProperty value: "+ value + "\n" + "current time is: " + new Date().toLocaleTimeString());
    }
  };
  o.magicProperty = 3;



  //-----------------------
  // НЕЛЬЗЯ ИСПОЛЬЗОВАТЬ NEW
  //-----------------------
  function Sum (a, b) {
    if (this instanceof Window) {
      return a + b; 
    } else { 
      throw "Нельзя использовать new!";
    }
  }

  console.log(Sum (1,4));
  console.log(new Sum (1,4));



  //-----------------------
  // КОНСТРУКТОР С МЕТОДАМИ
  //-----------------------

  function mUser() {
  	this.name = '';
    this.age = '';
    this.askName = function() {
    	this.name = prompt("your name, bitter");
      return this;
      };
    this.askAge = function() {
      this.age = prompt("your age, bitter");
      return this;
    };
    this.showAgeInConsole = function() {
      console.log(this.age);
      return this;
    };
    this.showNameInAlert = function() {
      alert(this.name);
      return this;
    };
  }
   
  var u = new mUser();
  u.askName().askAge().showAgeInConsole().showNameInAlert();



  //-----------------------
  // ФУНКЦИЯ КАЛЬКУЛЯТОР
  //-----------------------

  function calculate(op) {
    return function (a) {
        return function (b) {
          var t = eval(a + op + b);
          console.log(t);
          return t;
         
        }
     }
  }
  calculate('+')(1)(2); // 3
  calculate('*')(2)(3); // 6
  calculate('/')(8)(4); // 2



  //-----------------------
  // ФУНКЦИЯ КОНСТРУКТОР NEW = noNEW
  //-----------------------

  function User() {
    this.Name = "TestUser";
    if (this instanceof Window) {
    	return new User();
    };
  }

  var u = User();
  console.log(u);


  //-----------------------
  // ФУНКЦИЯ СИНГЛТОН 
  //-----------------------

  function UsualClass () {
  	this.Name = "";
  }

  function Singleton () {
  	if (Singleton.instance) {
  		return Singleton.instance
  	}
    this.Name = "";
  	Singleton.instance = this;
    return this;
  }

  console.log("Usual class");
  var a = new UsualClass();
  var b = new UsualClass();
  a.Name = "Hello";
  b.Name = "Bye";
  console.log(a.Name);
  console.log(b.Name);

  console.log("Singleton");
  var a = new Singleton();
  var b = new Singleton();
  a.Name = "Hello";
  b.Name = "Bye";
  console.log(a.Name);
  console.log(b.Name);



  //-----------------------
  // СТРАНИЦА С ПОЛЯМИ 
  //-----------------------

  document.getElementById("submit").onclick = function() {
  	var name = document.getElementById("name").value;
    var city = document.getElementById("city").value;
    var message = document.getElementById("message").value;
  	var nGender = document.getElementById("male").checked == true ? "male": "female";
    document.getElementById("result").innerHTML = name + ", a " + nGender + " user, born in " + city + " wrote the following: <br/><span class='message-style'>" + message ;
  };

};