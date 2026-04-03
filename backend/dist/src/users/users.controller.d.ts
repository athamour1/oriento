import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
export declare class UsersController {
    private readonly usersService;
    private readonly prisma;
    constructor(usersService: UsersService, prisma: PrismaService);
    getTeams(eventId: string): Promise<{
        id: number;
        username: string;
    }[]>;
    createTeam(eventId: string, body: {
        username: string;
        password: string;
    }): Promise<{
        id: number;
        username: string;
    }>;
    removeTeam(id: string): Promise<{
        id: number;
        username: string;
        passwordHash: string;
        role: import("@prisma/client").$Enums.Role;
        eventId: number | null;
    }>;
}
