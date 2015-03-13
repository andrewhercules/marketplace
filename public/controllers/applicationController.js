marketplaceApp.controller('marketplaceAppController', function($scope, $http) {

  $scope.voucherInput = '';
  $scope.myCart = [];
  $scope.total = 0;
  $scope.voucherError = undefined;

  $http.get('/api').success(function(data) {
    $scope.inventoryData = data;
  });

  $scope.sortByOptions = [
    { id: 1, title: 'Alphabetical Order', key: 'name', reverse: false },
    { id: 2, title: 'Price: Lowest to Highest', key: 'cost', reverse: false },
    { id: 3, title: 'Price: Highest to Lowest', key: 'cost', reverse: true }
  ];

  $scope.sortBy = $scope.sortByOptions[0];

  $scope.filterOptions = [
    { category: "Women's Footwear" },
    { category: "Men's Footwear"},
    { category: "Women's Casualwear" },
    { category: "Men's Casualwear" },
    { category: "Women's Formalwear" },
    { category: "Men's Formalwear" }
  ];

  $scope.addItemToCart = function(item) {
    $scope.myCart.push(item);
    $scope.updateInventory('sale', item);
    $scope.updateTotal('added-to-cart', item);
  };

  $scope.removeItemFromCart = function(item) {
    $scope.updateTotal('removed-from-cart', item);
    $scope.myCart.splice($scope.myCart.indexOf(item), 1);
    $scope.updateInventory('restock', item);
  };

  $scope.updateInventory = function(operation, item) {
    if (operation == 'sale') item.quantityInStock -= 1;
    if (operation == 'restock') item.quantityInStock += 1;
  };

  $scope.updateTotal = function(operation, item) {
    if (operation == 'added-to-cart') $scope.total += item.cost;
    if (operation == 'removed-from-cart') $scope.total -= item.cost;
    if ($scope.total < 0) $scope.total = 0;
  };

  $scope.applyVoucherCode = function(voucherCode) {
    $scope.isVoucherCodeValid(voucherCode)
    if ($scope.voucherError == false) {
      if (voucherCode == 'SAVE5') {
        $scope.total -= 5;
      };
      if (voucherCode == 'SAVE10' && $scope.total >= 50) {
        $scope.total -= 10;
      };
      if (voucherCode == 'SAVE15' && $scope.isEligibleForSAVE15Voucher()) {
        $scope.total -= 15;
      };
      $scope.voucherInput = '';
    };
  };

  $scope.isVoucherCodeValid = function(voucherCode) {
    var validVouchers = ['SAVE5', 'SAVE10', 'SAVE15'];
    if (validVouchers.indexOf(voucherCode) >= 0) {
      $scope.voucherError = false;
    } else {
      $scope.voucherError = true;
    };
  };

  $scope.isEligibleForSAVE15Voucher = function() {
    return $scope.total >= 75 && $scope.myCartContainsFootwear();
  };

  $scope.myCartContainsFootwear = function() {
    for (var i = 0; i < $scope.myCart.length; i ++) {
      var specificCategory = $scope.myCart[i].category
      var genericCategory = specificCategory.split(' ')[1];
      if (genericCategory == 'Footwear') return true;
    };
  };

});
