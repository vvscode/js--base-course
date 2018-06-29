const saveCityListInLocal = (list) => {
  window.sessionStorage.setItem('weatherCityList', JSON.stringify(list));
};

const getCityListFromLocal = () => {
  return JSON.parse(window.sessionStorage.getItem('weatherCityList'));
};

const saveFavoriteListInLocal = (list) => {
  window.localStorage.setItem('weatherFavoriteList', JSON.stringify(list));
};

const getFavoriteListFromLocal = () => {
  return JSON.parse(window.localStorage.getItem('weatherFavoriteList'));
};

export {saveCityListInLocal, getCityListFromLocal, saveFavoriteListInLocal, getFavoriteListFromLocal};
