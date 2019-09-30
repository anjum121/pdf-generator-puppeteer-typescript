import {Router} from 'express';
import auth from '../services/pdf/pdf.routes';

const routes = Router();
routes.use('/pdf', auth);
export default routes;
