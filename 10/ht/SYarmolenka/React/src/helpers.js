const getDateFromNumber = (number) => {
  return new Date(+number).toLocaleString('ru',{day: 'numeric', month: 'numeric', year: 'numeric'});
};

const getDateFromString = (str) => {
  const date = str.match(/(\d{2,4})/g);
  return new Date(date[2], date[1] - 1, date[0]);
};

const handlerSelectComponent = (elem, cb) => {
  elem.querySelectorAll('option').forEach(option => {
    if (option.selected) cb(option.value);
  });
}

export {getDateFromNumber, getDateFromString, handlerSelectComponent};
