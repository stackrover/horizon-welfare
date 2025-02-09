import { User } from "@/data/users/User";

type Project = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  goalAmount: string;
};

export class Transaction {
  readonly id: number;
  readonly trxId: string;
  readonly invId: string;
  readonly amount: string;
  readonly currency: string;
  readonly paymentId: string;
  readonly subscriptionMoneyStatus: NonNullable<"yes" | "no">;
  readonly trxStatus: NonNullable<"completed" | "pending" | "cancelled">;
  readonly status: NonNullable<"completed" | "pending" | "cancelled">;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly project: Project;
  readonly donor: User;
  readonly original: Record<string, any>;

  constructor(data: Record<string, any>) {
    this.original = data;
    this.id = data?.id;
    this.trxId = data?.trx_id;
    this.invId = data?.inv_id;
    this.amount = data?.amount;
    this.currency = data?.currency;
    this.paymentId = data?.payment_id;
    this.subscriptionMoneyStatus = data?.is_subcription_money;
    this.trxStatus = data?.transaction_id;
    this.status = data?.status;
    this.createdAt = data?.created_at;
    this.updatedAt = data?.updated_at;
    this.donor = data?.donor;
    this.project = data?.project;
  }

  getId(): number {
    return this.id;
  }

  getTrxId(): string {
    return this.trxId;
  }

  getInvId(): string {
    return this.invId;
  }

  getAmount(): string {
    return this.amount;
  }

  getCurrency(): string {
    return this.currency;
  }

  getPaymentId(): string {
    return this.paymentId;
  }

  isSubscriptionMoney(): string {
    return this.subscriptionMoneyStatus;
  }

  getTrxStatus(): string {
    return this.trxStatus;
  }

  getStatus(): string {
    return this.status;
  }

  getCreationDate(): string {
    return this.createdAt;
  }

  getUpdateDate(): string {
    return this.createdAt;
  }
}
