
    function AuthenticationProvider() {
        this.$get = function($http, Token, localStorageService, Restangular) {
            var currentUser = null;
            
            function saveUserAndToken(token) {
                // store token to local storage
                Token.set(token);
                // decode user data from payload token
                currentUser = Token.decodeToken(token);
                // save user to locale storage
                localStorageService.set('user', currentUser);
            }

            return {
                signup: function(params) {
                    return Restangular
                        .all('/auth/signup')
                        .post(params)
                        .then(function(response) {
                            saveUserAndToken(response.token);
                        });
                },
                signin: function(params) {
                    alert(JSON.stringify(params));
                    return Restangular
                        .all('/auth/signin')
                        .post(params)
                        .then(function(response) {  
                            alert(JSON.stringify(response))
                            saveUserAndToken(response.token);
                        });
                },
                signout: function() {
                    currentUser = null;
                    Token.remove();
                },
                isAuthenticated: function() {
                    return !!Token.get();
                },
                getCurrentUser: function() {
                    return currentUser || localStorageService.get('user')
                }
            };
        };
    }
    angular.module('app.providerAuthentication',[])
        .provider('Authentication', AuthenticationProvider);

