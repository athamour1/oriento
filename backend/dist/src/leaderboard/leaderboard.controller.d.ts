import { LeaderboardService } from './leaderboard.service';
export declare class LeaderboardController {
    private readonly leaderboardService;
    constructor(leaderboardService: LeaderboardService);
    getLeaderboard(eventId: string): Promise<{
        eventName: string;
        eventDescription: string;
        leaderboard: {
            teamName: string;
            score: number;
        }[];
    }>;
}
