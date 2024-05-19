import { HealthProfessionalStatus } from "../src/app/enums/health-professional-status.enum";

export interface HealthProfessional {
    id: number;
    email: string;
    password: string;
    lastname: string;
    firstname: string;
    city: string;
    address: string;
    profession: string;
    status: HealthProfessionalStatus;
    profilePicture?: string;
    createdAt?: Date;
    updatedAt?: Date;
    availabilities?:any
}