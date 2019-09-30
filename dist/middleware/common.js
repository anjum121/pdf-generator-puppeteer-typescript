"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const logger = __importStar(require("morgan"));
// import * as fs from 'fs';
// import * as path from 'path';
exports.handleCors = (router) => {
    router.use(cors_1.default({ credentials: true, origin: true }));
};
exports.handleBodyRequestParsing = (router) => {
    router.use(body_parser_1.default.urlencoded({ extended: true }));
    router.use(body_parser_1.default.json());
};
exports.handleCompression = (router) => {
    router.use(compression_1.default());
};
exports.handleHelmet = (router) => {
    router.use(helmet_1.default());
};
exports.handleMorgan = (router) => {
    // router.use(logger.default('dev'));
    //   const accessLogStream = fs.createWriteStream(
    //     path.join(__dirname, 'access.log'),
    //     { flags: 'a' }
    //   );
    console.log("ooo---");
    router.use(logger.default('combined'));
};
