import NotFoundException from "./NotFoundException";

export class UserNotFoundException extends NotFoundException {
  constructor(message = "Usuário não encontrado") {
    super(message);
  }
}
