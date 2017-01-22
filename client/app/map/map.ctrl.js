(function () {

  angular
    .module('app.map')
    .controller('mapCtrl', ['$scope','$timeout','jobsService','mapoptions','geoservices',mapController]);

  mapController.$inject = ['$scope','$timeout','jobsService','mapoptions','geoservices'];

  function mapController($scope,$timeout,jobsService,mapoptions,geoservices) {
    var vm = this;
    vm.markers = [];
    vm.searchtext = '';

    var location = JSON.parse(localStorage.getItem('location'));

    var mapOptions = {
        zoom: 14,
        center: new google.maps.LatLng(location.latitude,location.longitude),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    };

    vm.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
    var infoWindow = new google.maps.InfoWindow();
    var image = 'img/green-flag.png';
    var newMarker = function (info){
        var marker = new google.maps.Marker({
            map: vm.map,
            icon: image,
            label: '$300',
            position: new google.maps.LatLng(info.location.lat, info.location.long),
            title: info.title
        });
        marker.content = '<div class="infoWindowContent">$3000' + info.service_name + '</div>';
        
        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content + '<br/><a href="/detail/'+info._id+'" class="button"><i class="icon-plus"></i>Do it</a>');
            infoWindow.open(vm.map, marker);
        });
        
        vm.markers.push(marker);
    };

    vm.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    };

    jobsService.get()
      .then(function(data){
        $scope.markerdata = data.data;
        for (i = 0; i < data.data.length; i++){
            newMarker(data.data[i]);
        }
    });
    
    $scope.$watch('nas',
        function (newValue, oldValue) {
            for (jdx in vm.markers) {
                vm.markers[jdx].setMap(null);
            }
            vm.markers = [];
            for (idx in $scope.nas) {
                newMarker($scope.nas[idx]);
            }
    }, true);

  }

}());
