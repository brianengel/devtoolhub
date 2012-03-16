function NavigationBuilder() {

    var nav = [
        {
            title: "Tools",
            links: [
                {
                    title: "Text Tools",
                    url: "/tools/text"
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
