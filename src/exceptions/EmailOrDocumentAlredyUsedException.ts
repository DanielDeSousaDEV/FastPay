export class EmailOrDocumentAlredyUsedException extends Error {
	constructor() {
		super('Email ou documento já cadastrado');
		this.name = 'EmailOrDocumentAlredyUsedException';
	}
}
