import { LearnerGrade } from "../component/constant/learnerGrade";
import { PaymentStatus } from "../component/constant/paymentStatus";
import { Driver } from "../service/serviceDriver/driver";
import { ParentEntity } from "./parent";
import { PaymentRecordEntity } from "./paymentRecord";

export interface StudentEntity {
  studentUUID: string;
  studentFirstName: string;
  studentSurname: string;
  monthlyPaymentAmount: number;
  paymentStatus: PaymentStatus;
  learnerGrade: LearnerGrade;
  parentDTOS: ParentEntity[];
  paymentRecordDTO: PaymentRecordEntity[];
  driver: Driver;
}
