export const ChargeStatus = {
	PENDING: 'PENDING',
	PAID: 'PAID',
	FAILED: 'FAILED',
	EXPIRED: 'EXPIRED',
} as const;

export type ChargeStatus = (typeof ChargeStatus)[keyof typeof ChargeStatus];
