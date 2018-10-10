process.env.SERVICE_NAME = 'sample-user-management';
const server = require('./http/server').listen();

process.on('SIGTERM', () => {
    server.close(() => {
        process.exit(0);
    });
});
