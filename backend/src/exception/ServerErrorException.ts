import HttpException from "./HttpException";

export default class ServerErrorException extends HttpException {
  constructor(message = "Erro no servidor") {
    super(500, message);
  }
}
