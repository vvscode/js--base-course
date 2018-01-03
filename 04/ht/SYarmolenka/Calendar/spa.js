document.addEventListener(`DOMContentLoaded`, checkHash); // обработать при загрузке

function checkHash() { // проверить hash и переключится на "другую" страницу
  let hash = window.location.hash.slice(1);
  if (hash === `page1`) {changePage(1)};
  if (hash === `page2` || hash === ``) {changePage(2)};
  if (hash === `page3`) {changePage(3)};
}

document.body.addEventListener(`click`, function (e) { // клик для переключения
  if (!e.target.closest(`a`)) return;
  e.preventDefault();
  window.location.hash = e.target.name; // переписать hash
})

window.addEventListener(`hashchange`, checkHash);

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
