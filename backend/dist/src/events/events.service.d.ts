import { PrismaService } from '../prisma/prisma.service';
export declare class EventsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): import("@prisma/client").Prisma.Prisma__EventClient<{
        id: number;
        name: string;
        description: string | null;
        startTime: Date | null;
        endTime: Date | null;
        isActive: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        checkpoints: {
            id: number;
            eventId: number;
            name: string;
            latitude: number;
            longitude: number;
            pointValue: number;
            qrSecretString: string;
        }[];
    } & {
        id: number;
        name: string;
        description: string | null;
        startTime: Date | null;
        endTime: Date | null;
        isActive: boolean;
    })[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__EventClient<({
        checkpoints: {
            id: number;
            eventId: number;
            name: string;
            latitude: number;
            longitude: number;
            pointValue: number;
            qrSecretString: string;
        }[];
    } & {
        id: number;
        name: string;
        description: string | null;
        startTime: Date | null;
        endTime: Date | null;
        isActive: boolean;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, data: any): import("@prisma/client").Prisma.Prisma__EventClient<{
        id: number;
        name: string;
        description: string | null;
        startTime: Date | null;
        endTime: Date | null;
        isActive: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import("@prisma/client").Prisma.Prisma__EventClient<{
        id: number;
        name: string;
        description: string | null;
        startTime: Date | null;
        endTime: Date | null;
        isActive: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findActiveEvent(): import("@prisma/client").Prisma.Prisma__EventClient<({
        checkpoints: {
            id: number;
            eventId: number;
            name: string;
            latitude: number;
            longitude: number;
            pointValue: number;
            qrSecretString: string;
        }[];
    } & {
        id: number;
        name: string;
        description: string | null;
        startTime: Date | null;
        endTime: Date | null;
        isActive: boolean;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    getLogs(eventId: number): import("@prisma/client").Prisma.PrismaPromise<({
        checkpoint: {
            id: number;
            name: string;
            pointValue: number;
        };
        team: {
            id: number;
            username: string;
        };
    } & {
        id: number;
        teamId: number;
        checkpointId: number;
        scannedAt: Date;
    })[]>;
    getStats(eventId: number): Promise<{
        checkpoints: ({
            _count: {
                scans: number;
            };
        } & {
            id: number;
            eventId: number;
            name: string;
            latitude: number;
            longitude: number;
            pointValue: number;
            qrSecretString: string;
        })[];
        teamCount: number;
    }>;
    getTeamLocations(eventId: number): Promise<({
        team: {
            id: number;
            username: string;
        };
    } & {
        id: number;
        teamId: number;
        latitude: number;
        longitude: number;
        updatedAt: Date;
    })[]>;
}
