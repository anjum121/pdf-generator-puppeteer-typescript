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
const handlebars = __importStar(require("handlebars"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const fs = require("fs");
const path = require("path");
class PdfService {
    static FetchData(endPoint) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield node_fetch_1.default(endPoint);
            return yield response.json();
        });
    }
    static createPdf(data, name, templateFromURL, templatePath, templateAsHtml) {
        return __awaiter(this, void 0, void 0, function* () {
            let template;
            const browser = yield puppeteer_1.default.launch({
                args: ['--no-sandbox'],
                defaultViewport: null,
                headless: true
            });
            let options = {
                width: '1230px',
                headerTemplate: "<p>Test</p>",
                footerTemplate: "<p>Footer test</p>",
                displayHeaderFooter: false,
                margin: {
                    top: "10px",
                    bottom: "30px"
                },
                printBackground: true,
                path: null
            };
            const page = yield browser.newPage();
            if (templateFromURL !== null) {
                options.path = `./public/pdf/${name}-${new Date().getTime()}.pdf`;
                yield page.goto(templateFromURL, {
                    waitUntil: 'networkidle0'
                });
            }
            else {
                if (templateAsHtml !== null) {
                    template = handlebars.compile(templateAsHtml);
                }
                else {
                    let templateHtml = fs.readFileSync(path.join(process.cwd(), `./public/templates/${templatePath}/template.html`), 'utf8');
                    template = handlebars.compile(templateHtml);
                }
                let html = template({ data: data });
                options.path = `./public/pdf/${name}-${new Date().getTime()}.pdf`;
                html = html.replace(/\s{2,}/g, '') // <-- Replace all consecutive spaces, 2+
                    .replace(/%/g, '%25') // <-- Escape %
                    .replace(/&/g, '%26') // <-- Escape &
                    .replace(/#/g, '%23') // <-- Escape #
                    .replace(/"/g, '%22') // <-- Escape "
                    .replace(/'/g, '%27'); // <-- Escape ' (to be 100% safe)
                let dataURI = 'data:text/html;charset=UTF-8,' + html;
                yield page.goto(dataURI, {
                    waitUntil: 'networkidle0'
                });
            }
            yield page.pdf(options);
            yield browser.close();
            return options.path;
        });
    }
}
exports.PdfService = PdfService;
