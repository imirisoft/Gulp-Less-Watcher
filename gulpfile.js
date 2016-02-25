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
	dateTime: function() {
		var date,hours,minutes,ampm,strTime;

		date = new Date();
		hours = date.getHours();
		minutes = date.getMinutes();
		ampm = hours >= 12 ? 'pm' : 'am';

		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? '0'+minutes : minutes;

		strTime = hours + ':' + minutes + ' ' + ampm;
		return date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear() + "  " + strTime;

	},
	compile: function(opt) {
		// fileName can have with directory structure
	  gulp.src(opt.fileName)
	  	.pipe(less())
	  	.pipe(gulp.dest(opt.destination));
	  	console.log(this.dateTime());
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