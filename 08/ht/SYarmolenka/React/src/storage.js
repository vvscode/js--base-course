const folder = 'syarmolenkaGameLife';

const getHistory = () => {
  return new Promise((resolve, reject) => {
    const history = JSON.parse(window.sessionStorage.getItem(folder));
    history ? resolve(history) : reject();
  });
};

const setHistory = (history) => {
  window.sessionStorage.setItem(folder, JSON.stringify(history));
};

export {getHistory, setHistory};