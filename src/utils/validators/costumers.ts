import z from 'zod';
import { validateCPF } from '../funcs/ValidateCPF';
import { validateCNPJ } from '../funcs/ValidateCNPJ';

export const CostumerIdSchema = z.object({
	id: z.coerce
		.number('Por favor informe o id do cliente')
		.int('Por favor informe o id do cliente')
		.min(1, 'Por favor informe o id do cliente')
		.positive('Por favor informe o id valído'),
});

export const CreateCostumerRequest = z.object({
	name: z
		.string('Por favor informe o nome do cliente')
		.min(1, 'Por favor informe o nome do cliente')
		.max(255, 'O nome do cliente deve ter no máximo 255 caracteres'),
	email: z
		.email('Por favor informe o email do cliente')
		.min(1, 'Por favor informe o email do cliente')
		.max(255, 'O email do cliente deve ter no máximo 255 caracteres'),
	document: z
		.string('Por favor informe o documento do cliente')
		.min(1, 'Por favor informe o documento do cliente')
		.max(255, 'O email do cliente deve ter no máximo 255 caracteres')
		.regex(
			/^(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})$/,
			'Informe CPF (000.000.000-00) ou CNPJ (00.000.000/0000-00) com formato valído',
		)
		.refine(
			(val) => validateCPF(val) || validateCNPJ(val),
			'Informe CPF (000.000.000-00) ou CNPJ (00.000.000/0000-00) valído',
		),
});
export type CreateCostumerRequest = z.infer<typeof CreateCostumerRequest>;

export const UpdateCostumerRequest = z.object({
	name: z
		.string('Por favor informe o nome do cliente')
		.min(1, 'Por favor informe o nome do cliente')
		.max(255, 'O nome do cliente deve ter no máximo 255 caracteres')
		.optional(),
	email: z
		.email('Por favor informe o email do cliente')
		.min(1, 'Por favor informe o email do cliente')
		.max(255, 'O email do cliente deve ter no máximo 255 caracteres')
		.optional(),
	document: z
		.string('Por favor informe o documento do cliente')
		.min(1, 'Por favor informe o documento do cliente')
		.max(255, 'O email do cliente deve ter no máximo 255 caracteres')
		.regex(
			/^(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})$/,
			'Informe CPF (000.000.000-00) ou CNPJ (00.000.000/0000-00) com formato valído',
		)
		.refine(
			(val) => validateCPF(val) || validateCNPJ(val),
			'Informe CPF (000.000.000-00) ou CNPJ (00.000.000/0000-00) valído',
		)
		.optional(),
});
export type UpdateCostumerRequest = z.infer<typeof UpdateCostumerRequest>;
