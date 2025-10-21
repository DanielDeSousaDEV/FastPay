import type { ExpressStatusMonitorConfig } from 'express-status-monitor';

export const config: ExpressStatusMonitorConfig = {
	title: 'App Status',
	chartVisibility: {
		cpu: false,
		mem: false,
		load: false,
		heap: false,
		responseTime: true,
		rps: true,
		statusCodes: true,
	},
	healthChecks: [
		{
			protocol: 'http',
			host: '0.0.0.0',
			path: '/up',
			port: '3000',
		},
		{
			protocol: 'http',
			host: 'status.asaas.com',
			path: 'https://status.asaas.com/',
			port: '443',
		},
		{
			protocol: 'https',
			host: 'www.google.com',
			path: 'https://www.google.com/',
			port: '443',
		},
	],
};
