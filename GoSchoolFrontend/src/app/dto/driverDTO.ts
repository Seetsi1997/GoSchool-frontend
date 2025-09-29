import { LocationDTO } from "./ LocationDTO";
import { StudentDTO } from "./studentDTO";

export interface DriverDTO {
    driverUUID: string; 
    driverName: string;
    driverSurname: string;
    email: string;
    driverContact: string;
    driverLocation: LocationDTO; 
    totalNumberOfStudents: number;
    assignedStudents: StudentDTO[]; 
    userId: string; 
    password: string;
}
