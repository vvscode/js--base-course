var lsStorage = {
    getData: (key) => Promise.resolve(window.localStorage.getItem(key)),
    setData: (key, value) => Promise.resolve(window.localStorage.setItem(key, value)),
    addData: (key, value) => Promise.resolve(window.localStorage.setItem(key, (window.localStorage.getItem(key) ? window.localStorage.getItem(key) : '') + value))
};