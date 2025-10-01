import { LocationEntity } from "./location";
import { StudentEntity } from "./student";
import { Users } from "./Users";

export interface ParentEntity {
  parentUUID: string;
  firstName: string;
  surname: string;
  contact: string;
  parentLocation: LocationEntity;
  children: StudentEntity[];
  userAccount: Users;
}