import { PdfController } from './pdf.controller';
import { Router } from 'express';


const router = Router();
router.post('/from-url', PdfController.fromURL);
router.post('/from-template-path', PdfController.fromTemplatePath);
router.post('/from-template-html', PdfController.fromTemplateHTML);
// router.get('/multiple',  PdfController.multiplePages);
export default router;
