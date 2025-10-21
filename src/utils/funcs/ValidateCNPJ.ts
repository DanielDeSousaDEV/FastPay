// Função para validar CNPJ
export function validateCNPJ(cnpj: string): boolean {
	const cleaned = cnpj.replace(/\D/g, ''); // remove tudo que não é número

	if (!/^\d{14}$/.test(cleaned)) return false; // deve ter 14 dígitos

	// Checa se todos os dígitos são iguais
	if (/^(\d)\1{13}$/.test(cleaned)) return false;

	const digits = cleaned.split('').map(Number);

	const calcDigit = (pos: number) => {
		const weights =
			pos === 12
				? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
				: [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
		const sum = digits
			.slice(0, pos)
			.reduce((acc, val, i) => acc + val * weights[i]!, 0);
		const res = sum % 11;
		return res < 2 ? 0 : 11 - res;
	};

	return calcDigit(12) === digits[12] && calcDigit(13) === digits[13];
}
