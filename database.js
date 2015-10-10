var sql = require('sqlite3'),
    fs  = require('fs'),
    db  = new sql.Database('./data.db');

var createQuery =
        'CREATE TABLE IF NOT EXISTS challenge ' +
        '(id INTEGER PRIMARY KEY, message TEXT, signature TEXT)',
    insertQuery =
        'INSERT INTO challenge (message, signature)' +
        'VALUES ($message, $signature)',
    updateQuery =
        'UPDATE challenge SET message = $message, signature = $signature' +
        'WHERE id = $id',
    selectAllQuery =
        'SELECT id, message, signature FROM challenge',
    selectQuery =
        'SELECT * FROM challenge WHERE signature LIKE $signature',
    deleteQuery =
        'DELETE FROM challenge WHERE id = $id';

/**
 * Creates the database
 */
exports.create = function () {
    db.run(createQuery);
};

/**
 * Reads from the database
 */
exports.read = function (sig, callback) {
    if (sig) db.all(selectQuery, {$signature: sig + '%'}, callback);
    else db.all(selectAllQuery, callback);
};

/**
 * Updates the database
 */
exports.update = function (item, id, callback) {
    console.log(item);
    db.serialize(function () {
        if (id) db.run(updateQuery, {
            $message: item.message,
            $signature: item.signature,
            $id: id
        }, callback);
        else db.run(insertQuery, {
            $message: item.message,
            $signature: item.signature
        }, callback);
    });
};

/**
 * Deletes data from the database
 */
exports.delete = function (id, callback) {
    db.run(deleteQuery, {$id: id}, callback);
};

exports.close = function () {
    db.close();
};
