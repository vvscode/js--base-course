function log(a) {
  console.log(a);
}

function fizzBuzz() {
  for (var a = 1; a <= 100; a++) {
    (a % 3 === 0 && a % 5 === 0 && log("FizzBuzz")) ||
      (a % 3 === 0 && log("Fizz")) ||
      (a % 5 === 0 && log("Buzz")) ||
      log(a);
  }
}

function isPalindrome(str) {
  for (var i = 0; i < str.length / 2; i++) {
    if (str[i] !== str[str.length - (i + 1)]) {
      return false;
    }
  }
  return true;
}

function drawCalendar(year, month, htmlEl) {
  var countOfDaysInMonth = {
    0: 31,
    1: 28,
    2: 31,
    3: 30,
    4: 31,
    5: 30,
    6: 31,
    7: 31,
    8: 30,
    9: 31,
    10: 30,
    11: 31
  };

  var calendar =
    "<table>" +
    "<tr>" +
    "<td>пн</td>" +
    "<td>вт</td>" +
    "<td>ср</td>" +
    "<td>чт</td>" +
    "<td>пт</td>" +
    "<td>сб</td>" +
    "<td>вс</td>" +
    "</tr>";

  var date = new Date(year, month);
  var daysInMonth;

  var isLeapYear =
    (date.getFullYear() % 4 == 0 && date.getFullYear() % 100 != 0) ||
    date.getFullYear() % 400 == 0
      ? true
      : false;

  for (var key in countOfDaysInMonth) {
    if (key == date.getMonth() - 1) {
      daysInMonth = countOfDaysInMonth[key];
      break;
    }
  }

  if (date.getMonth() == 2 && isLeapYear) {
    daysInMonth++;
  }

  calendar += "<tr>";
  for (var i = 1; i <= daysInMonth; i++) {
    calendar += "<td>" + i + "</td>";

    if (i % 7 == 0) {
      calendar += "</tr><tr>";
    }
  }

  return (htmlEl.innerHTML = calendar + "</table>");
}

function isDeepEqual(objA, objB) {
  if (typeof objA === typeof objB) {
    if (typeof objA === "object" && typeof objB === "object") {
      if (objA.length === objB.length) {
        for (var key in objA) {
          if (!isDeepEqual(objA[key], objB[key])) {
            return false;
          }
        }
        return true;
      }
      return false;
    }
    return objA === objB;
  }
}

function spiral(arr) {
  var width = arr[0].length;
  var height = arr.length;
  var resultArray = [];
  var index = 0;

  while (true) {
    for (var i = 0; i < width; i++) {
      resultArray[index++] = arr[0][i];
    }
    arr.splice(0, 1);
    if (!--height) {
      break;
    }

    for (var i = 0; i < height; i++) {
      resultArray[index++] = arr[i][width - 1];
      arr[i].splice(width - 1, 1);
    }
    if (!--width) {
      break;
    }

    for (var i = 0; i < width; i++) {
      resultArray[index++] = arr[height - 1][width - (i + 1)];
    }
    arr.splice(height - 1, 1);
    if (!--height) {
      break;
    }

    for (var i = 0; i < height; i++) {
      resultArray[index++] = arr[height - (i + 1)][0];
      arr[height - (i + 1)].splice(0, 1);
    }
    if (!--width) {
      break;
    }
  }

  return resultArray;
}

function quadraticEquation(a, b, c) {
  var result = [];
  var d = Math.pow(b, 2) - 4 * a * c;

  if (d < 0) {
    return result;
  } else if (d === 0) {
    result[0] = (-b + Math.sqrt(d)) / 2 * a;
  } else {
    result[0] = (-b + Math.sqrt(d)) / 2 * a;
    result[1] = (-b - Math.sqrt(d)) / 2 * a;
  }

  return result;
}