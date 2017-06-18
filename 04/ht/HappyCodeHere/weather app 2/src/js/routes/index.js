
const index = {
    name: 'index',
    match: '',
    onEnter: () => {
      fetch(`https://api.userinfo.io/userinfos`)
        .then(responce => responce.json())
        .then(data => {
          const { name } = data.city;
          window.location.hash = `city=${name}`;
          // const { latitude, longitude } = data.position;
          // window.location.hash = `coordinates?lat=${latitude}&lng=${longitude}`;
        });
    },
}

export { index };
