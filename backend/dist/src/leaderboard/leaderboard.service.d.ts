import { PrismaService } from '../prisma/prisma.service';
export declare class LeaderboardService {
    private prisma;
    constructor(prisma: PrismaService);
    getLeaderboard(eventId: number): Promise<{
        eventName: string;
        eventDescription: string;
        leaderboard: {
            teamName: string;
            score: number;
        }[];
    }>;
}
