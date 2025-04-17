export class ApiError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }

  getCode(): number {
    if (this instanceof BadRequest) {
      return 400;
    }
    if (this instanceof UnAuthenticated) {
      return 401;
    }
    if (this instanceof UnAuthorized) {
      return 403;
    }
    if (this instanceof NotFound) {
      return 404;
    }
    if (this instanceof UnprocessableEntity) {
      return 422;
    }
    return 500;
  }
}

export class BadRequest extends ApiError {}
export class UnAuthenticated extends ApiError {}
export class UnAuthorized extends ApiError {}
export class NotFound extends ApiError {}
export class UnprocessableEntity extends ApiError {}
