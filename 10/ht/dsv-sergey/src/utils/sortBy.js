/**
 * sortBy - сортирует список по заданному полю
 * @param list - array - список для сортировки
 * @param field - strign - поле для сортировки 
 * если поле начинается с '-' - сортировка в обратном порядке
 * @return array - отсортированный список
 */
export default (list, field) => {
    let fieldName = field.replace('-', '');
    let reversed = field[0] === '-';
    let ret = list.sort((a, b) => {
      let aF = a[fieldName];
      let bF = b[fieldName];
      return aF > bF ? 1 : (aF === bF ? 0 : -1);
    });
  
    return reversed ? ret.reverse() : ret;
  };