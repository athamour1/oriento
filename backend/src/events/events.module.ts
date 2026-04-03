import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TeamEventsController } from './team-events.controller';

@Module({
  controllers: [EventsController, TeamEventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
