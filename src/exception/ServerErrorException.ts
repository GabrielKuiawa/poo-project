import Logger from "../utils/Logger";
import HttpException from "./HttpException";

export default class ServerErrorException extends Error implements HttpException {
    public status: number;
    public message: string;

    constructor(message = 'Erro no servidor') {
        super(message);
        this.status = 500;
        this.message = message;
        Object.setPrototypeOf(this, ServerErrorException.prototype);
    }

    public logErrorToFile(): string {
        const logger = new Logger('server-error.log');
        logger.logError(this.message, this.status);
        return this.message;
    }
}
