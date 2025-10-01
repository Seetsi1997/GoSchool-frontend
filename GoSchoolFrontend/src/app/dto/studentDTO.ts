import { LearnerGrade } from "../component/constant/learnerGrade";
import { PaymentStatus } from "../component/constant/paymentStatus";
import { ParentDTO } from "./parentDTO";
import { PaymentRecordDTO } from "./paymentRecordDTO";

export interface StudentDTO {
  studentUUID: string;
  studentFirstName: string;
  studentSurname: string;
  monthlyPaymentAmount: number;
  paymentStatus: PaymentStatus;
  learnerGrade: LearnerGrade;
  parentDTOS: ParentDTO[];
  paymentRecordDTO: PaymentRecordDTO[];
}