## Marketplace

### Introduction

Marketplace is a simple e-commerce website built as part of a technical test for one the UK's leading digital agencies. It's a basic AngularJS app running on a Node.js server and the Express.js framework. The front-end and user interface is basic and uses Bootstrap elements and a modified template found at [StartBootstrap.com](http://startbootstrap.com/).

### Languages/Platforms/Tools

* Node.js
* Express.js
* AngularJS
* Bootstrap
* HTML/CSS

### Learning Outcomes

Having used AngularJS with Ruby and a Sinatra server, I want to build a simple AngularJS app that uses Node.js and Express.js. Surprisingly, I found setting up the server to be very easy and creating a /api route with a JSON object to be just as easy compared to the process with Ruby and Sinatra. Also, although I was initially hesitant about Bootstrap and other similar frameworks, I've come to see that they can be very useful when one wants to quickly prototype an application that has a decent and appealing user interface.

### To-do list

- [x] Create a basic version of the app
- [ ] Investigate ngMessages to show error messages
- [ ] Limit users to using only one voucher code
- [ ] Explore creating a /mycart route
- [ ] Refactor code further (e.g. consider using multiple controllers)

### Instructions

*Note: Prior to downloading my code and running the application locally, please ensure that you [install Node.js](http://nodejs.org/) and  [update NPM](https://docs.npmjs.com/getting-started/installing-node).*

Clone the repository:

```
$ git clone git@github.com:andrewhercules/marketplace.git
```

Install all dependencies via NPM:

```
$ cd marketplace
$ npm install
```

To use the application, start the server and visit ``http://localhost:3000``:

```
$ npm start
$ open http://localhost:3000
```

####Running the Unit and End-to-End Tests

For unit tests, I used Karma and Jasmine to conduct a simple test of Angular's $http GET service request and to mock the response data received from the GET request. For end-to-end tests, I used Protractor and Jasmine to conduct feature tests and overall usability tests.

Prior to running the tests, please ensure that you [install Node.js](http://nodejs.org/), [update NPM](https://docs.npmjs.com/getting-started/installing-node), and install both [Protractor](http://angular.github.io/protractor/#/tutorial) and [Karma](http://karma-runner.github.io/0.12/intro/installation.html) along with the relevant plugins/dependencies listed with their respective installation instructions.

To run the unit tests, use the ``$ karma start`` command.

To run the end-to-end tests, first start the server using ``$ npm start`` and then run ``$ protractor``. Please note that the tests will take approximately 30-45 seconds.
