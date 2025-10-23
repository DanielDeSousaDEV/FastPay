import type { Request, Response } from 'express';
import { CostumerIdSchema } from '../utils/validators/costumers';
import { ChargeService } from '../services/ChargeService';
import {
	ChargeIdSchema,
	CreateChargeRequest,
	UpdateChargeRequest,
} from '../utils/validators/charges';
import { asaasWebhookSchema } from '../utils/validators/asaasWebhooks';
import { AsaasService } from '../services/AsaasService';

export const AsaasWebhookController = {
	async handleWebhook(req: Request, res: Response) {
		const body = asaasWebhookSchema.parse(req.body);

		switch (body.event) {
			case 'PAYMENT_CREATED': {
				const payment = body.payment;
				AsaasService.createCharge(payment);
				break;
			}
			case 'PAYMENT_RECEIVED': {
				const payment = body.payment;
				// receivePayment(payment);
				break;
			}
			default: {
				console.log(`Este evento não é aceito ${body.event}`);
			}
		}

		return res.json({
			message: 'Webhook capturado com sucesso',
		});
	},
};
