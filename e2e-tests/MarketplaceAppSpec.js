describe('Marketplace App', function() {

  beforeEach(function() {
    browser.get('http://127.0.0.1:3000/');
    itemList = element.all(by.css('.item-feature'));
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
    var myCartItems = element.all(by.css('.cart-item'))
    expect(myCartItems.count()).toEqual(1);
  });

  it('should display a total cost of 0 upon loading', function() {
    var total = $('#total-value').getText();
    expect(total).toEqual('0');
  });

});
