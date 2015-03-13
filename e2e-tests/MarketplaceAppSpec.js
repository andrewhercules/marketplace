describe('Marketplace App', function() {

  beforeEach(function() {
    browser.get('http://127.0.0.1:3000/');
    itemList = element.all(by.css('.item-feature'));
    shoppingCartItems = element.all(by.css('.cart-item'));
    sortByOptionsList = element(by.id('sort-by-dropdown-menu')).all(by.tagName('option'));
    filterOptionsList = element(by.id('filter-dropdown-menu')).all(by.tagName('option'));
  });

  describe('on loading', function() {

    it('should have a title of Marketplace', function() {
      expect(browser.getTitle()).toEqual('Marketplace');
    });

    it('should have a list of all 13 items for sale', function() {
      expect(itemList.count()).toEqual(13);
    });

    it('should have a "Filter ..." drop down menu', function() {
      expect(element(by.id('filter-dropdown-menu')).isPresent()).toBe(true);
    });

    it('should have a "Sort by ..." drop down menu', function() {
      expect(element(by.id('sort-by-dropdown-menu')).isPresent()).toBe(true);
    });

    it('should have a Shopping Cart Total of 0', function() {
      var total = element(by.id('shopping-cart-total-amount')).getText();
      expect(total).toEqual('0');
    });

    it('should have a "Buy Now!"" button if item is in stock', function() {
      expect(itemList.get(0).element(by.css('.buy-now-button')).isPresent()).toBe(true);
    });

    it('should have a "Sold Out!" button if item is NOT in stock', function() {
      expect(itemList.get(6).element(by.css('.sold-out-button')).isPresent()).toBe(true);
    });

    it('should contain a form to add a voucher code', function() {
      expect(element(by.id('voucher-code-input-form')).isPresent()).toBe(true);
    });

  });

});
