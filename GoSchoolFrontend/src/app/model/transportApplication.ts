import { ApplicationStatus } from "../component/constant/applicationStatus";
import { LearnerGrade } from "../component/constant/learnerGrade";
import { PaymentStatus } from "../component/constant/paymentStatus";
import { Driver } from "./driver";
import { DriverRouteDetails } from "./DriverRouteDetails";
import { ParentEntity } from "./parent";
import { PaymentRecordEntity } from "./paymentRecord";

export interface TransportApplicationEntity {
  id: string;
  numberOfKids: number;
  message: string;
  applicationStatus: ApplicationStatus;
  parent: ParentEntity;
  route: DriverRouteDetails;
  approved: boolean;
  appliedAt: Date;
}
