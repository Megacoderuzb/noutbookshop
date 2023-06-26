class BadRequestErr extends Error {
  constructor(msg) {
    super(msg);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BadRequestErr);
    }
  }
}

class NotFoundErr extends Error {
  constructor(msg) {
    super(msg);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotFoundErr);
    }
  }
}

class UnauthorizedErr extends Error {
  constructor(msg) {
    super(msg);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnauthorizedErr);
    }
  }
}

module.exports = {
  BadRequestErr,
  UnauthorizedErr,
  NotFoundErr,
};
