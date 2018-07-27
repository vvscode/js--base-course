const sentDataToStorage = list => {
  return Promise.resolve().then(window.localStorage.setItem('todoListYarmolenka', JSON.stringify(list)));
};

const receiveDataFromStorage = _ => {
  return new Promise((resolve, reject) => {
    const localData = window.localStorage.getItem('todoListYarmolenka');
    localData ? resolve(localData) : reject('no data');
  }).then(result => {
    return JSON.parse(result);
  }).catch(_ => {
    return [{
      id: Date.now(),
      done: false,
      title: 'Hi!',
      priority: 2,
      date: Date.now(),
      task: 'How are you?'}];
  });
};

export {receiveDataFromStorage, sentDataToStorage};