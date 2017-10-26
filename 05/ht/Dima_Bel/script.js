function EventBus() {
  this.handlers = [];
  this.on = (eventName, cb) => {
    this.handlers.push(
      {
        'eventName': eventName,
        'handlerFn': cb,
      }
    );
  },
  this.trigger = (eventName) => {
    this.handlers.filter((handler) => {
      return (handler.eventName === eventName || handler.eventName === 'once_' + eventName);
    }).forEach(function(handler) {
      handler.handlerFn();
    });
    let handlers = this.handlers;
    handlers.forEach((handler, index) => {
      if (handler.eventName === 'once_' + eventName) {
        handlers.splice(index, 1);
      }
    });
  },
  this.off = (eventName) => {
    let handlers = this.handlers;
    handlers.forEach((handler, index) => {
      if (handler.eventName === eventName || handler.eventName === 'once_' + eventName) {
        handlers.splice(index, 1);
      }
    });
  },
  this.once = (eventName, cb) => {
    this.handlers.push(
      {
        'eventName': 'once_' + eventName,
        'handlerFn': cb,
      }
    );
  };
}

function compileTemplate(tpl) {
  let compileTpl = tpl;

  return function(el, data) {
    let fragment = '';
    fragment += compileTpl.replace(/\{\{name\}\}/, data.name).replace(/\{\{age\}\}/, data.age);
    el.innerHTML = fragment;
    return fragment;
  };
}

function Router(routs) {
  let prevURL = window.location.href;

  // обработчик URL
  this.handleUrl = (url) => {
    let curentURL = url;

    if (!prevURL.includes('#') && !curentURL.includes('#')) {
      prevURL += '#';
      curentURL += '#';
    }

    curentRout = this.findRout(curentURL);
    prevRout = this.findRout(prevURL);

    if (prevURL === curentURL) {
      curentRout.onBeforeEnter();
      curentRout.onEnter();
    } else {
      prevRout.onLeave();
      curentRout.onBeforeEnter();
      curentRout.onEnter();
    }

    prevURL = curentURL;
  };

  this.findRout = (url) => {
    url = url.split('#').pop();
    return routs.find((rout) => {
      if (typeof rout.match === 'string') {
        return rout.match === url;
      }
      if (rout.match instanceof RegExp) {
        return rout.match.test(url);
      }
      if (typeof rout.match === 'function') {
        return rout.match(url);
      }
    });
  };

  // Подписаться на изменения URL
  window.addEventListener('hashchange', (ev) => handleUrl(ev.newURL));

  // При загрузке страницы - считать состояние и запустить обработчик
  this.handleUrl(window.location.href);

  // Переопределить поведение внутренних ссылок
  document.body.addEventListener('click', (ev) => {
    if (!ev.target.matches('a')) {
      return;
    }
    ev.preventDefault();
    // При клике по ссылке - обновлять URL
    let url = ev.target.getAttribute('href');
    window.location.hash = url;
  });
}
