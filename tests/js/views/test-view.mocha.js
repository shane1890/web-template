require([
    'jquery',
    'views/test-view'
], function(
    $,
    TestView
) {
    'use strict';

    describe('TestView', function() {
        describe('render', function () {
            it('should render my name', function () {
                var view = new TestView({name: 'Testing'});
                assert.equal(view.render().$el.text().trim(), 'Hello Testing!');
            });
        });
    });
});