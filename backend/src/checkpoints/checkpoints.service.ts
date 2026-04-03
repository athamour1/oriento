import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class CheckpointsService {
  constructor(private prisma: PrismaService) {}

  create(eventId: number, data: any) {
    const qrSecretString = crypto.randomBytes(16).toString('hex');
    return this.prisma.checkpoint.create({
      data: {
        ...data,
        eventId,
        qrSecretString,
      },
    });
  }

  findAllByEvent(eventId: number) {
    return this.prisma.checkpoint.findMany({ where: { eventId } });
  }

  findOne(id: number) {
    return this.prisma.checkpoint.findUnique({ where: { id } });
  }

  update(id: number, data: any) {
    return this.prisma.checkpoint.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.checkpoint.delete({ where: { id } });
  }
}
