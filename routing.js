var homeController = require('./controllers/HomeController');
var toolsController = require('./controllers/ToolsController')

function Router(application) {

    this.registerRoutes = function() {
        registerHome(application);
        registerTools(application);
    }
}

function registerHome(application) {
    var controller = new homeController.HomeController();
    
    application.get('/', controller.index);
    application.get('/about', controller.about);
}

function registerTools(application) {
	var controller = new toolsController.ToolsController();

	application.get('/tools/text', controller.text);
	application.get('/tools/json', controller.json);
}

exports.Router = Router;
