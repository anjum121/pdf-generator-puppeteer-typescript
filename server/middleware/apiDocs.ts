import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import  * as swaggerDocument from "../config/swagger.json";

export const handleApiDoc = (router: Router) => {
  router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
