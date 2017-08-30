
export const loadFromStorage = (storage) => {
  const data = JSON.parse(storage.getItem('game-stats'));
  return data || [];
}

export const saveToStorage = (data, storage) => {
  const prevData = loadFromStorage(storage);
  prevData.push(data);
  storage.setItem('game-stats', JSON.stringify(prevData));
}

export const deleteFromStorage = (name, storage) => {
  storage.removeItem(name);
}
