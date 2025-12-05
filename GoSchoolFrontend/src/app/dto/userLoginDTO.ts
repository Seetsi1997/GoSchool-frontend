export interface UserLoginDTO{
    token: string;
    email: string;
    firstName: string;
    password: string;
    uuid: string;
    role: string;
    parentFirstName: string;
    parentUUID: string;
    driverUUID: string;
    driverName: string;
}