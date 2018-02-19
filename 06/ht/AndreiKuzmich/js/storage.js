var storage = {
  getData: function (key) {
    return Promise.resolve(JSON.parse(window.localStorage.getItem(key)));
  },
  setData: function (key, data) {
    return Promise.resolve(window.localStorage.setItem(key, JSON.stringify(data)));
  },
};

