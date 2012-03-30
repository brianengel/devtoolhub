function ConfigurationManager(application) {

    var express = require('express');
    var piler = require('piler');
    var pilerJs = piler.createJSManager();

    function bundleJs() {
        pilerJs.bind(application);
        pilerJs.addFile(__dirname + '/public/js/jsonlint.js');
        pilerJs.addFile(__dirname + '/public/js/mustache.js');
        pilerJs.addFile(__dirname + '/public/js/main.js');
    }

    function global() {
        bundleJs();
        application.use(express.bodyParser());
        application.use(express.methodOverride());
        application.set('view engine', 'jade');
        //application.set('view options', {pretty: true})
        application.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
        application.use(express.static(__dirname + '/public'));
    }
    
    function development() {
        console.log("Running development...");
        application.use(express.errorHandler({ dumpExceptions:true, showStack:true }));
    }
    
    function production() {
        console.log("Running production...");
        application.use(express.errorHandler());
    }

    this.configure = function() {
        application.configure(global);
        application.configure('development', development);
        application.configure('production', production);
    }
}


exports.ConfigurationManager = ConfigurationManager;
