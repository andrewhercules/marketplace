marketplaceApp.controller('marketplaceAppController', function($scope, $http) {

  var vm = this;
  vm.title = 'Marketplace';

  $http.get('/api').success(function(data) {
    $scope.inventoryData = data;
  });

});
