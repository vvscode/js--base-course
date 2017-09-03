class dataBase {
  setCityListToDB(city, writeFieldLS) {
    if (!city) return;
    let cityList = localStorage.getItem(`${writeFieldLS}`) || "[]";
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
    localStorage.setItem(`${writeFieldLS}`, cityList);
    return city;
  }
  getCityListFromDB(writeFieldLS) {
    let cityList = localStorage.getItem(`${writeFieldLS}`);
    return JSON.parse(cityList);
  }
}
export default dataBase;
