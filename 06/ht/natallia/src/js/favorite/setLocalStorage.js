export default function setStorage(keyName, value) {
  return new Promise(resolve => {
    setTimeout(function() {
      localStorage.setItem(keyName, value);
      if (localStorage.getItem(keyName)) {
        resolve();
      }
    }, 10);
  });
}
