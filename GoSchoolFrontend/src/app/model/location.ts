import { Province } from "../component/constant/province";

export interface Location {
   locationUUID?: string;
   city: string;
   address: string;
   province:  Province; 
   postalCode: string;
}