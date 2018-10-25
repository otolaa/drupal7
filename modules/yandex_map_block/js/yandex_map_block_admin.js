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
                    myPlacemark = new ymaps.Placemark([$center[0],$center[1]], {}, {draggable: true, preset: $ymb['preset'], iconColor: $ymb['iconcolor'], });
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
                        $("input[name='zoom_things']").val( event.get('newZoom') );
                    }
                }); // -- boundschange

                //--save
                function savecoordinats (){
                    // -- remove ALL and add  Placemark
                    myMap.geoObjects.removeAll();
                    vzoom = myMap.getZoom();
                    myPlacemark = new ymaps.Placemark(coords, {}, {draggable: true, preset: $ymb['preset'], iconColor: $ymb['iconColor'],});
                    myMap.geoObjects.add( myPlacemark );
                    //--- record in input
                    $('#edit-ymb-center').val(coords[0].toPrecision()+","+coords[1].toPrecision());
                    $('#edit-ymb-zoom').val(vzoom);
                }  //-- function savecoordinats()
            }
            return false;
        } // -- function(context, settings)
    }; // --Drupal.behaviors.yandex_map_block
})(jQuery);
