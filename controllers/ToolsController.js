function ToolsController() {

    var navBuilderReq = require('../models/NavigationBuilder');
    var navBuilder = new navBuilderReq.NavigationBuilder();
    
    this.text = function(req, res, next) {
        var navigationLinks = navBuilder.getNavigation(req.path);
        res.render('tools/text', 
        { 
            nav: navigationLinks
        });
    }


}

exports.ToolsController = ToolsController;