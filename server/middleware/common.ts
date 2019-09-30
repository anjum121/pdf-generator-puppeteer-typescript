import {Router} from 'express';
import cors from 'cors';
import parser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';

import * as logger from 'morgan';
// import * as fs from 'fs';
// import * as path from 'path';

export const handleCors = (router: Router) => {
    router.use(cors({credentials: true, origin: true}));
};

export const handleBodyRequestParsing = (router: Router) => {
    router.use(parser.urlencoded({extended: true}));
    router.use(parser.json());
};

export const handleCompression = (router: Router) => {
    router.use(compression());
};

export const handleHelmet = (router: Router) => {
    router.use(helmet());
};

export const handleMorgan = (router: Router) => {
   // router.use(logger.default('dev'));
    //   const accessLogStream = fs.createWriteStream(
    //     path.join(__dirname, 'access.log'),
    //     { flags: 'a' }
    //   );
    console.log("ooo---");
       router.use(logger.default('combined'));
};
