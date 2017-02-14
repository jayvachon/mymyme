'use strict';

var spaces = require('./spaces');
var things = require('./things');

function getSpaces() {
	return spaces.data().spaces;
}

function getThings() {
	return things.data().things;
}

module.exports = {
	spaces: getSpaces,
};