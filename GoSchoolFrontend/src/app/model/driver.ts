import { DriverRouteDetails } from "./DriverRouteDetails";
import { LocationEntity } from "./location";
import { Users } from "./Users";

export interface Driver {
    driverUUID?: string;
    driverName: string;
    driverSurname: string;
    email: string;
    driverContact: string;
    driverLocation: LocationEntity;
    totalNumberOfStudents?: number;
    assignedStudents: number[];
    routeDetails?: DriverRouteDetails[];
    userAccount: Users;
}