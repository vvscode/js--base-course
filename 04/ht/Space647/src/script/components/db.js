class dataBase {
  setCityListToDB(city, writeField) {
    let cityList = localStorage.getItem(`${writeField}`) || "[]";
    cityList = JSON.parse(cityList);
    if (cityList.indexOf(city) === -1) {
      if (cityList.length === 5) {
        cityList.splice(-1, 1);
        cityList.unshift(city);
      } else {
        cityList.unshift(city);
      }
    }
    cityList = JSON.stringify(cityList);
    localStorage.setItem(`${writeField}`, cityList);
  }
  getCityListFromDB(writeField) {
    let cityList = localStorage.getItem(`${writeField}`);
    return JSON.parse(cityList);
  }
}
export default dataBase;
