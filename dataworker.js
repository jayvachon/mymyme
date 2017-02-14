'use strict';

var fs = require('fs');
var js = require('jsonfile');

var data = {};

function getData(key) {
	return data[key];
}

function loadData(location, key, cb) {
	js.readFile(location, function(err, obj) {
		if (err) {
			return cb(err, null);
		}
		data[key] = obj;
		cb(null, obj);
	});
}

function init(location, key, initial, cb) {
	fs.access(location, fs.constants.R_OK | fs.constants.W_OK, function(err) {
		if (err) {
			if (err.code === "ENOENT") {
				fs.writeFile(location, initial, function(err) {
					if (err) {
						return cb(err, null);
					}
					loadData(location, key, cb);
				});
			} else {
				return cb(err, null);
			}
		}
		loadData(location, key, cb);
	});
}

function write(location, key, cb) {
	js.writeFile(location, getData(key), function(err) {
		if (err) {
			return cb(err, null);
		}
		cb(null, getData(key));
	});
}

module.exports = {
	init: init,
	data: getData,
	write: write,
};