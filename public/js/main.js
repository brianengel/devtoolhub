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

    var JsonModel = Backbone.Model.extend({
        defaults: {
            "rawJson": "",
            "message": "",
            "prettifiedJson": "",
            "indentation": 4,
            "isParsed": false
        },
        initialize: function() {

            function parseJson(json) {
                var result = {
                    message: "Valid JSON."
                };

                try {
                    result.value = jsonlint.parse(json);
                } catch(e) {
                    result.message = e.message;
                }

                return result;
            }

            function generateMessage() {
                var result = parseJson(this.get("rawJson"));
                var isParsed = false;
                var prettified = "";

                if(typeof result.value !== "undefined") {
                    var indentInt = parseInt(this.get("indentation"), 10);
                    prettified = JSON.stringify(result.value, null, indentInt);
                    isParsed = true;
                }

                this.set("message", result.message);
                this.set("prettifiedJson", prettified);
                this.set("isParsed", isParsed);
            }

            this.bind("change:rawJson", generateMessage);
            this.bind("change:indentation", generateMessage);
            this.trigger("change:rawJson");
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
        initialize: function() {
            if(typeof this.el !== "undefined"){
                this.render();
            }
        },
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

    var JsonPrettifier = Backbone.View.extend({
        initialize: function() {
            this.model = new JsonModel();
        },
        events: {
            "keyup .editor": "prettifyResult",
            "change .indent-select": "prettifyResult"
        },
        prettifyResult: function() {
            var editorField = $(this.el).find(".editor")[0];
            var resultField = $(this.el).find(".editor-result")[0];
            var statusMessage = $(this.el).find("#json-status")[0];
            var indentation = $(this.el).find(".indent-select").val();

            this.model.set("rawJson", editorField.value);
            this.model.set("indentation", indentation);

            resultField.innerHTML = this.model.get("prettifiedJson");
            prettyPrint();
            statusMessage.innerHTML = this.model.get("message");

            if (this.model.get("isParsed")) {
                $(statusMessage).removeClass("alert-error").addClass("alert-success");
            } else {
                $(statusMessage).removeClass("alert-success").addClass("alert-error");
            }
        },
        render: function() {
            return this;
        }
    });

    new Editor({el: '#main-editor'});
    new JsonPrettifier({el: '#json-content'});
});
