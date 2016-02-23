"use strict";
var gulp = require('gulp'),
	less = require('gulp-less'),
	path = require('path'),
	argv = require('yargs').argv,
	watch = require('gulp-watch'),
	colors = require('colors/safe'),
	Basic, s;

Basic = {
	settings: {
		fileName: './less/style.less',
		sourceDir: '**/*.less',
		destination: './css'
	},
	init: function() {
		s = this.settings;
	},
	extend: function(default_opt,custom_opt) {
		// Similar to jQuery extend
		var i, opt = {};
		for(i in default_opt) {
			if(i) {
				opt[i] = (custom_opt[i])?custom_opt[i]:default_opt[i];
			}
		}
		return opt;
	},
	compile: function(opt) {
		// fileName can have with directory structure
		var execution_start_time, execution_end_time,
			total_execution_in_ms;	// ms indicates microseconds
		execution_start_time = new Date().getTime();
	  gulp.src(opt.fileName)
	  	.pipe(less())
	  	.pipe(gulp.dest(opt.destination));
	  	execution_end_time = new Date().getTime();
	  	total_execution_in_ms = colors.red(execution_end_time-execution_start_time);
	  	console.log(`Compiled in ${total_execution_in_ms}ms`);
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