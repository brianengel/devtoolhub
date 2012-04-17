function ToolsController() {

    var navBuilderReq = require('../models/NavigationBuilder');
    var navBuilder = new navBuilderReq.NavigationBuilder();
    
    this.text = function(req, res, next) {
        var navigationLinks = navBuilder.getNavigation(req.path);
        res.render('tools/text', 
        { 
            nav: navigationLinks,
            title: "Text Tools",
            description: "A great way to pick up basic stats and information about a " +
                "block of text."
        });
    }

    this.json = function(req, res, next) {
        var navigationLinks = navBuilder.getNavigation(req.path);
        res.render('tools/json', 
        { 
            nav: navigationLinks,
            title: "Json Validator",
            description: "Every web developer needs to validate and prettify some JSON at " +
                "some point. I wasn't happy with the solutions out there, so I made one with " +
                "immediate feed back, syntax highlighting and spacing options."
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
            title: "Map",
            description: "Does it drive anyone else mad that its hard to find coordinates on " + 
                "google maps? Yeah, me too. This site strives to fix that and aff other " +
                "awesome quick and useful features."
        })
    }


}

exports.ToolsController = ToolsController;