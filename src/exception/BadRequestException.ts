import Logger from "../utils/Logger";
import HttpException from "./HttpException";

export default class BadRequestException extends Error implements HttpException {
    public status: number;
    public message: string;

    constructor(message = 'Requisição Inválida') {
        super(message);
        this.status = 400;
        this.message = message;
        Object.setPrototypeOf(this, BadRequestException.prototype);
    }

    public logErrorToFile(): string {
        const logger = new Logger('badRequest-error.log');
        logger.logError(this.message, this.status);
        return this.message;
    }
}
