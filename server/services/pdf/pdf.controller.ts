import {Request, Response} from 'express';
import dotenv from 'dotenv';
import {PdfService} from './pdf.service';

dotenv.config();

let HostName;
const PORT = process.env.PORT || 3000;
const Host = process.env.HOST || 'localhost';
if (process.env.NODE_ENV === 'dev') {
   HostName = `http://${Host}:${PORT}`;
}else{
  HostName = Host;
}

console.log(HostName);
console.log("process.env.NODE_ENV", process.env.NODE_ENV);

export class PdfController {
    static fromURL = async (req: Request, res: Response) => {
        let {url, name} = req.body;
        if (!(url || name)) {
            res.sendStatus(400).send();
        }
        //  createPdf(data, name, templateFromURL, templatePath, templateAsHtml)
        const pdfPath = await PdfService.createPdf(null, name, url, null, null);
        res.send({
            status: 'Successfully created PDF file',
            downloadPath: `${HostName}/${pdfPath}`
        })
    };


    static fromTemplatePath = async (req: Request, res: Response) => {
        let {name, predefinedTemplate, dataEndpoint} = req.body;
        if (!( name || predefinedTemplate || dataEndpoint)) {
            res.sendStatus(400).send();
        }
        const data = await PdfService.FetchData(dataEndpoint);
        const pdfPath = await PdfService.createPdf(data, name, null,  predefinedTemplate, null);
        res.send({
            status: 'Successfully created PDF file',
            downloadPath: `${HostName}/${pdfPath}`
        })
    };


    static fromTemplateHTML = async (req: Request, res: Response) => {
        let {name, templateAsHTML, dataEndpoint} = req.body;
        if (!( name || templateAsHTML || dataEndpoint)) {
            res.sendStatus(400).send();
        }
        const data = await PdfService.FetchData(dataEndpoint);
        const pdfPath = await PdfService.createPdf(data, name, null , null, templateAsHTML);
        res.send({
            status: 'Successfully created PDF file',
            downloadPath: `${HostName}/${pdfPath}`
        })
    };



    // static generatePdf = async (url, fileName) => {
    //     const browser = await puppeteer.launch({
    //         defaultViewport: null,
    //         headless: true,
    //     });
    //
    //     const page = await browser.newPage();
    //     await page.goto(url, {waitUntil: 'networkidle2'});
    //     await page.waitFor(3000);
    //     // await page.type('[name="username"]', 'NUWAN')
    //     // await page.type('[name="password"]', 'PASSWORD')
    //     // await page.click('[type="submit"]')
    //     //await page.waitForNavigation();
    //     //await page.waitFor(3000);
    //
    //     // await page.setViewport({
    //     //     width: 1280,
    //     //     height: 2000,
    //     //     deviceScaleFactor: 2
    //     // });
    //
    //
    //     const name = `public/${fileName}-${new Date().getTime()}.pdf`;
    //
    //     await page.pdf({
    //         path: name,
    //         format: 'A4',
    //         printBackground: true,
    //         preferCSSPageSize: true
    //     });
    //     await page.close();
    //     console.info('Yes we printed the page');
    //     await browser.close();
    // }
}

export default PdfController;
