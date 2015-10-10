var express = require('express'),
    app = express(),
    htmlRoot = {root: __dirname + '/views'};

var list = require('./list');

app.use('/bower', express.static(__dirname + '/bower_components'));
app.use('/ng', express.static(__dirname + '/ng'));

app.get('/', function (req, res) {
    res.sendFile('index.html', htmlRoot);
});

app.get('/help', function (req, res) {
    res.sendFile('help.html', htmlRoot);
});

app.get('/list', list.get);

app.put('/list/:msg/:sig', list.put);

app.delete('/list/:id', list.delete);

var server = app.listen(3000, function (req, res) {
    var host = server.address().address,
        port = server.address().port;
    console.log('server running at http://%s:%s', host, port);
});
