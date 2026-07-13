import HttpException from "./HttpException";

export default class ConflictException extends HttpException {
  constructor(message = "Conflito com o estado atual do recurso") {
    super(409, message);
  }
}
