function HttpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

function tryCatchWrapper(endpointFn) {
  return async (req, res, next) => {
    try {
      await endpointFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = { tryCatchWrapper, HttpError };
