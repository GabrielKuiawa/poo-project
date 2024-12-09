import HttpException from './HttpException';

export default class UnauthorizedException extends HttpException {
    constructor(message = 'Acesso não autorizado') {
        super(401, message);
    }
}
