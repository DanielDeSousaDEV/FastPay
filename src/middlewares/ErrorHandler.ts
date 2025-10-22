import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { FormatZodErrors } from '../utils/funcs/FormatZodErrors';
import { CostumerNotFoundException } from '../exceptions/CostumerNotFoundException';
import { EmailOrDocumentAlredyUsedException } from '../exceptions/EmailOrDocumentAlredyUsedException';
import { ChargeNotFoundException } from '../exceptions/ChargeNotFoundException';
import { AxiosError } from 'axios';

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

	if (error instanceof CostumerNotFoundException) {
		return res.status(404).json({ message: 'Cliente não encontrado' });
	}

	if (error instanceof ChargeNotFoundException) {
		return res.status(404).json({ message: 'Combrança não encontrado' });
	}

	if (error instanceof EmailOrDocumentAlredyUsedException) {
		return res
			.status(404)
			.json({ message: 'Email ou Documento já foram cadastrados' });
	}

	if (error instanceof EmailOrDocumentAlredyUsedException) {
		return res
			.status(404)
			.json({ message: 'Email ou Documento já foram cadastrados' });
	}
	if (error instanceof AxiosError) {
		console.log(error.response?.data);

		return res.status(500).json({ message: 'Erro de integração' });
	}

	console.error(error); // log de debug
	return res.status(500).json({ message: 'Erro no servidor' });
}
