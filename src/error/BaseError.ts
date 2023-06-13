export abstract class BaseError extends Error {
  // eslint-disable-next-line no-unused-vars
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}
