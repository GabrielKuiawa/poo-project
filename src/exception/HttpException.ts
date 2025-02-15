export default interface HttpException {
    status: number;
    message: string;
    logErrorToFile(): string;
}
