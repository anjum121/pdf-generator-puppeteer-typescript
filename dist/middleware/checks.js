"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpErrors_1 = require("./../utils/httpErrors");
exports.checkSearchParams = (req, res, next) => {
    if (!req.query.q) {
        throw new httpErrors_1.HTTP400Error('Missing Query parameter');
    }
    else {
        next();
    }
};
