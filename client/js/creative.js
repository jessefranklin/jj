(function($) {
    "use strict"; // Start of use strict

    $('body').click(function(){
		if ($(".navbar-collapse").is(":visible") && $(".navbar-toggle").is(":visible") ) {
            $('.navbar-collapse').collapse('toggle');
        }
    });

})(jQuery); // End of use strict
