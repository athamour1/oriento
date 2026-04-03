import { ScansService } from './scans.service';
export declare class ScansController {
    private readonly scansService;
    constructor(scansService: ScansService);
    scanCheckpoint(req: any, qrSecretString: string): Promise<{
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
