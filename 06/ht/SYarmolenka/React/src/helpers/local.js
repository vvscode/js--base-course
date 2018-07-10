const saveCityListInLocal = (list) => {
  return Promise.resolve().then(_ => window.sessionStorage.setItem('weatherCityList', JSON.stringify(list)));
};

const getCityListFromLocal = () => {
  return Promise.resolve().then(_ => JSON.parse(window.sessionStorage.getItem('weatherCityList')));
};

const saveFavoriteListInLocal = (list) => {
  return Promise.resolve().then(_ => window.localStorage.setItem('weatherFavoriteList', JSON.stringify(list)));
};

const getFavoriteListFromLocal = () => {
  return Promise.resolve().then(_ => window.localStorage.getItem('weatherFavoriteList') ? JSON.parse(window.localStorage.getItem('weatherFavoriteList')) : null);
};

export {saveCityListInLocal, getCityListFromLocal, saveFavoriteListInLocal, getFavoriteListFromLocal};
