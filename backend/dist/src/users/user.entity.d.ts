export declare class User {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    constructor(partial: Partial<User>);
}
