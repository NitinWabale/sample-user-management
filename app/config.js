const dotenv = require('dotenv');

const nodeEnv = process.env.NODE_ENV || 'development';

if (nodeEnv === 'development') {
    dotenv.load();
}

module.exports = {
    SECREATE: 'xxxxxxxxxxxxxxxx',
};