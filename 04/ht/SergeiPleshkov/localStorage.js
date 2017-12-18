var localStorageDB = {
    getData: function(key) {
        return Promise.resolve(JSON.parse(window.localStorage.getItem(key)));
    },
    setData: function(key, data) {
        return new Promise((resolve, reject) => {
            if (key && data) {
                return window.localStorage.setItem(key, JSON.stringify(data));
            }

            return reject();
        });
    },
};
