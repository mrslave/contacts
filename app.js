var express = require('express');
var mongoose = require('mongoose');
var http = require('http');
var router = require('./routes');

var app = express();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade')
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.directory(__dirname + '/public'));
  app.use(function (req, res, next) {
    throw new Error(req.url + ' not found');
  });
  app.use(function (err, req, res, next){
    console.log(err);
	res.send(err.message);
  })
});

// MongoDB
mongoose.connect('mongodb://127.0.0.1/ContactsDB');
mongoose.connection.on('open', function() {
  console.log('Connected to Mongoose');
});

router(app);

http.createServer(app).listen(3001);
console.log("App listening on port 3001");