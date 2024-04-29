export interface Avaibility {
    id: number;
    start: string;
    end: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    healthProfessionalId: number;
}

export interface TimeSlot {
    day: string;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
}