import { EventsService } from './events.service';
import { PrismaService } from '../prisma/prisma.service';
export declare class TeamEventsController {
    private readonly eventsService;
    private readonly prisma;
    constructor(eventsService: EventsService, prisma: PrismaService);
    getActiveEvent(req: any): Promise<any>;
    updateLocation(req: any, body: {
        latitude: number;
        longitude: number;
    }): Promise<{
        id: number;
        teamId: number;
        latitude: number;
        longitude: number;
        updatedAt: Date;
    }>;
}
