var cont;
function initAuth(htmlEl) {
  cont = htmlEl.parentNode;
  var auth = firebase.auth();
  if (!cont.querySelector('[data-auth="auth"]')) {
    drawBtnForm(htmlEl);
    cont
      .querySelector('[data-auth="auth"]')
      .addEventListener('click', function(e) {
        if (
          e.target.parentNode === cont.querySelector('[data-btn="btnLogIn"]')
        ) {
          if (auth.currentUser) {
            alert('Вы уже вошли');
          } else {
            drawAuthForm(htmlEl);
            var inputs = cont.querySelectorAll('input');
            inputs.forEach(function(el) {
              el.value = '';
            });
            cont
              .querySelector('[data-auth="auth-form-wrap"]')
              .classList.remove('hide');
            clickFormAuth(cont);
          }
        }

        if (
          e.target.parentNode === cont.querySelector('[data-btn="btnLogOut"]')
        ) {
          if (auth.currentUser) {
            const promise = auth.signOut();
            promise
              .then(() => {
                alert('Выход пользователя.');
                cont
                  .querySelector('.btn-auth-page__p')
                  .setAttribute('data-name', 'null');
              })
              .catch(error => alert('Ошибка выхода.'));
          }
        }
      });
  }
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var uid = user.uid;

      if (cont.querySelector('[data-auth="auth-form-wrap"]')) {
        cont
          .querySelector('[data-auth="auth-form-wrap"]')
          .classList.add('hide');
      }

      cont.querySelector('.btn-auth-page__p').setAttribute('data-name', uid);
      writeGreetingText(user, cont.querySelector('[data-name="' + uid + '"]'));
    } else {
      writeGreetingText(user, cont.querySelector('[data-name="null"]'));
    }
  });
}

function clickFormAuth(el) {
  el
    .querySelector('[data-auth="auth-form-wrap"]')
    .addEventListener('click', function(e) {
      e.preventDefault();
      if (e.target.parentNode === el.querySelector('[data-btn="close"]')) {
        el.querySelector('[data-auth="auth-form-wrap"]').classList.add('hide');
      } else if (e.target === el.querySelector('[data-btn="signUp"]')) {
        signUp(el);
      } else if (e.target === el.querySelector('[data-btn="logIn"]')) {
        logIn(el);
      } else if (e.target === el.querySelector('[data-btn="resetPass"]')) {
        resetPass(el);
      }
    });
}

function signUp(el) {
  var email = el.querySelector('[data-input="email"]').value;
  var password = el.querySelector('[data-input="password"]').value;
  var name = el.querySelector('[data-input="name"]').value;
  var auth = firebase.auth();
  var promise = auth.createUserWithEmailAndPassword(email, password);
  promise
    .catch(error => {
      if (name.length < 1) {
        alert('Введите имя');
      } else if (email.length < 1) {
        alert('Введите email.');
      } else if (error.code === 'auth/invalid-email') {
        alert('Введите email правильно.');
      } else if (error.code === 'auth/email-already-in-use') {
        alert('Пользователь с таким email уже зарегистрирован');
        var credential = firebase.auth.EmailAuthProvider.credential(
          email,
          password
        );
      } else if (password.length < 6) {
        alert('Введите корректный пароль.');
      } else if (error.code === 'auth/wrong-password') {
        alert('Введите пароль правильно.');
      } else alert('Ошибка входа. Попробуйте еще раз.');
    })
    .then(user => {
      el.querySelector('[data-auth="auth-form-wrap"]').classList.add('hide');
      return user;
    })
    .then(user => {
      var uid = user.user.uid;
      var email = user.user.email;
      var method = 'PUT';
      var folder = '/users/';
      var obj = {
        name: name,
        email: email
      };

      setData(method, folder, uid, obj).then(function(response) {
        return response.json();
      });
      return user;
    });
}

function logIn(el) {
  var email = el.querySelector('[data-input="email"]').value;
  var password = el.querySelector('[data-input="password"]').value;
  var auth = firebase.auth();
  var promise = auth.signInWithEmailAndPassword(email, password);
  promise
    .then(user => {
      var uid = user.user.uid;
      el.querySelector('[data-auth="auth-form-wrap"]').classList.add('hide');
      el.querySelector('.btn-auth-page__p').setAttribute('data-name', uid);
    })
    .catch(error => {
      console.log(error.code);
      if (email.length < 1) {
        alert('Введите email.');
      } else if (error.code === 'auth/invalid-email') {
        alert('Введите email правильно.');
      } else if (password.length < 1) {
        alert('Введите пароль.');
      } else if (error.code === 'auth/weak-password') {
        alert('Введите пароль правильно.');
      } else alert('Ошибка регистрации. Попробуйте еще раз.');
    });
}

function resetPass(el) {
  var email = el.querySelector('[data-input="email"]').value;
  var auth = firebase.auth();
  auth
    .sendPasswordResetEmail(email)
    .then(function() {
      alert('Password reset Email sent');
    })
    .catch(function(error) {
      var code = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/user-not-found') {
        alert(errorMessage);
      }
      console.log(error);
    });
}

function writeGreetingText(user, el) {
  if (user) {
    var uid = user.uid;
    var folder = '/users/';

    getData(folder, uid)
      .then(function(response) {
        return response.json();
      })
      .then(function(user) {
        el.textContent = 'Вы вошли как ' + user.name;
      });
  } else {
    el.setAttribute('data-name', 'null');
    el.textContent =
      'Чтобы сохранять или добавлять задачи в календарь, пожалуйста, войдите под своей учетной записью или зарегистрируйтесь';
  }
}
