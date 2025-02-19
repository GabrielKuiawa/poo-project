import Logger from "../utils/Logger";
import HttpException from "./HttpException";

export default class NotFoundException extends Error implements HttpException {
    public status: number;
    public message: string;

    constructor(message = 'Recurso não encontrado') {
        super(message);
        this.name = 'NotFoundException';
        this.status = 404;
        this.message = message;
        Object.setPrototypeOf(this, NotFoundException.prototype);
    }

    public logErrorToFile(): string {
        const logger = new Logger('notfound-error.log',);
        logger.logError(this.message, this.status);
        return this.message;
    }
}
