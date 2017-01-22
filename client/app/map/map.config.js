(function () {
	angular
    .module('app.map')
    .service('mapoptions', mapoptions);

    function mapoptions($http, $q) {
      this.getMapOptions = function(){
        return{
          mapOptions : {
            minZoom : 3,
            zoomControl : false,
            draggable : true,
            navigationControl : false,
            mapTypeControl : false,
            scaleControl : false,
            streetViewControl : false,
            mapTypeId : google.maps.MapTypeId.HYBRID,
            disableDoubleClickZoom : false,
            keyboardShortcuts : true,
            styles : [{
              featureType : "poi",
              elementType : "labels",
              stylers : [{
                visibility : "off"
              }]
            }, {
              featureType : "transit",
              elementType : "all",
              stylers : [{
                visibility : "off"
              }]
            }],
          }
        };
      };
    }
}());