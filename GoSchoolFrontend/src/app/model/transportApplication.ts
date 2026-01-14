import { ApplicationStatus } from "../component/constant/applicationStatus";
import { LearnerGrade } from "../component/constant/learnerGrade";
import { PaymentStatus } from "../component/constant/paymentStatus";
import { Driver } from "./driver";
import { DriverRouteDetails } from "./DriverRouteDetails";
import { ParentEntity } from "./parent";
import { PaymentRecordEntity } from "./paymentRecord";
import { StudentEntity } from "./student";

export interface TransportApplicationEntity {
  applicationId: string;
  parentId: string;
  parentName: string;
  studentNames: string;
  routeId: string;
  numberOfKids: number;
  message: string;
  applicationStatus: ApplicationStatus;
  appliedAt: string;
  student: StudentEntity;
   active: boolean;
}
