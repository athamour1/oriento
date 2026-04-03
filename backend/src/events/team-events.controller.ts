import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { EventsService } from './events.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('team/events')
export class TeamEventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly prisma: PrismaService
  ) {}

  @Roles(Role.TEAM)
  @Get('active')
  async getActiveEvent(@Request() req: any) {
    let activeEvent: any = null;
    const user: any = await this.prisma.user.findUnique({ where: { id: req.user.id } });
    
    if (user && user.eventId) {
      const event = await this.eventsService.findOne(user.eventId);
      if (event && event.isActive) activeEvent = event;
    }
    if (!activeEvent) {
      activeEvent = await this.eventsService.findActiveEvent();
    }
    
    if (!activeEvent) return null;

    const scans = await this.prisma.scan.findMany({
      where: { teamId: user.id, checkpoint: { eventId: activeEvent.id } }
    });
    
    const scannedCheckpointIds = scans.map(s => s.checkpointId);
    
    return {
      ...activeEvent,
      scannedCheckpointIds
    };
  }

  @Roles(Role.TEAM)
  @Put('location')
  async updateLocation(@Request() req: any, @Body() body: { latitude: number; longitude: number }) {
    return this.prisma.teamLocation.upsert({
      where: { teamId: req.user.id },
      create: { teamId: req.user.id, latitude: body.latitude, longitude: body.longitude },
      update: { latitude: body.latitude, longitude: body.longitude },
    });
  }
}
