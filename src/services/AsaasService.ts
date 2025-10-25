import { ChargeStatus, PaymentType } from '@prisma/client';
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

	async receivePayment(chargeData: AsaasCharge) {
		const charge = await prisma.charge.findUnique({
			where: {
				asaasChargeId: chargeData.id,
			},
		});

		if (!charge) {
			throw new ChargeNotFoundException();
		}

		const updatedCharge = await prisma.charge.update({
			where: {asaasChargeId: chargeData.id},
			data: {status: ChargeStatus.PAID}
		})

		return updatedCharge;
	},

	async overduePayment(chargeData: AsaasCharge) {
		const charge = await prisma.charge.findUnique({
			where: {
				asaasChargeId: chargeData.id,
			},
		});

		if (!charge) {
			throw new ChargeNotFoundException();
		}

		const updatedCharge = await prisma.charge.update({
			where: {asaasChargeId: chargeData.id},
			data: {status: ChargeStatus.EXPIRED}
		})

		return updatedCharge;
	},

	async failedPayment(chargeData: AsaasCharge) {
		const charge = await prisma.charge.findUnique({
			where: {
				asaasChargeId: chargeData.id,
			},
		});

		if (!charge) {
			throw new ChargeNotFoundException();
		}

		const updatedCharge = await prisma.charge.update({
			where: {asaasChargeId: chargeData.id},
			data: {status: ChargeStatus.FAILED}
		})

		return updatedCharge;
	},

	async updateCharge(chargeData: AsaasCharge) {
		const chargeExists = await prisma.charge.findUnique({
			where: {
				asaasChargeId: chargeData.id,
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
				asaasChargeId: chargeData.id,
			},
			data: {
				amount: chargeData.value,
				currency: 'BRL',
				paymentType: chargeData.billingType,
				dueDate: new Date(chargeData.dueDate),
			},
		});

		return charge;
	},

	async deleteCharge(chargeData: AsaasCharge) {
		const chargeExists = await prisma.charge.findUnique({
			where: {
				asaasChargeId: chargeData.id,
			},
		});

		if (!chargeExists) {
			throw new ChargeNotFoundException();
		}

		const charge = await prisma.charge.delete({
			where: {
				asaasChargeId: chargeData.id,
			},
		});

		if (chargeData.installment) {
			await paymentGateway.delete(
				`/installments/${chargeData.installment}`,
			);
		}

		return charge;
	},
};
