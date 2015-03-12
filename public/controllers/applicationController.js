marketplaceApp.controller('marketplaceAppController', function($scope, $http) {

  $scope.voucherInput = '';
  $scope.myCart = [];
  $scope.total = 0;
  $scope.voucherError = undefined;

  $http.get('/api').success(function(data) {
    $scope.inventoryData = data;
  });

  $scope.filters = [
    {
      id: 1,
      title: "All items for sale",
      key: 'name',
      reverse: false
    },
    {
      id: 2,
      title: "Women's Footwear",
      key: 'category',
      reverse: false
    },
    {
      id: 3,
      title: "Men's Footwear",
      key: 'category',
      reverse: false
    },
    {
      id: 4,
      title: "Women's Casualwear",
      key: 'category',
      reverse: false
    },
    {
      id: 5,
      title: "Men's Casualwear",
      key: 'category',
      reverse: false
    },
    {
      id: 6,
      title: "Women's Formalwear",
      key: 'category',
      reverse: false
    },
    {
      id: 7,
      title: "Men's Formalwear",
      key: 'category',
      reverse: false
    }
  ];

  $scope.filter = $scope.filters[0];


  $scope.addItemToCart = function(item) {
    $scope.myCart.push(item);
    $scope.updateInventoryWhenItemAddedToCart(item);
    $scope.updateTotal('add', item);
  };

  $scope.updateInventoryWhenItemAddedToCart = function(item) {
    item.quantityInStock -= 1;
  };

  $scope.updateInventoryWhenItemDeletedFromCart = function(item) {
    item.quantityInStock += 1;
  };

  $scope.updateTotal = function(operation, item) {
    if (operation == 'add') {
      $scope.total += item.cost;
    } else {
      $scope.total -= item.cost;
      if($scope.total < 0) $scope.total = 0;
    };
  };

  $scope.removeItemFromCart = function(item) {
    $scope.updateTotal('remove', item);
    $scope.myCart.splice($scope.myCart.indexOf(item), 1);
    $scope.updateInventoryWhenItemDeletedFromCart(item);
  };

  $scope.applyVoucherCode = function(voucherCode) {

    $scope.isVoucherCodeValid(voucherCode)

    if($scope.voucherError == false) {

      if(voucherCode == 'SAVE5') {
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

    } else {

      return 'invalid';

    };

  }

  $scope.isVoucherCodeValid = function(voucherCode) {
    var validVouchers = ['SAVE5', 'SAVE10', 'SAVE15'];
    if(validVouchers.indexOf(voucherCode) >= 0) $scope.voucherError = false
    else $scope.voucherError = true;
  }


  $scope.myCartContainsFootwear = function() {
    for(var i = 0; i < $scope.myCart.length; i ++) {
      var specificCategory = $scope.myCart[i].category
      var genericCategory = specificCategory.split(' ')[1];
      if(genericCategory == 'Footwear') return true;
    };
  };

});
