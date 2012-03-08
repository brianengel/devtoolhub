function HomeController() {
    
    var navBuilderReq = require('../models/NavigationBuilder');
    var navBuilder = new navBuilderReq.NavigationBuilder();
    
    this.index = function(req, res, next) {
        var navigationLinks = navBuilder.getNavigation(req.path);
        res.render('home/index', { nav: navigationLinks });
    }
    
    this.about = function(req, res, next) {
        var navigationLinks = navBuilder.getNavigation(req.path);
        res.render('home/about', { title : "About", nav: navigationLinks });
    }
};

exports.HomeController = HomeController;
