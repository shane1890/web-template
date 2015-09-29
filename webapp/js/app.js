require([
    'jquery',
    'handlebars',
    'views/test-view'
], function(
    $,
    Handlebars,
    TestView
) {
    'use strict';

    $(function() {
        var testView = new TestView({name: 'World'});
        $('#app').html(testView.render().el);
    });

});
