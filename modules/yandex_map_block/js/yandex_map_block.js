(function ($) {
    Drupal.behaviors.yandex_map_block = {
        attach: function(context, settings) {
            Drupal.ymb = Drupal.ymb || {};
            var $ymb = Drupal.settings.ymb;
            var $div = $("#"+$ymb['id']);
            var $center = $ymb['center'].split(',');
            $div.height($ymb['height']+"px");
            /**/
            ymaps.ready(init);
            function init() {
                //
                var myMap = new ymaps.Map($ymb['id'], {
                    center: [ $center[0] , $center[1] ],
                    zoom: $ymb['zoom'],
                    controls: ['typeSelector', 'geolocationControl', 'fullscreenControl', 'zoomControl'],
                });
                // -- http://api.yandex.ru/maps/doc/jsapi/beta/ref/reference/control.SearchControl.xml
                searchControl = new ymaps.control.SearchControl({ options: { noPlacemark: true, } });
                myMap.controls.add(searchControl, { left: '40px', top: '10px' });
                // -- 0
                if($center[0] && $center[1]){
                    myPlacemark = new ymaps.Placemark([$center[0],$center[1]], {balloonContentHeader: $ymb['balloonHeader'], balloonContentBody: $ymb['balloonContent'], balloonContentFooter: $ymb['balloonFooter'] }, {draggable: false, preset: $ymb['preset'], iconColor: $ymb['iconcolor'],});
                    myMap.geoObjects.add(myPlacemark);
                }
            }
            return false;
        } // -- function(context, settings)
    }; // --Drupal.behaviors.yandex_map_block
})(jQuery);
