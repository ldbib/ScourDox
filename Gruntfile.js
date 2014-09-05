module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		versions: {
			jQuery: "2.1.1",
			Sizzle: "1.10.19",
			Bootstrap: "3.2.0",
			handlebars: "1.3.0",
			Ember: "1.7.0"

		},
		clean: ["build/*"], // Empty the build directory
		concat: {
			options: {
				stripBanners: true, // /* - trimmed /*! - not trimmed
				//banner: "",
				separator: ";\n"
			},
			adminJS: {
				src: [
					'src/public/js/admin.js'
				],
				dest: 'build/public/js/admin.js'
			},
			jquerybootstraphandleemberJS: {
				src: [
					'src/public/js/shared/jquery-2.1.1.js',
					'src/public/js/shared/bootstrap.js',
					'src/public/js/shared/handlebars.runtime-v1.3.0.js',
					'src/public/js/shared/ember.js',
					'src/public/js/shared/ember-data.js'
				],
				dest: 'build/public/js/shared.js'
			},
			loginJS: {
				src: [
					'src/public/js/login.js'
				],
				dest: 'build/public/js/login.js'
			},
			bootstrapCSS: {
				src: [
					'src/public/css/shared/bootstrap.css',
					'src/public/css/shared/bootstrap-theme.css'
				],
				dest: 'build/public/css/bootstrap-all.css'
			}
		},
		cssmin: {
			combine: {
				files: {
					'build/public/css/bootstrap-all.min.css': ['build/public/css/bootstrap-all.css']
				}
			}
		},
		handlebars: {
			compile: {
				options: {
					namespace: "JST"
				},
				files: {
					"build/public/ember/admin.js": "src/public/ember/admin.hbs"
				}
			}
		},
		uglify: {
			options: {
				preserveComments: false,
				mangle: false,
				report: 'min'
			},
			publicJavaScript: {
				options: {
					banner: "/*!\n"+
							" * <%= pkg.name %> - v<%= pkg.version %>\n"+
							" * This file contains\n"+
							" * jQuery v<%= versions.jQuery %>, Sizzle v<%= versions.Sizzle %> (c) 2005, 2014 jQuery Foundation, Inc. (https://jquery.com) MIT license\n"+
							" * Bootstrap v<%= versions.Bootstrap %> (c) 2011-2014 Twitter, Inc. (http://getbootstrap.com) MIT license\n"+
							" * handlebars v<%= versions.handlebars %> (c) 2011 Yehuda Katz (http://handlebarsjs.com/) MIT license\n"+
							" * Ember v<%= versions.Ember %> (c) 2011-2014 Tilde Inc. and contributors, Portions Copyright 2006-2011 Strobe Inc., Portions Copyright 2008-2011 Apple Inc. All rights reserved. (http://emberjs.com/) MIT license\n"+
							" */\n"
				},
				files: [
					{expand: true, cwd: "build/public/js/", src: "**/*.js", dest: "build/public/js/", ext: ".min.js"}
				]
			},
			ember: {
				files: [
					{expand: true, cwd: "build/public/ember/", src: "**/*.js", dest: "build/public/ember/", ext: ".min.js"}
				]
			}
		},
		copy: {
			main: {
				files: [
					{expand: true, cwd: "src/modules/", src: ['*'], dest: 'build/modules/', filter: 'isFile'},
					{expand: true, cwd: "src/", src: ['server.js'], dest: 'build/', filter: 'isFile'},
					{expand: true, cwd: "src/public/html/", src: ['**'], dest: 'build/public/html/'},
					{expand: true, cwd: "src/public/fonts/", src: ['**'], dest: 'build/public/fonts/'}
				]
			}
		},
		compress: {
			gzip: {
				options: {
					mode: 'gzip',
					level: 9
				},
				files: [
					{expand: true, cwd: 'build/public/js/', src: ['**/*'], dest: 'build/public/js-gz/'},
					{expand: true, cwd: 'build/public/css/', src: ['**/*'], dest: 'build/public/css-gz/'},
					{expand: true, cwd: 'build/public/ember/', src: ['**/*'], dest: 'build/public/ember-gz/'},
					{expand: true, cwd: 'build/public/html/', src: ['**/*'], dest: 'build/public/html-gz/'},
					{expand: true, cwd: 'build/public/fonts/', src: ['**/*'], dest: 'build/public/fonts-gz/'}
				]
			},
			deflate: {
				options: {
					mode: 'deflate'
				},
				files: [
					{expand: true, cwd: 'build/public/js/', src: ['**/*'], dest: 'build/public/js-deflate/'},
					{expand: true, cwd: 'build/public/css/', src: ['**/*'], dest: 'build/public/css-deflate/'},
					{expand: true, cwd: 'build/public/ember/', src: ['**/*'], dest: 'build/public/ember-deflate/'},
					{expand: true, cwd: 'build/public/html/', src: ['**/*'], dest: 'build/public/html-deflate/'},
					{expand: true, cwd: 'build/public/fonts/', src: ['**/*'], dest: 'build/public/fonts-deflate/'}
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.loadNpmTasks('grunt-contrib-handlebars');

	grunt.loadNpmTasks('grunt-contrib-compress');

	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['clean', 'concat', 'handlebars', 'uglify', 'cssmin', 'copy', 'compress']);
};