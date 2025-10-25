import type { Request, Response } from 'express';
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
				AsaasService.receivePayment(payment);
				break;
			}
			case 'PAYMENT_OVERDUE': {
				const payment = body.payment;
				AsaasService.overduePayment(payment);
				break;
			}
			case 'PAYMENT_CREDIT_CARD_CAPTURE_REFUSED': {
				const payment = body.payment;
				AsaasService.failedPayment(payment);
				break;
			}
			case 'PAYMENT_REPROVED_BY_RISK_ANALYSIS': {
				const payment = body.payment;
				AsaasService.failedPayment(payment);
				break;
			}
			case 'PAYMENT_UPDATED': {
				const payment = body.payment;
				AsaasService.updateCharge(payment);
				break;
			}
			case 'PAYMENT_DELETED': {
				const payment = body.payment;
				AsaasService.deleteCharge(payment);
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
