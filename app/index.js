#!/bin/env node
var express = require('express');
var fs      = require('fs');
var bodyParser = require('body-parser');
var multer = require('multer');
require('shelljs/global');

var server_port = 8080

// Main application.
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/html', express.static(__dirname + '/html/'));
app.use('/css', express.static(__dirname + '/css/'));
app.use('/js', express.static(__dirname + '/js/'));
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	//req.setHeader('Authorization');
	next();
});

app.get('/', function (req, res) {

	machine = {};

	//Get Hostname
	cmd = exec('hostname', {silent:true}).stdout;
	machine.hostname = cmd.split('\n')[0];

	//Get latest user
	cmd = exec("last | grep -v unknown | head -n1 | cut -d' ' -f1", {silent:true}).stdout;
	machine.lastUser = cmd.split('\n')[0];

	//Check if a mouse is connected
	cmd = exec('ls /dev/input/by-path/*-mouse | grep event', {silent:true}).stdout;
	machine.keyboard = cmd != "";

	//Check if a keyboard is connected
	cmd = exec('ls /dev/input/by-path/*-kbd | grep event', {silent:true}).stdout;
	machine.mouse = cmd.split('\n')[0] != "";
 
	res.json(machine);
});

// Start listening.
app.listen(server_port, function(){
  console.log("Listening on server_port " + server_port)
});
