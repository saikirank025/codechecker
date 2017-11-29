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
	fs.writeFile("data/file.cpp", req.body['file']);
	fs.writeFile("data/correct.cpp", req.body['correct']);
	fs.writeFile("data/doubt.cpp", req.body['doubt']);	

	var command = 'echo c++ file.cpp && echo a.exe >> inputf.in';
	cmd.run(command)

	res.render('index.ejs');
});

app.listen(8000, function() {
	console.log('listening on port 8000');
});
