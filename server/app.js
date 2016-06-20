/**
 * Main application file
 */

'use strict';

import express from 'express';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');
import config from './config/environment';
import http from 'http';

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function (err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// Populate databases with sample data
if (config.seedDB) {
  require('./config/seed');
}

// Setup server
var app = express();
var server = http.createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: config.env !== 'production',
  path: '/socket.io-client'
});
require('./config/socketio').default(socketio);
require('./config/express').default(app);
require('./routes').default(app);

// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);

var _ = require('lodash');

//Http requests
var options = {
  "method": "GET",
  "hostname": "localhost",
  "port": config.port,
  "path": "/api/sensors",
  "headers": {
    "content-type": "application/json"
  }
};

var optionsPatch = {
  "method": "PATCH",
  "hostname": "localhost",
  "port": config.port,
  "path": "/api/sensors/",
  "headers": {
    "content-type": "application/json"
  }
};

var success = function(res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    var sensors = JSON.parse(body);
    _.forEach(sensors, function(sensor) {
      optionsPatch.path = '/api/sensors/' + sensor._id;
      var req = http.request(optionsPatch, null);
      req.write(JSON.stringify({measures: {value: _.random(10,60), date: new Date()}}));
      req.end();
    });
  });
};

// CronJob
var CronJob = require('cron').CronJob;
new CronJob('*/30 * * * * *', function () {
  console.log('Executing cron job.');
  http.request(options, success).end();
}, function () {
  console.log('Finishing cron job.');
}, true);

// Expose app
exports = module.exports = app;
