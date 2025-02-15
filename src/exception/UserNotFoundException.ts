import Logger from "../utils/Logger";
import HttpException from "./HttpException";
import UnauthorizedException from "./UnauthorizedException";

export class UserNotFoundException extends Error implements HttpException {
    public status: number;
    public message: string;

    constructor(message = 'Acesso não autorizado') {
        super(message);
        this.status = 401;
        this.message = message;
        Object.setPrototypeOf(this, UnauthorizedException.prototype);
    }

    logErrorToFile(): string {
        return 
    }
}
