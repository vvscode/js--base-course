function drawBtnForm(htmlEl) {
  var btnAuth = document.createElement('div');
  btnAuth.setAttribute('data-auth', 'auth');
  btnAuth.classList.add('btn-auth-page');
  htmlEl.parentNode.insertBefore(btnAuth, htmlEl.parentNode.firstChild);
  btnAuth.innerHTML =
    '<p class="btn-auth-page__p" data-name="null">Чтобы сохранять или добавлять задачи в календарь, пожалуйста, войдите под своей учетной записью или зарегистрируйтесь</p><div class="btn-auth-page__btn-wrap"><button data-btn="btnLogIn" class="btn-auth-page__btn btn-auth-page__btn--logIn"><img src="img/logIn.png" alt="Войти" title="Войти"></button><button data-btn="btnLogOut" class="btn-auth-page__btn btn-auth-page__btn--logOut"><img src="img/logOut.png" alt="Выход" title="Выход"></button></div>';
}
