/*

Copyright 2014 Emil Hemdal <emil(at)hemdal(dot)se>
Copyright 2014 Landstinget Dalarna Bibliotek och informationscentral <webmaster(dot)lasarettsbiblioteken(at)ltdalarna(dot)se>

This file is part of ScourDox.

ScourDox is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

ScourDox is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with ScourDox.  If not, see <http://www.gnu.org/licenses/>.

*/

"use strict";

var uaParser 	= require('ua-parser'),
	fs 			= require("fs"),
	crypto 		= require("crypto"),
	zlib 		= require('zlib');

var ERROR 		= require("./error.js");

exports.run = function(req, res, next) {
	//console.log(req.headers);
	var ua = uaParser.parse(req.headers["user-agent"]).ua,
		text = "";
	if(ua.family === "IE" && parseInt(ua.major, 10) < 9) {
		text = "Internet Explorer 8 och tidigare versioner av Internet Explorer fungerar inte i admingränsnittet!";
		res.writeHead(200, {"Content-Length": text.length, "Content-Type": "text/plain; charset=UTF-8"});
		return res.end(text);
	}
	if(req.cookies.user === undefined) {
		// Display login screen
		fs.stat("./public/html/admin/login.html", function(err, stats) {
			res.set({
				'Content-Type': 'text/html; charset=utf-8',
				//"Content-Length": stats.size,
				//"ETag": crypto.createHash('md5').update(stats.size+stats.mtime).digest('hex')
			});

			var fileRead = fs.createReadStream("./public/html/admin/login.html", {"encoding": "utf8"})

			/*if(req.get("Accept-Encoding")) {
				var accept = req.get("Accept-Encoding");
				if(accept.match(/\bdeflate\b/)) {
					res.set("content-encoding", "deflate");
					fileRead.pipe(zlib.createDeflate()).pipe(res);
				} else if(accept.match(/\bgzip\b/)) {
					res.set("content-encoding", "gzip");
					fileRead.pipe(zlib.createGzip()).pipe(res);
				} else {
					fileRead.pipe(res);
				}
			} else {*/
				fileRead.pipe(res);
			//}
		});
	} else {
		console.log(req.cookies);
		text = "Test!";
		res.writeHead(200, {"Content-Length": text.length, "Content-Type": "text/plain; charset=UTF-8"});
		res.end(text);
		next();
	}
};
