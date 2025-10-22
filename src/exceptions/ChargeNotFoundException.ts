export class ChargeNotFoundException extends Error {
	constructor() {
		super('Não foi possível encontrar a Cobrança');
		this.name = 'ChargeNotFoundException';
	}
}
