class BadRequestErr extends Error {
  constructor(msg) {
    super(msg);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BadRequestError);
    }
  }
}

class NotFoundErr extends Error {
  constructor(msg) {
    super(msg);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotFoundError);
    }
  }
}

class UnauthorizedErr extends Error {
  constructor(msg) {
    super(msg);

    if(Error.captureStackTrace) {
      Error.captureStackTrace(this, UnauthorizedError)
    }
  }
}

module.exports = {
  BadRequestErr,
  UnauthorizedErr,
  NotFoundErr,
};
