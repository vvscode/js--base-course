export default function getStorage(keyName) {
  return new Promise(resolve => {
    setTimeout(_ => {
      let val = localStorage.getItem(keyName);
      resolve(val);
    }, 10);
  });
}
