"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScansService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ScansService = class ScansService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async processScan(teamId, qrSecretString) {
        const checkpoint = await this.prisma.checkpoint.findUnique({
            where: { qrSecretString },
            include: { event: true },
        });
        if (!checkpoint) {
            throw new common_1.BadRequestException('Invalid QR code');
        }
        if (!checkpoint.event.isActive) {
            throw new common_1.BadRequestException('Event is not currently active');
        }
        const existingScan = await this.prisma.scan.findUnique({
            where: {
                teamId_checkpointId: {
                    teamId,
                    checkpointId: checkpoint.id,
                },
            },
        });
        if (existingScan) {
            throw new common_1.ConflictException('Checkpoint already scanned by your team');
        }
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
};
exports.ScansService = ScansService;
exports.ScansService = ScansService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ScansService);
//# sourceMappingURL=scans.service.js.map