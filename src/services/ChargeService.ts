import { PaymentType } from '@prisma/client';
import type { AsaasCustomer } from '../@types/asaas/Costumer';
import { paymentGateway } from '../config/paymentGatewayApi';
import { ChargeNotFoundException } from '../exceptions/ChargeNotFoundException';
import { CostumerNotFoundException } from '../exceptions/CostumerNotFoundException';
import { EmailOrDocumentAlredyUsedException } from '../exceptions/EmailOrDocumentAlredyUsedException';
import { prisma } from '../lib/prisma';
import { CreateChargeRequest } from '../utils/validators/charges';
import type {
	CreateCostumerRequest,
	UpdateCostumerRequest,
} from '../utils/validators/costumers';
import { AsaasCharge } from '../@types/asaas/Charge';

export const ChargeService = {
	async getCharges() {
		const charges = await prisma.charge.findMany({
			omit: {
				asaasChargeId: true,
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
		});

		const charge = await prisma.charge.create({
			data: {
				amount: chargeData.amount,
				currency: chargeData.currency,
				paymentType: chargeData.paymentType,
				asaasChargeId: asaasCharge.data.id,
				dueDate: new Date(chargeData.dueDate),
				customerId: costumer.id,
				...(chargeData.paymentType === PaymentType.CREDIT_CARD && {
					installments: chargeData.installments,
				}),
			},
			omit: {
				asaasChargeId: true,
			},
		});

		return charge;
	},

	// async updateCostumer(costumerId: number, costumeData: UpdateCostumerRequest) {
	// 	const costumerExists = await prisma.customer.findUnique({
	// 		where: {
	// 			id: costumerId,
	// 		},
	// 	});

	// 	if (!costumerExists) {
	// 		throw new CostumerNotFoundException();
	// 	}

	// 	const emailOrDocumentAlredyUses = await prisma.customer.findFirst({
	// 		where: {
	// 			OR: [{ email: costumeData.email }, { document: costumeData.document }],
	// 			NOT: {
	// 				id: costumerId,
	// 			},
	// 		},
	// 	});

	// 	if (emailOrDocumentAlredyUses) {
	// 		throw new EmailOrDocumentAlredyUsedException();
	// 	}

	// 	const costumer = await prisma.customer.update({
	// 		where: {
	// 			id: costumerId,
	// 		},
	// 		data: {
	// 			name: costumeData.name,
	// 			email: costumeData.email,
	// 			document: costumeData.document,
	// 		},
	// 	});

	// 	await paymentGateway.put(`/customers/${costumer.asaasCustomerId}`, {
	// 		name: costumeData.name,
	// 		cpfCnpj: costumeData.document,
	// 		email: costumeData.email,
	// 	});

	// 	const { asaasCustomerId, ...safeData } = costumer;

	// 	return safeData;
	// },

	// async deleteCostumer(id: number) {
	// 	const costumer = await prisma.customer.delete({
	// 		where: {
	// 			id,
	// 		},
	// 	});

	// 	if (!costumer) {
	// 		throw new CostumerNotFoundException();
	// 	}

	// 	await paymentGateway.delete(`/customers/${costumer.asaasCustomerId}`);

	// 	const { asaasCustomerId, ...safeData } = costumer;

	// 	return safeData;
	// },
};
