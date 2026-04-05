import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { EventsService } from './events.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';
import { UpdateLocationDto } from './dto/update-location.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('team/events')
export class TeamEventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Roles(Role.TEAM)
  @Get('active')
  getActiveEvent(@Request() req: any) {
    return this.eventsService.getActiveEventForTeam(req.user.id);
  }

  @Roles(Role.TEAM)
  @Put('location')
  updateLocation(@Request() req: any, @Body() body: UpdateLocationDto) {
    return this.eventsService.upsertTeamLocation(req.user.id, body);
  }
}
