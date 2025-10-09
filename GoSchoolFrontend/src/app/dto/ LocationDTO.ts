import { Province } from "../component/constant/province";

export interface LocationDTO{
    locationUUID?: string;
    city: string;
    address: string;
    province: Province; 
    postalCode: string;
    suburb: string;
}