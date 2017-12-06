document.addEventListener(`DOMContentLoaded`, checkLocal); // обработать при загрузке

function checkLocal() { // проверить local и переключится на "другую" страницу
  if (window.sessionStorage.getItem(`spa`)===`page1`) {changePage(1)};
  if (window.sessionStorage.getItem(`spa`)===`page2` || !window.sessionStorage.getItem(`spa`)) {changePage(2)};
  if (window.sessionStorage.getItem(`spa`)===`page3`) {changePage(3)};
}

document.body.addEventListener(`click`, function (e) { // клик для переключения
  if (!e.target.closest(`a`)) return;
  e.preventDefault();
  window.sessionStorage.setItem(`spa`, e.target.name);
  checkLocal();
})

function changePage(number){ // переключение страниц
  let divs = document.querySelectorAll(`div`);
  if (number===1) {
    divs.forEach(function(div) {
      if (div.id === `setup` || div.id === `code`) {
        div.style.display = `none`;
      }
      if (div.id === `calendar`) {
        div.id = `view`;
        div.style.display = ``;
      };
    });
  }
  if (number===2) {
    divs.forEach(function(div) {
      if (div.id === `view`) {div.id = `calendar`};
      if (div.id === `setup` || div.id === `code` || div.id === `calendar`) {
        div.style.display = ``;
      }
    });
  }
  if (number===3) {
    divs.forEach(function(div) {
      if (div.className !== `header`) div.style.display = `none`;
    });
    if (!document.querySelector(`#about`)) {
      let p = document.createElement(`p`);
      p.id = `about`;
      p.innerText = `About`;
      document.body.appendChild(p);
    }
  } else {
    if (document.querySelector(`#about`)) {
      document.body.removeChild(document.querySelector(`#about`));
    }
  }
}
