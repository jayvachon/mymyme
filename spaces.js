'use strict';

var worker = require('./dataworker');
var logger = require('./logger');

var location = './data/spaces.json';

function data() {
	return worker.data('spaces');
}

function init(cb) {
	worker.init(location, 'spaces', '{ "spaces": [] }', cb);
}

function create(name, cb) {
	data().spaces.push({ name: name });
	worker.write(location, 'spaces', cb);
}

module.exports = {
	init: init,
	create: create,
	data: data,
};