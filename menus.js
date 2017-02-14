'use strict';

var chalk 		= require('chalk'),
	clear 		= require('clear'),
	CLI			= require('clui'),
	inquirer 	= require('inquirer'),
	confirm		= require('inquirer-confirm'),
	menu		= require('inquirer-menu'),
	_			= require('lodash'),
	validUrl 	= require('valid-url'),
	figlet		= require('figlet'),

	data		= require('./data'),
	logger		= require('./logger');

var thingName = 'plop';
var currentSpace = '';

function customClear() {
	clear();
	logger.log(
		chalk.magenta(
			figlet.textSync('my.my.me', { horizontalLayout: 'full' })
		)
	);
	if (currentSpace !== '') {
		logger.log(chalk.yellow(figlet.textSync('/ ' + currentSpace)))
	}
}

// main

function main(cb) {

	customClear();

	inquirer.prompt(
		[
			{
				type: 'list',
				name: 'action',
				message: 'What would you like to do?',
				choices: [
					{ name: 'Go to space', value: 'goto' },
					{ name: 'Create space', value: 'create' },
					{ name: 'Exit', value: 'exit' }
				]
			}
		]
	).then(function(c) {
		switch(c.action) {
			case 'goto':
				return gotoSpace(cb);
			case 'create':
				return createSpace(cb);
			case 'exit':
				return;
		}
	});
}

// Space

function space(name, cb) {

	customClear();

	inquirer.prompt(
		[
			{
				type: 'list',
				name: 'action',
				message: 'What would you like to do?',
				choices: [
					{ name: 'Browse ' + thingName + 's', value: 'browse' },
					{ name: 'Add a ' + thingName, value: 'add' },
					{ name: 'Back', value: 'back' }
				]
			}
		]
	).then(function(c) {
		switch(c.action) {
			case 'back':
				currentSpace = '';
				return cb(null, null, 'back', 'choose-space');
			case 'add':
				return addThing(cb);
			case 'browse':
				return browseThings(cb);
		}
	});
}

function createSpace(cb) {

	customClear();

	var questions = [
		{
			type: 'input',
			name: 'name',
			message: 'Enter a name for the space:',
			validate: function(val) {
				if (val && val.length > 0) {
					return true;
				} else {
					return 'Please enter a name';
				}
			},
		}
	];

	inquirer.prompt(questions).then(function(answers) {
		confirm('All good?')
			.then(function confirmed() {
				cb(null, 'Created a new space called ' + answers.name, 'create_space', answers);
			}, function cancelled() {
				cb(null, 'Cancelled', 'back');
			});
	});
}

function gotoSpace(cb) {

	customClear();

	var choices = _.map(data.spaces(), function(n) { return { name: n.name }})
	choices.push({ name: 'Back', value: 'back' });

	inquirer.prompt(
		[
			{
				type: 'list',
				name: 'goto',
				message: 'Choose a space:',
				choices: choices
			}
		]
	).then(function(c) {
		if (c.goto === 'back') {
			return cb(null, null, 'back');
		}
		currentSpace = c.goto;
		cb(null, 'Going to space ' + c.goto, 'goto_space', c.goto);
	});
}

// Thing

function addThing(cb) {

	customClear();

	var questions = [
		{
			type: 'list',
			name: 'type',
			message: 'Choose what type of ' + thingName + ' this is',
			choices: [
				{ name: 'Website', value: 'website' },
				{ name: 'File', value: 'file' },
				{ name: 'Cancel', value: 'back' },
			]
		},
	];
	inquirer.prompt(questions).then(function(c) {
		switch(c.type) {
			case 'back':
				return cb(null, null, 'back');
			case 'website':
				return addWebsite(cb);
			case 'file':
				return addFile(cb);
		}
	});
}

function addWebsite(cb) {

	customClear();

	var questions = [
		{
			type: 'input',
			name: 'name',
			message: 'Name',
			validate: function(val) {
				if (val && val.length > 0) {
					return true;
				} else {
					return 'Please enter a name';
				}
			},
		},
		{
			type: 'input',
			name: 'url',
			message: 'URL',
			validate: function(val) {
				if (validUrl.isUri(val))
					return true;
				else
					return 'Please enter a valid URL';
			},
		}
	];
	inquirer.prompt(questions).then(function(c) {
		confirm('All good?')
			.then(function confirmed() {
				cb(null, 'Created website ' + thingName, 'create-website', c);
			})
			.then(function cancelled() {
				cb(null, 'Cancelled', 'back', 'space');
			});
	});
}

function addFile(cb) {

}

function browseThings(cb) {

}

module.exports = {
	main: main,
	space: space,
};