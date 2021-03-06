
/**
 * Module dependencies.
 */

var express = require('express')
  , routes  = require('./routes')
  , meal    = require('./routes/meal')
  , http    = require('http')
  , path    = require('path')
  , gzippo  = require('gzippo');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('production', function() {
  app.use(express.static(path.join(__dirname, 'public')));
})

app.get('/', routes.index);
app.get('/api/meals.json', meal.list);
app.post('/api/meals.json', meal.create);
app.get('/api/meals/:id.json', meal.show);
app.put('/api/meals/:id.json', meal.update);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

// Socket.io configuration
var io  = require('socket.io').listen(server);

// Allow easy switching off of websockets
// via an WEBSOCKETS_DISABLED env var which can
// be easily set with different hosting providers.
if (process.env.WEBSOCKETS_DISABLED == true) {
  io.configure(function () { 
    io.set("transports", ["xhr-polling"]); 
    io.set("polling duration", 10); 
  });
}

io.sockets.on('connection', function (client) {
  console.log("Socket client connected.");

  client.on('updatedMeal', function(data) {
    console.log("Broadcasing meal:" + data);
    client.broadcast.emit('updatedMeal-' + data._id, data);
  });
});
