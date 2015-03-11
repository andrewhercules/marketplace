marketplaceApp.controller('marketplaceAppController', function($scope, $http) {

  var vm = this;
  vm.title = 'Marketplace';

  $scope.myCart = [];
  $scope.total = 0;

  $http.get('/api').success(function(data) {
    $scope.inventoryData = data;
  });

  $scope.addItemToCart = function(item) {
    $scope.myCart.push(item);
    $scope.updateTotal(item);
  };

  $scope.updateTotal = function(item) {
    $scope.total += item.cost;
  };

});
