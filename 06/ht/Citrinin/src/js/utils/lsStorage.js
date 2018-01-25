var lsStorage = {
    getData: (key) => Promise.resolve(window.localStorage.getItem(key)),
    setData: (key, value) => Promise.resolve(window.localStorage.setItem(key, value))
};

export default lsStorage;