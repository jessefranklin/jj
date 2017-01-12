(function(angular) {
    'use strict';

    angular.module( "app" ).controller( 'header', ['$location', controller]);

    function controller( $location ) {

        var headerStates = [
             { name: 'Home', sref: 'app.home', roots: ['/home'] }
            ,{ name: 'Manage', sref: 'app.manage', roots: ['/manage'] }
        ];

        var vm = this;
            vm.homeSref    = 'app.home';
            vm.states      = headerStates;
    };

}( this.angular ));
