
export const index = {
  {
    name: 'index',
    match: '',
    onEnter: () => {
      fetch(`https://api.userinfo.io/userinfos`)
        .then(responce => responce.json())
        .then(data => {
          const { latitude, longitude } = data.position;
          window.location.hash = `/coordinates?lat=${latitude}&lng=${longitude}`;
        });
    },
  },
};
