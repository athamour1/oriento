import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admin/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createEventDto: any) {
    return this.eventsService.create(createEventDto);
  }

  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateEventDto: any) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Roles(Role.ADMIN)
  @Get(':id/stats')
  getStats(@Param('id') id: string) {
    return this.eventsService.getStats(+id);
  }

  @Roles(Role.ADMIN)
  @Get(':id/team-locations')
  getTeamLocations(@Param('id') id: string) {
    return this.eventsService.getTeamLocations(+id);
  }

  @Roles(Role.ADMIN)
  @Get(':id/logs')
  getLogs(@Param('id') id: string) {
    return this.eventsService.getLogs(+id);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
