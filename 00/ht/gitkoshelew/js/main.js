


$(window).load(function() { ///При загрузке окна. Нахоодит элемент i внутри #before-load
//скрывает его, через секунду скрывет #before-load  за 600 миллисекунд
    $('#cube-loader').find('.caption').fadeOut().end().delay(1000).fadeOut('slow');
});


$(document).ready(function(){
// Показ модального окна
    $("#myModal").modal('show');


    $(".aboutnav__link").click(function(){ //При нажатии на элемент с классом aboutnav__link
        $(".aboutnav__link").removeClass("aboutnav__active");//Удаляет класс aboutnav__active у всех
        $(this).addClass("aboutnav__active")//добавляет нажатому элементу
    });

///при нажатии на меню услуг. у соответствующих элементов удаляем клас d-none,
//остальным элементам вкладок добавляем класс d-none
    $("a[href='#result']").click(function(){
        $(".ccriterion").addClass("d-none");
        $(".cwhy").addClass("d-none");
        $(".cresult").removeClass("d-none")           
    });
    $("a[href='#why']").click(function(){ 
        $(".ccriterion").addClass("d-none");
        $(".cwhy").removeClass("d-none");
        $(".cresult").addClass("d-none")           
    });
    $("a[href='#criterion']").click(function(){
        $(".ccriterion").removeClass("d-none");
        $(".cwhy").addClass("d-none");
        $(".cresult").addClass("d-none")
    });

//Прокрутка к секции по ссылке

    $('a[href^="#"], *[data-href^="#"]').on('click', function(e){ //ссылки на якорь и элементы с атрибутом
//data-href с ссылкой
        e.preventDefault(); //удаляется изначальное событие
        if ($(this).hasClass("noscroll") == false){ //если нету класса noscroll
            var t = 1000; //скорость прокрутки
            var topX = 0;//расстояние до верха экрана (при наличии фиксированного меню)
            var d = $(this).attr('data-href') ? $(this).attr('data-href') : $(this).attr('href');
            $('html,body').stop().animate({ scrollTop: $(d).offset().top - topX }, t); //перемещение на позицию якоря
        }
    });
//Главное меню
    $(".menu__open").click(function(){ //При клике на гамбургер-меню
		    $(".menu").toggleClass("d-none");//добавляется и удаляется класс d-none к меню
        $(this).toggleClass('open');
    });   

//при нажатию на любую кнопку, имеющую data-target или ссылку #myModal
    $('a[href="#myModal"], [data-target="#myModal"]').click(function() {
        $(".intro").remove();
//открыть модальное окно с id="myModal"
        $("#myModal").modal('show');    
    });
// Отправка формы
    $('[data-submit]').on('click', function(e){
        e.preventDefault();
        $(this).parent('form').submit();
    })
// Валидация    
    $.validator.addMethod(
        "regex",
        function(value, element, regexp) {
          var re = new RegExp(regexp);
          return this.optional(element) || re.test(value);
        },
        "Please check your input."
    );
    function valEl(el){

        el.validate({
            rules:{
                age:{
                    required:true,
                    //regex: '^(1(00?|\d)|[2-5]\d|[6-9]\d?)$'
                    regex: '^(([1-9][0-9]?)|(100))$'
                },
                name:{
                    required:true,
                    regex: '^[a-zA-Zа-яА-ЯёЁ ]+$'
                },

            },
            messages:{
                age:{
                    required:'Поле обязательно для заполнения',
                    regex:'Возраст от 1 до 100'
                },
                name:{
                    required:'Поле обязательно для заполнения',
                    regex:'Разрешены английские, русские буквы и пробел'
                },
            },
            submitHandler: function (form) {
                var mes1;
                $('#cube-loader').find('.caption').fadeIn().end().delay(1000).fadeIn('slow');
                var name=document.getElementById('name').value;
                var age=document.getElementById('age').value;
                if(name && age) { $("#myModal").modal('hide'); }

                switch(age<18){
                    case true:
                        var mes1="Здарова, ";
                        var mes2='. Как твои ';
                        var mes3='?';
                    break;
                    case false:
                        var mes1="Приветствую, ";
                        var mes2='. Уж ';
                        var mes3=' лет прошло';
                    break;
                }
                intro = mes1 + name + mes2 + age + mes3;
                $(".insert").after('<p class="intro">'+intro+'<p>');
                setTimeout(function (){
                    $('#cube-loader').find('.caption').fadeOut().end().delay(1).fadeOut('slow');
                },2000);
                setTimeout(function (){
                    $('#overlay').fadeIn();
                    $form.trigger('reset');
                },2200);
                $('#overlay').on('click', function(e) {
                    $('#overlay').fadeOut();
                });
                return false;
            }
        })
    }

    $('.js-form').each(function() {
      valEl($(this));
    });
});

//Инициализация яндекс-карты
ymaps.ready(init);
var myMap,
myPlacemark;
function init() {
  myMap = new ymaps.Map("map", {
    center: [53.897775, 27.465630
],//Изначальные координаты центра карты
                //controls: [],  //Отключение стандартных элементов управления         
                zoom: [16]
              });
  var koordinats = [53.897875, 27.462630
];//Изначальные координаты маркера                
        //Изначальные настройки балуна и хинта
        myPlacemark =  new ymaps.Placemark(koordinats, {
          hintContent: '<div class="locator">Ул. Тимошенко, 28</div>',
          balloonContent: '\
          <div class="balloon"><div class="balloon__wrapper">\
          <div class="balloon1 d-flex justify-content-between">\
          <h4>Д.Кошелев</h4>\
          <div class="map__buttons mapsoc__buttons d-flex align-items-center">\
          <i class="fa fa-vk"></i><i class="fa fa-github-square"></i><i class="fa fa-user-circle"></i>\
          </div>\
          </div>\
          <div class="map__detales d-flex">\
          <div class="map__contacts d-block">\
          <p class="map__contact">\
          <i class="fa fa-phone"></i>\
          +375 (44) 766-88-17\
          </p>\
          <p class="map__contact">\
          <i class="fa fa-phone"></i>\
          +375 (25) 791-60-10\
          </p>\
          <p class="map__contact">\
          <i class="fa fa-location-arrow"></i>\
          Минск,<br>\
          Ул Тимошенко, 28\
          </p>\
          <p class="map__contact">\
          <a href="#" class="map__anchor">\
          <i class="fa fa-envelope"></i>\
          jskoshelew@gmail.com\
          </a>\
          </p>\
          </div>\
          <div class="maps__text d-none d-sm-block">\
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>\
          <p>Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>\
          </div>\
          </div>\
          </div></div>' },   
          {  iconLayout: 'default#image',
          iconImageHref: 'img/locator64.png', // картинка иконки
          iconImageSize: [50, 50], // размер иконки
          iconImageOffset: [-32, -64], // позиция иконки
          balloonContentSize: [10,10], // размер кастомного балуна в пикселях
          balloonLayout: "default#imageWithContent", // указываем что содержимое балуна кастомная херь
          balloonImageHref: '', // Картинка заднего фона балуна
          balloonImageOffset: [100, -229], // смещание балуна, надо подогнать под стрелочку
          balloonImageSize: [10, 10], // размер картинки-бэкграунда балуна
          balloonShadow: false,//тень балуна
          hideIconOnBalloonOpen: false,
        });  


    myMap.geoObjects.add(myPlacemark); //добавление нового маркера
    myPlacemark.balloon.open(); //Отрытие балуна
};


















