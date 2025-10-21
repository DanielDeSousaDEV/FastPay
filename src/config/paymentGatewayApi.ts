import axios from 'axios';
import { env } from './env';

export const paymentGateway = axios.create({
	baseURL: 'https://api-sandbox.asaas.com/v3',

	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

paymentGateway.interceptors.request.use((config) => {
	config.headers.set('access_token', env.ASAAS_API_KEY);
	return config;
});
