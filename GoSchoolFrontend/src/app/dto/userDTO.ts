import { Role } from "../component/constant/role";

export interface UserDTO{
  userUUID: string;
  accountEmail: string;
  firstname: string;
  profileImageUrl: string;
  role: Role;
  phoneNumber: string;
}

