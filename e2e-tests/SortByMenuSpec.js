describe('Marketplace App', function() {

  beforeEach(function() {
    browser.get('http://127.0.0.1:3000/');
    itemList = element.all(by.css('.item-feature'));
    sortByOptionsList = element(by.id('sort-by-dropdown-menu')).all(by.tagName('option'));
  });

  describe('Sort By drop down menu', function() {

    it('should have three options', function() {
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
