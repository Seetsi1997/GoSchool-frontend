import { ApplicationStatus } from "../component/constant/applicationStatus";

export interface TransportApplicationDTO {
  applicationId: string;
  numberOfKids: number;
  message: string;
  parentUUID: string;
  routeId: string;
  studentName: string;
  parentName: string; 
  status: ApplicationStatus;
  appliedAt: string;
  studentUUID: string;
  address: string;
  city: string;
  postalCode: string;
  province: string;
  suburb: string;
  schoolName: string;
}