export class ChargeNotCanUpdated extends Error {
	constructor() {
		super('Não foi é possível atualizar uma Cobrança com parcelas');
		this.name = 'ChargeNotCanUpdated';
	}
}
