export interface User {
    id?: number;
    email: string;
    password: string;
    lastname: string;
    firstname: string;
    city: string;
    address: string;
    role: string;
    created_at?: Date;
    updated_at?: Date;
}