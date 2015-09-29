define([
    'backbone',
    'handlebars'
], function(
    Backbone,
    Handlebars
) {
    'use strict';

    var TestView = Backbone.View.extend({

        template: Handlebars.templates['test'],

        initialize: function(options) {
            this.name = options.name;
        },

        render: function() {
            this.$el.html(this.template({
                name: this.name
            }));
            return this;
        }
    });

    return TestView;
});