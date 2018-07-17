export function getStorage(keyName) {
	return Promise.resolve(JSON.parse(localStorage.getItem(keyName)));
}

export function setStorage(keyName, value) {
	return Promise.resolve(localStorage.setItem(keyName, JSON.stringify(value)));
}

export function getAllStorage() {
	return new Promise(resolve => {
		var storage = '';
		var keysStorage = [];

		function getKeys() {
			return new Promise(resolve => {
				for (let i = 0; i < localStorage.length; i++) {
					var key = localStorage.key(i);
					if (key.match(/city/)) {
						keysStorage.push(key);
					}
					if (i === localStorage.length - 1) resolve(keysStorage);
				}
			})
		}

		getKeys()
			.then(keyStorage => {
				keyStorage.forEach((key, i) => {
					getStorage(key)
						.then(value => {
							storage += value;
							if (i === keyStorage.length - 1) resolve(storage);
						})
				});
			});
	})
}

export function removeFromStorage(keyName) {
	return Promise.resolve(localStorage.removeItem(keyName));
}
