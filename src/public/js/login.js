(function() {
	'use strict';

	if(window.navigator.appVersion.indexOf("MSIE 8.0") !== -1) {
		alert("I adminsidan stödjs Internet Explorer 8 inte!");
	} else if(window.navigator.appVersion.indexOf("MSIE 7.0") !== -1) {
		alert("I adminsidan stödjs Internet Explorer 7 inte!");
	} else if(window.navigator.appVersion.indexOf("MSIE 6.0") !== -1) {
		alert("I adminsidan stödjs Internet Explorer 6 inte!");
	}

	// Ember begin

	var Admin = Ember.Application.create();

	// Ember Router

	Admin.Router.map(function() {
		this.resource('login', { path: '/' });
	});
}());