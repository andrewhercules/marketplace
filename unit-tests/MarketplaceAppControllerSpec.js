describe('marketplaceAppController', function() {

   var $httpBackend, $rootScope, $scope, createController, authRequestHandler;

   var mockData = [{ name: "Almond Toe Court Shoes", colour: "Patent Black", category: "Women's Footwear", cost: 99.00, quantityInStock: 5}]

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

   it('should initiate an $http.get request from /api and respond with data object', function() {
     $httpBackend.expectGET('/api');
     var controller = createController();
     $httpBackend.flush();
     expect($rootScope.inventoryData).toEqual(mockData);
   });

   it('data object should contain an item name', function() {
     $httpBackend.expectGET('/api');
     var controller = createController();
     $httpBackend.flush();
     expect($rootScope.inventoryData[0]['name']).toEqual('Almond Toe Court Shoes');
   });

   it('data object should contain an item colour', function() {
     $httpBackend.expectGET('/api');
     var controller = createController();
     $httpBackend.flush();
     expect($rootScope.inventoryData[0]['colour']).toEqual('Patent Black');
   });

   it('data object should contain an item category', function() {
     $httpBackend.expectGET('/api');
     var controller = createController();
     $httpBackend.flush();
     expect($rootScope.inventoryData[0]['category']).toEqual("Women's Footwear");
   });

   it('data object should contain an item cost', function() {
     $httpBackend.expectGET('/api');
     var controller = createController();
     $httpBackend.flush();
     expect($rootScope.inventoryData[0]['cost']).toEqual(99.00);
   });

   it('data object should contain a quantity of items in stock', function() {
     $httpBackend.expectGET('/api');
     var controller = createController();
     $httpBackend.flush();
     expect($rootScope.inventoryData[0]['quantityInStock']).toEqual(5);
   });



 });
