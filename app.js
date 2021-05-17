//Sample NodeJS app to illustrate design pattern

'use strict';
//Load configuration fron .env file
require('dotenv').config()

var express = require('express');

var app = express();

app.set('views', 'views');
app.set('view engine', 'jade');

app.get('/', function (req, res) {
	res.render('home', {
	});
});

//1. Sample Consistent Hashing
const ConsistentHashing = require('./1.ConsistentHashing/ConsistentHashing.js');
const ch = new ConsistentHashing();
ch.testModuloOperation();
ch.testModNHashing();
ch.testConsistentHashing();

app.post('/', function (req, res) {
	let eventType = req.body.eventtype;
	let eventData = req.body.eventdata;
	//Note: In real life the EndPoint is retrieved from a Service Registry
	//      not from with a switch/new like below :) 
	switch (eventType) {
		case 'CommodityNodejsPipelineAsCode':
			const nodejsPipeline = new CommodityNodejsPipelineAsCode();
			nodejsPipeline.run(eventData);
			break;

		case 'CommodityAKSPipelineAsCode':
			const aksIaCPipeline = new CommodityAKSPipelineAsCode();
			aksIaCPipeline.run(eventData);
			break;

		case 'SendEvent':
			let eventSource = req.body.eventsource;
			let eventRepository = new EventRepository();
			let destTopics = eventRepository.getTopics(eventSource);

			destTopics.forEach(function (destTopic) {
				eventRepository.sendEvent(destTopic, eventData);
			});
			break;
	}

	console.log(request.body);
});

app.listen(8080);
module.exports.getApp = app;