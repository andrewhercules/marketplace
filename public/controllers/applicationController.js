marketplaceApp.controller('marketplaceAppController', function($scope, $http) {

  var vm = this;
  vm.title = 'Marketplace';

  $scope.voucherInput = '';
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

  $scope.applyVoucherCode = function(voucherCode) {
    if (voucherCode == 'SAVE5') {
      $scope.total -= 5;
      $scope.voucherInput = '';
    };

    if(voucherCode == 'SAVE10' && $scope.total >= 50) {
      $scope.total -= 10;
      $scope.voucherInput = '';
    };

    if(voucherCode == 'SAVE15' && ($scope.total >= 75 && $scope.myCartContainsFootwear())) {
      $scope.total -= 15;
      $scope.voucherInput = '';
    };

  }

  $scope.myCartContainsFootwear = function() {
    for(var i = 0; i < $scope.myCart.length; i ++) {
      var specificCategory = $scope.myCart[i].category
      var genericCategory = specificCategory.split(' ')[1];
      if(genericCategory == 'Footwear') return true;
    };
  };

});
