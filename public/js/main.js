$(function() {

    // Shamelessly stolen from the SendHub blog entry on backbone.js
    Backbone.View.prototype.renderTemplate = function() {
        var getTemplate = function(id) {
            return Handlebars.compile($("#"+id).html());
        }

        var compiledTemplates = {};

        var fn = function(id, context) {
            if(!_(compiledTemplates).has(id)) {
                compiledTemplates[id] = getTemplate(id);
            }
            return compiledTemplates[id](context);
        }

        return fn;
    }();


    // Define our models
    var TextStats = Backbone.Model.extend({
        defaults: {
            "text" : "",
        },
        initialize: function() {
            this.calculateCharacters();
            this.calculateWords();
        },
        calculateCharacters: function() {
            this.set("characterCount", this.get("text").length);
        },
        calculateWords: function() {
            var words = 0;
            var text = this.get("text").trim();

            if (text.length > 0) {
                words = text.split(' ').length; 
            };

            this.set("wordCount", words);
        }
    });

    // Define our views
    var StatBlock = Backbone.View.extend({
        render: function() {
            $(this.el).html(this.renderTemplate("template-stat", 
            {
                "characterCount": this.model.get("characterCount"),
                "wordCount": this.model.get("wordCount")
            }));
            return this;
        }
    });

    var Editor = Backbone.View.extend({
        events: {
            "keyup .editor": "updateStats"
        },
        render: function() {
            $(this.el).html(this.renderTemplate("template-editor"), {} );
            this.updateStats();
            return this;
        },
        updateStats: function(e) {
            var textField = $(this.el).find(".editor")[0];
            var text = textField.value;
            var statsModel = new TextStats({"text":text});

            var statBlock = $(this.el).find(".stats")[0];
            var statView = new StatBlock({el: statBlock, model: statsModel});
            statView.render();
        }
    });

    var mainStatsView = new Editor({el: '#main-editor'});
    mainStatsView.render();
});