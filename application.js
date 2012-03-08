// Add express
var express = require('express');
var application = express.createServer();

// Add our routing file
var routing = require('./routing');
var router = new routing.Router(application);
router.registerRoutes();

// Add our configuration file
var configuration = require('./configuration');
var manager = new configuration.ConfigurationManager(application);
var settings = manager.configure();

// Start up the web app
application.listen(3000);
