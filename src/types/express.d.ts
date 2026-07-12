import { UserRole } from '../enum/UserRole';

declare global {
    namespace Express {
        interface Request {
            auth?: {
                userId: string;
                role: UserRole;
            };
        }
    }
}

export {};
