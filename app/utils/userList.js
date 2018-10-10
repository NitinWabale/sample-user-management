var database = require("./db");
var wrapper = require('co-mysql');
var co = require('co');

const registerUser = (userData) => co(function* handleRequest() {
    var pool = database.connection,
        p = wrapper(pool);
    yield p.query('INSERT INTO Users SET ?', userData);
    return {};
}).catch((err) => {
    throw err;
});

const retrieveUsers = () => co(function* handleRequest() {
    var pool = database.connection,
        p = wrapper(pool);
    var row = yield p.query('SELECT * FROM Users');
    return row;
}).catch((err) => {
    throw err;
});
module.exports = {
    retrieveUsers,
    registerUser,
};