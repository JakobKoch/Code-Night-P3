var db = require('./database');

db.create();

function ListItem(msg, sig) {
    this.message = msg;
    this.signature = sig;
}

var i = 0;
var data = [new ListItem(i, 'test', 'niko')];

exports.get = function (req, res) {
    var url = require('url'),
        sig = url.parse(req.url, true).query.sig;
    
    db.read(sig, function (err, rows) {
        res.send(JSON.stringify(rows));
    });
};

exports.put = function (req, res) {
    db.update(new ListItem(req.params.msg, req.params.sig), undefined,
              function (err, rows) {
                  if(!err) res.send('table updated successfully');
                  else res.send('there was an error updating the table');
              });
};

exports.delete = function (req, res) {
    var id = req.params.id;
    db.delete(id, function (error) {
        if(!error) res.send(`item with id ${id} successfully deleted`);
        else res.send('could not delete item');
    });
};
