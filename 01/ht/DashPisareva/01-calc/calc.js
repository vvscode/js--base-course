var calc = (a) => (operand) => (c) => {
  switch(operand) {
    case '+':
      return a + c;
    case '-':
      return a - c;
    case '*':
      return a * c;
    case '/':
      return a / c;
    default:
      return 'Хм. Что-то вы не то делаете.';
  }
}
