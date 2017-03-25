// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic','restangular','LocalStorageModule','app.service','ngCordova','ngSanitize','ngMessages','app.TokenService','app.controller', 'app.routes','app.serviceInterceptorAuthentication','app.providerAuthentication','app.serviceBase64', 'app.constants'])
.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('alertaware-ionic-app');
  })
.run(function($ionicPlatform, localStorageService, Restangular, $rootScope, Authentication, $location, postTokenFactory, $cordovaDevice) {
        $rootScope.me = Authentication.getCurrentUser();
       
        $rootScope.$on('$stateChangeStart', 
        function(event, toState, toParams, fromState, fromParams, options){ 
    $rootScope.refresh();
    // transitionTo() promise will be rejected with 
    // a 'transition prevented' error
})
        // set material design template
        //$mdThemingProvider.theme('default')
        //    .primaryPalette('teal')
        //    .accentPalette('brown')
        //    .warnPalette('deep-orange');

        /*********************************************************************
         * Route provider configuration based on these config constant values
         *********************************************************************/
        // set restful base API RouteSERVER_API_URL
        var SERVER_API_URL = "http://localhost:7000/api"
        Restangular.setBaseUrl(SERVER_API_URL);
   
          
  $ionicPlatform.ready(function() {

    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
