import { Role } from "../component/constant/role";

export interface Users{
    uuid?: string;
    username: string;
    email: string;
    profileImageUrl?: string;
    password: string;
    role: Role;
    verified?: boolean;
}