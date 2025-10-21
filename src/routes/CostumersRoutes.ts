import { Router } from 'express';
import { CostumerController } from '../controllers/CostumerController';

const CostumersRoutes = Router();

CostumersRoutes.get('/costumers', CostumerController.index);

export default CostumersRoutes;
