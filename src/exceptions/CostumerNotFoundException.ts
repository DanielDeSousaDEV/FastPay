export class CostumerNotFoundException extends Error {
	constructor() {
		super('Não foi possível encontrar o cliente');
		this.name = 'CostumerNotFound';
	}
}
