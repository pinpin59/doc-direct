export interface Avaibility {
    id: number;
    healthProfessionalId: number;
    dayOfWeek: string;
    startTime: string;
    createdAt: string;
    updatedAt: string;
    dateOfWeek?: Date;
}

export interface TimeSlot {
    day: string;
    startTime: string;
}