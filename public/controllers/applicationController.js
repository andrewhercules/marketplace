marketplaceApp.controller('marketplaceAppController', function($scope, $http) {

  $scope.voucherInput = '';
  $scope.myCart = [];
  $scope.total = 0;
  $scope.voucherError = undefined;

  $scope.inventoryData = [
    { name: "Almond Toe Court Shoes", colour: "Patent Black", category: "Women’s Footwear", cost: 99.00, quantityInStock: 5},
    { name: "Suede Shoes", colour: "Blue", category: "Women's Footwear", cost: 42.00, quantityInStock: 4 },
    { name: "Leather Driver Saddle Loafers", colour: "Tan", category: "Men's Footwear", cost: 34.00, quantityInStock: 12 },
    { name: "Flip Flops", colour: "Red", category: "Men's Footwear", cost: 19.00, quantityInStock: 6 },
    { name: "Flip Flops", colour: "Blue", category: "Men's Footwear", cost: 19.00, quantityInStock: 0 },
    { name: "Gold Button Cardigan", colour: "Black", category: "Women's Casualwear", cost: 167.00, quantityInStock: 6 },
    { name: "Cotton Shorts", colour: "Medium Red", category: "Women's Casualwear", cost: 30.00, quantityInStock: 5 },
    { name: "Fine Stripe Short Sleeve Shirt", colour: "Grey", category: "Men's Casualwear", cost: 49.99, quantityInStock: 9 },
    { name: "Fine Stripe Short Sleeve Shirt", colour: "Green", category: "Men's Casualwear", cost: 39.99, quantityInStock: 3 },
    { name: "Sharkskin Waistcoat", colour: "Charcoal", category: "Men's Formalwear", cost: 75.00, quantityInStock: 2 },
    { name: "Lightweight Patch Pocket Blazer", colour: "Deer", category: "Men's Formalwear", cost: parseFloat(175.50).toFixed(2), quantityInStock: 1 },
    { name: "￼Bird Print Dress", colour: "Black", category: "Women's Formalwear", cost: 270.00, quantityInStock: 10 },
    { name: "￼Mid Twist Cut-Out Dress", colour: "Pink", category: "Women's Formalwear", cost: 540.00, quantityInStock: 5 }
  ];


  $scope.addItemToCart = function(item) {
    $scope.myCart.push(item);
    $scope.updateInventoryWhenItemAddedToCart(item);
    $scope.updateTotal('add', item);
  };

  $scope.updateInventoryWhenItemAddedToCart = function(item) {
    item.quantityInStock -= 1;
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
    var i = $scope.myCart.indexOf(item);
    $scope.myCart.splice(i, 1);
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
