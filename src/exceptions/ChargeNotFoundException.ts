export class ChargeNotFoundException extends Error {
	constructor() {
		super('Não foi possível encontrar a combrança');
		this.name = 'ChargeNotFoundException';
	}
}
