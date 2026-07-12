import Logger from '../utils/Logger';
import HttpException from './HttpException';

export default class ConflictException extends Error implements HttpException {
    public readonly status = 409;

    constructor(message = 'Conflito com o estado atual do recurso') {
        super(message);
        Object.setPrototypeOf(this, ConflictException.prototype);
    }

    public logErrorToFile(): string {
        new Logger('conflict-error.log').logError(this.message, this.status);
        return this.message;
    }
}
