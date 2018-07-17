export default function getUserPosition() {
  const URL_API_USER_POSITION = 'https://api.userinfo.io/userinfos';
  return fetch(`${URL_API_USER_POSITION}`)
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(new Error(response.statusText));
      }
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      let url = `center=${data.position.latitude},${data.position.longitude}`;
      return url;
    })
    .catch(err => {
      console.log('Определить координаты пользователя не удалось', err);
      let url = `center=55,30`;
      return url; //дефолтное значение, если не ответа от API
    });
}
