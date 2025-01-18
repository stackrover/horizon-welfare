import { format, parseISO } from "date-fns";

export class DonorTransaction {
  id: number;
  trxId: string;
  amount: string;
  createdAt: string;
  transactionStatus: string;
  status: string;
  paymentMethod: string;
  projectId: number;
  projectTitle: string;

  constructor(data: any) {
    this.id = data?.id || null;
    this.trxId = data?.trx_id || "";
    this.amount = data?.amount || "";
    this.createdAt = data?.created_at
      ? format(parseISO(data.created_at), "dd/MM/yyyy hh:mm a")
      : "";
    this.transactionStatus = data?.transaction_status || "";
    this.status = data?.status || "";
    this.paymentMethod = data?.our_method_type || "";
    this.projectId = data?.project_id || null;
    this.projectTitle = data?.project?.title || "";
  }
}
