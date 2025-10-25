import { PaymentType } from '@prisma/client';
import { paymentGateway } from '../config/paymentGatewayApi';
import { ChargeNotFoundException } from '../exceptions/ChargeNotFoundException';
import { CostumerNotFoundException } from '../exceptions/CostumerNotFoundException';
import { prisma } from '../lib/prisma';
import type {
	CreateChargeRequest,
	UpdateChargeRequest,
} from '../utils/validators/charges';
import type { AsaasCharge } from '../@types/asaas/Charge';
import { ChargeNotCanUpdated } from '../exceptions/ChargeNotCanUpdated';

export const ChargeService = {
	async getCharges() {
		const charges = await prisma.charge.findMany({
			omit: {
				asaasChargeId: true,
				asaasInstallmentId: true,
			},
		});

		return charges;
	},

	async getCharge(id: number) {
		const charge = await prisma.charge.findUnique({
			where: {
				id,
			},
			omit: {
				asaasChargeId: true,
				asaasInstallmentId: true,
			},
		});

		if (!charge) {
			throw new ChargeNotFoundException();
		}

		return charge;
	},

	async createCharge(chargeData: CreateChargeRequest) {
		const costumer = await prisma.customer.findUnique({
			where: {
				id: chargeData.customerId,
			},
		});

		if (!costumer) {
			throw new CostumerNotFoundException();
		}

		const asaasCharge = await paymentGateway.post<AsaasCharge>('/payments', {
			customer: costumer.asaasCustomerId,
			billingType: chargeData.paymentType,
			value: chargeData.amount,
			dueDate: chargeData.dueDate,
			...(chargeData.paymentType === PaymentType.CREDIT_CARD && {
				installmentCount: chargeData.installments,
				totalValue: chargeData.amount,
			}),
		});

		const charge = await prisma.charge.create({
			data: {
				amount: chargeData.amount,
				currency: chargeData.currency,
				paymentType: chargeData.paymentType,
				asaasChargeId: asaasCharge.data.id,
				dueDate: new Date(chargeData.dueDate),
				customerId: costumer.id,
				invoiceUrl: asaasCharge.data.invoiceUrl,
				...(chargeData.paymentType === PaymentType.CREDIT_CARD && {
					installments: chargeData.installments,

					...(chargeData.installments > 1 && {
						asaasInstallmentId: asaasCharge.data.installment,
					}),
				}),
			},
			omit: {
				asaasChargeId: true,
				asaasInstallmentId: true,
			},
		});

		return charge;
	},

	async updateCharge(chargeId: number, chargeData: UpdateChargeRequest) {
		const chargeExists = await prisma.charge.findUnique({
			where: {
				id: chargeId,
			},
		});

		if (!chargeExists) {
			throw new ChargeNotFoundException();
		}

		if (chargeExists.installments) {
			throw new ChargeNotCanUpdated();
		}

		const charge = await prisma.charge.update({
			where: {
				id: chargeId,
			},
			data: {
				amount: chargeData.amount,
				currency: chargeData.currency,
				paymentType: chargeData.paymentType,
				dueDate: new Date(chargeData.dueDate),
			},
		});

		await paymentGateway.put(`/payments/${charge.asaasChargeId}`, {
			billingType: chargeData.paymentType,
			value: chargeData.amount,
			dueDate: chargeData.dueDate,
		});

		const { asaasChargeId, asaasInstallmentId, ...safeData } = charge;

		return safeData;
	},

	async deleteCharge(id: number) {
		const chargeExists = await prisma.charge.findUnique({
			where: {
				id,
			},
		});

		if (!chargeExists) {
			throw new ChargeNotFoundException();
		}

		const charge = await prisma.charge.delete({
			where: {
				id,
			},
		});

		if (charge.installments && charge.installments > 1) {
			await paymentGateway.delete(`/installments/${charge.asaasInstallmentId}`);
		} else {
			await paymentGateway.delete(`/payments/${charge.asaasChargeId}`);
		}

		const { asaasChargeId, asaasInstallmentId, ...safeData } = charge;

		return safeData;
	},
};
