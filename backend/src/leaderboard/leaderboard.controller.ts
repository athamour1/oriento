import { Controller, Get, Param } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';

@Controller('public/events/:eventId/leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get()
  getLeaderboard(@Param('eventId') eventId: string) {
    return this.leaderboardService.getLeaderboard(+eventId);
  }
}
