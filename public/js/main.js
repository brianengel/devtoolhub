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
		},
		calculateCharacters: function() {
			this.set("characterCount", this.get("text").length);
		}
	});

	// Define our views
	var StatBlock = Backbone.View.extend({
		render: function() {
			stats = new TextStats()
			$(this.el).html(this.renderTemplate("template-stat", 
			{
				"characterCount" : this.model.get("characterCount")
			}));
			return this;
		}
	});

	var Editor = Backbone.View.extend({
		events: {
			"keyup .editor": "updateStats"
		},
		render: function() {
			
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



	var mainText = new TextArea();
	var mainStatsView = new Editor({el: $('#main-editor')});
	mainStatsView.render();
});