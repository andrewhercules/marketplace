marketplaceApp.controller('marketplaceAppController', function($scope, $http) {

  var vm = this;
  vm.title = 'Marketplace';

  $scope.myCart = [];

  $http.get('/api').success(function(data) {
    $scope.inventoryData = data;
  });

  $scope.addItemToCart = function(item) {
    $scope.myCart.push(item);
    console.log('item added');
    console.log($scope.myCart);
  };

});
