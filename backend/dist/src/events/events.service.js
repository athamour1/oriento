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
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let EventsService = class EventsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(data) {
        return this.prisma.event.create({ data });
    }
    findAll() {
        return this.prisma.event.findMany({ include: { checkpoints: true } });
    }
    findOne(id) {
        return this.prisma.event.findUnique({ where: { id }, include: { checkpoints: true } });
    }
    update(id, data) {
        return this.prisma.event.update({ where: { id }, data });
    }
    remove(id) {
        return this.prisma.event.delete({ where: { id } });
    }
    findActiveEvent() {
        return this.prisma.event.findFirst({
            where: { isActive: true },
            include: { checkpoints: true },
        });
    }
    getLogs(eventId) {
        return this.prisma.scan.findMany({
            where: { checkpoint: { eventId } },
            include: {
                team: { select: { id: true, username: true } },
                checkpoint: { select: { id: true, name: true, pointValue: true } },
            },
            orderBy: { scannedAt: 'desc' },
        });
    }
    async getStats(eventId) {
        const [checkpoints, teamCount] = await Promise.all([
            this.prisma.checkpoint.findMany({
                where: { eventId },
                include: { _count: { select: { scans: true } } },
            }),
            this.prisma.user.count({ where: { eventId } }),
        ]);
        return { checkpoints, teamCount };
    }
    async getTeamLocations(eventId) {
        return this.prisma.teamLocation.findMany({
            where: { team: { eventId } },
            include: { team: { select: { id: true, username: true } } },
        });
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EventsService);
//# sourceMappingURL=events.service.js.map