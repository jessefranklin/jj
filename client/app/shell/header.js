(function(angular) {
    
    angular.module( "app" ).controller( 'header', ['$location', 'authService', controller]);

    controller.$inject = [ '$location', 'authService'];

    function controller(  $location , authService) {

        var headerStates = [
            { name: 'Home', sref: 'app.home', roots: ['/home'] },
            { name: 'Manage', sref: 'app.manage', roots: ['/manage'] }
        ];

        var vm = this;
            vm.homeSref    = 'app.home';
            vm.states      = headerStates;
            vm.authService = authService;
            
            authService.getProfileDeferred().then(function (profile) {
              vm.userProfile = profile;
            });
    }

}( this.angular ));