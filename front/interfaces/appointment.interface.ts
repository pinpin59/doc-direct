export interface Appointment {
    id: number;
    userId: number;
    healthProfessionalId: number;
    appointmentDate: Date;
    appointmentTime: string;
    appointmentAdress: string;
    comment?: string;
    created_at?: Date;
    updated_at?: Date;
}