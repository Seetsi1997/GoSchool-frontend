import { LocationDTO } from "./ LocationDTO";
import { StudentDTO } from "./studentDTO";

export interface ParentDTO{
    parentUUID: string;
    firstName: string;
    surname: string;
    contact: string;
    parentLocation: LocationDTO;
    children: StudentDTO[];
    userId: string;
    password: string;
}