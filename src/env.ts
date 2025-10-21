import { z } from "zod";

const envSchema = z.object({
    PORT: z.coerce.number()
        .positive('Deve ser positivo')
        .default(3000)
})

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Erro nas variáveis de ambiente:", parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;