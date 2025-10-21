import type { Request, Response } from 'express';
import {
	CostumerIdSchema,
	CreateCostumerRequest,
	UpdateCostumerRequest,
} from '../utils/validators/costumers';
import { ChargeService } from '../services/ChargeService';

export const ChargeController = {
	async index(req: Request, res: Response) {
		const charges = await ChargeService.getCharges();

		return res.json({
			message: 'Combranças carregadas com sucesso',
			charges,
		});
	},

	async show(req: Request, res: Response) {
		const { id } = CostumerIdSchema.parse(req.params);

		const charge = await ChargeService.getCharge(id);

		return res.json({
			message: 'Combrança carregada com sucesso',
			charge,
		});
	},

	// async create(req: Request, res: Response) {
	// 	const costumerData = CreateCostumerRequest.parse(req.body);

	// 	const costumer = await CostumerService.createCostumer(costumerData);

	// 	return res.json({
	// 		message: 'Cliente criado com sucesso',
	// 		costumer,
	// 	});
	// },

	// async update(req: Request, res: Response) {
	// 	const costumerData = UpdateCostumerRequest.parse(req.body);
	// 	const { id: costumerId } = CostumerIdSchema.parse(req.params);

	// 	const costumer = await CostumerService.updateCostumer(
	// 		costumerId,
	// 		costumerData,
	// 	);

	// 	return res.json({
	// 		message: 'Cliente atualizado com sucesso',
	// 		costumer,
	// 	});
	// },

	// async delete(req: Request, res: Response) {
	// 	const { id: costumerId } = CostumerIdSchema.parse(req.params);

	// 	const costumer = await CostumerService.deleteCostumer(costumerId);

	// 	return res.json({
	// 		message: 'Cliente deletado com sucesso',
	// 		costumer,
	// 	});
	// },
};
