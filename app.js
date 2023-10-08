var app = angular.module('myapp', []);

app.controller('MainCtrl',['$scope', 'myService', function($scope, myService) {
  
  $scope.refresh = function(){
    myService.serviceRequest().then(function(serviceResponse){
        if(!serviceResponse || !serviceResponse.length) return;
        $scope.name = JSON.stringify(serviceResponse);
    })
  }

setInterval(()=>{
  $scope.refresh();
}, 1); //hits for every one m.sec
  
}])

app.service('myService', ['$http', '$q', function($http, $q){
  var serviceScope = this;
  var responseObj = [];
  var responseObjLoaded = true;

  serviceScope.serviceRequest = function(){
    if (responseObjLoaded) {
      responseObjLoaded = false;
      return $http({
        method: "GET",
        url: "https://dummyjson.com/products/1",
      }).then((response) => {
        responseObj.push(response.data);
        return responseObj;
      })
    } else {
      return $q.when(responseObj).then((result)=>{
        return result;
      });
    }
  }
}])
