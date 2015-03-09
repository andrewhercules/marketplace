describe('marketplaceAppController', function() {

   var $httpBackend, $rootScope, $scope, createController, authRequestHandler;

   var mockData = [{ name: "Almond Toe Court Shoes", colour: "Patent Black", category: "Women’s Footwear", cost: 99.00, quantityInStock: 5}]

   beforeEach(module('marketplaceApp'));

   beforeEach(inject(function($injector) {
     $httpBackend = $injector.get('$httpBackend');
     authRequestHandler = $httpBackend.when('GET', '/api').respond(mockData);
     $rootScope = $injector.get('$rootScope');
     var $controller = $injector.get('$controller');
     createController = function() {
       return $controller('marketplaceAppController', {'$scope' : $rootScope });
     };
   }));

   afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

   it('should initiate an $http.get request from /api and respond with data', function() {
     $httpBackend.expectGET('/api');
     var controller = createController();
     $httpBackend.flush();
     expect($rootScope.inventoryData).toEqual(mockData)
   });

 });
