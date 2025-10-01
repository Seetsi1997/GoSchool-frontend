import { Province } from "../component/constant/province";

export interface LocationEntity {
   locationUUID?: string;
   city: string;
   address: string;
   province:  Province; 
   postalCode: string;
}