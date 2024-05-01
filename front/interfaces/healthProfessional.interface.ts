import { HealthProfessionalStatus } from "../src/app/enums/health-professional-status.enum";

export interface HealthProfessional {
    id: number;
    email: string;
    password: string;
    lastname: string;
    firstname: string;
    city: string;
    adress: string;
    profession: string;
    status: HealthProfessionalStatus;
    createdAt?: Date;
    updatedAt?: Date;
}