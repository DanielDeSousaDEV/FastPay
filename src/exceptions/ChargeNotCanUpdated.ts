export class ChargeNotCanUpdated extends Error {
	constructor() {
		super('Não foi é possível atualizar uma combrança com parcelas');
		this.name = 'ChargeNotCanUpdated';
	}
}
