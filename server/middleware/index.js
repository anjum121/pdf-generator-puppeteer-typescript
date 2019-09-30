"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const apiDocs_1 = require("./apiDocs");
exports.default = [
    common_1.handleCors,
    common_1.handleBodyRequestParsing,
    common_1.handleCompression,
    apiDocs_1.handleApiDoc,
    common_1.handleHelmet,
    common_1.handleMorgan,
];
//# sourceMappingURL=index.js.map