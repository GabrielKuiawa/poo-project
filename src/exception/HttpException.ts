export default abstract class HttpException extends Error {
  protected constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
