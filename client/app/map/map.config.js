(function () {
	angular
    .module('app.map')
    .config(function(uiGmapGoogleMapApiProvider) {
      uiGmapGoogleMapApiProvider.configure({
        key: '',
        v: '3.18',
        libraries: 'weather,geometry,visualization'
      });
    })
    .service('mapoptions', mapoptions);

    function mapoptions($http, $q, uiGmapGoogleMapApi) {
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