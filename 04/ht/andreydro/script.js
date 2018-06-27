"use strict";

window.onhashchange = function() {
  displayPage(window.location.hash || "#1");
};

displayPage(window.location.hash || "#1");

function displayPage(hash) {
  if (hash == "#1") {
    displayCalendar();
  } else if (hash == "#2") {
    displayCreate();
  } else if (hash == "#3") {
    displayAuthor();
  }
}

function displayCalendar() {
  var content = document.getElementById("content");
  content.innerHTML = "";

  var calendar = document.createElement("div");
  calendar.id = "calendar";
  content.appendChild(calendar);

  var newCalendar = new Calendar({
    element: "#calendar",
    changeMonth: true,
    addNotes: true,
    removeNotes: true,
    showMonth: true
  });
}

function displayCreate() {
  var content = document.getElementById("content");

  var createCode = document.getElementById("createCode");
  content.innerHTML = createCode.innerHTML;

  var params = {
    element: "#calendarSettings",
    changeMonth: true,
    addNotes: true,
    removeNotes: true,
    showMonth: true
  };

  content.querySelector("#changeMonth").addEventListener("click",  function(e) {
    params.changeMonth = e.target.checked;
    new Calendar(params);
    displayCode();
  });
  content.querySelector("#addNotes").addEventListener("click", function(e) {
    params.addNotes = e.target.checked;
    new Calendar(params);
    displayCode();
  });
  content.querySelector("#removeNotes").addEventListener("click", function(e) {
    params.removeNotes = e.target.checked;
    new Calendar(params);
    displayCode();
  });
  content.querySelector("#showMonth").addEventListener("click", function(e) {
    params.showMonth = e.target.checked;
    new Calendar(params);
    displayCode();
  });

  new Calendar(params);
  displayCode();

  function displayCode() {
    var code = document.getElementById("code");
    code.innerText =
      "var calendar = new Calendar({\n" +
      ' element: "' +
      params.element +
      '", \n' +
      " changeMonth: " +
      params.changeMonth +
      ", \n" +
      " addNotes: " +
      params.addNotes +
      ", \n" +
      " removeNotes: " +
      params.removeNotes +
      ", \n" +
      " showMonth: " +
      params.showMonth +
      ",\n" +
      "});";
  }
}

function displayAuthor() {
  var content = document.getElementById("content");
  var about = document.getElementById("about");
  content.innerHTML = about.innerHTML;
}