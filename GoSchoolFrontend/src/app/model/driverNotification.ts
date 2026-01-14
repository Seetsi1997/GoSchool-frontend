import { Driver } from "./driver";
import { TransportApplicationEntity } from "./transportApplication";
import { Actor } from "../component/constant/actor";

export interface DriverNotificationEntity {
  id: string;
  message: string;
  seen: boolean;
  createdAt: string;   
  application: TransportApplicationEntity;
  driver: Driver;
  actors: Actor;
}