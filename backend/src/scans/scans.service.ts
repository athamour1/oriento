import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ScansService {
  constructor(private prisma: PrismaService) {}

  async processScan(teamId: number, qrSecretString: string) {
    // 1. Find checkpoint matching the qrSecretString
    const checkpoint = await this.prisma.checkpoint.findUnique({
      where: { qrSecretString },
      include: { event: true },
    });

    if (!checkpoint) {
      throw new BadRequestException('Invalid QR code');
    }

    // 2. Check if the event is active and within its time window
    if (!checkpoint.event.isActive) {
      throw new BadRequestException('Event is not currently active');
    }
    const now = new Date();
    if (checkpoint.event.startTime && now < checkpoint.event.startTime) {
      throw new BadRequestException('Event has not started yet');
    }
    if (checkpoint.event.endTime && now > checkpoint.event.endTime) {
      throw new BadRequestException('Event has already ended');
    }

    // 3. Check if team has already scanned it
    const existingScan = await this.prisma.scan.findUnique({
      where: {
        teamId_checkpointId: {
          teamId,
          checkpointId: checkpoint.id,
        },
      },
    });

    if (existingScan) {
      throw new ConflictException('Checkpoint already scanned by your team');
    }

    // 4. Record the scan
    return this.prisma.scan.create({
      data: {
        teamId,
        checkpointId: checkpoint.id,
      },
      include: {
        checkpoint: true
      }
    });
  }
}
