function setData(method, folder, path, obj) {
  return fetch(
    config.databaseURL +
      folder +
      path +
      '.json?auth=e9tbFfNGU1VljETK5EhfiSTCBpMXmc3EPmsH0fSy',
    {
      method: method,
      body: JSON.stringify(obj),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );
}

function getData(folder, path) {
  return fetch(
    config.databaseURL +
      folder +
      path +
      '.json?auth=e9tbFfNGU1VljETK5EhfiSTCBpMXmc3EPmsH0fSy',
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );
}

function delData(method, folder, path) {
  return fetch(
    config.databaseURL +
      folder +
      path +
      '.json?auth=e9tbFfNGU1VljETK5EhfiSTCBpMXmc3EPmsH0fSy',
    {
      method: method
    }
  );
}
