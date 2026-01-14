
import { ApplicationStatus } from "../component/constant/applicationStatus";
import { Actor } from "../component/constant/actor";


export interface DriverNotificationDTO {
  id: string;
  message: string;
  seen: boolean;
  createdAt: string;
  applicationId: string;
  driverUUID: string;
  applicationStatus: ApplicationStatus;
  actor: Actor;
  parentName: string;
  studentName: string;
  address: string;
  city: string;
  postalCode: string;
  province: string;
  suburb: string;
  schoolName: string;
}
