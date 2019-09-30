"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrroHandler = __importStar(require("../utils/ErrorHandler"));
const handle404Error = (route) => {
    route.use((req, res) => {
        ErrroHandler.notFoundError();
    });
};
const handleClientError = (route) => {
    route.use((err, req, res, next) => {
        ErrroHandler.clientError(err, res, next);
    });
};
const handleServerError = (route) => {
    route.use((err, req, res, next) => {
        ErrroHandler.serverError(err, res, next);
    });
};
exports.default = [handle404Error, handleClientError, handleServerError];
//# sourceMappingURL=errorHandlers.js.map