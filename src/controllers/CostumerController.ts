import type { Request, Response } from 'express';
import { CostumerService } from '../services/CostumerService';
import {
	CostumerIdSchema,
	CreateCostumerRequest,
	UpdateCostumerRequest,
} from '../utils/validators/costumers';

export const CostumerController = {
	async index(req: Request, res: Response) {
		const costumers = await CostumerService.getCostumers();

		return res.json({
			message: 'Clientes carregados com sucesso',
			costumers,
		});
	},

	async show(req: Request, res: Response) {
		const { id } = CostumerIdSchema.parse(req.params);

		const costumer = await CostumerService.getCostumer(id);

		return res.json({
			message: 'Cliente carregado com sucesso',
			costumer,
		});
	},

	async create(req: Request, res: Response) {
		const costumerData = CreateCostumerRequest.parse(req.body);

		const costumer = await CostumerService.createCostumer(costumerData);

		return res.json({
			message: 'Cliente criado com sucesso',
			costumer,
		});
	},

	async update(req: Request, res: Response) {
		const costumerData = UpdateCostumerRequest.parse(req.body);
		const { id: costumerId } = CostumerIdSchema.parse(req.params);

		const costumer = await CostumerService.updateCostumer(
			costumerId,
			costumerData,
		);

		return res.json({
			message: 'Cliente atualizado com sucesso',
			costumer,
		});
	},

	async delete(req: Request, res: Response) {
		const { id: costumerId } = CostumerIdSchema.parse(req.params);

		const costumer = await CostumerService.deleteCostumer(costumerId);

		return res.json({
			message: 'Cliente deletado com sucesso',
			costumer,
		});
	},
};
