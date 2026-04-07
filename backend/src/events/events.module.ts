import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TeamEventsController } from './team-events.controller';
import { EventsGateway } from './events.gateway';

@Module({
  imports: [
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
  controllers: [EventsController, TeamEventsController],
  providers: [EventsService, EventsGateway],
  exports: [EventsService, EventsGateway],
})
export class EventsModule {}
