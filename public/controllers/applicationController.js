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
    $scope.updateTotal('add', item);
  };

  $scope.updateTotal = function(operation, item) {
    if (operation == 'add') {
      $scope.total += item.cost;
    } else {
      $scope.total -= item.cost;
    };
  };

  $scope.removeItemFromCart = function(item) {
    $scope.updateTotal('remove', item);
    var i = $scope.myCart.indexOf(item);
    $scope.myCart.splice(i, 1);

  };

});
