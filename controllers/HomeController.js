function HomeController() {
    
    var navBuilderReq = require('../models/NavigationBuilder');
    var navBuilder = new navBuilderReq.NavigationBuilder();
    
    this.index = function(req, res, next) {
        var navigationLinks = navBuilder.getNavigation(req.path);
        res.render('home/index', 
        { 
            nav: navigationLinks,
            navbar: "home",
            title: "Home"
        });
    }
    
    this.about = function(req, res, next) {
        var navigationLinks = navBuilder.getNavigation(req.path);
        res.render('home/about', 
        { 
            nav: navigationLinks,
            navbar: "about",
            title: "About"
        });
    }
};

exports.HomeController = HomeController;
