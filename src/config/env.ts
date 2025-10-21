import { z } from 'zod';
import { FormatZodErrors } from '../utils/funcs/FormatZodErrors';

const envSchema = z.object({
	DATABASE_URL: z.string('Informe a url de conexão com o banco de dados'),
	PORT: z.coerce.number().positive('Deve ser positivo').default(3000),
	ASAAS_API_KEY: z
		.string(
			'Por favor informe sua api key do assas (recomendo usar uma api key sandbox)',
		)
		.min(
			1,
			'Por favor informe sua api key do assas (recomendo usar uma api key sandbox)',
		),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
	console.error(
		'Erro nas variáveis de ambiente:',
		FormatZodErrors(parsedEnv.error),
	);
	process.exit(1);
}

export const env = parsedEnv.data;
