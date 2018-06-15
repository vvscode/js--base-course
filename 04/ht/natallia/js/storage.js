function getStorageValue(value) {
  var storage = value.database;
  var html = document.getElementById(value.el);

  var allDay = document.querySelectorAll('span[data-day]');
  if (storage === 'firebase') {
    initAuth(html);
    var uid;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        uid = user.uid;
        var folder = '/tasks/';
        getData(folder, uid)
          .then(function(response) {
            return response.json();
          })
          .then(function(database) {
            var data = JSON.parse(JSON.stringify(Object.keys(database)));
            data.forEach(function(element) {
              var dataUser = database[element][element];
              var el = element.match(/calendar\d*/gi)[0],
                ev = element.match(/event\d+/gi)[0].replace(/event/, ''),
                day = element.match(/day\d+/gi)[0].replace(/day/, ''),
                month = element.match(/month\d+/gi)[0].replace(/month/, ''),
                year = element.match(/year\d+/gi)[0].replace(/year/, '');
              drawTasks(el, ev, day, month, year, dataUser);
            });
            return data;
          });
      } else {
        var allTd = html.querySelectorAll('td');
        allTd.forEach(function(elem) {
          if (elem.querySelector('.user-tasks-wrap')) {
            elem.removeChild(elem.querySelector('.user-tasks-wrap'));
          }
        });
      }
    });
  } else if (storage === 'localStorage') {
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i),
        el = key.match(/calendar\d*/gi)[0],
        ev = key.match(/event\d+/gi)[0].replace(/event/, ''),
        day = key.match(/day\d+/gi)[0].replace(/day/, ''),
        month = key.match(/month\d+/gi)[0].replace(/month/, ''),
        year = key.match(/year\d+/gi)[0].replace(/year/, '');

      if (!document.getElementById(el)) {
        localStorage.removeItem(key);
      }
      drawTasks(el, ev, day, month, year);
    }
  }
  function drawTasks(el, ev, day, month, year, dataUser) {
    allDay.forEach(function(elem) {
      if (
        el === elem.getAttribute('data-el') &&
        year === elem.getAttribute('data-year') &&
        month === elem.getAttribute('data-month') &&
        day === elem.getAttribute('data-day')
      ) {
        function valueLocStorage(key) {
          return new Promise(function(resolve) {
            setTimeout(
              function() {
                var value = localStorage.getItem(key);
                resolve(value);
              }.bind(key),
              10
            );
          });
        }

        var td = elem.parentNode,
          userTask = document.createElement('div'),
          wrap;

        if (!td.querySelector('div')) {
          wrap = document.createElement('div');
          wrap.className = 'user-tasks-wrap';
          td.appendChild(wrap);
        } else {
          wrap = td.querySelector('.user-tasks-wrap');
        }

        userTask.className = 'user-task';
        userTask.setAttribute('data-el', el);
        userTask.setAttribute('data-num', ev);
        userTask.setAttribute('data-day', day);
        userTask.setAttribute('data-month', month);
        userTask.setAttribute('data-year', year);

        if (storage === 'localStorage') {
          valueLocStorage(key).then(function(value) {
            userTask.innerHTML =
              '<p class="user-task__p">' +
              value +
              '</p><button data-close="close" class="user-task__btn btn"><img src="./img/cross.png"></button>';
            wrap.appendChild(userTask);
          });
        } else if (storage === 'firebase') {
          wrap.appendChild(userTask);
          userTask.innerHTML =
            '<p class="user-task__p">' +
            dataUser +
            '</p><button data-close="close" class="user-task__btn btn"><img src="./img/cross.png"></button>';
        }
      }
    });
  }
  return allDay;
}
