function isRightMonthValue(obj) {
  if (obj.value > 12) obj.value = '';
  if (obj.value < 1) obj.value = '';
}
function isRightYearValue(obj) {
  if (obj.value < 1) obj.value = '';
}


