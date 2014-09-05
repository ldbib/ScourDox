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

exports.render = function(res, err) {
	console.error("Render error ["+new Date(Date.now()).toUTCString()+"]:");
	console.error(err);
	res.writeHead(500, "Rendering error!", {"Content-Type": "text/plain; charset=UTF-8"});
	res.end("Servern har problem att visa denna sida. Kontakta administratören på webmaster.lasarettsbiblioteken@ltdalarna.se\n"+
		"The server has issues displaying this page. Please contact the administrator at webmaster.lasarettsbiblioteken@ltdalarna.se\n");
};