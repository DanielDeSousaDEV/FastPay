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

export const AsaasService = {
	async createCharge(chargeData: AsaasCharge) {
		const costumer = await prisma.customer.findUnique({
			where: {
				asaasCustomerId: chargeData.customer,
			},
		});

		if (!costumer) {
			throw new CostumerNotFoundException();
		}

		const chargeAlredyCreated = await prisma.charge.findUnique({
			where: {
				asaasChargeId: chargeData.id
			}
		})

		if (chargeAlredyCreated) {
			return chargeAlredyCreated;
		}

		const charge = await prisma.charge.create({
			data: {
				amount: chargeData.value,
				currency: 'BRL',
				paymentType: chargeData.billingType,
				asaasChargeId: chargeData.id,
				dueDate: new Date(chargeData.dueDate),
				customerId: costumer.id,
				invoiceUrl: chargeData.invoiceUrl,
				...(chargeData.billingType === PaymentType.CREDIT_CARD && {
					installments: chargeData.installmentNumber,

					...(chargeData.installmentNumber && {
						asaasInstallmentId: chargeData.installment
					})
				}),
			},
			omit: {
				asaasChargeId: true,
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

		return charge;
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

		const asaasCharge = await paymentGateway.get<AsaasCharge>(
			`/payments/${charge.asaasChargeId}`,
		);

		if (asaasCharge.data.installment) {
			await paymentGateway.delete(
				`/installments/${asaasCharge.data.installment}`,
			);
		} else {
			await paymentGateway.delete(`/payments/${charge.asaasChargeId}`);
		}

		return charge;
	},
};
