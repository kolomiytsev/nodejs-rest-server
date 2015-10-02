var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongo       = require('./app/models/db'),
    url         = require('./config/db').url;

// config files
var port = process.env.PORT || 5999;

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
    console.log('%s - %s %s', new Date().toISOString(), req.method, req.url);
    next();
});

// start app
mongo.connect(url, function() {
    console.log('Connected to mongo');
    require('./app/routes')(app);
    app.listen(port, function() {

    });
});
