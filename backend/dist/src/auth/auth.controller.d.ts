import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(signInDto: Record<string, any>): Promise<{
        access_token: string;
        role: any;
    }>;
    refresh(authHeader: string): Promise<{
        access_token: string;
        role: any;
    }>;
}
