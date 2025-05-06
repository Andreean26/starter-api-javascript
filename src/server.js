require('dotenv').config();

const APP_NAME = process.env.APP_NAME || 'starter-api';
const NODE_ENV = process.env.NODE_ENV || 'development';
const HOST = process.env.APP_HOST || 'localhost';
const PORT = parseInt(process.env.APP_PORT, 10) || 3002;

const App = require('./app');

const AppInstance = new App();
const server = AppInstance.GetServer();

server.listen(PORT, HOST, () => {
    console.log(`  [${APP_NAME}] Started on http://${HOST}:${PORT} in ${NODE_ENV} mode.`);

    if (NODE_ENV === 'production') {
        console.log = () => {}; 
    }
});