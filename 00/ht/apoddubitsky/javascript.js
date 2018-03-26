"use strict";

while (true) {
  var name = prompt("Enter your name: ", "");
  if (name != 0 && name != "null") break;
}

while (true) {
  var age = prompt("Enter your age: ", "");
  if (isFinite(age) && age > 0) {
    break;
  }
}

window.onload = function() {
  if (age < 18) {
    return (document.getElementById("txt").innerText =
      "Здарова, " + name + ". Как твои " + age + "?");
  } else {
    return (document.getElementById("txt").innerText =
      "Привествую, " + name + ". Уж " + age + " лет прошло");
  }
};
