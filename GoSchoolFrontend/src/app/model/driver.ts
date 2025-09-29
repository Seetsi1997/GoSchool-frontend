import { Users } from "./Users";

export interface Driver {
    driverUUID?: string;
    driverName: string;
    driverSurname: string;
    email: string;
    driverContact: string;
    driverLocation: Location;
    totalNumberOfStudents?: number;
    assignedStudents: number[];
    userAccount: Users;
}