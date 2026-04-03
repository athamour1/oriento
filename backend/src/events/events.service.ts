import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.event.create({ data });
  }

  findAll() {
    return this.prisma.event.findMany({ include: { checkpoints: true } });
  }

  findOne(id: number) {
    return this.prisma.event.findUnique({ where: { id }, include: { checkpoints: true } });
  }

  update(id: number, data: any) {
    return this.prisma.event.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.event.delete({ where: { id } });
  }

  findActiveEvent() {
    return this.prisma.event.findFirst({
      where: { isActive: true },
      include: { checkpoints: true },
    });
  }

  getLogs(eventId: number) {
    return this.prisma.scan.findMany({
      where: { checkpoint: { eventId } },
      include: {
        team: { select: { id: true, username: true } },
        checkpoint: { select: { id: true, name: true, pointValue: true } },
      },
      orderBy: { scannedAt: 'desc' },
    });
  }

  async getStats(eventId: number) {
    const [checkpoints, teamCount] = await Promise.all([
      this.prisma.checkpoint.findMany({
        where: { eventId },
        include: { _count: { select: { scans: true } } },
      }),
      this.prisma.user.count({ where: { eventId } }),
    ]);
    return { checkpoints, teamCount };
  }

  async getTeamLocations(eventId: number) {
    return this.prisma.teamLocation.findMany({
      where: { team: { eventId } },
      include: { team: { select: { id: true, username: true } } },
    });
  }
}
