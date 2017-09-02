import fetchRequests from "./fetchRequests";
class indexPage {
  constructor() {
    this.requestFetch = new fetchRequests();
  }

  indexPage() {
    Promise.resolve()
      .then(() => this.requestFetch.determinationOfCoordinatesByIp())
      .then(objIp => this.renderingPage(objIp));
  }
  renderingPage(objIp) {
    console.log(objIp);
    return new Promise((resolve, reject) => {
      let renderPlace = document.querySelector(".workPlace");
      renderPlace.innerHTML = `<div class="center">
      <h1>Welcome to my weather app.</h1> <br>
      <p>Enter your city to get a latest forecast!<br>
      Or check weather for <a href="#${objIp.city.name}">${objIp.city.name}</a>
      </p>
      </div>`;
      document.querySelector(".location").innerHTML = `<a href="#${objIp.city
        .name}">${objIp.city.name} ${objIp.country.name}</a>`;
      resolve();
    });
  }
}
export default indexPage;
