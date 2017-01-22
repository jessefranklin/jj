(function () {

  angular
    .module('app.map')
    .controller('mapCtrl', ['uiGmapIsReady','uiGmapGoogleMapApi','mapoptions','geoservices',mapController]);

  mapController.$inject = ['uiGmapIsReady','uiGmapGoogleMapApi','mapoptions','geoservices'];

  function mapController(uiGmapIsReady,uiGmapGoogleMapApi,mapoptions,geoservices) {
    var vm = this;
    vm.markers = {};

    var location = JSON.parse(localStorage.getItem('location'));

    vm.map = {
      center : location,
      Zoom   : 8
    };

    uiGmapGoogleMapApi.then(function(gmaphandle) {
      vm.gmaphandle = gmaphandle;

      vm.marker = {
        id: 0,
        coords: location,
        options: {
          draggable: false,
          title: 'currently here'
        },
        events: {
            click: function (marker, eventName, model, args) {
              var lat = marker.getPosition().lat();
              var lon = marker.getPosition().lng();

              vm.marker.options = {
                draggable: false,
                title: 'mon label moved',
                labelContent: "lat: " + vm.marker.coords.latitude + ' ' + 'lon: ' + vm.marker.coords.longitude,
                labelAnchor: "100 0",
                labelClass: "marker-labels"
              };
            }
          }
        };
    });

    uiGmapIsReady.promise().then(function (maps) {
      console.log(vm.jobs);
      //$scope.$apply();
    });

  }

}());
