import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { FormatZodErrors } from '../utils/funcs/FormatZodErrors';
// import { UserNotFound } from "../exceptions/UserNotFound";
// import { EmailAlreadyUsedError } from "../exceptions/EmailAlredyUsed";
// import { TaskNotFound } from "../exceptions/TaskNotFound";

export function ErrorHandler(
	error: unknown,
	_req: Request,
	res: Response,
	_next: NextFunction,
) {
	if (error instanceof ZodError) {
		return res.status(400).json({
			message: 'Erro de validação',
			errors: FormatZodErrors(error),
		});
	}

	// if (error instanceof UserNotFound) {
	//     return res.status(404).json({ message: "Usuário não encontrado" });
	// }

	// if (error instanceof EmailAlreadyUsedError) {
	//     return res.status(409).json({ message: "Email já está em uso" });
	// }

	// if (error instanceof TaskNotFound) {
	//     return res.status(404).json({ message: "Tarefa não encontrada" });
	// }

	console.error(error); // log de debug
	return res.status(500).json({ message: 'Erro no servidor' });
}
