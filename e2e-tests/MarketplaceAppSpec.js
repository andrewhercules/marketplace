describe('Marketplace App', function() {

  beforeEach(function() {
    browser.get('http://127.0.0.1:3000/');
    itemList = element.all(by.css('.item-feature'));
    myCartItems = element.all(by.css('.cart-item'))
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

  it('should reset total to zero if user removes all item(s) from cart after applying a voucher code', function() {
    itemList.get(0).element(by.css('.buy-now-button')).click();
    element(by.id('voucher-input-form')).sendKeys('SAVE5');
    element(by.id('apply-voucher-button')).click();
    var totalBeforeItemRemoved = $('#total-value').getText();
    expect(totalBeforeItemRemoved).toEqual('94');
    myCartItems.get(0).element(by.css('.remove-item-button')).click();
    var totalAfterItemRemoved = $('#total-value').getText();
    expect(totalAfterItemRemoved).toEqual('0');
  });

});
