import { PaymentMethod } from "../component/constant/paymentMethod";
import { PaymentStatus } from "../component/constant/paymentStatus";
import { StudentEntity } from "../model/student";
import { Users } from "../model/Users";


export interface PaymentRecordDTO{
    paymentRecordId: string;
    student: StudentEntity;
    amount: number;
    paymentDate: Date;
    paymentMethod: PaymentMethod;
    status: PaymentStatus;
    proofOfPaymentUrl?: string;
    verifiedByAdmin: Users;
}