describe('Marketplace App', function() {

  beforeEach(function() {
    browser.get('http://127.0.0.1:3000/');
    itemList = element.all(by.css('.item-feature'));
    filterOptionsList = element(by.id('filter-dropdown-menu')).all(by.tagName('option'));
  });

  describe('Filter drop down menu', function() {

    it('should have seven filter options with the first one blank by default', function() {
      expect(filterOptionsList.count()).toEqual(7);
    });

    it("should allow user to only see items in the Women's Footwear category", function() {
      element(by.cssContainingText('option', "Women's Footwear")).click();
      expect(itemList.count()).toEqual(2);
    });

    it("should allow user to only see items in the Men's Footwear category", function() {
      element(by.cssContainingText('option', "Men's Footwear")).click();
      expect(itemList.count()).toEqual(3);
    });

    it("should allow user to only see items in the Women's Casualwear category", function() {
      element(by.cssContainingText('option', "Women's Casualwear")).click();
      expect(itemList.count()).toEqual(2);
    });

    it("should allow user to only see items in the Men's Casualwear category", function() {
      element(by.cssContainingText('option', "Men's Casualwear")).click();
      expect(itemList.count()).toEqual(2);
    });

    it("should allow user to only see items in the Women's Formalwear category", function() {
      element(by.cssContainingText('option', "Women's Formalwear")).click();
      expect(itemList.count()).toEqual(2);
    });

    it("should allow user to only see items in the Men's Formalwear category", function() {
      element(by.cssContainingText('option', "Men's Formalwear")).click();
      expect(itemList.count()).toEqual(2);
    });

  });

});  
