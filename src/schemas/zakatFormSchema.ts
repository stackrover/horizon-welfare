import { z } from "zod";

export const zakatDonationSchema = z.object({
  cash: z.coerce.number().min(1, "Amount must be greater than 0"),
  goldAndSilver: z.coerce.number().min(1, "Amount must be greater than 0"),
  property: z.coerce.number().min(1, "Amount must be greater than 0"),
  pension: z.coerce.number().min(1, "Amount must be greater than 0"),
  shares: z.coerce.number().min(1, "Amount must be greater than 0"),
  investments: z.coerce.number().min(1, "Amount must be greater than 0"),
  owedMoney: z.coerce.number().min(1, "Amount must be greater than 0"),
  businessValue: z.coerce.number().min(1, "Amount must be greater than 0"),
  unpaidDebts: z.coerce.number().min(1, "Amount must be greater than 0"),
  businessDebt: z.coerce.number().min(1, "Amount must be greater than 0"),
});
