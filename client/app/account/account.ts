'use strict';

angular.module('tempControlApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/',
        templateUrl: 'app/account/dashboard/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'vm',
        authenticate: true
      });
  })
  .run(function() {
  });
