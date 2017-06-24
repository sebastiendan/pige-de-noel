import angular = require('angular');

export = [
  '$stateProvider', '$httpProvider', '$urlRouterProvider', '$locationProvider', ($stateProvider: angular.ui.IStateProvider,
    $httpProvider: angular.IHttpProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider, $locationProvider: angular.ILocationProvider) => {

      $stateProvider
        .state('home-page', {
          url: '/',
          views: {
            'header': { template: '<header-block></header-block>' },
            'main': { template: '<home-page></home-page>' }
          }
        });

      $urlRouterProvider.otherwise('/');
      $locationProvider.html5Mode(true);

  }
];