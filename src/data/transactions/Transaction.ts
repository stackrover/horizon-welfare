import { User } from "@/data/users/User";
import { format } from "date-fns";

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
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly project: Project;
  readonly donor: User | null;
  readonly original: Record<string, any>;

  constructor(data: Record<string, any>) {
    this.original = data;
    this.id = data?.id;
    this.trxId = data?.trx_id;
    this.invId = data?.inv_id;
    this.amount = data?.amount;
    this.currency = data?.currency;
    this.paymentId = data?.payment_id;
    this.subscriptionMoneyStatus = data?.is_subscription_money;
    this.trxStatus = data?.transaction_status;
    this.status = data?.status;
    this.createdAt = new Date(data?.created_at);
    this.updatedAt = new Date(data?.updated_at);
    this.donor = data?.donor ? new User(data?.donor) : null;
    this.project = new Project(data?.project);
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

  getDonor(): User | null {
    return this.donor;
  }

  getProject(): Project {
    return this.project;
  }

  getCreationDate(): string {
    return format(this.createdAt, "MMM dd, yyyy h:mm a");
  }

  getUpdateDate(): string {
    return format(this.updatedAt, "MMM dd, yyyy h:mm a");
  }
}

class Project {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  goalAmount: string;

  constructor(data: Record<string, any>) {
    this.id = data?.id;
    this.title = data?.title;
    this.description = data?.description;
    this.thumbnail = data?.thumbnail;
    this.goalAmount = data?.goalAmount;
  }

  getId(): number {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }
  getDescription(): string {
    return this.description;
  }
  getThumbnail(): string {
    return this.thumbnail;
  }

  getGoalAmount(): string {
    return this.goalAmount;
  }
}
