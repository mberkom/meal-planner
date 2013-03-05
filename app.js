
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
  app.use(gzippo.staticGzip(path.join(__dirname, 'public')));
})

app.get('/', routes.index);
app.get('/api/meals.json', meal.list);
app.post('/api/meals.json', meal.create);
app.get('/api/meals/:id.json', meal.show);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
