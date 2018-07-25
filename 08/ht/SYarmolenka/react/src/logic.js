const countAround = (arr, x, y) => {
  let count = 0;
  for (let i = -1; i < 2; i++) {
    if (y + i >= 0 && y + i < arr[x].length) {
      if (x - 1 >= 0 && arr[x - 1][y + i]) count++;
      if (i !== 0 && arr[x][y + i]) count++;
      if (x + 1 < arr.length && arr[x + 1][y + i]) count++;
    };
  };
  return count;
};

const handleArray = (arr) => {
  const field = arr.slice().map(el => el.slice());
  let changes = false;
  arr.forEach((inside, i) => {
    inside.forEach((item, j) => {
      if (!item && countAround(arr, i, j) === 3) {
        field[i][j] = 1;
        changes = true;
      };
      if (item && countAround(arr, i, j) !== 2 && countAround(arr, i, j) !== 3) {
        field[i][j] = 0;
        changes = true;
      };
    });
  });
  return changes ? field : arr;
};

const decorateArray = (arr) => {
  const next = handleArray(arr);
  return arr.map((inside, i) => inside.map((item, j) => {
    return (item && next[i][j]) ? 2 : item;
  }));
};

export {handleArray, decorateArray};
