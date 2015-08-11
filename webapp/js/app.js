require([
    'jquery',
    'handlebars'
], function(
    $,
    Handlebars
) {
    'use strict';

    $(function() {
        var template = Handlebars.templates['test'];
        $('#app').html(template());
    });

});
