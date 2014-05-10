module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '/* <%= pkg.name %> / <%= pkg.author %> / <%= grunt.template.today("yyyy-mm-dd") %> */\n',
		watch: {
			gruntfile: {
				files: 'Gruntfile.js',
				tasks: ['default']
			},
			src: {
				files: [
					// 'scripts/common.js',
					// 'scripts/head-common.js',
					// 'scripts/vendor/*.js',
					'_css/scss/*.scss'
				],
				tasks: ['default']
			}
		},
		sass: {
			dist: {
				files: {
					'_css/style.css': '_css/scss/style.scss'
				}
			}
		},
		cssmin: {
			add_banner: {
				options: {
					banner: '<%= banner %>'
				},
				files: {
					'_css/style.min.css': ['_css/style.css']
				}
			}
		}
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Tasks
	grunt.registerTask('default', ['sass', 'cssmin']);

};