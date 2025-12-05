import { Role } from "../component/constant/role";
import { DriverRouteDetails } from "../model/DriverRouteDetails";
import { LocationDTO } from "./ LocationDTO";
import { DriverRouteDetailsDTO } from "./driverRouteDetailsDTO";
import { StudentDTO } from "./studentDTO";

export interface DriverDTO {
    driverUUID: string; 
    driverName: string;
    driverSurname: string;
    email: string;
    contact: string;
    driverLocation: LocationDTO; 
    totalNumberOfStudents: number;
    assignedStudents: StudentDTO[]; 
    userId: string; 
    password: string;
    role?: Role;
    routeDetails?: DriverRouteDetailsDTO[];
}
