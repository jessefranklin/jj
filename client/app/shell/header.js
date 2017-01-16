(function(angular) {
    
    angular.module( "app" ).controller( 'header', ['$location', 'authService', controller]);

    controller.$inject = [ '$location', 'authService'];

    function controller(  $location , authService) {

        var headerStates = [
            { name: 'Home', sref: 'app', roots: ['/'] },
            { name: 'Add Job', sref: 'app.post', roots: ['/post'] }
        ];

        var vm = this;
            vm.homeSref    = 'app';
            vm.states      = headerStates;
            vm.authService = authService;
            
            authService.getProfileDeferred().then(function (profile) {
              vm.userProfile = profile;
            });
    }

}( this.angular ));