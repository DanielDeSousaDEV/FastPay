import z from 'zod';

export const asaasWebhookSchema = z
	.object({
		id: z.string(),
		event: z.string(),
	})
	.catchall(z.any())
	.refine((obj) => Object.keys(obj).some((k) => k !== 'id' && k !== 'event'), {
		message:
			'O payload deve conter o objeto da entidade (ex: "payment", "pixQrCode", "pixRefund", etc).',
	});

export type AsaasWebhook = z.infer<typeof asaasWebhookSchema>;
