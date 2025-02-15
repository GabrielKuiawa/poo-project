import Logger from "../utils/Logger";
import HttpException from "./HttpException";

export default class UnauthorizedException extends Error implements HttpException {
    public status: number;
    public message: string;

    constructor(message = 'Acesso não autorizado') {
        super(message);
        this.status = 401;
        this.message = message;
        Object.setPrototypeOf(this, UnauthorizedException.prototype);
    }

    public logErrorToFile(): string {
        const logger = new Logger('unauthorized-error.log');
        logger.logError(this.message, this.status);
        return this.message;
    }
}
