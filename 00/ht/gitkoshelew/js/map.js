
 ymaps.ready(init);
            	var myMap,
            		myPlacemark;
            	function init()	{
                	myMap = new ymaps.Map("map", {
        				center: [46.474178, 30.749008],
        				//controls: [],       		
       			 		zoom: [16]
   				 });
               	var koordinats = [46.474278, 30.746008];
               // var att = $(".aboutnav__active").attr("data");
               // switch(att)
               // {
               // 	case "odessa": koordinats = [46.474128, 30.746008];
               // 	break
               // 	case "kiev": koordinats = [50.426162, 30.448657];
               // 	break
               // 	case "kharkiv": koordinats = [50.007103, 36.354635];
               // 	break
               // };
               	

                myPlacemark =  new ymaps.Placemark(koordinats, {
                	hintContent: '<div class="locator">Базарная вул., 36</div>',
                	balloonContent: '\
                	<div class="balloon"><div class="balloon__wrapper">\
                		<div class="balloon1 d-flex justify-content-between">\
                			<h4>LAB Consulting</h4>\
                			<div class="map__buttons mapsoc__buttons d-flex align-items-center">\
                				<i class="fa fa-facebook"></i><i class="fa fa-twitter"></i><i class="fa fa-telegram"></i>\
                			</div>\
                		</div>\
                		<div class="map__detales d-flex">\
                			<div class="map__contacts d-block">\
                				<p class="map__contact">\
                					<i class="fa fa-phone"></i>\
                					+38 (048) 756-23-54\
                				</p>\
                				<p class="map__contact">\
                					<i class="fa fa-phone"></i>\
                					+38 (048) 756-23-54\
                				</p>\
                				<p class="map__contact odessa-l">\
                					<i class="fa fa-location-arrow"></i>\
                					65000,<br> Украина, г. Одесса <br>\
                					Ул Базарная, 36\
                				</p>\
                				<p class="map__contact kiev-l d-none">\
                					<i class="fa fa-location-arrow"></i>\
                					65000,<br> Украина, г. Киев <br>\
                					Ул Идзиковских, 41\
                				</p>\
                				<p class="map__contact kharkiv-l d-none">\
                					<i class="fa fa-location-arrow"></i>\
                					65000,<br> Украина, г. Харьков <br>\
                					Ул Грибальди, 11\
                				</p>\
                				<p class="map__contact">\
                					<a href="#" class="map__anchor">\
                					<i class="fa fa-envelope"></i>\
                					info@lab-consult.com\
                					</a>\
                				</p>\
                			</div>\
                			<div class="maps__text d-none d-sm-block">\
                				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>\
                				<p>Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>\
                			</div>\
                		</div>\
                	</div></div>' },
                			
							
							
						
				 {	iconLayout: 'default#image',
					iconImageHref: 'img/locator64.png', // картинка иконки
					iconImageSize: [50, 50], // размер иконки
					iconImageOffset: [-32, -64], // позиция иконки
					balloonContentSize: [10,10], // размер кастомного балуна в пикселях
					balloonLayout: "default#imageWithContent", // указываем что содержимое балуна кастомная херь
					balloonImageHref: '', // Картинка заднего фона балуна
					balloonImageOffset: [100, -229], // смещание балуна, надо подогнать под стрелочку
					balloonImageSize: [10, 10], // размер картинки-бэкграунда балуна
					balloonShadow: false,
					hideIconOnBalloonOpen: false,
				}

                	);
               
                $(".kiev").click(function(){
                	$(this).siblings().removeClass("aboutnav__active");
                	$(this).addClass("aboutnav__active");
                	
					myPlacemark.properties.set({
					hintContent: '<div class="locator">Ул Идзиковских, 41</div>',
        			balloonContent: '\
                	<div class="balloon"><div class="balloon__wrapper">\
                		<div class="balloon1 d-flex align-items-center">\
                			<h4>LAB Consulting</h4>\
                			<div class="map__buttons mapsoc__buttons d-flex align-items-center ml-auto">\
                				<i class="fa fa-facebook"></i><i class="fa fa-twitter"></i><i class="fa fa-telegram"></i>\
                			</div>\
                		</div>\
                		<div class="map__detales d-flex">\
                			<div class="map__contacts d-block">\
                				<p class="map__contact">\
                					<i class="fa fa-phone"></i>\
                					+38 (048) 756-23-54\
                				</p>\
                				<p class="map__contact">\
                					<i class="fa fa-phone"></i>\
                					+38 (048) 756-23-54\
                				</p>\
                				<p class="map__contact kharkiv-l">\
                					<i class="fa fa-location-arrow"></i>\
                					65000,<br> Украина, г. Киев <br>\
                					Ул Идзиковских, 41\
                				</p>\
                				<p class="map__contact">\
                					<a href="#" class="map__anchor">\
                					<i class="fa fa-envelope"></i>\
                					info@lab-consult.com\
                					</a>\
                				</p>\
                			</div>\
                			<div class="maps__text d-none d-sm-block">\
                				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>\
                				<p>Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>\
                			</div>\
                		</div>\
                	</div></div>'
					});
					myPlacemark.geometry.setCoordinates([50.426162, 30.448657]);
					myMap.setCenter([50.426762, 30.451657], 16);
				});
				 $(".kharkiv").click(function(){
				 	$(this).siblings().removeClass("aboutnav__active");
                	$(this).addClass("aboutnav__active");
                	
					myPlacemark.properties.set({
					hintContent: '<div class="locator">Ул Грибальди, 11</div>',
        			balloonContent: '\
                	<div class="balloon"><div class="balloon__wrapper">\
                		<div class="balloon1 d-flex align-items-center">\
                			<h4>LAB Consulting</h4>\
                			<div class="map__buttons mapsoc__buttons d-flex align-items-center ml-auto">\
                				<i class="fa fa-facebook"></i><i class="fa fa-twitter"></i><i class="fa fa-telegram"></i>\
                			</div>\
                		</div>\
                		<div class="map__detales d-flex">\
                			<div class="map__contacts d-block">\
                				<p class="map__contact">\
                					<i class="fa fa-phone"></i>\
                					+38 (048) 756-23-54\
                				</p>\
                				<p class="map__contact">\
                					<i class="fa fa-phone"></i>\
                					+38 (048) 756-23-54\
                				</p>\
                				<p class="map__contact kharkiv-l">\
                					<i class="fa fa-location-arrow"></i>\
                					65000,<br> Украина, г. Харьков <br>\
                					Ул Грибальди, 11\
                				</p>\
                				<p class="map__contact">\
                					<a href="#" class="map__anchor">\
                					<i class="fa fa-envelope"></i>\
                					info@lab-consult.com\
                					</a>\
                				</p>\
                			</div>\
                			<div class="maps__text d-none d-sm-block">\
                				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>\
                				<p>Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>\
                			</div>\
                		</div>\
                	</div></div>'
					});
					
					
					myPlacemark.geometry.setCoordinates([50.007103, 36.354635]);
					myMap.setCenter([50.007703, 36.357635], 16);
					
				});
				  $(".odessa").click(function(){
				  	$(this).siblings().removeClass("aboutnav__active");
                	$(this).addClass("aboutnav__active");
                	
					myPlacemark.properties.set({
					hintContent: '<div class="locator">Базарная вул., 36</div>',
					balloonContent: '\
                	<div class="balloon"><div class="balloon__wrapper">\
                		<div class="balloon1 d-flex align-items-center">\
                			<h4>LAB Consulting</h4>\
                			<div class="map__buttons mapsoc__buttons d-flex align-items-center ml-auto">\
                				<i class="fa fa-facebook"></i><i class="fa fa-twitter"></i><i class="fa fa-telegram"></i>\
                			</div>\
                		</div>\
                		<div class="map__detales d-flex">\
                			<div class="map__contacts d-block">\
                				<p class="map__contact">\
                					<i class="fa fa-phone"></i>\
                					+38 (048) 756-23-54\
                				</p>\
                				<p class="map__contact">\
                					<i class="fa fa-phone"></i>\
                					+38 (048) 756-23-54\
                				</p>\
                				<p class="map__contact kharkiv-l">\
                					<i class="fa fa-location-arrow"></i>\
                					65000,<br> Украина, г. Одесса <br>\
                					Ул Базарная, 36\
                				</p>\
                				<p class="map__contact">\
                					<a href="#" class="map__anchor">\
                					<i class="fa fa-envelope"></i>\
                					info@lab-consult.com\
                					</a>\
                				</p>\
                			</div>\
                			<div class="maps__text d-none d-sm-block">\
                				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>\
                				<p>Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>\
                			</div>\
                		</div>\
                	</div></div>'
					});
					myPlacemark.geometry.setCoordinates([46.474228, 30.746008]);
					myMap.setCenter([46.474828, 30.749008], 16);

				});

                 myMap.geoObjects.add(myPlacemark);
                 myPlacemark.balloon.open();
            };
            
            























