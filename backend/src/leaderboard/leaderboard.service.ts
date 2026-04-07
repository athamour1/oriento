import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const CACHE_TTL_MS = 8000; // 8 seconds — slightly longer than the 5s client poll

@Injectable()
export class LeaderboardService {
  constructor(private prisma: PrismaService) {}

  private cache = new Map<number, { data: any; expiresAt: number }>();

  async getLeaderboard(eventId: number) {
    const cached = this.cache.get(eventId);
    if (cached && Date.now() < cached.expiresAt) {
      return cached.data;
    }

    const [scans, event] = await Promise.all([
      this.prisma.scan.findMany({
        where: { checkpoint: { eventId } },
        include: { team: true, checkpoint: true },
      }),
      this.prisma.event.findUnique({
        where: { id: eventId },
        select: { name: true, description: true, firstFinishBonus: true, firstFinishBonusAwardedToId: true },
      }),
    ]);

    const scoresMap = new Map<number, { teamName: string; score: number }>();
    for (const scan of scans) {
      if (!scoresMap.has(scan.teamId)) {
        scoresMap.set(scan.teamId, { teamName: scan.team.username, score: 0 });
      }
      scoresMap.get(scan.teamId)!.score += scan.checkpoint.pointValue;
    }

    if (event?.firstFinishBonus && event.firstFinishBonusAwardedToId) {
      const winner = scoresMap.get(event.firstFinishBonusAwardedToId);
      if (winner) winner.score += event.firstFinishBonus;
    }

    const leaderboard = Array.from(scoresMap.values()).sort((a, b) => b.score - a.score);
    const result = {
      eventName: event?.name ?? 'Event',
      eventDescription: event?.description ?? '',
      leaderboard,
    };

    this.cache.set(eventId, { data: result, expiresAt: Date.now() + CACHE_TTL_MS });
    return result;
  }
}
