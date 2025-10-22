import z from 'zod';
import { PaymentType } from '@prisma/client';

export const ChargeIdSchema = z.object({
	id: z.coerce
		.number('Por favor informe o id da combrança')
		.int('Por favor informe o id da combrança')
		.min(1, 'Por favor informe o id da combrança')
		.positive('Por favor informe o id valído'),
});

const CreateChargeRequestBaseFields = {
	amount: z
		.number('Por favor informe o valor da combrança')
		.positive('Por favor informe o valor da combrança'),
	currency: z
		.string('Por favor informe a moeda da combrança')
		.min(1, 'Por favor informe a moeda da combrança')
		.max(255, 'A moeda da combrança deve ter no máximo 255 caracteres'),
	customerId: z
		.int('Por favor informe cliente da combrança')
		.positive('Por favor informe cliente da combrança'),
	dueDate: z.iso.date('Por favor informe a data de validade da combrança'),
};

const CreatePixChargeRequest = z.object({
	...CreateChargeRequestBaseFields,
	paymentType: z.literal(PaymentType.PIX),
});

const CreatePaymentSlipChargeRequest = z.object({
	...CreateChargeRequestBaseFields,
	paymentType: z.literal(PaymentType.PAYMENT_SLIP),
});

const CreateCreditCardChargeRequest = z.object({
	...CreateChargeRequestBaseFields,
	paymentType: z.literal(PaymentType.CREDIT_CARD),
	installments: z
		.int('A quantidade de parcelas deve ser um número')
		.positive('A quantidade de parcelas deve ser um número positivo'),
});

export const CreateChargeRequest = z.discriminatedUnion(
	'paymentType',
	[
		CreateCreditCardChargeRequest,
		CreatePaymentSlipChargeRequest,
		CreatePixChargeRequest,
	],
	'Informe um metodo de pagamento valído',
);
export type CreateChargeRequest = z.infer<typeof CreateChargeRequest>;
const UpdateChargeRequestBaseFields = {
	amount: z
		.number('Por favor informe o valor da combrança')
		.positive('Por favor informe o valor da combrança'),
	currency: z
		.string('Por favor informe a moeda da combrança')
		.min(1, 'Por favor informe a moeda da combrança')
		.max(255, 'A moeda da combrança deve ter no máximo 255 caracteres'),
	customerId: z
		.int('Por favor informe cliente da combrança')
		.positive('Por favor informe cliente da combrança'),
	dueDate: z.iso.date('Por favor informe a data de validade da combrança'),
};

const UpdatePixChargeRequest = z.object({
	...UpdateChargeRequestBaseFields,
	paymentType: z.literal(PaymentType.PIX),
});

const UpdatePaymentSlipChargeRequest = z.object({
	...UpdateChargeRequestBaseFields,
	paymentType: z.literal(PaymentType.PAYMENT_SLIP),
});

const UpdateCreditCardChargeRequest = z.object({
	...UpdateChargeRequestBaseFields,
	paymentType: z.literal(PaymentType.CREDIT_CARD),
	installments: z
		.int('A quantidade de parcelas deve ser um número')
		.positive('A quantidade de parcelas deve ser um número positivo'),
});

export const UpdateChargeRequest = z.discriminatedUnion(
	'paymentType',
	[
		UpdateCreditCardChargeRequest,
		UpdatePaymentSlipChargeRequest,
		UpdatePixChargeRequest,
	],
	'Informe um metodo de pagamento valído',
);
export type UpdateChargeRequest = z.infer<typeof UpdateChargeRequest>;
