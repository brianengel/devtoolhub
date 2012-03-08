var homeController = require('./controllers/HomeController');


function Router(application) {

    this.registerRoutes = function() {
        registerHome(application);
    }
}


function registerHome(application) {
    var controller = new homeController.HomeController();
    
    application.get('/', controller.index);
    application.get('/about', controller.about);
}

exports.Router = Router;
