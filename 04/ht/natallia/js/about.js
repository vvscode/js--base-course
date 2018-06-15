function aboutMe() {
  var about = document.querySelector('#about');
  about.classList = 'about';

  about.innerHTML =
    '<p class="about__p">Это я, когда закончила делать календарь.</p><img src="img/cat.jpg" alt="котики" class="about__img">';
}
