(function ($) {

    Drupal.behaviors.yandex_map = {
     attach: function(context, settings) {

            Drupal.yandexViews = Drupal.yandexViews || {};

            ymaps.ready(initialize);


            function initialize() {

		      // --
		       var myMap = new ymaps.Map('yandex-views-map', {
                    center: [ Drupal.settings.yandexViews.mapCenter[0] , Drupal.settings.yandexViews.mapCenter[1]],
                    zoom: Drupal.settings.yandexViews.mapZoom,
                    controls: ['typeSelector', 'fullscreenControl', 'zoomControl']
                });


              // -- http://api.yandex.ru/maps/doc/jsapi/beta/ref/reference/option.presetStorage.xml
			  var myClusterer = new ymaps.Clusterer({preset: Drupal.settings.yandexViews.mapClusterer });

              var myGeoObjects = [];

             // -- Creating markers
             $.each( Drupal.settings.yandexViews.markers,
		      function(i) {
              //myPlacemark = new ymaps.Placemark([51.15483768192011, 71.43171541392806], {balloonContentHeader:'Title header', balloonContent: 'Content body', balloonContentFooter: 'Footer href node'}, {preset:'twirl#blueDotIcon'}),
              //myMap.geoObjects.add( new ymaps.Placemark([this.lat, this.lng], {balloonContentHeader:this.title, balloonContent: this.description}, {preset:'twirl#blueDotIcon'}) );
              var preset_ =  this.icon;
              var icolor_ = this.icolor;
              if(preset_){ var icon_ = preset_ }else{ var icon_ = 'islands#dotIcon'}
              if(icolor_){ var color_ = icolor_ }else{ var color_ = '#1faee9'}

              //--
               myGeoObjects[i] = new ymaps.Placemark([this.lat, this.lng], {balloonContentHeader:this.title, balloonContent: this.description}, {preset:icon_, iconColor: color_});

                //--
		      });  ///-- end Creating markers


				//var myClusterer = new ymaps.Clusterer();
		        myClusterer.add(myGeoObjects);
		        myMap.geoObjects.add(myClusterer);
		        myMap.setBounds(myClusterer.getBounds());



             }
      ///----

      } // -- function(context, settings)
      }; // --Drupal.behaviors.yandex_map

       })(jQuery);