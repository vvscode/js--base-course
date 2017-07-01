ymaps.ready(init);

var myMap;

function init () {
	// Параметры карты можно задать в конструкторе.
	myMap = new ymaps.Map(
		// ID DOM-элемента, в который будет добавлена карта.
		'map',
		// Параметры карты.
		{
			// Географические координаты центра отображаемой карты.
			center: [53.90453979999999, 27.5615244],
			// Масштаб.
			zoom: 10,
			// Тип покрытия карты: "Спутник".
			type: 'yandex#hybrid'
		}, {
			// Поиск по организациям.
			searchControlProvider: 'yandex#search'
		}
	);
}

function setCenter () {
	myMap.setCenter([57.767265, 40.925358]);
}

function setBounds () {
	// Bounds - границы видимой области карты.
	// Задаются в географических координатах самой юго-восточной и самой северо-западной точек видимой области.
	myMap.setBounds([[37, 38], [39, 40]]);
}

function setType () {
	// Меняем тип карты на "Спутник".
	myMap.setType('yandex#satellite');
}

function setPan (arr) {
	// Плавное перемещение центра карты в точку с новыми координатами.
	myMap.panTo(arr, {
			// Задержка между перемещениями.
			delay: 1500
		});
}