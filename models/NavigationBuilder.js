function NavigationBuilder() {

    var nav = [
        {
            "title": "Section 1",
            "links": [
                {
                    "title": "Home",
                    "url": "/",
                    "icon": "icon-home"
                },
                {
                    "title": "About",
                    "url": "/home/about",
                    "icon": "icon-book"
                }
            ]
        }
    ]
    
    this.getNavigation = function(active) {
        for(var i = 0; i < nav.length; ++i) {
            for(var j = 0; j < nav[i].links.length; j++) {
                var isActive = false;
                
                if(nav[i].links[j].url === active) {
                    isActive = true;
                }
                
                nav[i].links[j].active = isActive;
            }
        }
        
        return nav;
    }
}

exports.NavigationBuilder = NavigationBuilder;
