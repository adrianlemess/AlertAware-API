angular.module('app.service', [])

.factory('postTokenFactory', function($http) {
    return { 
        enviaToken : function(registrationId,deviceId,userId,celNumber){
            console.log("teste"+deviceId);
            var data = {
                registrationId: registrationId,
                deviceId:deviceId,
                userId:userId,
                celNumber:celNumber
            }

        var url = "https://tcc-interface-administrativa-adrianlemess.c9users.io/api/device";
        var req = {
         method: 'POST',
         url: url,				   
         data: data
     }
     $http(req).then(function sucessCallback(response){				
        return response.data;
    }, function errorCallback(response){

        return response;
    });		
     console.log(data);
 }   
}

})
.factory('historicService', function($http) {
    return {
      getListUserHistoric: function(userId){
              return $http.get("https://tcc-interface-administrativa-adrianlemess.c9users.io/api/listHistoric/"+userId).then(function(response){
              var items = response.data; 
              return items;
          });
         },
      getHistoric: function(id){
           return $http.get("https://tcc-interface-administrativa-adrianlemess.c9users.io/api/listHistoric/"+id).then(function(response){
                var items = response.data;
                return items;
            });
         }
    }
})