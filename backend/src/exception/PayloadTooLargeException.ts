import HttpException from "./HttpException";

export default class PayloadTooLargeException extends HttpException {
  constructor(message = "O corpo da requisição excede o limite permitido") {
    super(413, message);
  }
}
