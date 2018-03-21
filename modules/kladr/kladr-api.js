/* При успешной загрузке API выполняется
        соответствующая функция */
(function ($) {


Drupal.behaviors.kladrs = {
attach: function(context, settings) {
          ////---
       $(function(){

        //var token = '52949c2d31608f301f00004d';
        //var key = '3698a2b783c4b418b7020e51f4418f812f12a0c7';

        var token = $('#kladr_token').val();
        var key = $('#kladr_key').val();

        var city = $( '#city' );
        var street = $( '#street' );
        var building = $( '#building' );
        var buildingAdd = $( '#building_add' );
        var entrance = $( '#entrance' );
        var room = $( '#room' );

        var map = null;
        var placemark = null;
        var map_created = false;

        var lon_ = Drupal.settings.mymap.longitude;
	    var lat_ = Drupal.settings.mymap.latitude;
	    var preset_ = Drupal.settings.mymap.preset;
	    var iconcolor_ = Drupal.settings.mymap.iconcolor;

        // Формирует подписи в autocomplete
        var LabelFormat = function( obj, query ){
            var label = '';

            var name = obj.name.toLowerCase();
            query = query.toLowerCase();

            var start = name.indexOf(query);
            start = start > 0 ? start : 0;

            if(obj.typeShort){
                label += '<span class="ac-s2">' + obj.typeShort + '. ' + '</span>';
            }

            if(query.length < obj.name.length){
                label += '<span class="ac-s2">' + obj.name.substr(0, start) + '</span>';
                label += '<span class="ac-s">' + obj.name.substr(start, query.length) + '</span>';
                label += '<span class="ac-s2">' + obj.name.substr(start+query.length, obj.name.length-query.length-start) + '</span>';
            } else {
                label += '<span class="ac-s">' + obj.name + '</span>';
            }

            if(obj.parents){
                for(var k = obj.parents.length-1; k>-1; k--){
                    var parent = obj.parents[k];
                    if(parent.name){
                        if(label) label += '<span class="ac-st">, </span>';
                        label += '<span class="ac-st">' + parent.name + ' ' + parent.typeShort + '.</span>';
                    }
                }
            }

            return label;
        };

        // Подключение плагина для поля ввода города
        city.kladr({
            token: token,
            key: key,
            type: $.kladr.type.city,
            withParents: true,
            labelFormat: LabelFormat,
            verify: true,
            select: function( obj ) {
                city.parent().find( 'label' ).text( obj.type );
                street.kladr( 'parentType', $.kladr.type.city );
                street.kladr( 'parentId', obj.id );
                building.kladr( 'parentType', $.kladr.type.city );
                building.kladr( 'parentId', obj.id );
                Log(obj);
                AddressUpdate();
                MapUpdate();
            },
            check: function( obj ) {
                if(obj) {
                    city.parent().find( 'label' ).text( obj.type );
                    street.kladr( 'parentType', $.kladr.type.city );
                    street.kladr( 'parentId', obj.id );
                    building.kladr( 'parentType', $.kladr.type.city );
                    building.kladr( 'parentId', obj.id );
                }

                Log(obj);
                AddressUpdate();
                MapUpdate();
            }
        });

        // Подключение плагина для поля ввода улицы
        street.kladr({
            token: token,
            key: key,
            type: $.kladr.type.street,
            labelFormat: LabelFormat,
            verify: true,
            select: function( obj ) {
                street.parent().find( 'label' ).text( obj.type );
                building.kladr( 'parentType', $.kladr.type.street );
                building.kladr( 'parentId', obj.id );
                Log(obj);
                AddressUpdate();
                MapUpdate();
            },
            check: function( obj ) {
                if(obj) {
                    street.parent().find( 'label' ).text( obj.type );
                    building.kladr( 'parentType', $.kladr.type.street );
                    building.kladr( 'parentId', obj.id );
                }

                Log(obj);
                AddressUpdate();
                MapUpdate();
            }
        });

        // Подключение плагина для поля ввода номера дома
        building.kladr({
            token: token,
            key: key,
            type: $.kladr.type.building,
            labelFormat: LabelFormat,
            verify: true,
            select: function( obj ) {
                Log(obj);
                AddressUpdate();
                MapUpdate();
            },
            check: function( obj ) {
                Log(obj);
                AddressUpdate();
                MapUpdate();
            }
        });

        // Проверка изменения улици
        street.change(function(){
            Log(null);
            AddressUpdate();
            MapUpdate();
        });

        // Проверка изменения дома
        building.change(function(){
            Log(null);
            AddressUpdate();
            MapUpdate();
        });

        // Проверка названия корпуса
        buildingAdd.change(function(){
            Log(null);
            AddressUpdate();
            MapUpdate();
        });

        // Проверка изменения № подъеда
        entrance.change(function(){
            Log(null);
            AddressUpdate();
            //MapUpdate();
        });

        // Проверка изменения комнаты
        room.change(function(){
            Log(null);
            AddressUpdate();
            //MapUpdate();
        });

        // Обновляет карту
        var MapUpdate = function(){
            var zoom = 12;
            var address = '';

            // Город
            var name = null;
            var type = null;
            var obj = city.kladr('current');
            var value = $.trim(city.val());

            if(obj){
                name = obj.name;
                type = obj.type + '.';
            } else if(value){
                name = value;
                type = 'город';
            }

            if(name){
                if(address) address += ', ';
                address += type + ' ' + name;
                zoom = 12;
            }

            // Улица
            name = null;
            type = null;
            obj = street.kladr('current');
            value = $.trim(street.val());

            if(obj){
                name = obj.name;
                type = obj.type + '.';
            } else if(value){
                name = value;
                type = 'улица';
            }

            if(name){
                if(address) address += ', ';
                address += type + ' ' + name;
                zoom = 14;
            }

            // Дом
            name = null;
            type = null;
            obj = building.kladr('current');
            value = $.trim(building.val());

            if(obj){
                name = obj.name;
                type = 'дом';
            } else if(value){
                name = value;
                type = 'дом';
            }

            if(name){
                if(address) address += ', ';
                address += type + ' ' + name;
                zoom = 16;
            }

            // Корпус
            name = null;
            type = null;
            value = $.trim(buildingAdd.val());

            if(value){
                name = value;
                type = 'корпус';
            }

            if(name){
                if(address) address += ', ';
                address += type + ' ' + name;
                zoom = 16;
            }

            // Подъезд
            name = null;
            type = null;
            value = $.trim(entrance.val());

            if(value){
                name = value;
                type = '№ под.';
            }

            if(name){
                if(address) address += ', ';
                address += type + ' ' + name;
                zoom = 16;
            }

            // Квартира
            name = null;
            type = null;
            value = $.trim(room.val());

            if(value){
                name = value;
                type = 'кв./оф.';
            }

            if(name){
                if(address) address += ', ';
                address += type + ' ' + name;
                zoom = 16;
            }

            if(address && map_created){
                var geocode = ymaps.geocode(address);
                geocode.then(function(res){
                    map.geoObjects.each(function (geoObject) {
                            map.geoObjects.remove(geoObject);
                    });

                    map.geoObjects.removeAll(); // чистим
                    var position = res.geoObjects.get(0).geometry.getCoordinates();

                    ///placemark = new ymaps.Placemark(position, {}, {});
                    placemark = new ymaps.Placemark(position, {}, {draggable: true, preset: preset_, iconColor: iconcolor_,});

                    map.geoObjects.add(placemark);
                    map.setCenter(position, zoom);
                    ///myMap.geoObjects.removeAll();
                    var point_lat = position[0].toPrecision(); ///---
				    var point_lon = position[1].toPrecision(); ///---
				    var vzoom = map.getZoom(); ///---

			        $('#point_lat').val(point_lat);
				    $('#point_lon').val(point_lon);
				    $('#vzoom').val(vzoom);

                      ///---
                        map.geoObjects.events.add('dragend', function (event) {

					    //
					    // Получение ссылки на объект, который был передвинут.
                        var thisPlacemark = event.get('target');
                        // Определение координат метки
                        var coords = thisPlacemark.geometry.getCoordinates();
                        //
					    var point_lat_ = coords[0].toPrecision(); ///---
						var point_lon_ = coords[1].toPrecision(); ///---
						var vzoom_ = map.getZoom(); ///---

					    $('#point_lat').val(point_lat_);
						$('#point_lon').val(point_lon_);
						$('#vzoom').val(vzoom_);

					  });
					  ///



                });
            }
        }

       // Обновляет текстовое представление адреса
        var AddressUpdate = function(){
            var address = '';
            var zip = '';

            // Город
            var name = null;
            var type = null;
            var obj = city.kladr('current');
            var value = $.trim(city.val());

            if(obj){
                name = obj.name;
                type = obj.typeShort + '.';
                if(obj.zip) zip = obj.zip;
            } else {
                if(value){
                name = value;
                type = 'г.';
                }
            }

            if(name){
                if(address) address += ', ';
                address += type + ' ' + name;
            }

            // Улица
            name = null;
            type = null;
            obj = street.kladr('current');
            value = $.trim(street.val());

            if(obj){
                name = obj.name;
                type = obj.typeShort + '.';
                if(obj.zip) zip = obj.zip;
            } else {            	if(value){
                name = value;
                type = 'ул.';
                }
            }

            if(name){
                if(address) address += ', ';
                address += type + ' ' + name;
            }

            // Дом
            name = null;
            type = null;
            obj = building.kladr('current');
            value = $.trim(building.val());

            if(obj){
                name = obj.name;
                type = 'д.';
                if(obj.zip) zip = obj.zip;
            } else {            	if(value){
                name = value;
                type = 'д.';
                }
            }

            if(name){
                if(address) address += ', ';
                address += type + ' ' + name;
            }

            // Корпус
            name = null;
            type = null;
            value = $.trim(buildingAdd.val());
            if(value){
                name = value;
                type = 'к.';
            }

            if(name){
                if(address) address += ', ';
                address += type + ' ' + name;
            }

            // Подъезд
            name = null;
            type = null;
            value = $.trim(entrance.val());
            if(value){
                name = value;
                type = '№ под.';
            }

            if(name){
                if(address) address += ', ';
                address += type + ' ' + name;
            }

            // Квартира
            name = null;
            type = null;
            value = $.trim(room.val());
            if(value){
                name = value;
                type = 'кв./оф.';
            }

            if(name){
                if(address) address += ', ';
                address += type + ' ' + name;
            }

            address = (zip ? zip + ', ' : '') + address;
            $('#address').val(address);
        }

        // Обновляет лог текущего выбранного объекта
        var Log = function(obj){
            var logId = $('#id');
            if(obj && obj.id){
                logId.find('.value').text(obj.id);
                logId.show();
                $('#kod_kladr').val(obj.id);
            } else {
                logId.hide();
            }

            var logName = $('#name');
            if(obj && obj.name){
                logName.find('.value').text(obj.name);
                logName.show();
                $('#name_kladr').val(obj.name);
            } else {
                logName.hide();
            }

            var logZip = $('#zip');
            if(obj && obj.zip){
                logZip.find('.value').text(obj.zip);
                logZip.show();
                $('#zip_kladr').val(obj.zip);
            } else {
                logZip.hide();
            }

            var logType = $('#type');
            if(obj && obj.type){
                logType.find('.value').text(obj.type);
                logType.show();
                $('#type_kladr').val(obj.type);
            } else {
                logType.hide();
            }

            var logTypeShort = $('#type_short');
            if(obj && obj.typeShort){
                logTypeShort.find('.value').text(obj.typeShort);
                logTypeShort.show();
                $('#type_short_kladr').val(obj.typeShort);
            } else {
                logTypeShort.hide();
            }
        }

        ymaps.ready(function(){
            if(map_created) return;
            map_created = true;

            var point_lat = $('#point_lat').val();
     	    var point_lon = $('#point_lon').val();
     	    var point_vzoom = $('#vzoom').val();  //маштаб
	        var point_vid = $('#vid').val();      //вид

            if(point_lat || point_lon ){ point_lat_m = point_lat, point_lon_m = point_lon }else{
		      point_lat_m = lat_, point_lon_m = lon_   // Широта 55.50 -latitude ' Долгота 37.37' -- longitude
		    }

		   // if(point_vzoom){point_vzoom_m = point_vzoom }else{ point_vzoom_m = 11 }

            map = new ymaps.Map('YMapsID', {
                center: [ point_lat_m , point_lon_m ],
                zoom: 12,
                controls: ['zoomControl', 'typeSelector', 'geolocationControl', 'fullscreenControl']
            });

            if(point_lat || point_lon ){

            ///placemark = new ymaps.Placemark(position, {}, {});
            placemark = new ymaps.Placemark([ point_lat , point_lon ], {}, {draggable: true, preset: preset_, iconColor: iconcolor_,});
            map.geoObjects.add(placemark);
            }

            //map.controls.add([]);
        });



        ///---
        $('#destroyButton').on('click', function () {
                        //controller.clearRoute();
                        map.geoObjects.removeAll();
                         //params.push('open=' + lastOpenedBalloon);
	                     var point_lat = ""; ///---
		                 var point_lon = ""; ///---
		                 var vzoom = ""; ///---

                        /// удоляем координаты
	                    $('#point_lat').val(point_lat);
		                $('#point_lon').val(point_lon);
		                $('#vzoom').val(vzoom);

                        /// удоляем поля
		                $( '#city' ).val("");
                        $( '#street' ).val("");
                        $( '#building' ).val("");
                        $( '#building_add' ).val("");
                        $( '#entrance' ).val("");
                        $( '#room' ).val("");

                        $( '#kod_kladr' ).val("");
                        $( '#zip_kladr' ).val("");
                        $( '#name_kladr' ).val("");
                        $( '#type_kladr' ).val("");
                        $( '#type_short_kladr' ).val("");

                        ///
                        $('#address').val("");

                        $('#id').find('.value').text("");
                        $('#id').hide();
                        $('#zip').find('.value').text("");
                        $('#zip').hide();
                        $('#name').find('.value').text("");
                        $('#name').hide();
                        $('#type').find('.value').text("");
                        $('#type').hide();
                        $('#type_short').find('.value').text("");
                        $('#type_short').hide();



                    });

	  });  ////--- $(function(){

  } // -- function(context, settings)
}; // --Drupal.behaviors.yandex_map

})(jQuery);