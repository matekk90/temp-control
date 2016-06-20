'use strict';

angular.module('tempControlApp', [
    'tempControlApp.auth',
    'tempControlApp.constants',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'btford.socket-io',
    'ui.router',
    'validation.match',
    'nvd3'
])
    .config(function ($urlRouterProvider, $locationProvider) {
        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true);
    });
