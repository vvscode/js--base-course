function hello() {
	userName = prompt('Как Вас зовут?');
	userAge = +prompt('Сколько Вам лет?');
}

do {
	hello();
} while (userName == null || userName == '' || userAge == null || userAge == '')

if (userAge < 18) {
	alert('Здарова, ' + userName + '! Как твои ' + userAge + '?');
} else if (userAge >= 18) {
	alert('Привествую, ' + userName + '! Уж ' + userAge + ' лет прошло!');
}