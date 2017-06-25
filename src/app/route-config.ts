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
        })
        .state('member-page', {
          url: '/member/:memberId',
          views: {
            'header': { template: '<header-block></header-block>' },
            'main': { template: '<member-page></member-page>' }
          }
        })
        .state('members-page', {
          url: '/members',
          views: {
            'header': { template: '<header-block></header-block>' },
            'main': { template: '<members-page></members-page>' }
          }
        })
        .state('pige-result-page', {
          url: '/pige-result',
          views: {
            'header': { template: '<header-block></header-block>' },
            'main': { template: '<pige-result-page></pige-result-page>' }
          }
        });

      $urlRouterProvider.otherwise('/');
      $locationProvider.html5Mode(true);

  }
];