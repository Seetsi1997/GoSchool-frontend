import { Role } from "../component/constant/role";

export interface Users{
    uuid?: string;
    firstName: string;
    email: string;
    profileImageUrl?: string;
    password: string;
    role: Role;
    phoneNumber: string;
    verified?: boolean;
}