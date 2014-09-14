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
					'_scripts/common.js',
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
		},
		concat: {
			options: {
				stripBanners: true,
				banner: '<%= banner %>'
			},
			all: {
				src: [
					'_scripts/vendor/idangerous.swiper.min.js',
					'_scripts/common.js'
				],
				dest: '_scripts/all.js'
			}
		},
		jshint: {
			all: ['Gruntfile.js', '_scripts/common.js'],
			options: {
				lastsemic: true,
				strict: false,
				unused: true,
				globals: {
					jQuery: true
				}
			}
		},
		uglify: {
			options: {
				banner: '<%= banner %>',
				warnings: false
			},
			build: {
				files: {
					'_scripts/all.min.js': ['_scripts/all.js']
				}
			}
		},
		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '_svg',
					src: ['**/*.svg'],
					dest: '_svgmin',
					ext: '.min.svg'
				}]
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
	grunt.loadNpmTasks('grunt-svgmin');

	// Tasks
	grunt.registerTask('default', ['sass', 'cssmin', 'jshint', 'concat', 'uglify']);
	grunt.registerTask('svg', ['svgmin']);

};