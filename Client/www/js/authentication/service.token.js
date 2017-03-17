

function Token(localStorageService, Base64, $rootScope) {
        /**
         * @type {string}
         * @private
         */
        var _tokenStorageKey = 'token';
        
        /**
         * @type {string}
         * @private
         */
        var _cachedToken = '';

        /**
         * @ngdoc method
         * @name Token#set
         * @description Set token.
         * @param {string} token
         */
        var set = function(token) {
            _cachedToken = token;
            localStorageService.set(_tokenStorageKey, token)
        };
        /**
         * @ngdoc method
         * @name Token#get
         * @description Get token.
         * @returns {string} token
         */
        var get = function() {
            if (!_cachedToken) {
                _cachedToken = localStorageService.get(_tokenStorageKey);
            }
            return _cachedToken;
        };
        /**
         * @ngdoc method
         * @name Token#remove
         * @description Remove token.
         */
        var remove = function() {
            _cachedToken = null;
           localStorageService.remove(_tokenStorageKey);
           localStorageService.remove('user');
           $rootScope.me = null;
        };
        /**
         * @ngdoc method
         * @name Token#decodeToken
         * @description Decode the token.
         */
        var decodeToken = function(token) {
            var parts = token.split('.');

            if (parts.length !== 3) {
                throw new Error('JWT must have 3 parts');
            }

            // get payload part of token that contains user data (Token look like xxxxxxxxxxx.yyyy.zzzzzzzzzzzz the y is the encoded payload.)
            var encoded = parts[1];

            // decode user data from payload token
            var decoded = Base64.decode(encoded);
            if (!decoded) {
                throw new Error('Cannot decode the token');
            }

            return JSON.parse(decoded);
        };

        return {
            set: set,
            get: get,
            remove: remove,
            decodeToken: decodeToken
        }
    }

    angular.module('app.TokenService',[])
        .factory('Token', Token);