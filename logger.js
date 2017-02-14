'use strict';

var chalk = require('chalk');
var log = console.log;

var logger = {

	log: function(msg) {
		log(msg);
	},

	info: function(msg) {
		log('\n' + chalk.green('>> ' + msg) + '\n');
	},

	warning: function(msg) {
		log('\n' + chalk.yellow('Warning: ' + msg) + '\n');
	},

	error: function(msg) {
		log('\n' + chalk.red('Error: ' + msg) + '\n');
	},
};

module.exports = logger;