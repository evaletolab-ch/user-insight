var express = require('express');

var server = express();
import { MailchimpInsight } from './server/Mailchimp';

server.use(function (req, res, next) {
	res.set('Access-Control-Allow-Origin', '*');
	res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Accept');
	next();
});

server.use(express.static('build/dev')); //or build/dev for production
// routes
server.use('*', function (req, res) {
	res.sendFile(__dirname + '/build/dev/index.html');//or build/dev for production
});

server.listen(3000, function () {
	console.log('Server started');
});


