import { LearnerGrade } from "../component/constant/learnerGrade";
import { PaymentStatus } from "../component/constant/paymentStatus";
import { Province } from "../component/constant/province";
import { PaymentRecordDTO } from "./paymentRecordDTO";

export interface StudentDTO {
  studentUUID: string;
  studentFirstName: string;
  studentSurname: string;
  schoolName: string;
  monthlyPaymentAmount: number;
  paymentStatus: PaymentStatus;
  studentGrade: LearnerGrade;
  paymentRecordDTO: PaymentRecordDTO[];
  parentName: string;
  parentPhoneNumber: string;
  parentEmail: string;
  parentAddress: string;
  parentCity: string;
  parentPostalCode: string;
  parentProvince: Province;
}
  