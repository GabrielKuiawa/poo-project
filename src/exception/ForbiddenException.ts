import HttpException from "./HttpException";

export default class ForbiddenException extends HttpException {
  constructor(message = "Você não tem permissão para realizar esta operação") {
    super(403, message);
  }
}
