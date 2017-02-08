'use strict';

requirejs.config({
    waitSeconds: 60,
    baseUrl: 'app',
    paths: {
        'text': '../bower_components/requirejs-text/text',
        'durandal': '../bower_components/durandal/js',
        'transitions': '../bower_components/durandal/js/transitions',
        'plugins': '../bower_components/durandal/js/plugins',
        'knockout': '../bower_components/knockout/dist/knockout',
        'jquery': '../bower_components/jquery/dist/jquery',
        'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap',
        'knockout.mapping': '../bower_components/knockout-mapping/knockout.mapping',
        'underscore': '../bower_components/underscore/underscore-min',
        'q': '../bower_components/q/q',
        'json2': '../bower_components/json2/json2'
    },
     shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jQuery'
        },
        'knockout': {
            exports: 'ko'
        }
    }
});

define(['durandal/system', 'durandal/app', 'durandal/binder', 'durandal/viewLocator', 
        'knockout', 'knockout.mapping', 'underscore', 'bootstrap', 'q', 'json2'],
        function(system, app, binder, viewLocator, router, ko, kom, _, boostrap, Q, JSON) {
            app.title = "durandal demo";
            app.configurePlugins({
               router: true,
               dialog: true,
               widget: true     
            });       

            app.start().then(function() {
                viewLocator.useConvention();

                app.setRoot('viewmodels/shell');
            });
        });

