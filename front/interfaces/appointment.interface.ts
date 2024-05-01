export interface Appointment {
    id?: number;
    userId: number;
    healthProfessionalId: number;
    appointmentDate: Date;
    appointmentTime: string;
    appointmentCity: string;
    appointmentAdress: string;
    comment?: string;
    createdAt?: Date;
    updatedAt?: Date;
}