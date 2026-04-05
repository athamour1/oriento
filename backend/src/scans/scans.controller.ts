import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ScansService } from './scans.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';
import { ScanDto } from './dto/scan.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('team/scans')
export class ScansController {
  constructor(private readonly scansService: ScansService) {}

  @Roles(Role.TEAM)
  @Post()
  async scanCheckpoint(@Request() req: any, @Body() body: ScanDto) {
    return this.scansService.processScan(req.user.id, body.qrSecretString);
  }
}
