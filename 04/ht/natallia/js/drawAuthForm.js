function drawAuthForm(htmlEl) {
  var wrapAuth = document.createElement('div');
  wrapAuth.classList.add('auth__wrap-out');
  htmlEl.parentNode.insertBefore(wrapAuth, htmlEl);

  wrapAuth.innerHTML =
    '<div data-auth="auth-form-wrap" class="auth hide"><p class="auth__p">Чтобы сохранять или добавлять задачи в календарь, пожалуйста, войдите под своей учетной записью или зарегистрируйтесь</p><input data-input="name" class="auth__input" placeholder="При регистрации введите Ваше имя"><input data-input="email" class="auth__input" type="email" placeholder="Email" /><input data-input="password" class="auth__input" type="password" placeholder="Пароль" /><div class="auth__btn-wrap"><button data-btn="logIn" class="auth__btn btn">Войти</button><button data-btn="signUp" class="auth__btn btn">Регистрация</button></div><button data-btn="resetPass" class="btn auth__reset">Забыли пароль?</button><button data-btn="close" class="btn__close btn"><img class="btn__close-img" src="img/close-icon1.png"></button></div>';
}
