// Função para validar CPF
export function validateCPF(cpf: string): boolean {
	const cleaned = cpf.replace(/\D/g, ''); // remove tudo que não é número

	if (!/^\d{11}$/.test(cleaned)) return false; // deve ter 11 dígitos

	// Checa se todos os dígitos são iguais
	if (/^(\d)\1{10}$/.test(cleaned)) return false;

	// Calcula os dois dígitos verificadores
	const digits = cleaned.split('').map(Number);

	const calcDigit = (factor: number) => {
		const sum = digits
			.slice(0, factor - 1)
			.reduce((acc, val, i) => acc + val * (factor - i), 0);
		const res = (sum * 10) % 11;
		return res === 10 ? 0 : res;
	};

	return calcDigit(10) === digits[9] && calcDigit(11) === digits[10];
}
