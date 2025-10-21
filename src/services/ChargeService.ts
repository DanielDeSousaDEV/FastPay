import type { AsaasCustomer } from '../@types/assas/Costumer';
import { paymentGateway } from '../config/paymentGatewayApi';
import { ChargeNotFoundException } from '../exceptions/ChargeNotFoundException';
import { CostumerNotFoundException } from '../exceptions/CostumerNotFoundException';
import { EmailOrDocumentAlredyUsedException } from '../exceptions/EmailOrDocumentAlredyUsedException';
import { prisma } from '../lib/prisma';
import type {
	CreateCostumerRequest,
	UpdateCostumerRequest,
} from '../utils/validators/costumers';

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

	// async createCostumer(costumeData: CreateCostumerRequest) {
	// 	const emailAlredyUses = await prisma.customer.findUnique({
	// 		where: {
	// 			email: costumeData.email,
	// 		},
	// 	});

	// 	if (emailAlredyUses) {
	// 		throw new EmailOrDocumentAlredyUsedException();
	// 	}

	// 	const assasCostumer = await paymentGateway.post<AsaasCustomer>(
	// 		'/customers',
	// 		{
	// 			name: costumeData.name,
	// 			cpfCnpj: costumeData.document,
	// 			email: costumeData.email,
	// 		},
	// 	);

	// 	const costumer = await prisma.customer.create({
	// 		data: {
	// 			name: costumeData.name,
	// 			email: costumeData.email,
	// 			document: costumeData.document,
	// 			asaasCustomerId: assasCostumer.data.id,
	// 		},
	// 		omit: {
	// 			asaasCustomerId: true,
	// 		},
	// 	});

	// 	return costumer;
	// },

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
