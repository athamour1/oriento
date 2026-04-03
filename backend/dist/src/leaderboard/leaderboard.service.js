"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let LeaderboardService = class LeaderboardService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getLeaderboard(eventId) {
        const scans = await this.prisma.scan.findMany({
            where: {
                checkpoint: { eventId },
            },
            include: {
                team: true,
                checkpoint: true,
            },
        });
        const scoresMap = new Map();
        for (const scan of scans) {
            if (!scoresMap.has(scan.teamId)) {
                scoresMap.set(scan.teamId, { teamName: scan.team.username, score: 0 });
            }
            const entry = scoresMap.get(scan.teamId);
            if (entry) {
                entry.score += scan.checkpoint.pointValue;
            }
        }
        const leaderboard = Array.from(scoresMap.values()).sort((a, b) => b.score - a.score);
        const event = await this.prisma.event.findUnique({
            where: { id: eventId },
            select: { name: true, description: true },
        });
        return { eventName: event?.name ?? 'Event', eventDescription: event?.description ?? '', leaderboard };
    }
};
exports.LeaderboardService = LeaderboardService;
exports.LeaderboardService = LeaderboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LeaderboardService);
//# sourceMappingURL=leaderboard.service.js.map