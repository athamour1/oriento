import { PrismaService } from '../prisma/prisma.service';
export declare class CheckpointsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(eventId: number, data: any): import("@prisma/client").Prisma.Prisma__CheckpointClient<{
        id: number;
        eventId: number;
        name: string;
        latitude: number;
        longitude: number;
        pointValue: number;
        qrSecretString: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAllByEvent(eventId: number): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        eventId: number;
        name: string;
        latitude: number;
        longitude: number;
        pointValue: number;
        qrSecretString: string;
    }[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__CheckpointClient<{
        id: number;
        eventId: number;
        name: string;
        latitude: number;
        longitude: number;
        pointValue: number;
        qrSecretString: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, data: any): import("@prisma/client").Prisma.Prisma__CheckpointClient<{
        id: number;
        eventId: number;
        name: string;
        latitude: number;
        longitude: number;
        pointValue: number;
        qrSecretString: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import("@prisma/client").Prisma.Prisma__CheckpointClient<{
        id: number;
        eventId: number;
        name: string;
        latitude: number;
        longitude: number;
        pointValue: number;
        qrSecretString: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
