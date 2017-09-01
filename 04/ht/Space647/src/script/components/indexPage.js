class indexPage {
  renderPage() {
    let placeRender = document.querySelector("div");
    placeRender.innerHTML = `<div class="signIn">
    <a href="https://slack.com/oauth/authorize?scope=identify,read,post,client&client_id=217857254422.216894611363">
        <img src="./img/slackIcon.png" class="slackIcon"/>
    </a>
</div>`;
  }
}
export default indexPage;
