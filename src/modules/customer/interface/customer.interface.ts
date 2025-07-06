import type { IPagination } from "../../../common/interfaces/pagination.interface";
import type { CustomerEntity } from "../entity/customer.entity";

export interface ICustomer {
  customers: CustomerEntity[];
  pagination: IPagination;
}
