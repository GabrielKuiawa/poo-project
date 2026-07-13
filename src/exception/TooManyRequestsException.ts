import HttpException from "./HttpException";

export default class TooManyRequestsException extends HttpException {
  constructor(message = "Muitas tentativas. Tente novamente mais tarde") {
    super(429, message);
  }
}
