function HomeController() {
    
    var navBuilderReq = require('../models/NavigationBuilder');
    var navBuilder = new navBuilderReq.NavigationBuilder();
    
    this.index = function(req, res, next) {
        var navigationLinks = navBuilder.getNavigation(req.path);
        res.render('home/index', 
        { 
            nav: navigationLinks,
            navbar: "home",
            title: "Home",
            description: "A great collection of software developer oriented tools that are " + 
                "designed to easy to use and provide immediate feedback. You might call it... " +
                "a tool hub? For developers?"
        });
    }
    
    this.about = function(req, res, next) {
        var navigationLinks = navBuilder.getNavigation(req.path);
        res.render('home/about', 
        { 
            nav: navigationLinks,
            navbar: "about",
            title: "About",
            description: "A bit of background on why I decided to create this and some of the " +
                "technologies used."
        });
    }
};

exports.HomeController = HomeController;
