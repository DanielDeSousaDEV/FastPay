import { Router } from 'express';
import { CostumerController } from '../controllers/CostumerController';

const CostumersRoutes = Router();

CostumersRoutes.get('/costumers', CostumerController.index);
CostumersRoutes.get('/costumers/:id', CostumerController.show);
CostumersRoutes.post('/costumers', CostumerController.create);
CostumersRoutes.put('/costumers/:id', CostumerController.update);
CostumersRoutes.patch('/costumers/:id', CostumerController.update);
CostumersRoutes.delete('/costumers/:id', CostumerController.delete);

export default CostumersRoutes;
