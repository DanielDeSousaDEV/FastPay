import { Router } from 'express';
import { ChargeController } from '../controllers/ChargeController';

const ChargesRoutes = Router();

ChargesRoutes.get('/charges', ChargeController.index);
ChargesRoutes.get('/charges/:id', ChargeController.show);
// ChargesRoutes.post('/charges', ChargeController.create);
// ChargesRoutes.put('/charges/:id', ChargeController.update);
// ChargesRoutes.patch('/charges/:id', ChargeController.update);
// ChargesRoutes.delete('/charges/:id', ChargeController.delete);

export default ChargesRoutes;
