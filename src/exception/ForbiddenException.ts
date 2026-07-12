import Logger from '../utils/Logger';
import HttpException from './HttpException';

export default class ForbiddenException extends Error implements HttpException {
    public readonly status = 403;

    constructor(message = 'Você não tem permissão para realizar esta operação') {
        super(message);
        Object.setPrototypeOf(this, ForbiddenException.prototype);
    }

    public logErrorToFile(): string {
        new Logger('forbidden-error.log').logError(this.message, this.status);
        return this.message;
    }
}
