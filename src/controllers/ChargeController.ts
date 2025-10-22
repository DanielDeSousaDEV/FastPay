import type { Request, Response } from 'express';
import { CostumerIdSchema } from '../utils/validators/costumers';
import { ChargeService } from '../services/ChargeService';
import {
	ChargeIdSchema,
	CreateChargeRequest,
	UpdateChargeRequest,
} from '../utils/validators/charges';

export const ChargeController = {
	async index(req: Request, res: Response) {
		const charges = await ChargeService.getCharges();

		return res.json({
			message: 'Cobranças carregadas com sucesso',
			charges,
		});
	},

	async show(req: Request, res: Response) {
		const { id } = CostumerIdSchema.parse(req.params);

		const charge = await ChargeService.getCharge(id);

		return res.json({
			message: 'Cobrança carregada com sucesso (incluindo suas Cobranças)',
			charge,
		});
	},

	async create(req: Request, res: Response) {
		const chargeData = CreateChargeRequest.parse(req.body);

		const charge = await ChargeService.createCharge(chargeData);

		return res.json({
			message: 'Cobrança criada com sucesso',
			charge,
		});
	},

	async update(req: Request, res: Response) {
		const chargeData = UpdateChargeRequest.parse(req.body);
		const { id: chargerId } = ChargeIdSchema.parse(req.params);

		const charge = await ChargeService.updateCharge(chargerId, chargeData);

		return res.json({
			message: 'Cobrança atualizada com sucesso',
			charge,
		});
	},

	async delete(req: Request, res: Response) {
		const { id: chargeId } = ChargeIdSchema.parse(req.params);

		const charge = await ChargeService.deleteCharge(chargeId);

		return res.json({
			message: 'Cobrança deletada com sucesso',
			charge,
		});
	},
};
