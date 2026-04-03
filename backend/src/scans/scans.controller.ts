import { Controller, Post, Body, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { ScansService } from './scans.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('team/scans')
export class ScansController {
  constructor(private readonly scansService: ScansService) {}

  @Roles(Role.TEAM)
  @Post()
  async scanCheckpoint(@Request() req, @Body('qrSecretString') qrSecretString: string) {
    if (!qrSecretString) {
      throw new BadRequestException('QR Secret String is required');
    }
    return this.scansService.processScan(req.user.id, qrSecretString);
  }
}
