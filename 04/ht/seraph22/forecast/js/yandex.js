let myMap;
ymaps.ready(function ()
{
	// Пример реализации собственного элемента управления на основе наследования от collection.Item.
	// Элемент управления отображает название объекта, который находится в центре карты.
	myMap = new ymaps.Map("map", {
		center: [53.90453979999999, 27.5615244],
		zoom: 12,
		type: 'yandex#hybrid',
		controls: ['zoomControl']
		//controls: ['zoomControl', 'searchControl', 'typeSelector',  'fullscreenControl']
	});
	// Добавляем события на карту, чтобы отличать перемещение карты мышкой от перемещения через поле поиска
	myMap.events.add('mousedown', onMouse);
	myMap.events.add('wheel', onMouse);
	// Событие для кнопки избранное, чтобы присваивался класс Active
	myMap.events.add('boundschange', addActiveToFavoritesButton);
});

function onMouse()
{
	// При изменении центра чистим поиск
	search.value = '';

	myMap.events.add('boundschange', boundschangeFunc);

	function boundschangeFunc()
	{
		let arrCoord = myMap.getCenter();
		// Координаты центра карты
		if (arrCoord)
		{
			// Преобразуем к типу number
			arrCoord = arrCoord.map(function (str) { return +str; });

			getForecastDebounce(arrCoord);
		}
	}

	// Снимаем событие boundschange, чтобы при работе через поиск не дублировались запросы
	setTimeout(function () { myMap.events.remove('boundschange', boundschangeFunc); }, 2000);
}

function setCenter(arr)
{
	let timer = setInterval(check, 300);

	function check()
	{
		if (myMap)
		{
			clearInterval(timer);
			myMap.setCenter(arr);
		}
	}
}