"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const path = require('path');
const utils_1 = require("./utils/");
const middleware_1 = __importDefault(require("./middleware"));
// import routes from './services';
// import errorHandlers from './middleware/errorHandlers';
const routes_1 = __importDefault(require("./routes"));
process.on('uncaughtException', (e) => {
    console.log(e);
    process.exit(1);
});
process.on('unhandledRejection', (e) => {
    console.log(e);
    process.exit(1);
});
(() => __awaiter(this, void 0, void 0, function* () {
    console.log('Server ==');
    const startServer = () => {
        const router = express_1.default();
        //http://localhost:3000/status this will show you applicaiton status
        //router.use(require('express-status-monitor')());
        utils_1.applyMiddleware(middleware_1.default, router);
        router.use('/api/v1/', routes_1.default);
        express_1.default.static(__dirname + './public');
        router.use('/public/pdf', express_1.default.static(path.join(__dirname, './../public/pdf')));
        const { PORT = 3000, Host = 'localhost' } = process.env;
        const server = http.createServer(router);
        server.listen(PORT, () => {
            console.log(`Server is running at http://${Host}:${PORT}`);
        });
    };
    yield Promise.all([startServer()]);
    // await conn.close();
    // console.log('PG connection closed.');
}))();
//# sourceMappingURL=main.js.map