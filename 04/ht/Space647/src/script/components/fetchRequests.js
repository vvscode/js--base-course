class fetchRequests {
  constructor() {}
  determinationOfCoordinatesByIp() {
    return fetch("https://api.userinfo.io/userinfos").then(response =>
      response.json()
    );
  }
}
export default fetchRequests;
