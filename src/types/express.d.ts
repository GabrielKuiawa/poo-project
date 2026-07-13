import { UserRole } from '../enum/UserRole';
import { AuthenticatedUser } from './AuthenticatedUser';

declare global {
    namespace Express {
        interface Request {
            auth?: AuthenticatedUser;
        }
    }
}

export {};
