/*

 #####                              ######
#     #  ####   ####  #    # #####  #     #  ####  #    #
#       #    # #    # #    # #    # #     # #    #  #  #
 #####  #      #    # #    # #    # #     # #    #   ##
      # #      #    # #    # #####  #     # #    #   ##
#     # #    # #    # #    # #   #  #     # #    #  #  #
 #####   ####   ####   ####  #    # ######   ####  #    #

ScourDox 3.0 development branch

Copyright 2014 Emil Hemdal <emil(at)hemdal(dot)se>
Copyright 2014 Landstinget Dalarna Bibliotek och informationscentral <webmaster(dot)lasarettsbiblioteken(at)ltdalarna(dot)se>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.


To run this program you first need Node.js installed on your
computer/server. Then you need to run node like this: 'node server.js'.

*/

"use strict";

var express 		= require("express"),
	EGS 			= require("egs"),
	cookieParser 	= require('cookie-parser'),
	//serveStatic 	= require('serve-static'),
	uaParser 		= require('ua-parser');

var ADMIN 			= require('./modules/admin.js'),
	ERROR 			= require('./modules/error.js');

var app 			= express();

app.enable('trust proxy') // DISABLE if you don't use NGINX or Apache in front of node.js!!
   .use(cookieParser())
   //.use(serveStatic('public/'));

var router = express.Router();

router.use(function(req, res, next) {
	next();
	/*return;
	var d = new Date(Date.now()+3600*1000).toUTCString();
	res.writeHead(200, {'Set-Cookie': "test=test; Expires="+d+"; path=/; HttpOnly", "Content-Type": "text/plain; charset=UTF-8"});
	res.end("Hello World!\n");
	console.log(req.headers);*/
});

router.all("/admin", function(req, res, next) {
	ADMIN.run(req, res, next);
});

router.get("/", function(req, res, next) {
	console.log("GET /");
	var text = "Main";
	res.writeHead(200, {"Content-Length": text.length, "Content-Type": "text/plain; charset=UTF-8"});
	res.end(text);
	next();
	return;
	app.render('index.egs', {"name": "data", "title": "Titel"}, function(err, html) {
		if(err) {
			ERROR.render(res, err);
		}
		if(!html) {
			res.writeHead(200, "Nope!", {"Content-Length": "Nope!".length, "Content-Type": "text/plain; charset=UTF-8"});
			res.end("Nope!");
		} else {
			res.writeHead(200, "It works!", {"Content-Length": html.length, "Content-Type": "text/html; charset=UTF-8"});
			res.end(html);
		}
		next();
	});
});

app.use(router);
app.listen(5000);
console.log("SERVER STARTED!");



