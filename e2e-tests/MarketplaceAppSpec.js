describe('Marketplace App', function() {

  beforeEach(function() {
    browser.get('http://127.0.0.1:3000/');
    itemList = element.all(by.css('.item-feature'));
    myCartItems = element.all(by.css('.cart-item'))
  });

  it('should have a title of Marketplace', function() {
    expect(browser.getTitle()).toEqual('Marketplace');
  });

  it('should have a search form', function() {
    expect(element(by.id('search-input-form')).isPresent()).toBe(true);
  });

  it('should have a list of all 13 items for sale', function() {
    expect(itemList.count()).toEqual(13);
  });

  it('should allow user to add item to shopping cart', function() {
    itemList.get(0).element(by.css('.buy-now-button')).click();
    expect(myCartItems.count()).toEqual(1);
  });

  it('should display a total cost of 0 upon loading', function() {
    var total = $('#total-value').getText();
    expect(total).toEqual('0');
  });

  it('should display a total cost based on the cost of each individual item', function() {
    itemList.get(0).element(by.css('.buy-now-button')).click();
    var total = $('#total-value').getText();
    expect(total).toEqual('99')
  });

  it('should allow user to remove item from their cart', function() {
    itemList.get(0).element(by.css('.buy-now-button')).click();
    myCartItems.get(0).element(by.css('.remove-item-button')).click();
    expect(myCartItems.count()).toEqual(0);
  });

  it('should update total if user removes item from their cart', function() {
    itemList.get(0).element(by.css('.buy-now-button')).click();
    myCartItems.get(0).element(by.css('.remove-item-button')).click();
    var total = $('#total-value').getText();
    expect(total).toEqual('0');
  });

});
