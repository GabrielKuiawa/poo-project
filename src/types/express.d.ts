import { AuthenticatedUser } from './AuthenticatedUser';

declare global {
    namespace Express {
        interface Request {
            auth?: AuthenticatedUser;
        }
    }
}

export {};
