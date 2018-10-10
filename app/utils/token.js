var database = require("./db");
var wrapper = require('co-mysql');
var co = require('co');

const createToken = (tokenData) => co(function* handleRequest() {
    var pool = database.connection,
        p = wrapper(pool);
    yield p.query('insert into token set ?', tokenData);
    const data = yield p.query('select * from token where id=?', tokenData.id);
    return data;
}).catch((err) => {
    throw err;
});

const retrieveTokens = () => co(function* handleRequest() {
    var pool = database.connection,
        p = wrapper(pool);
    var rows = yield p.query('select *  from token');
    return rows;
}).catch((err) => {
    throw err;
});

const revokeToken = (status, id) => co(function* handleRequest() {
    var pool = database.connection,
        p = wrapper(pool);
        yield p.query('UPDATE token SET status=? where id=?',[status, id]);
        const data = yield p.query('select * from token where id=?', id);
        return data;
}).catch((err) => {
    throw err;
});

module.exports = {
    createToken,
    retrieveTokens,
    revokeToken
};