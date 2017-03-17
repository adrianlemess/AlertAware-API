angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('app', {
    url: '/app', 
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.signin', {
    url: '/signin',
    views: {
      'menuContent': {
        controller: 'SigninCtrl',
        templateUrl: 'templates/signin.html'
      }
    }
  })

  .state('app.timeline', {
      url: '/timeline',
      views: {
        'menuContent': {
          controller:'TimelineCtrl',
          templateUrl: 'templates/timeline.html'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/signin');
});
4

