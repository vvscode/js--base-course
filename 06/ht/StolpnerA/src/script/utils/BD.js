class BD {
  setItem(key, data) {
    return Promise.resolve(localStorage.setItem(key, JSON.stringify(data)));
  }

  fetch(key) {
    let data = JSON.parse(localStorage.getItem(key));
    if (data) return Promise.resolve(data);
    return Promise.reject();
  }
}

export default BD;
