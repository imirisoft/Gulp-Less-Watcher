"use strict";
var gulp = require('gulp'),
	less = require('gulp-less'),
	path = require('path'),
	argv = require('yargs').argv,
	watch = require('gulp-watch'),
	Basic, s;

Basic = {
	settings: {
		fileName: './less/style.less',
		sourceDir: '**/*.less',
		destination: './less'
	},
	init: function() {
		s = this.settings;
	},
	extend: function(default_opt,custom_opt) {
		// Similar to jQuery extend
		let i, opt = {};
		for(i in default_opt) {
			if(i) {
				opt[i] = (custom_opt[i])?custom_opt[i]:default_opt[i];
			}
		}
		return opt;
	},
	compile: function(opt) {
		// fileName can have with directory structure
	  return gulp.src(opt.fileName)
	  	.pipe(less())
	  	.pipe(gulp.dest(opt.destination));
	}
};

// Initiate the settings
Basic.init();

gulp.task('watch', function() {
	var opt = Basic.extend(Basic.settings,argv);
	watch(opt.sourceDir, function() {
		Basic.compile(opt);
	});
})
// Assign tasks
.task('default', ['watch']);