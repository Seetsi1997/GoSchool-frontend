import { Driver } from "./driver";

export interface DriverRouteDetails {
  id?: string;
  schoolName: string;
  pickupTime: string;
  dropOffTime: string;
  monthlyFee: number;
  driverId?: string;
}
