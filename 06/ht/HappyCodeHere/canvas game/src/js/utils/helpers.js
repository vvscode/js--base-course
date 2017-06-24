
export const saveToStorage = (data, storage) => {
  let prevData = loadFromStorage(storage);
  prevData.push(data);
  storage.setItem('game-stats', JSON.stringify(prevData));
}


export const loadFromStorage = (storage) => {
  const data = JSON.parse(storage.getItem('game-stats'));
  return data || [];
}
