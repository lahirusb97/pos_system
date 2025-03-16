import { CustomerModel } from "./CustomerModel";
import { PaymentModel } from "./OrderModel";
type RepairStatus = "pending" | "completed" | "canceled";

interface Repair {
  customer: 1;
  repair_issue: string;
  status: string;
  note: string;
  cost: number;
  total_price: number;
  payment_amount: number;
}
interface RepairResponse {
  id: number;
  customer: CustomerModel;
  repair_issue: string;
  status: RepairStatus;
  note: string;
  cost: number;
  total_price: number;
  balance: number;
  payments: PaymentModel[];
  created_at: string;
}
export type { Repair, RepairResponse };
