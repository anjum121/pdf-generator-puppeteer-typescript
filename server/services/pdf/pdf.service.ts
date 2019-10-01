import * as handlebars from "handlebars";
import puppeteer from "puppeteer";
import fetch from "node-fetch";
import * as fs from "fs";
import dotenv from "dotenv";

dotenv.config();
const path = require("path");

export class PdfService {

  static async FetchData(endPoint) {
    const response = await fetch(endPoint);
    return await response.json();
  }

  static async createPdf(data, name, templateFromURL, templatePath, templateAsHtml) {

    console.log(`Generating PDF file`);

    let folderPath = `${process.cwd()}/public/pdf/`;
    let fileName = `${name}-${new Date().getTime()}.pdf`;

    fs.mkdir(folderPath, { recursive: true }, err => {
      if (err && err.code != "EEXIST") throw "up";
    });

    let template;
    const browser = await puppeteer.launch({
      args: ["--no-sandbox"],
      defaultViewport: null,
      headless: true
    });
    let options = {
      width: "1230px",
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

    const page = await browser.newPage();

    if (templateFromURL !== null) {
      options.path = `${folderPath}${fileName}`;
      await page.goto(templateFromURL, {
        waitUntil: "networkidle0"
      });

    } else {

      if (templateAsHtml !== null) {
        template = handlebars.compile(templateAsHtml);
      } else {


        let templatesPath ;

        if (process.env.NODE_ENV === 'dev') {
          templatesPath =  path.join(process.cwd(), `./public/templates/${templatePath}/template.html`);
        }else{
          templatesPath =  path.join(process.cwd(), `app/public/templates/${templatePath}/template.html`);
        }

        console.log("templatesPath", templatesPath);

        let templateHtml = fs.readFileSync(templatesPath, "utf8");
        template = handlebars.compile(templateHtml);
      }

      let html = template({ data: data });
      options.path = `${folderPath}${fileName}`;
      html = html.replace(/\s{2,}/g, "")   // <-- Replace all consecutive spaces, 2+
        .replace(/%/g, "%25")     // <-- Escape %
        .replace(/&/g, "%26")     // <-- Escape &
        .replace(/#/g, "%23")     // <-- Escape #
        .replace(/"/g, "%22")     // <-- Escape "
        .replace(/'/g, "%27");    // <-- Escape ' (to be 100% safe)
      let dataURI = "data:text/html;charset=UTF-8," + html;
      await page.goto(dataURI, {
        waitUntil: "networkidle0"
      });
    }

    await page.pdf(options);
    await browser.close();
    return `public/pdf/${fileName}`;
  }

}