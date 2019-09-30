"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pdf_controller_1 = require("./pdf.controller");
const express_1 = require("express");
const router = express_1.Router();
router.post('/from-url', pdf_controller_1.PdfController.fromURL);
router.post('/from-template-path', pdf_controller_1.PdfController.fromTemplatePath);
router.post('/from-template-html', pdf_controller_1.PdfController.fromTemplateHTML);
// router.get('/multiple',  PdfController.multiplePages);
exports.default = router;
//# sourceMappingURL=pdf.routes.js.map