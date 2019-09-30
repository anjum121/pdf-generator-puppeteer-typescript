"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pdf_service_1 = require("./pdf.service");
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const Host = process.env.HOST || 'localhost';
class PdfController {
}
exports.PdfController = PdfController;
PdfController.fromURL = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { url, name } = req.body;
    if (!(url || name)) {
        res.sendStatus(400).send();
    }
    //  createPdf(data, name, templateFromURL, templatePath, templateAsHtml)
    const pdfPath = yield pdf_service_1.PdfService.createPdf(null, name, url, null, null);
    res.send({
        status: 'Successfully created PDF file',
        downloadPath: `http://${Host}:${PORT}/${pdfPath}`
    });
});
PdfController.fromTemplatePath = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, predefinedTemplate, dataEndpoint } = req.body;
    if (!(name || predefinedTemplate || dataEndpoint)) {
        res.sendStatus(400).send();
    }
    const data = yield pdf_service_1.PdfService.FetchData(dataEndpoint);
    const pdfPath = yield pdf_service_1.PdfService.createPdf(data, name, null, predefinedTemplate, null);
    res.send({
        status: 'Successfully created PDF file',
        downloadPath: `http://${Host}:${PORT}/${pdfPath}`
    });
});
PdfController.fromTemplateHTML = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, templateAsHTML, dataEndpoint } = req.body;
    if (!(name || templateAsHTML || dataEndpoint)) {
        res.sendStatus(400).send();
    }
    const data = yield pdf_service_1.PdfService.FetchData(dataEndpoint);
    const pdfPath = yield pdf_service_1.PdfService.createPdf(data, name, null, null, templateAsHTML);
    res.send({
        status: 'Successfully created PDF file',
        downloadPath: `http://${Host}:${PORT}/${pdfPath}`
    });
});
exports.default = PdfController;
