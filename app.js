var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var cmd=require('node-cmd');

app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
	res.render('index.ejs');
});

app.post('/', function(req, res) {
	fs.writeFileSync("data/file.cpp", req.body['file']);
	fs.writeFileSync("data/correct.cpp", req.body['correct']);
	fs.writeFileSync("data/doubt.cpp", req.body['doubt']);	
	fs.writeFileSync('data/inputf.in','');
	fs.writeFileSync('data/correct.txt','');
	fs.writeFileSync('data/doubt.txt','');

	var command = 'cd data && c++ file.cpp && a.exe >> inputf.in';
	console.log(command);
	cmd.run(command, {onDone: function() {
		console.log('coming');
		command = 'c++ correct.cpp && a.exe >> correct.txt < inputf.in';
		command += 'c++ doubt.cpp && a.exe >> doubt.txt < inputf.in'; 
		console.log(command);
		cmd.run(command, {onDone: function() {
			var correct = fs.readFileSync('data/correct.txt').toString();
			var doubt = fs.readFileSync('data/doubt.txt').toString();
			console.log(correct);
			console.log(doubt);
		}});
	}});

	res.render('index.ejs');
});

app.listen(8000, function() {
	console.log('listening on port 8000');
});
