import type { Request, Response } from 'express';
import { CostumerNotFoundException } from '../exceptions/CostumerNotFoundException';

export const CostumerController = {
	index(req: Request, res: Response) {
		throw new CostumerNotFoundException();
		return res.send('adno');
	},
};
