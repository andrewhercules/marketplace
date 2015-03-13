describe('Marketplace App', function() {

  beforeEach(function() {
    browser.get('http://127.0.0.1:3000/');
    itemList = element.all(by.css('.item-feature'));
    shoppingCartItems = element.all(by.css('.cart-item'));
  });

  describe('Voucher Codes', function() {

    it('should allow user to save £5 if they use the SAVE5 voucher code', function() {
      itemList.get(0).element(by.css('.buy-now-button')).click();
      element(by.id('voucher-code-input-form')).sendKeys('SAVE5');
      element(by.id('apply-voucher-button')).click();
      var total = element(by.id('shopping-cart-total-amount')).getText();
      expect(total).toEqual('94');
    });

    it('should allow user to save £10 if they use the SAVE10 voucher code and their cart total is at least £50', function() {
      itemList.get(0).element(by.css('.buy-now-button')).click();
      element(by.id('voucher-code-input-form')).sendKeys('SAVE10');
      element(by.id('apply-voucher-button')).click();
      var total = element(by.id('shopping-cart-total-amount')).getText();
      expect(total).toEqual('89');
    });

    it('should prevent user from using SAVE10 voucher code if their total is not at least £50', function() {
      itemList.get(2).element(by.css('.buy-now-button')).click();
      element(by.id('voucher-code-input-form')).sendKeys('SAVE10');
      element(by.id('apply-voucher-button')).click();
      var total = element(by.id('shopping-cart-total-amount')).getText();
      expect(total).toEqual('30');
    });

    it('should allow user to save £15 if they use the SAVE15 voucher code, their cart total is more than £75, and they added an item from the footwear category to their cart', function() {
      itemList.get(0).element(by.css('.buy-now-button')).click();
      element(by.id('voucher-code-input-form')).sendKeys('SAVE15');
      element(by.id('apply-voucher-button')).click();
      var total = element(by.id('shopping-cart-total-amount')).getText();
      expect(total).toEqual('84');
    });

    it('should prevent user from using SAVE15 voucher code if their total is not more than £75', function() {
      itemList.get(2).element(by.css('.buy-now-button')).click();
      element(by.id('voucher-code-input-form')).sendKeys('SAVE15');
      element(by.id('apply-voucher-button')).click();
      var total = element(by.id('shopping-cart-total-amount')).getText();
      expect(total).toEqual('30');
    });

    it('should prevent user from using SAVE15 voucher code if they have not added a footwear item to their cart', function() {
      itemList.get(1).element(by.css('.buy-now-button')).click();
      element(by.id('voucher-code-input-form')).sendKeys('SAVE15');
      element(by.id('apply-voucher-button')).click();
      var total = element(by.id('shopping-cart-total-amount')).getText();
      expect(total).toEqual('270');
    });

    it('should show an error message if a user inputs the wrong voucher code', function() {
      itemList.get(0).element(by.css('.buy-now-button')).click();
      element(by.id('voucher-code-input-form')).sendKeys('RANDOMCODE');
      element(by.id('apply-voucher-button')).click();
      expect(element(by.css('.voucher-code-error')).isPresent()).toBe(true);
    });

    it('should show a success message if a user inputs valid voucher code', function() {
      itemList.get(0).element(by.css('.buy-now-button')).click();
      element(by.id('voucher-code-input-form')).sendKeys('SAVE5');
      element(by.id('apply-voucher-button')).click();
      expect(element(by.css('.voucher-code-success')).isPresent()).toBe(true);
    });

    it('should reset total to zero if user removes all item(s) from cart after applying a voucher code', function() {
      itemList.get(0).element(by.css('.buy-now-button')).click();
      element(by.id('voucher-code-input-form')).sendKeys('SAVE5');
      element(by.id('apply-voucher-button')).click();
      var totalBeforeItemRemoved = element(by.id('shopping-cart-total-amount')).getText();
      expect(totalBeforeItemRemoved).toEqual('94');
      shoppingCartItems.get(0).element(by.css('.remove-item-button')).click();
      var totalAfterItemRemoved = element(by.id('shopping-cart-total-amount')).getText();
      expect(totalAfterItemRemoved).toEqual('0');
    });

  });

});
