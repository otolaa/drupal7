(function ($) {

Drupal.behaviors.yandex_map = {
  attach: function(context, settings) {
            Drupal.mymap = Drupal.mymap || {};

            ymaps.ready(init);

            function init() {

            var myMap, myPlacemark, coords;
            var point_lat = jQuery('#point_lat').val();
     	    var point_lon = jQuery('#point_lon').val();
     	    var point_vzoom = jQuery('#vzoom').val();  //zoom
	        var point_vid = jQuery('#vid').val();    //preset

	        if(point_lat || point_lon ){
	          point_lat_m = point_lat,
	          point_lon_m = point_lon
	          }else{
	          //alert(Drupal.settings.mymap.longitude),
		      point_lat_m = Drupal.settings.mymap.latitude,
		      point_lon_m = Drupal.settings.mymap.longitude   // 55.50 latitude  37.37 longitude
		    }

		    if(point_vzoom){point_vzoom_m = point_vzoom }else{ point_vzoom_m = 11 }

            // -- add myMap
            var myMap = new ymaps.Map('YMapsID', {
                    center: [ point_lat_m , point_lon_m ],
                    zoom: point_vzoom_m,
                    controls: ['typeSelector', 'geolocationControl', 'fullscreenControl', 'zoomControl'],
                });

            // -- http://api.yandex.ru/maps/doc/jsapi/beta/ref/reference/control.SearchControl.xml
            searchControl = new ymaps.control.SearchControl({ options: { noPlacemark: true, } });
            myMap.controls.add(searchControl, { left: '40px', top: '10px' });

            ///--0
	        if(point_lat && point_lon ){
             myPlacemark = new ymaps.Placemark([ point_lat , point_lon ], {}, {draggable: true, preset: Drupal.settings.mymap.preset, iconColor: Drupal.settings.mymap.iconcolor, });
             myMap.geoObjects.add( myPlacemark );
	        }

            //--1
		    searchControl.events.add(["resultselect", "resultshow"], function (e) {
	        // http://api.yandex.ru/maps/doc/jsapi/beta/ref/reference/control.SearchControl.xml
			coords = searchControl.getResultsArray()[e.get("index")].geometry.getCoordinates(); // получаем координаты
			// send in input
		    savecoordinats();
		    });  // -- searchControl.events.add("resultselect"

            //--2
		    myMap.events.add('click', function (e) {
		    coords = e.get('coords');
		    // send in input
	        savecoordinats();
		    });  //- myMap.events.add('click'

		    //--3
		    myMap.geoObjects.events.add('dragend', function (event) {
		    var thisPlacemark = event.get('target');
		    coords = thisPlacemark.geometry.getCoordinates();
	        savecoordinats();
		    });  //-- dragend

		    //--4
			myMap.events.add('boundschange', function (event) {
			    if (event.get('newZoom') != event.get('oldZoom')) {
			     $('#vzoom').val( event.get('newZoom') );
			    }
	    	}); // -- boundschange


	        //--save
			function savecoordinats (){
	         // -- remove ALL and add  Placemark
			 myMap.geoObjects.removeAll();
			 vzoom = myMap.getZoom();
			 myPlacemark = new ymaps.Placemark(coords, {}, {draggable: true, preset: Drupal.settings.mymap.preset, iconColor: Drupal.settings.mymap.iconcolor,});
		     myMap.geoObjects.add( myPlacemark );
			//--- record in input
			$('#point_lat').val( coords[0].toPrecision() );
			$('#point_lon').val( coords[1].toPrecision() );
			$('#vzoom').val( vzoom );
			}  //-- function savecoordinats()


		    ///---
			  $('#destroyButton').on('click', function () {
			                        //
			                        myMap.geoObjects.removeAll();
			                        //
				                    $('#point_lat').val("");
					                $('#point_lon').val("");
					                $('#vzoom').val("");

			                    });


            }  ///----  function initialize()

        } // -- function(context, settings)
      }; // --Drupal.behaviors.yandex_map

       })(jQuery);