describe('Marketplace App', function() {

  beforeEach(function() {
    browser.get('http://127.0.0.1:3000/');
  });

  it('should have a title of Marketplace', function() {
    expect(browser.getTitle()).toEqual('Marketplace');
  });

});
