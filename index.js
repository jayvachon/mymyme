#!/usr/bin/env node

/*

TODO:
- navigate to spaces
- add things to spaces:
	- URLs
	- files
	- download yt videos?
- search for things in spaces
- delete things

*/

'use strict';

	// npm packages
var chalk 		= require('chalk'),
	CLI			= require('clui'),
	inquirer 	= require('inquirer'),
	confirm		= require('inquirer-confirm'),
	menu		= require('inquirer-menu'),

	// modules
	spaces		= require('./spaces'),
	menus		= require('./menus'),
	logger		= require('./logger');

function init() {
	spaces.init(function(err) {
		if (err) {
			return logger.error(err);
		}
		showMainMenu();
	});
}

function showMainMenu() {
	menus.main(function(err, msg, action, data) {
		if (err) {
			return logger.error(err);
		}
		if (msg && !action) {
			logger.info(msg);
		}
		switch(action) {
			case 'back':
				return showMainMenu();
			case 'create_space':
				spaces.create(data.name, function(e, d) {
					if (e) { return logger.error(e); }
					logger.info(msg);
					return showMainMenu();
				});
			case 'goto_space':
				return showSpaceMenu(data);
		}
	});
}

function showSpaceMenu(name) {
	menus.space(name, function(err, msg, action, data) {
		if (err) {
			return logger.error(err);
		}
		if (msg && !action) {
			logger.info(msg);
		}
		switch(action) {
			case 'back':
				if (data === 'space')
					return showSpaceMenu();
				return showMainMenu();
			case 'add':
				break;
			case 'browse':
				break;
		}
	});
}

init();