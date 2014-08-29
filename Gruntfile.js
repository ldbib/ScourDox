module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: ["build/*"], // Empty the build directory
		concat: {
			options: {
				stripBanners: true, // /* - trimmed /*! - not trimmed
				//banner: "",
				separator: ";\n"
			},
			admin: {
				src: [
					'src/public/js/admin.js'
				],
				dest: 'build/public/js/admin.js'
			},
			jquerybootstraphandleember: {
				src: [
					'src/public/js/shared/jquery-2.1.1.js',
					'src/public/js/shared/bootstrap.js',
					'src/public/js/shared/handlebars.runtime-v1.3.0.js',
					'src/public/js/shared/ember.js',
					'src/public/js/shared/ember-data.js'
				],
				dest: 'build/public/js/shared.js'
			},
			login: {
				src: [
					'src/public/js/login.js'
				],
				dest: 'build/public/js/login.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('default', ['clean', 'concat']);
};