/* jshint curly: true, eqeqeq: true, immed: true, indent: 4, latedef: true, noarg: true, nonbsp: true, nonew: true, undef: true, unused: vars, strict: true, asi: true, eqnull: true, browser: true, devel: true, jquery: true */
/* global Ember */

(function() {
	"use strict";

	if(window.navigator.appVersion.indexOf("MSIE 8.0") !== -1) {
		document.getElementsByTagName("body")[0].innerHTML = "<h1>Internet Explorer 8 stödjs inte!</h1>";
		return;
	} else if(window.navigator.appVersion.indexOf("MSIE 7.0") !== -1) {
		document.getElementsByTagName("body")[0].innerHTML = "<h1>Internet Explorer 7 stödjs inte!</h1>";
		return;
	} else if(window.navigator.appVersion.indexOf("MSIE 6.0") !== -1) {
		document.getElementsByTagName("body")[0].innerHTML = "<h1>Internet Explorer 6 stödjs inte!</h1>";
		return;
	}

	// Ember begin

	var App = Ember.Application.create({});

	// Ember Router

	App.Router.map(function() {
		this.resource("login", { path: "/login" });
	});

	App.IndexRoute = Ember.Route.extend({
		model: function() {
			return ["red", "yellow", "blue"];
		}
	});

	App.LoginRoute = Ember.Route.extend({
		model: function() {
			return ["red", "yellow", "blue"];
		}
	});

	$.get("/ember/admin/login.hbs?v=3.0.0", function(data, textStatus, jqXHR) {
		Ember.TEMPLATES.login = Ember.Handlebars.compile(data);
		App.Login = Ember.View.create({
			templateName: "login"
		});
		Ember.Route("login").activate();
		/*Ember.View.create({
			templateName: "login"
		}).append();*/
	});
}());
