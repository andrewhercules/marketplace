describe('Marketplace App', function() {

  beforeEach(function() {
    browser.get('http://127.0.0.1:3000/');
    itemList = element.all(by.css('.item-feature'));
    shoppingCartItems = element.all(by.css('.cart-item'));
  });

  describe('Shopping Cart', function() {

    describe('adding items feature', function() {

      it('should allow user to add an item to their shopping cart', function() {
        itemList.get(0).element(by.css('.buy-now-button')).click();
        expect(shoppingCartItems.count()).toEqual(1);
      });

      it('should update cart total if user adds an item to their cart', function() {
        itemList.get(0).element(by.css('.buy-now-button')).click();
        var total = element(by.id('shopping-cart-total-amount')).getText();
        expect(total).toEqual('99');
      });

      it('should update number of items available if user adds an item to their cart', function() {
        itemList.get(0).element(by.css('.buy-now-button')).click();
        expect(itemList.get(0).element(by.css('.item-quantity')).getText()).toEqual('4');
      });

      it('should not allow user to add sold out items to their cart as Buy Now! button becomes Sold Out! button', function() {
        itemList.get(0).element(by.css('.buy-now-button')).click();
        itemList.get(0).element(by.css('.buy-now-button')).click();
        itemList.get(0).element(by.css('.buy-now-button')).click();
        itemList.get(0).element(by.css('.buy-now-button')).click();
        itemList.get(0).element(by.css('.buy-now-button')).click();
        expect(itemList.get(0).element(by.css('.buy-now-button')).isPresent()).toBe(false);
        expect(itemList.get(0).element(by.css('.sold-out-button')).isPresent()).toBe(true);
      });

    });

    describe('removing items feature', function() {

      it('should allow user to remove an item from their cart', function() {
        itemList.get(0).element(by.css('.buy-now-button')).click();
        expect(shoppingCartItems.count()).toEqual(1);
        shoppingCartItems.get(0).element(by.css('.remove-item-button')).click();
        expect(shoppingCartItems.count()).toEqual(0);
      });

      it('should update cart total if user removes an item from their cart', function() {
        itemList.get(0).element(by.css('.buy-now-button')).click();
        var totalBeforeItemRemoved = element(by.id('shopping-cart-total-amount')).getText();
        expect(totalBeforeItemRemoved).toEqual('99');
        shoppingCartItems.get(0).element(by.css('.remove-item-button')).click();
        var totalAfterItemRemoved = element(by.id('shopping-cart-total-amount')).getText();
        expect(totalAfterItemRemoved).toEqual('0');
      });

      it('should update number of items available if user adds and then removes an item from their cart', function() {
        itemList.get(0).element(by.css('.buy-now-button')).click();
        expect(itemList.get(0).element(by.css('.item-quantity')).getText()).toEqual('4');
        shoppingCartItems.get(0).element(by.css('.remove-item-button')).click();
        expect(itemList.get(0).element(by.css('.item-quantity')).getText()).toEqual('5');
      });

    });

  });

});
