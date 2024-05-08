export interface Appointment {
    id?: number;
    userId: number;
    healthProfessionalId: number;
    appointmentDate: Date;
    appointmentTime: string;
    appointmentCity: string;
    appointmentAddress: string;
    comment?: string;
    createdAt?: Date;
    updatedAt?: Date;
}