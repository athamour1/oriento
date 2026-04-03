import { CheckpointsService } from './checkpoints.service';
import type { Response } from 'express';
export declare class CheckpointsController {
    private readonly checkpointsService;
    constructor(checkpointsService: CheckpointsService);
    create(eventId: string, createCheckpointDto: any): import("@prisma/client").Prisma.Prisma__CheckpointClient<{
        id: number;
        eventId: number;
        name: string;
        latitude: number;
        longitude: number;
        pointValue: number;
        qrSecretString: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAllByEvent(eventId: string): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        eventId: number;
        name: string;
        latitude: number;
        longitude: number;
        pointValue: number;
        qrSecretString: string;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__CheckpointClient<{
        id: number;
        eventId: number;
        name: string;
        latitude: number;
        longitude: number;
        pointValue: number;
        qrSecretString: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateCheckpointDto: any): import("@prisma/client").Prisma.Prisma__CheckpointClient<{
        id: number;
        eventId: number;
        name: string;
        latitude: number;
        longitude: number;
        pointValue: number;
        qrSecretString: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__CheckpointClient<{
        id: number;
        eventId: number;
        name: string;
        latitude: number;
        longitude: number;
        pointValue: number;
        qrSecretString: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    getQrCode(id: string, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
