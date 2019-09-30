

import * as http from 'http';
import express from 'express';
import 'reflect-metadata';
const path = require('path');

import {applyMiddleware} from './utils/';
import middleware from './middleware';
// import routes from './services';
// import errorHandlers from './middleware/errorHandlers';

import routes from './routes';

process.on('uncaughtException', (e) => {
    console.log(e);
    process.exit(1);
});

process.on('unhandledRejection', (e) => {
    console.log(e);
    process.exit(1);
});

(async () => {

    console.log('Server ==');

    const startServer = () => {
        const router = express();
        //http://localhost:3000/status this will show you applicaiton status
        //router.use(require('express-status-monitor')());
        applyMiddleware(middleware, router);
        router.use('/api/v1/', routes);

        express.static(__dirname + './public');
        router.use('/public/pdf',express.static(path.join(__dirname, './public/pdf')));

        const {PORT = 3000, Host = 'localhost'} = process.env;
        const server = http.createServer(router);
        server.listen(PORT, () => {
            console.log(`Server is running at http://${Host}:${PORT}`);
        });
    };

    await Promise.all([startServer()]);
    // await conn.close();
    // console.log('PG connection closed.');
})();
