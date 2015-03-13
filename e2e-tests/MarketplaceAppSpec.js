describe('Marketplace App', function() {

  beforeEach(function() {
    browser.get('http://127.0.0.1:3000/');
    itemList = element.all(by.css('.item-feature'));
    myCartItems = element.all(by.css('.cart-item'));
    sortByOptionsList = element(by.id('sort-by-dropdown-menu')).all(by.tagName('option'));
  });

  xit('should have a title of Marketplace', function() {
    expect(browser.getTitle()).toEqual('Marketplace');
  });

  xit('should have a search form', function() {
    expect(element(by.id('search-input-form')).isPresent()).toBe(true);
  });

  xit('should have a list of all 13 items for sale', function() {
    expect(itemList.count()).toEqual(13);
  });

  xit('should allow user to add item to shopping cart', function() {
    itemList.get(0).element(by.css('.buy-now-button')).click();
    expect(myCartItems.count()).toEqual(1);
  });

  xit('should display a total cost of 0 upon loading', function() {
    var total = $('#total-value').getText();
    expect(total).toEqual('0');
  });

  xit('should display a total cost based on the cost of each individual item', function() {
    itemList.get(0).element(by.css('.buy-now-button')).click();
    var total = $('#total-value').getText();
    expect(total).toEqual('99')
  });

  xit('should allow user to remove item from their cart', function() {
    itemList.get(0).element(by.css('.buy-now-button')).click();
    myCartItems.get(0).element(by.css('.remove-item-button')).click();
    expect(myCartItems.count()).toEqual(0);
  });

  xit('should update total if user removes item from their cart', function() {
    itemList.get(0).element(by.css('.buy-now-button')).click();
    myCartItems.get(0).element(by.css('.remove-item-button')).click();
    var total = $('#total-value').getText();
    expect(total).toEqual('0');
  });

  xit('should contain a form to add a voucher code', function() {
    expect(element(by.id('voucher-input-form')).isPresent()).toBe(true);
  });

  xit('should allow user to save £5 if they use the SAVE5 voucher code', function() {
    itemList.get(0).element(by.css('.buy-now-button')).click();
    element(by.id('voucher-input-form')).sendKeys('SAVE5');
    element(by.id('apply-voucher-button')).click();
    var total = $('#total-value').getText();
    expect(total).toEqual('94');
  });

  xit('should allow user to save £10 if they use the SAVE10 voucher code', function() {
    itemList.get(0).element(by.css('.buy-now-button')).click();
    element(by.id('voucher-input-form')).sendKeys('SAVE10');
    element(by.id('apply-voucher-button')).click();
    var total = $('#total-value').getText();
    expect(total).toEqual('89');
  });

  xit('should prevent user from using SAVE10 voucher if their total is not at least £50', function() {
    itemList.get(1).element(by.css('.buy-now-button')).click();
    element(by.id('voucher-input-form')).sendKeys('SAVE10');
    element(by.id('apply-voucher-button')).click();
    var total = $('#total-value').getText();
    expect(total).toEqual('42');
  });

  xit('should allow user to save £15 if they use the SAVE15 voucher code', function() {
    itemList.get(0).element(by.css('.buy-now-button')).click();
    element(by.id('voucher-input-form')).sendKeys('SAVE15');
    element(by.id('apply-voucher-button')).click();
    var total = $('#total-value').getText();
    expect(total).toEqual('84');
  });

  xit('should only allow user to save £15 if they use the SAVE15 voucher code and their total is more than £75', function() {
    itemList.get(1).element(by.css('.buy-now-button')).click();
    element(by.id('voucher-input-form')).sendKeys('SAVE15');
    element(by.id('apply-voucher-button')).click();
    var total = $('#total-value').getText();
    expect(total).toEqual('42');
  });

  xit('should only allow user to save £15 if they use the SAVE15 voucher code and they have a footwear item in their cart', function() {
    itemList.get(5).element(by.css('.buy-now-button')).click();
    element(by.id('voucher-input-form')).sendKeys('SAVE15');
    element(by.id('apply-voucher-button')).click();
    var total = $('#total-value').getText();
    expect(total).toEqual('167');
  });

  xit('should show an error message if a user inputs the wrong voucher code', function() {
    itemList.get(0).element(by.css('.buy-now-button')).click();
    element(by.id('voucher-input-form')).sendKeys('RANDOMCODE');
    element(by.id('apply-voucher-button')).click();
    expect(element(by.css('.voucher-code-error')).isPresent()).toBe(true);
  });

  xit('should show a success message if a user inputs valid voucher code', function() {
    itemList.get(0).element(by.css('.buy-now-button')).click();
    element(by.id('voucher-input-form')).sendKeys('SAVE5');
    element(by.id('apply-voucher-button')).click();
    expect(element(by.css('.voucher-code-success')).isPresent()).toBe(true);
  });

  xit('should reset total to zero if user removes all item(s) from cart after applying a voucher code', function() {
    itemList.get(0).element(by.css('.buy-now-button')).click();
    element(by.id('voucher-input-form')).sendKeys('SAVE5');
    element(by.id('apply-voucher-button')).click();
    var totalBeforeItemRemoved = $('#total-value').getText();
    expect(totalBeforeItemRemoved).toEqual('94');
    myCartItems.get(0).element(by.css('.remove-item-button')).click();
    var totalAfterItemRemoved = $('#total-value').getText();
    expect(totalAfterItemRemoved).toEqual('0');
  });

  xit('should not allow user to add sold out items to their cart', function() {
    expect(itemList.get(4).element(by.css('.buy-now-button')).isPresent()).toBe(false);
    expect(itemList.get(4).element(by.css('.sold-out-button')).isPresent()).toBe(true);
  });

  xit('should update number of items available if user adds item to cart', function() {
    itemList.get(0).element(by.css('.buy-now-button')).click();
    expect(itemList.get(0).element(by.css('.item-quantity')).getText()).toEqual('4');
  });

  xit('should update number of items available if user adds and then removes an item from their cart', function() {
    itemList.get(0).element(by.css('.buy-now-button')).click();
    expect(itemList.get(0).element(by.css('.item-quantity')).getText()).toEqual('4');
    myCartItems.get(0).element(by.css('.remove-item-button')).click();
    expect(itemList.get(0).element(by.css('.item-quantity')).getText()).toEqual('5');
  });

  describe('sort by drop down menu', function() {

    it('should have a sort by drop down menu', function() {
      expect(element(by.id('sort-by-dropdown-menu')).isPresent()).toBe(true);
    });

    it('should have three filter options', function() {
      expect(sortByOptionsList.count()).toEqual(3);
    });

    it('should allow user to sort by alphabetical order', function() {
      element(by.cssContainingText('option', 'Alphabetical Order')).click();
      expect(itemList.get(0).element(by.css('.item-name')).getText()).toEqual('Almond Toe Court Shoes');
      expect(itemList.get(12).element(by.css('.item-name')).getText()).toEqual('Suede Shoes');
    });

    it('should allow user to sort by price from lowest to highest', function() {
      element(by.cssContainingText('option', 'Price: Lowest to Highest')).click();
      expect(itemList.get(0).element(by.css('.item-name')).getText()).toEqual('Flip Flops');
      expect(itemList.get(12).element(by.css('.item-name')).getText()).toEqual('Mid Twist Cut-Out Dress');
    });

    it('should allow user to sort by price from highest to lowest', function() {
      element(by.cssContainingText('option', 'Price: Highest to Lowest')).click();
      expect(itemList.get(0).element(by.css('.item-name')).getText()).toEqual('Mid Twist Cut-Out Dress');
      expect(itemList.get(12).element(by.css('.item-name')).getText()).toEqual('Flip Flops');
    });

  });


});
