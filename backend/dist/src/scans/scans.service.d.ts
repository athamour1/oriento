import { PrismaService } from '../prisma/prisma.service';
export declare class ScansService {
    private prisma;
    constructor(prisma: PrismaService);
    processScan(teamId: number, qrSecretString: string): Promise<{
        checkpoint: {
            id: number;
            eventId: number;
            name: string;
            latitude: number;
            longitude: number;
            pointValue: number;
            qrSecretString: string;
        };
    } & {
        id: number;
        teamId: number;
        checkpointId: number;
        scannedAt: Date;
    }>;
}
