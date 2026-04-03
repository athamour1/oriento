import { EventsService } from './events.service';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    create(createEventDto: any): import("@prisma/client").Prisma.Prisma__EventClient<{
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
    findOne(id: string): import("@prisma/client").Prisma.Prisma__EventClient<({
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
    update(id: string, updateEventDto: any): import("@prisma/client").Prisma.Prisma__EventClient<{
        id: number;
        name: string;
        description: string | null;
        startTime: Date | null;
        endTime: Date | null;
        isActive: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    getStats(id: string): Promise<{
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
    getTeamLocations(id: string): Promise<({
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
    getLogs(id: string): import("@prisma/client").Prisma.PrismaPromise<({
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
    remove(id: string): import("@prisma/client").Prisma.Prisma__EventClient<{
        id: number;
        name: string;
        description: string | null;
        startTime: Date | null;
        endTime: Date | null;
        isActive: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
