import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findByUsername(username: string): Promise<{
        id: number;
        username: string;
        passwordHash: string;
        role: import("@prisma/client").$Enums.Role;
        eventId: number | null;
    } | null>;
    createTeam(username: string, plainTextPassword: string, eventId?: number): Promise<{
        id: number;
        username: string;
        passwordHash: string;
        role: import("@prisma/client").$Enums.Role;
        eventId: number | null;
    }>;
    createAdmin(username: string, plainTextPassword: string): Promise<{
        id: number;
        username: string;
        passwordHash: string;
        role: import("@prisma/client").$Enums.Role;
        eventId: number | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        username: string;
        passwordHash: string;
        role: import("@prisma/client").$Enums.Role;
        eventId: number | null;
    }>;
}
