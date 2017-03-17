angular.module('app.controller', [])


//Controller do Menu
.controller('AppCtrl', function($scope,Authentication, $rootScope, $state, $ionicHistory) {
    console.log("timeline");
   
        $rootScope.change =  Authentication.isAuthenticated();
        $scope.user = $rootScope.me;
      
      console.log($scope.user);
    $scope.logout = function() {
            Authentication.signout();
                $rootScope.change = false;
                $scope.user = null;
                $rootScope.me=null;
                $ionicHistory.nextViewOptions({
                     disableBack: true
                });
                $state.go('app.signin');
           
        };
})

.controller('TimelineCtrl', function($scope, historicService,$rootScope, $ionicLoading,Authentication, postTokenFactory, $cordovaDevice) {
    console.log("teste");
    $rootScope.change = Authentication.isAuthenticated();
    $rootScope.countBadge = 0;
    $rootScope.refresh = function(){
        var id= $rootScope.me._id;
            return historicService.getListUserHistoric(id).then(function(response){
                $rootScope.countBadge = 0;
                  $rootScope.items = response;
                 var push = PushNotification.init({
            android: {
                senderID: "601690444543"
            },
            ios: {
                alert: "true",
                badge: "true",
                sound: "true"
            },
            windows: {}
        });
        
         var deviceInformation = $cordovaDevice.getUUID();
        var initRegister = function(){
            push.on('registration', function(data) {
                //deviceInformation.uuid
                console.log("registration: "+data.registrationId);
                postTokenFactory.enviaToken(data.registrationId, deviceInformation, $rootScope.me._id,"5197412487");
                //console.log("My Device token:"+token.token,token.token);
                //push.saveToken(data.registrationId);  // persist the token in the Ionic Platform
            })
        }
        initRegister();
        
        push.on('notification', function(data) {
            // data.message,
            // data.title,
            // data.count,
            // data.sound,
            // data.image,
            // data.additionalData
            alert(data.title+"\n"+data.message);
                $scope.$apply(function(){
                     $rootScope.countBadge++;
                })
               
                

        });

        push.on('error', function(e) {
            // e.message
            alert(e.message);
        });

            })
    }

    $rootScope.refresh();
    $scope.doRefresh = function(){
            setTimeout(function(){
            $rootScope.refresh().finally(function(){
                $rootScope.countBadge = 0;
                $scope.$broadcast('scroll.refreshComplete');
                $ionicLoading.show({ template: 'Timeline Atualizada!', noBackdrop: false, duration: 1000 });
            })
         },1300);
    }
    
})

.controller('SigninCtrl', function($scope, $rootScope,$ionicHistory, $state, Authentication, $cordovaVibration) {
      $rootScope.me=null;
        $scope.signIn = function(credentials, isValid) {
            $rootScope.change = false;
            if(!isValid) {return;}
            console.log(credentials);
            Authentication.signin(credentials).then(function () {
                // save user profile details to $rootScope
                console.log("teste");
                $rootScope.me = Authentication.getCurrentUser();
                console.log(Authentication.getCurrentUser());
                $ionicHistory.nextViewOptions({
                     disableBack: true
                });
                $rootScope.change = Authentication.isAuthenticated();
                $state.go('app.timeline', { _id: $rootScope.me._id});
            }, function(error) {
                $cordovaVibration.vibrate(100);
                console.log('error ' + error);
            });
        };
        
        $scope.goToSignup = function(){
            $state.go('signup');
        };
    });
    

