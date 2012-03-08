function ConfigurationManager(application) {

    var express = require('express');

    function global() {
        application.use(express.bodyParser());
        application.use(express.methodOverride());
        application.set('view engine', 'jade');
        application.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
        application.use(express.static(__dirname + '/public'));
    }
    
    function development() {
        console.log("Running development...");
        application.use(express.errorHandler({ dumpExceptions:true, showStack:true }));
    }
    
    function production() {
        console.log("Running development...");
        application.use(express.errorHandler());
    }

    this.configure = function() {
        application.configure(global);
        application.configure('development', development);
        application.configure('production', production);
    }
}


exports.ConfigurationManager = ConfigurationManager;
