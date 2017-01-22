(function () {
	angular
    .module('app.map')
    .service('geoservices', geoFunc);

    function geoFunc($http, $q) {
      this.getCurrentLocation = function(){
          var deferred = $q.defer();
          navigator.geolocation.getCurrentPosition(function(position) {
            var myCurrentLocation = {
                    latitude : position.coords.latitude,
                    longitude : position.coords.longitude
                };
              
              localStorage.setItem('location', JSON.stringify(myCurrentLocation));

            deferred.resolve(myCurrentLocation);
          });

          return deferred.promise;
      };
    }
}());