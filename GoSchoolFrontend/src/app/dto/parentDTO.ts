import { Province } from "../component/constant/province";
import { Role } from "../component/constant/role";
import { StudentDTO } from "./studentDTO";

export interface ParentDTO{
    parentUUID: string;
    firstName: string;
    surname?: string;
    email?: string;
    contact?: string;
    city?: string;
    address?: string;
    postalCode?: string;
    suburb?: string;
    province?: Province;
    children: StudentDTO[];
    userId: string;
    password?: string;
    role?: Role;
}