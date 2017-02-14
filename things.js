'use strict';

var worker = require('./dataworker');

var location = './data/things.json';

function data() {
	return worker.data('things');
}

function init(cb) {
	worker.init(location, '{ "things": [] }', cb);
}

module.exports = {
	init: init,
	// create: create,
	data: data,
};