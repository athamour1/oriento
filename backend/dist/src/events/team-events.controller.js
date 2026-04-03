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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamEventsController = void 0;
const common_1 = require("@nestjs/common");
const events_service_1 = require("./events.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let TeamEventsController = class TeamEventsController {
    eventsService;
    prisma;
    constructor(eventsService, prisma) {
        this.eventsService = eventsService;
        this.prisma = prisma;
    }
    async getActiveEvent(req) {
        let activeEvent = null;
        const user = await this.prisma.user.findUnique({ where: { id: req.user.id } });
        if (user && user.eventId) {
            const event = await this.eventsService.findOne(user.eventId);
            if (event && event.isActive)
                activeEvent = event;
        }
        if (!activeEvent) {
            activeEvent = await this.eventsService.findActiveEvent();
        }
        if (!activeEvent)
            return null;
        const scans = await this.prisma.scan.findMany({
            where: { teamId: user.id, checkpoint: { eventId: activeEvent.id } }
        });
        const scannedCheckpointIds = scans.map(s => s.checkpointId);
        return {
            ...activeEvent,
            scannedCheckpointIds
        };
    }
    async updateLocation(req, body) {
        return this.prisma.teamLocation.upsert({
            where: { teamId: req.user.id },
            create: { teamId: req.user.id, latitude: body.latitude, longitude: body.longitude },
            update: { latitude: body.latitude, longitude: body.longitude },
        });
    }
};
exports.TeamEventsController = TeamEventsController;
__decorate([
    (0, roles_decorator_1.Roles)(client_1.Role.TEAM),
    (0, common_1.Get)('active'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeamEventsController.prototype, "getActiveEvent", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.Role.TEAM),
    (0, common_1.Put)('location'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TeamEventsController.prototype, "updateLocation", null);
exports.TeamEventsController = TeamEventsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('team/events'),
    __metadata("design:paramtypes", [events_service_1.EventsService,
        prisma_service_1.PrismaService])
], TeamEventsController);
//# sourceMappingURL=team-events.controller.js.map