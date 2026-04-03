import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LeaderboardService {
  constructor(private prisma: PrismaService) {}

  async getLeaderboard(eventId: number) {
    const scans = await this.prisma.scan.findMany({
      where: {
        checkpoint: { eventId },
      },
      include: {
        team: true,
        checkpoint: true,
      },
    });

    const scoresMap = new Map<number, { teamName: string; score: number }>();

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
}
