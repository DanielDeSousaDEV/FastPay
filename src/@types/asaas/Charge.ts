import type { ChargeStatus, PaymentType } from '@prisma/client';

export interface AsaasCharge {
	object: 'payment';
	id: string;
	dateCreated: string; // formato YYYY-MM-DD
	customer: string;
	checkoutSession: string | null;
	paymentLink: string | null;
	value: number;
	netValue: number;
	originalValue: number | null;
	interestValue: number | null;
	description: string | null;
	billingType: PaymentType;
	pixTransaction: string | null;
	status: ChargeStatus;
	dueDate: string;
	originalDueDate: string;
	paymentDate: string | null;
	clientPaymentDate: string | null;
	installmentNumber: number | null;
	installment: string | null;
	invoiceUrl: string;
	invoiceNumber: string;
	externalReference: string | null;
	deleted: boolean;
	anticipated: boolean;
	anticipable: boolean;
	creditDate: string | null;
	estimatedCreditDate: string | null;
	transactionReceiptUrl: string | null;
	nossoNumero: string | null;
	bankSlipUrl: string | null;
	lastInvoiceViewedDate: string | null;
	lastBankSlipViewedDate: string | null;
	discount: {
		value: number;
		limitDate: string | null;
		dueDateLimitDays: number;
		type: 'FIXED' | 'PERCENTAGE';
	};
	fine: {
		value: number;
		type: 'FIXED' | 'PERCENTAGE';
	};
	interest: {
		value: number;
		type: 'FIXED' | 'PERCENTAGE';
	};
	postalService: boolean;
	escrow: string | null;
	refunds: string | null;
}
