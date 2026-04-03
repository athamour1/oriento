"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const corsOriginEnv = process.env.CORS_ORIGIN;
    if (corsOriginEnv) {
        app.enableCors({
            origin: corsOriginEnv.split(',').map(o => o.trim()),
            credentials: true,
        });
    }
    else {
        app.enableCors();
    }
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map