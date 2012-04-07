function ToolsController() {

    var navBuilderReq = require('../models/NavigationBuilder');
    var navBuilder = new navBuilderReq.NavigationBuilder();
    
    this.text = function(req, res, next) {
        var navigationLinks = navBuilder.getNavigation(req.path);
        res.render('tools/text', 
        { 
            nav: navigationLinks,
            title: "Text Tools"
        });
    }

    this.json = function(req, res, next) {
        var navigationLinks = navBuilder.getNavigation(req.path);
        res.render('tools/json', 
        { 
            nav: navigationLinks,
            title: "Json Validator"
        });
    }

    this.overflow = function(req, res, next) {
        var navigationLinks = navBuilder.getNavigation(req.path);
        res.render('tools/overflow',
        {
            nav: navigationLinks,
            title: "Overflow"
        });
    }

    this.map = function(req, res, next) {
        var navigationLinks = navBuilder.getNavigation(req.path);
        res.render('tools/map',
        {
            nav: navigationLinks,
            title: "Map"
        })
    }


}

exports.ToolsController = ToolsController;