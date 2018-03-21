/* При успешной загрузке API выполняется
   соответствующая функция */
(function ($) {


Drupal.behaviors.yandex_map = {
attach: function(context, settings) {

            Drupal.yandexViews = Drupal.yandexViews || {};

            ymaps.ready(initialize);


            function initialize() {

            $(Drupal.settings.yandexViews.mark).each(
		    function(i) {


            var point_lat = this.markers.lat;
     	    var point_lon = this.markers.lng;
     	    // var point_vzoom = jQuery('#vzoom').val();  //маштаб    //Drupal.settings.geolocationViews.mapCenter[0]
     	    var point_vzoom = this.mapZoom;
	        var point_vid = this.mapType;      //вид

            var mapid = this.mapid;      //mapid
	        var id_map = 'YMapsID' + String(mapid);      //id
	        var myMap = 'myMap' + String(mapid);      //myMap

	        var lon_ = this.longitude;
	        var lat_ = this.latitude;
	        var preset_ = this.preset;
	        var iconcolor_ = this.iconcolor;

	        if(point_lat || point_lon ){ point_lat_m = point_lat, point_lon_m = point_lon }else{
		      point_lat_m = lat_, point_lon_m = lon_   // Широта 55.50 -latitude ' Долгота 37.37' -- longitude
		    }

		    if(point_vzoom){point_vzoom_m = point_vzoom }else{ point_vzoom_m = 11 }
		    //if(point_vid){point_vid_m = point_vid }else{ point_vid_m = 'twirl#blueDotIcon' }

            var myMap = new ymaps.Map(id_map, {
                    center: [ point_lat_m , point_lon_m ],
                    zoom: point_vzoom_m,
                    //behaviors: ["default", "scrollZoom"]
                    controls: ['typeSelector', 'fullscreenControl', 'zoomControl'],
                });

           ///---- from end ballon
	           if(point_lat || point_lon ){

                point_lat_m = point_lat, point_lon_m = point_lon


		              myGeoObject = new ymaps.GeoObject({
		                    // Геометрия.
		                    geometry: {
		                        // Тип геометрии - точка
		                        type: "Point",
		                        // Координаты точки.
		                        coordinates: [ point_lat_m , point_lon_m ]
		                    },
				                // Свойства
				                    properties: {
				                        // Контент метки.
				                        balloonContentHeader: this.mapHeader,
				                        balloonContent: this.mapBody,
				                        balloonContentFooter: this.mapFooter,
				                    }
				                }, {
				                    // Опции
				                    // Иконка метки будет растягиваться под ее контент
				                    preset: preset_, iconColor: iconcolor_,  //'twirl#blueDotIcon'    point_vid

		                });

                       myMap.geoObjects.add(myGeoObject);

	            }  ///--- point_lat || point_lon

            });  ///--end each

        ///---
             }   /// init();
      ///----


} // -- function(context, settings)
}; // --Drupal.behaviors.yandex_map

})(jQuery);