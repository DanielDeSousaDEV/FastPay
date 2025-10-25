export interface AsaasInstallment {
  object: "installment";
  id: string;
  value: number;
  netValue: number;
  paymentValue: number;
  installmentCount: number;
  billingType: "CREDIT_CARD" | "BOLETO" | "PIX" | string;
  paymentDate: string | null;
  description: string | null;
  expirationDay: number;
  deleted: boolean;
  dateCreated: string;
  checkoutSession: string | null;
  customer: string;
  paymentLink: string | null;
  transactionReceiptUrl: string | null;
  creditCard: string | null;
  refunds: string | null;
}
