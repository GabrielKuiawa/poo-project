import HttpException from "./HttpException";

export class UserNotFoundException extends HttpException {
    public statusCode: number;

    constructor(message: string) {
        super(400,message);
    }
}
