import {
    handleCors,
    handleBodyRequestParsing,
    handleCompression,
    handleHelmet,
    handleMorgan,
} from './common';
import {handleApiDoc} from './apiDocs';

export default [
    handleCors,
    handleBodyRequestParsing,
    handleCompression,
    handleApiDoc,
    handleHelmet,
    handleMorgan,
];
