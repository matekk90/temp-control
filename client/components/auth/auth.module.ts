'use strict';

angular.module('tempControlApp.auth', [
  'tempControlApp.constants',
  'tempControlApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
